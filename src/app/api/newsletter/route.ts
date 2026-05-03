import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createToken } from "@/lib/newsletter/token";
import {
  addContactPending,
  isResendConfigured,
  sendEmail,
} from "@/lib/newsletter/resend";
import { confirmationEmail } from "@/lib/newsletter/templates";
import { siteConfig } from "@/lib/site";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4 * 1024;

const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  // Honeypot — bots preenchem
  website: z.string().max(0).optional(),
  // Token Turnstile (opcional em dev — server faz skip se sem secret)
  turnstileToken: z.string().max(4096).optional(),
});

function safeLog(level: "info" | "warn" | "error", event: string, data: Record<string, unknown>) {
  const sanitized: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "email" || k === "name" || k === "phone") {
      sanitized[k] = v ? "[redacted]" : null;
    } else {
      sanitized[k] = v;
    }
  }
  const line = `[newsletter] ${event} ${JSON.stringify(sanitized)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/**
 * POST /api/newsletter
 * Body: { email: string, website?: string (honeypot) }
 *
 * Fluxo (LGPD double opt-in):
 * 1. Valida payload (Zod) + honeypot
 * 2. Cria contato no Resend como 'unsubscribed' (pendente)
 * 3. Envia email de confirmacao com token HMAC (24h)
 * 4. Usuario clica em /api/newsletter/confirm?token=...
 *
 * Sem Resend configurado: log-only, retorna ok.
 */
export async function POST(req: NextRequest) {
  // Rate limit por IP (10/min). Sem env, libera com warning.
  const rl = await checkRateLimit(req, "newsletter");
  if (!rl.success) {
    safeLog("warn", "rate_limited", { retryAfter: rl.retryAfter });
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfter),
          "X-RateLimit-Limit": String(rl.limit),
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      },
    );
  }

  const contentLength = req.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    safeLog("warn", "validation_failed", {
      paths: parsed.error.issues.map((i) => i.path.join(".")).slice(0, 3),
    });
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const { email, website, turnstileToken } = parsed.data;

  if (website && website.length > 0) {
    safeLog("info", "honeypot_triggered", {});
    return NextResponse.json({ ok: true });
  }

  // Turnstile — verificação anti-bot. Skip em dev (sem secret).
  const ts = await verifyTurnstileToken(turnstileToken, getClientIp(req));
  if (!ts.ok) {
    safeLog("warn", "turnstile_failed", { errors: ts.errors });
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  if (!isResendConfigured()) {
    safeLog("info", "received_log_only", { hasEmail: !!email });
    return NextResponse.json({ ok: true });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const confirmToken = createToken(email, "confirm");
  const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${encodeURIComponent(confirmToken)}`;

  try {
    await addContactPending(email);
  } catch (err) {
    // 'already exists' do Resend nao quebra o fluxo — reenviamos o email mesmo assim
    safeLog("warn", "contact_create_failed", {
      kind: err instanceof Error ? err.name : typeof err,
    });
  }

  try {
    const { subject, html } = confirmationEmail({ confirmUrl });
    await sendEmail({ to: email, subject, html });
    safeLog("info", "confirmation_sent", {});
    return NextResponse.json({ ok: true, queued: true });
  } catch (err) {
    safeLog("error", "send_failed", {
      kind: err instanceof Error ? err.name : typeof err,
    });
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}

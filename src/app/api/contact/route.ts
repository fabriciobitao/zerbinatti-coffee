import { NextRequest, NextResponse } from "next/server";
import { contactPayloadSchema, type ContactPayload } from "@/lib/schemas/contact";
import { sendEmail } from "@/lib/newsletter/resend";
import { b2bNotificationEmail } from "@/lib/newsletter/templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile";

/**
 * POST /api/contact
 * Aceita captura de email (Quiz, newsletter, formulario B2B).
 *
 * Hardening:
 * - Limite de Content-Length 10KB (DoS por payload)
 * - Validacao Zod com discriminated union por `type`
 * - Honeypot (`_hp`) — bots preenchem; humanos nao veem
 * - Logger sem PII (email/cnpj/phone substituidos por flags)
 * - Resposta de erro generica (nunca expor err.message cru)
 *
 * Se RESEND_API_KEY estiver configurada, envia notificacao para CONTACT_INBOX.
 * Caso contrario, retorna 200 ok (log-only) — o front continua funcional.
 */

const MAX_BODY_BYTES = 10 * 1024; // 10KB

/**
 * Logger seguro — nunca emite PII crua.
 * Substitui valores sensiveis por flags booleanas / hashes curtos.
 */
function safeLog(level: "info" | "warn" | "error", event: string, data: Record<string, unknown>) {
  const sanitized: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v == null) {
      sanitized[k] = null;
      continue;
    }
    if (["email", "phone", "cnpj", "endereco", "address", "name", "company"].includes(k)) {
      sanitized[k] = typeof v === "string" && v.length > 0 ? "[redacted]" : null;
      continue;
    }
    sanitized[k] = v;
  }
  const line = `[contact] ${event} ${JSON.stringify(sanitized)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export async function POST(req: NextRequest) {
  // 0. Rate limit por IP — 10 req/min via Upstash (graceful se sem env).
  const rl = await checkRateLimit(req, "contact");
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

  // 1. Limite de tamanho via Content-Length (defensivo — Vercel ja limita,
  //    mas bloqueamos cedo antes de fazer parse).
  const contentLength = req.headers.get("content-length");
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    safeLog("warn", "payload_too_large", { contentLength });
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  // 2. Parse JSON com guarda
  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      safeLog("warn", "payload_too_large_text", { bytes: text.length });
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }
    raw = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // 2.5. Extrai turnstileToken antes do Zod (não faz parte do schema oficial).
  let turnstileToken: string | undefined;
  if (raw && typeof raw === "object" && "turnstileToken" in raw) {
    const t = (raw as Record<string, unknown>).turnstileToken;
    if (typeof t === "string") turnstileToken = t;
    delete (raw as Record<string, unknown>).turnstileToken;
  }

  // 3. Validacao Zod (discriminated union)
  const parsed = contactPayloadSchema.safeParse(raw);
  if (!parsed.success) {
    safeLog("warn", "validation_failed", {
      // log apenas a estrutura — nunca os valores rejeitados
      issueCount: parsed.error.issues.length,
      paths: parsed.error.issues.map((i) => i.path.join(".")).slice(0, 5),
    });
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const payload: ContactPayload = parsed.data;

  // 4. Honeypot — se preenchido, bot. Retorna 200 OK silenciosamente.
  if (payload._hp && payload._hp.length > 0) {
    safeLog("info", "honeypot_triggered", { type: payload.type });
    return NextResponse.json({ ok: true, queued: false });
  }

  // 4.5. Turnstile — validação anti-bot. Em dev (sem secret) é skip.
  const ts = await verifyTurnstileToken(turnstileToken, getClientIp(req));
  if (!ts.ok) {
    safeLog("warn", "turnstile_failed", { errors: ts.errors });
    return NextResponse.json({ error: "captcha_failed" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox =
    process.env.CONTACT_NOTIFY_EMAIL ||
    process.env.CONTACT_INBOX ||
    "contato@zerbinatticoffee.com";

  // 5. Sem Resend — log-only sem PII
  if (!apiKey) {
    safeLog("info", "received_log_only", {
      type: payload.type,
      hasEmail: !!payload.email,
      // os campos abaixo so existem em alguns variants — acesso seguro:
      hasName: "name" in payload && !!payload.name,
      hasPhone: "phone" in payload && !!payload.phone,
    });
    return NextResponse.json({ ok: true, queued: false });
  }

  // 6. Envia email pra inbox interno via Resend.
  //    B2B: template editorial em HTML.
  //    Outros tipos: texto puro (mais leve).
  try {
    if (payload.type === "b2b") {
      const { subject, html } = b2bNotificationEmail({
        type: payload.type,
        name: payload.name,
        company: payload.company,
        cnpj: payload.cnpj,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
      });
      await sendEmail({
        to: inbox,
        subject,
        html,
        replyTo: payload.email,
      });
    } else {
      const lineParts: string[] = [`Tipo: ${payload.type}`];
      if ("name" in payload && payload.name) lineParts.push(`Nome: ${payload.name}`);
      if (payload.email) lineParts.push(`E-mail: ${payload.email}`);
      if ("metadata" in payload && payload.metadata) {
        lineParts.push(
          `\nMetadata:\n${Object.entries(payload.metadata)
            .map(([k, v]) => `  ${k}: ${v}`)
            .join("\n")}`,
        );
      }
      const html = `<pre style="font-family:monospace;font-size:13px;white-space:pre-wrap;">${lineParts
        .join("\n")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</pre>`;
      await sendEmail({
        to: inbox,
        subject: `[Zerbinatti] Novo contato — ${payload.type.toUpperCase()}`,
        html,
        replyTo: payload.email,
      });
    }

    return NextResponse.json({ ok: true, queued: true });
  } catch (err) {
    safeLog("error", "resend_exception", {
      kind: err instanceof Error ? err.name : typeof err,
    });
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

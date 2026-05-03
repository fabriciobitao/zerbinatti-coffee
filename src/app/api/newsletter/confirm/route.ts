import { NextRequest, NextResponse } from "next/server";
import { verifyToken, createToken } from "@/lib/newsletter/token";
import {
  confirmContact,
  isResendConfigured,
  sendEmail,
} from "@/lib/newsletter/resend";
import { welcomeEmail } from "@/lib/newsletter/templates";
import { siteConfig } from "@/lib/site";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function log(level: "info" | "warn" | "error", event: string, extra: Record<string, unknown> = {}) {
  const line = `[newsletter:confirm] ${event} ${JSON.stringify(extra)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/**
 * GET /api/newsletter/confirm?token=...
 *
 * Verifica HMAC + TTL (24h), marca contato como subscribed no Resend,
 * envia email de boas-vindas com link de unsubscribe permanente,
 * redireciona para /obrigado-newsletter.
 */
export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const successUrl = `${baseUrl}/obrigado-newsletter`;
  const errorUrl = `${baseUrl}/obrigado-newsletter?status=error`;

  // Rate limit por IP — 5/min para evitar enumeração de tokens.
  const rl = await checkRateLimit(req, "newsletter-confirm");
  if (!rl.success) {
    log("warn", "rate_limited", { retryAfter: rl.retryAfter });
    return new NextResponse("rate_limited", {
      status: 429,
      headers: {
        "Retry-After": String(rl.retryAfter),
        "Content-Type": "text/plain",
      },
    });
  }

  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    log("warn", "missing_token");
    return NextResponse.redirect(errorUrl, 302);
  }

  const result = verifyToken(token);
  if (!result.ok || result.action !== "confirm") {
    log("warn", "invalid_token", { reason: result.ok ? "wrong_action" : result.reason });
    return NextResponse.redirect(errorUrl, 302);
  }

  if (!isResendConfigured()) {
    log("info", "log_only_confirm");
    return NextResponse.redirect(successUrl, 302);
  }

  const { email } = result;

  try {
    await confirmContact(email);
  } catch (err) {
    log("error", "confirm_contact_failed", {
      kind: err instanceof Error ? err.name : typeof err,
    });
    return NextResponse.redirect(errorUrl, 302);
  }

  // Welcome email com link de unsubscribe
  try {
    const unsubToken = createToken(email, "unsubscribe");
    const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`;
    const { subject, html } = welcomeEmail({ unsubscribeUrl });
    await sendEmail({ to: email, subject, html });
  } catch (err) {
    // Welcome falhar nao invalida confirmacao — apenas loga
    log("warn", "welcome_send_failed", {
      kind: err instanceof Error ? err.name : typeof err,
    });
  }

  return NextResponse.redirect(successUrl, 302);
}

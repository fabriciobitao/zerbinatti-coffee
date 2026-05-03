import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/newsletter/token";
import { isResendConfigured, removeContact } from "@/lib/newsletter/resend";
import { siteConfig } from "@/lib/site";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function log(level: "info" | "warn" | "error", event: string, extra: Record<string, unknown> = {}) {
  const line = `[newsletter:unsubscribe] ${event} ${JSON.stringify(extra)}`;
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

/**
 * GET /api/newsletter/unsubscribe?token=...
 *
 * Token HMAC permanente (5 anos) embutido em todos os emails da newsletter.
 * Remove o contato da audience Resend e redireciona para /obrigado-unsubscribe.
 */
export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
  const successUrl = `${baseUrl}/obrigado-unsubscribe`;
  const errorUrl = `${baseUrl}/obrigado-unsubscribe?status=error`;

  // Rate limit por IP — 5/min para evitar enumeração de tokens.
  const rl = await checkRateLimit(req, "newsletter-unsubscribe");
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
  if (!result.ok || result.action !== "unsubscribe") {
    log("warn", "invalid_token", {
      reason: result.ok ? "wrong_action" : result.reason,
    });
    return NextResponse.redirect(errorUrl, 302);
  }

  if (!isResendConfigured()) {
    log("info", "log_only_unsub");
    return NextResponse.redirect(successUrl, 302);
  }

  try {
    await removeContact(result.email);
  } catch (err) {
    // Idempotente — se ja foi removido, segue para sucesso
    log("warn", "remove_failed", {
      kind: err instanceof Error ? err.name : typeof err,
    });
  }

  return NextResponse.redirect(successUrl, 302);
}

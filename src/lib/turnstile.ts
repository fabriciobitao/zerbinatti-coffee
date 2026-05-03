/**
 * Cloudflare Turnstile — verificação server-side.
 *
 * Princípios:
 * - Sem TURNSTILE_SECRET_KEY configurado, retornamos { ok: true, skipped: true }.
 *   Isso permite dev local sem CAPTCHA. Em produção, configure SEMPRE.
 * - Token é consumido apenas uma vez (siteverify invalida automaticamente).
 * - Timeout curto (5s) para não pendurar o request handler em caso de outage
 *   da Cloudflare — em outage, fail-open (deixa passar) com warn no log.
 *
 * Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TIMEOUT_MS = 5000;

export interface TurnstileResult {
  ok: boolean;
  /** True se a validação foi pulada (sem secret configurado). */
  skipped: boolean;
  /** Códigos de erro retornados pela Cloudflare (se houver). */
  errors?: string[];
}

interface SiteverifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
}

let warnedMissingSecret = false;

export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (!warnedMissingSecret) {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY ausente — verificação desativada (dev mode).",
      );
      warnedMissingSecret = true;
    }
    return { ok: true, skipped: true };
  }

  if (!token || typeof token !== "string" || token.length < 10) {
    return { ok: false, skipped: false, errors: ["missing-input-response"] };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      console.warn("[turnstile] siteverify HTTP", res.status, "— fail-open");
      return { ok: true, skipped: true };
    }
    const data = (await res.json()) as SiteverifyResponse;
    if (data.success) {
      return { ok: true, skipped: false };
    }
    return {
      ok: false,
      skipped: false,
      errors: data["error-codes"] ?? ["unknown"],
    };
  } catch (err) {
    // Outage da Cloudflare: fail-open com warn — preferimos liberar usuário
    // legítimo a derrubar formulário em caso de problema externo.
    console.warn(
      "[turnstile] siteverify exception — fail-open:",
      err instanceof Error ? err.name : typeof err,
    );
    return { ok: true, skipped: true };
  } finally {
    clearTimeout(timeout);
  }
}

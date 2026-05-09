// Server-side Turnstile verifier (Cloudflare CAPTCHA invisivel).
// No-op em dev quando TURNSTILE_SECRET_KEY nao esta setado.

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
};

export async function verifyTurnstile(
  token: string | undefined | null,
  ip?: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true };

  if (!token || typeof token !== "string") {
    return { ok: false, reason: "missing_token" };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  let res: Response;
  try {
    res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });
  } catch {
    return { ok: false, reason: "network_error" };
  }

  if (!res.ok) return { ok: false, reason: `http_${res.status}` };

  const json = (await res.json().catch(() => null)) as SiteverifyResponse | null;
  if (!json) return { ok: false, reason: "invalid_response" };

  if (!json.success) {
    const codes = json["error-codes"]?.join(",") || "verify_failed";
    return { ok: false, reason: codes };
  }

  return { ok: true };
}

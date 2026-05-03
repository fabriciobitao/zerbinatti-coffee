import crypto from "node:crypto";

/**
 * Tokens HMAC-SHA256 para confirmacao e cancelamento de newsletter.
 *
 * Payload: email + timestamp (ms) + acao (confirm | unsubscribe).
 * Token: base64url(payload).base64url(hmac).
 *
 * Validade: 24h para confirm, 5 anos para unsubscribe (link permanente).
 *
 * NUNCA logar tokens — eles funcionam como senha de uso unico.
 */

const CONFIRM_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const UNSUB_TTL_MS = 5 * 365 * 24 * 60 * 60 * 1000; // 5 anos

export type TokenAction = "confirm" | "unsubscribe";

function base64url(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(input: string): Buffer {
  const padded = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64");
}

function getSecret(): string {
  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("NEWSLETTER_SECRET ausente ou curto demais (>= 32 chars)");
  }
  return secret;
}

export function createToken(email: string, action: TokenAction): string {
  const payload = JSON.stringify({
    e: email.trim().toLowerCase(),
    t: Date.now(),
    a: action,
  });
  const payloadB64 = base64url(Buffer.from(payload, "utf8"));
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest();
  return `${payloadB64}.${base64url(hmac)}`;
}

export type VerifyResult =
  | { ok: true; email: string; action: TokenAction; issuedAt: number }
  | { ok: false; reason: string };

export function verifyToken(token: string): VerifyResult {
  if (typeof token !== "string" || !token.includes(".")) {
    return { ok: false, reason: "malformed" };
  }
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) {
    return { ok: false, reason: "malformed" };
  }

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return { ok: false, reason: "config" };
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest();
  let actual: Buffer;
  try {
    actual = fromBase64url(sigB64);
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (
    expected.length !== actual.length ||
    !crypto.timingSafeEqual(expected, actual)
  ) {
    return { ok: false, reason: "invalid_signature" };
  }

  let payload: { e?: string; t?: number; a?: TokenAction };
  try {
    payload = JSON.parse(fromBase64url(payloadB64).toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  const { e, t, a } = payload;
  if (
    typeof e !== "string" ||
    typeof t !== "number" ||
    (a !== "confirm" && a !== "unsubscribe")
  ) {
    return { ok: false, reason: "malformed" };
  }

  const ttl = a === "confirm" ? CONFIRM_TTL_MS : UNSUB_TTL_MS;
  if (Date.now() - t > ttl) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, email: e, action: a, issuedAt: t };
}

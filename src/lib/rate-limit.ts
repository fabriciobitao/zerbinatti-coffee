/**
 * Rate limiter — Upstash Redis + sliding window.
 *
 * Princípios:
 * - Graceful degradation: sem env (dev local sem Upstash), apenas loga warning
 *   e libera a request. Nunca derruba prod por rate limit indisponível.
 * - IP via `x-forwarded-for` (Vercel injeta o IP real do cliente como primeiro
 *   item da lista). Fallback para "unknown" — múltiplas requisições anônimas
 *   compartilham o mesmo bucket, o que é aceitável (defesa contra spam).
 * - Cada endpoint tem uma "tag" que vira parte da chave Redis para isolar
 *   buckets entre /contact, /newsletter, /confirm, /unsubscribe.
 *
 * Limites adotados:
 * - submit (contact, newsletter):    10 req / min  (uso humano normal)
 * - sensitive (confirm, unsubscribe): 5 req / min  (link único, tolera retry)
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

type LimitTag = "contact" | "newsletter" | "newsletter-confirm" | "newsletter-unsubscribe";

interface LimitConfig {
  requests: number;
  windowSeconds: number;
}

const LIMITS: Record<LimitTag, LimitConfig> = {
  contact: { requests: 10, windowSeconds: 60 },
  newsletter: { requests: 10, windowSeconds: 60 },
  "newsletter-confirm": { requests: 5, windowSeconds: 60 },
  "newsletter-unsubscribe": { requests: 5, windowSeconds: 60 },
};

let cachedRedis: Redis | null = null;
const cachedLimiters = new Map<LimitTag, Ratelimit>();

function getRedis(): Redis | null {
  if (cachedRedis) return cachedRedis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}

function getLimiter(tag: LimitTag): Ratelimit | null {
  if (cachedLimiters.has(tag)) return cachedLimiters.get(tag) ?? null;
  const redis = getRedis();
  if (!redis) return null;
  const cfg = LIMITS[tag];
  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(cfg.requests, `${cfg.windowSeconds} s`),
    analytics: false,
    prefix: `rl:${tag}`,
  });
  cachedLimiters.set(tag, limiter);
  return limiter;
}

/**
 * Extrai o IP do request. Em Vercel, `x-forwarded-for` é confiável (a edge
 * sobrescreve qualquer header injetado pelo cliente).
 */
export function getClientIp(req: NextRequest | Request): string {
  const xff =
    "headers" in req ? req.headers.get("x-forwarded-for") : null;
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp =
    "headers" in req ? req.headers.get("x-real-ip") : null;
  if (realIp) return realIp.trim();
  return "unknown";
}

export interface RateLimitResult {
  success: boolean;
  /** Segundos até o próximo slot disponível (apenas se success=false). */
  retryAfter: number;
  /** Limite total na janela. */
  limit: number;
  /** Requisições restantes na janela. */
  remaining: number;
  /** True quando o limiter rodou; false quando degradou (sem Redis). */
  enforced: boolean;
}

let warnedMissingEnv = false;

/**
 * Aplica rate limit. Retorna metadata; o caller decide o que fazer.
 *
 * Uso:
 *   const rl = await checkRateLimit(req, "contact");
 *   if (!rl.success) {
 *     return new NextResponse("rate_limited", {
 *       status: 429,
 *       headers: { "Retry-After": String(rl.retryAfter) },
 *     });
 *   }
 */
export async function checkRateLimit(
  req: NextRequest | Request,
  tag: LimitTag,
  identifier?: string,
): Promise<RateLimitResult> {
  const cfg = LIMITS[tag];
  const limiter = getLimiter(tag);

  if (!limiter) {
    if (!warnedMissingEnv) {
      console.warn(
        "[rate-limit] UPSTASH_REDIS_REST_URL/TOKEN ausentes — rate limiting desativado (graceful degradation).",
      );
      warnedMissingEnv = true;
    }
    return {
      success: true,
      retryAfter: 0,
      limit: cfg.requests,
      remaining: cfg.requests,
      enforced: false,
    };
  }

  const key = identifier ?? getClientIp(req);
  try {
    const res = await limiter.limit(key);
    const retryAfter = res.success
      ? 0
      : Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
    return {
      success: res.success,
      retryAfter,
      limit: res.limit,
      remaining: res.remaining,
      enforced: true,
    };
  } catch (err) {
    // Se o Upstash falhar (rede, token revogado), degradamos ao invés de
    // bloquear o usuário legítimo. Logamos para visibilidade.
    console.warn(
      "[rate-limit] limiter.limit falhou — liberando request:",
      err instanceof Error ? err.name : typeof err,
    );
    return {
      success: true,
      retryAfter: 0,
      limit: cfg.requests,
      remaining: cfg.requests,
      enforced: false,
    };
  }
}

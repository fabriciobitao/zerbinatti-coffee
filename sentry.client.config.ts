/**
 * Sentry — config do navegador.
 *
 * Princípios:
 * - DSN apenas em produção (NODE_ENV === "production"). Dev fica silencioso.
 * - sample rate alto em dev (1.0), reduzido em prod (0.1) para custo.
 * - beforeSend strippa PII (email/phone/cnpj/cpf) de mensagens, breadcrumbs
 *   e contexto antes do upload.
 * - Ignora ruído conhecido: ResizeObserver, NetworkError de extensões.
 */

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProd = process.env.NODE_ENV === "production";

if (dsn && isProd) {
  Sentry.init({
    dsn,
    tracesSampleRate: isProd ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    debug: false,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV || (isProd ? "production" : "development"),
    ignoreErrors: [
      // Ruído de browser extensions / observers
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      "Non-Error promise rejection captured",
      // Network errors de extensões (não acionáveis)
      /^NetworkError when attempting to fetch resource/i,
      /Failed to fetch/i,
      // Top-level exceptions de extensions injetando script
      /chrome-extension:/i,
      /moz-extension:/i,
      /safari-extension:/i,
    ],
    denyUrls: [
      /chrome-extension:\/\//i,
      /moz-extension:\/\//i,
      /safari-extension:\/\//i,
    ],
    beforeSend(event) {
      return scrubPII(event);
    },
    beforeBreadcrumb(crumb) {
      if (!crumb) return null;
      if (crumb.message) crumb.message = scrubText(crumb.message);
      if (crumb.data) {
        for (const k of Object.keys(crumb.data)) {
          const v = crumb.data[k];
          if (typeof v === "string") crumb.data[k] = scrubText(v);
        }
      }
      return crumb;
    },
  });
}

/* ------------------------------------------------------------------ */
/* Helpers de redaction — compartilhados por client/server/edge.      */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
// Telefone BR: (11) 99999-9999, 11999999999, +55 11 99999-9999
const PHONE_RE = /(\+?\d{1,3}[\s-]?)?(\(?\d{2,3}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}/g;
// CPF: 000.000.000-00
const CPF_RE = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
// CNPJ: 00.000.000/0000-00
const CNPJ_RE = /\b\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}\b/g;

function scrubText(s: string): string {
  if (!s || typeof s !== "string") return s;
  return s
    .replace(EMAIL_RE, "[email]")
    .replace(CNPJ_RE, "[cnpj]")
    .replace(CPF_RE, "[cpf]")
    .replace(PHONE_RE, "[phone]");
}

function scrubObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const keyLower = k.toLowerCase();
    if (
      keyLower.includes("email") ||
      keyLower.includes("phone") ||
      keyLower.includes("telefone") ||
      keyLower.includes("cnpj") ||
      keyLower.includes("cpf") ||
      keyLower.includes("password") ||
      keyLower.includes("token") ||
      keyLower.includes("secret")
    ) {
      out[k] = "[redacted]";
      continue;
    }
    if (typeof v === "string") out[k] = scrubText(v);
    else if (v && typeof v === "object" && !Array.isArray(v))
      out[k] = scrubObject(v as Record<string, unknown>);
    else out[k] = v;
  }
  return out;
}

type SentryEventLike = Sentry.ErrorEvent & {
  request?: Sentry.ErrorEvent["request"];
  contexts?: Record<string, unknown>;
  extra?: Record<string, unknown>;
};

export function scrubPII<T extends SentryEventLike>(event: T): T {
  if (event.message) event.message = scrubText(event.message);
  if (event.exception?.values) {
    for (const ex of event.exception.values) {
      if (ex.value) ex.value = scrubText(ex.value);
    }
  }
  if (event.request) {
    if (event.request.url) event.request.url = scrubText(event.request.url);
    if (event.request.data && typeof event.request.data === "object") {
      event.request.data = scrubObject(
        event.request.data as Record<string, unknown>,
      );
    }
    if (event.request.headers) {
      // Headers raramente contêm PII, mas removemos cookie por segurança.
      delete (event.request.headers as Record<string, string>)["cookie"];
      delete (event.request.headers as Record<string, string>)["Cookie"];
    }
  }
  if (event.user) {
    if (event.user.email) event.user.email = "[redacted]";
    if (event.user.ip_address) event.user.ip_address = "0.0.0.0";
  }
  if (event.extra) {
    event.extra = scrubObject(event.extra as Record<string, unknown>);
  }
  if (event.contexts) {
    const contexts = event.contexts as Record<string, unknown>;
    for (const k of Object.keys(contexts)) {
      const ctx = contexts[k];
      if (ctx && typeof ctx === "object" && !Array.isArray(ctx)) {
        contexts[k] = scrubObject(ctx as Record<string, unknown>);
      }
    }
  }
  return event;
}

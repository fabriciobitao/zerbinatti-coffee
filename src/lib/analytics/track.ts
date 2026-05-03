/**
 * Helper de tracking server-safe + consent-aware.
 *
 * Eventos disparam SOMENTE se o usuario consentiu na categoria adequada:
 *  - GA4 (gtag): hasConsent('analytics')
 *  - Meta Pixel (fbq): hasConsent('marketing')
 *
 * NUNCA passar PII (email, telefone, CNPJ, nome). Use enums/categorias.
 */

import { hasConsent } from "@/lib/consent";

export type TrackEvent =
  | "whatsapp_click"
  | "newsletter_signup"
  | "b2b_form_submit"
  | "quiz_completed"
  | "subscribe_started"
  | "subscribe_completed";

type TrackParams = Record<string, string | number | boolean | undefined>;

type GtagFn = (
  command: "event" | "config" | "js" | "set",
  ...args: unknown[]
) => void;

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    fbq?: FbqFn;
  }
}

function safeParams(params?: TrackParams): TrackParams | undefined {
  if (!params) return undefined;
  const cleaned: TrackParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    cleaned[k] = v;
  }
  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

export function track(event: TrackEvent, params?: TrackParams): void {
  if (typeof window === "undefined") return;
  const cleaned = safeParams(params);

  // GA4 — analytics consent
  if (hasConsent("analytics") && typeof window.gtag === "function") {
    try {
      window.gtag("event", event, cleaned ?? {});
    } catch {
      // silencioso
    }
  }

  // Meta Pixel — marketing consent (custom events)
  if (hasConsent("marketing") && typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", event, cleaned ?? {});
    } catch {
      // silencioso
    }
  }
}

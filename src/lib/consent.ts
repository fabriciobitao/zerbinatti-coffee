/**
 * LGPD Consent Manager.
 *
 * Persistencia: cookie `consent` (JSON, 1 ano, SameSite=Lax, Secure em prod)
 * com fallback localStorage para leitura offline.
 *
 * Categorias:
 *  - necessary: sempre `true` (operacao do site, sessao)
 *  - analytics: GA4 + Sentry (opt-in)
 *  - marketing: Meta Pixel (opt-in)
 *
 * API:
 *  - getConsent(): preferencias salvas ou null
 *  - setConsent(prefs): persiste e dispara evento
 *  - hasConsent(type): boolean
 *  - clearConsent(): apaga cookie + storage e dispara evento (re-mostra banner)
 *  - onConsentChange(cb): subscribe; retorna unsubscribe
 *
 * Eventos: emite `consent-change` (window) com `detail: ConsentPrefs | null`.
 */

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_NAME = "consent";
const STORAGE_KEY = "consent";
const EVENT_NAME = "consent-change";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const target = `${name}=`;
  const parts = document.cookie ? document.cookie.split("; ") : [];
  for (const part of parts) {
    if (part.startsWith(target)) {
      return decodeURIComponent(part.slice(target.length));
    }
  }
  return null;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number) {
  if (!isBrowser()) return;
  const isHttps =
    typeof location !== "undefined" && location.protocol === "https:";
  const secure = isHttps ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
}

function deleteCookie(name: string) {
  if (!isBrowser()) return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function parsePrefs(raw: string | null): ConsentPrefs | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as Partial<ConsentPrefs>;
    if (typeof obj !== "object" || obj === null) return null;
    return {
      necessary: true,
      analytics: Boolean(obj.analytics),
      marketing: Boolean(obj.marketing),
    };
  } catch {
    return null;
  }
}

export function getConsent(): ConsentPrefs | null {
  if (!isBrowser()) return null;
  const fromCookie = parsePrefs(readCookie(COOKIE_NAME));
  if (fromCookie) return fromCookie;
  try {
    return parsePrefs(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function setConsent(prefs: Omit<ConsentPrefs, "necessary"> & { necessary?: true }) {
  if (!isBrowser()) return;
  const normalized: ConsentPrefs = {
    necessary: true,
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
  };
  const serialized = JSON.stringify(normalized);
  writeCookie(COOKIE_NAME, serialized, ONE_YEAR_SECONDS);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // localStorage indisponivel — cookie ja persistiu
  }
  emitChange(normalized);
}

export function hasConsent(type: "analytics" | "marketing"): boolean {
  const prefs = getConsent();
  if (!prefs) return false;
  return Boolean(prefs[type]);
}

export function clearConsent() {
  if (!isBrowser()) return;
  deleteCookie(COOKIE_NAME);
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignora
  }
  emitChange(null);
}

function emitChange(detail: ConsentPrefs | null) {
  if (!isBrowser()) return;
  try {
    window.dispatchEvent(new CustomEvent<ConsentPrefs | null>(EVENT_NAME, { detail }));
  } catch {
    // CustomEvent indisponivel (SSR/old browser) — ignora
  }
}

export type ConsentChangeHandler = (prefs: ConsentPrefs | null) => void;

export function onConsentChange(cb: ConsentChangeHandler): () => void {
  if (!isBrowser()) return () => {};
  const handler = (ev: Event) => {
    const ce = ev as CustomEvent<ConsentPrefs | null>;
    cb(ce.detail ?? getConsent());
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}

export const CONSENT_EVENT = EVENT_NAME;

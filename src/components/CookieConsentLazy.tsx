"use client";

import dynamic from "next/dynamic";

/**
 * Wrapper client p/ permitir lazy + ssr:false do CookieConsent.
 * Banner LGPD nao eh critico para LCP — hidrata depois do paint inicial.
 * Aparece apenas em primeira visita (sem consent salvo).
 */
const CookieConsent = dynamic(() => import("./CookieConsent"), {
  ssr: false,
});

export default function CookieConsentLazy() {
  return <CookieConsent />;
}

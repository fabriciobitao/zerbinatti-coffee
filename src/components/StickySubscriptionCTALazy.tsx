"use client";

import dynamic from "next/dynamic";

/**
 * Wrapper client p/ permitir lazy + ssr:false do StickySubscriptionCTA.
 * O componente eh mobile-only e ativa por scroll — nao precisa SSR.
 */
const StickySubscriptionCTA = dynamic(
  () => import("./StickySubscriptionCTA"),
  { ssr: false }
);

export default function StickySubscriptionCTALazy() {
  return <StickySubscriptionCTA />;
}

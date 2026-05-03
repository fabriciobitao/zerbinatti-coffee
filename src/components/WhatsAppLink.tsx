"use client";

import { ReactNode } from "react";
import { track } from "@/lib/analytics/track";

type Props = {
  href: string;
  source: string;
  sku?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

/**
 * Wrapper client de link de WhatsApp que dispara `whatsapp_click` no GA4/Pixel
 * apenas se houver consent. Server components podem usar este componente sem
 * sair do paradigma RSC (apenas o link vira client island).
 */
export default function WhatsAppLink({
  href,
  source,
  sku,
  className,
  children,
  ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      onClick={() => track("whatsapp_click", { source, sku })}
    >
      {children}
    </a>
  );
}

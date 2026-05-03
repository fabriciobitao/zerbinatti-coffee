"use client";

import { useState } from "react";

export type FaqEntry = { q: string; a: string };

type Props = {
  items: FaqEntry[];
  /** Indice do item aberto por default. Padrao: 0 (primeiro). null = todos fechados. */
  defaultOpen?: number | null;
};

/**
 * FAQ editorial — accordions com hairlines, chevron + que rotaciona 45deg.
 * Padrao 1.10/4.6 da UI-SPEC-INTERNAS. Background bone esperado.
 */
export default function EditorialFAQ({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={`${i}-${item.q}`} className="border-b border-line">
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                className={`group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors ${
                  isOpen ? "text-olive" : "text-ink hover:text-olive"
                }`}
              >
                <span className="text-[17px] font-medium leading-snug">
                  {item.q}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center text-olive transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              hidden={!isOpen}
              className="pb-6 pr-12 text-[15px] leading-[1.7] text-ink-soft"
              style={{ maxWidth: "680px" }}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

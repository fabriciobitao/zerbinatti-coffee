"use client";

import { useState } from "react";

export type FAQItem = { q: string; a: string };

export function FAQ({
  items,
  theme = "light",
}: {
  items: FAQItem[];
  theme?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const dark = theme === "dark";

  return (
    <div
      className={`divide-y ${
        dark ? "divide-coffee-800" : "divide-coffee-100"
      }`}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-6 py-5 text-left transition-colors ${
                dark
                  ? "text-coffee-50 hover:text-gold-300"
                  : "text-coffee-900 hover:text-coffee-700"
              }`}
            >
              <span className="font-serif text-base font-semibold sm:text-lg">
                {item.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform ${
                  isOpen ? "rotate-45" : ""
                } ${
                  dark
                    ? "border-coffee-700 text-gold-400"
                    : "border-coffee-300 text-coffee-700"
                }`}
                aria-hidden="true"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
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
            {isOpen && (
              <div
                className={`pb-6 pr-12 text-sm leading-relaxed ${
                  dark ? "text-coffee-300" : "text-coffee-700"
                }`}
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

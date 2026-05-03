"use client";

import { useEffect, useState } from "react";

/**
 * Sticky CTA mobile (decisao 4 do UX-ASSINATURA).
 * - Visivel apenas em mobile (<768px).
 * - Aparece apos scroll passar do final do primeiro configurador.
 * - Some quando o segundo configurador entra no viewport.
 * - Le o data-total do configurador para refletir o valor atual.
 *
 * Marca os configuradores com `data-subscription-configurator`.
 */
export default function StickySubscriptionCTA() {
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const configs = Array.from(
      document.querySelectorAll<HTMLElement>("[data-subscription-configurator]")
    );
    if (configs.length === 0) return;

    const first = configs[0];
    const second = configs[1] || null;

    const updateTotal = () => {
      const t = first.getAttribute("data-total");
      if (t) setTotal(t);
    };
    updateTotal();
    const mo = new MutationObserver(updateTotal);
    mo.observe(first, { attributes: true, attributeFilter: ["data-total"] });

    let firstPassed = false;
    let secondVisible = false;
    const sync = () => setVisible(firstPassed && !secondVisible);

    const firstObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Ja "passamos" do primeiro quando ele esta acima do viewport
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            firstPassed = true;
          } else if (entry.isIntersecting) {
            firstPassed = false;
          }
          sync();
        });
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" }
    );
    firstObs.observe(first);

    let secondObs: IntersectionObserver | null = null;
    if (second) {
      secondObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            secondVisible = entry.isIntersecting;
            sync();
          });
        },
        { threshold: 0.2 }
      );
      secondObs.observe(second);
    }

    return () => {
      firstObs.disconnect();
      secondObs?.disconnect();
      mo.disconnect();
    };
  }, []);

  function scrollToConfigurator() {
    const first = document.querySelector<HTMLElement>(
      "[data-subscription-configurator]"
    );
    first?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      role="region"
      aria-label="CTA persistente da assinatura"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink-soft/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <div className="flex flex-col">
          <span
            className="font-mono text-[10px] uppercase text-[var(--ink-mute-on-dark)]"
            style={{ letterSpacing: "0.18em" }}
          >
            Total / envio
          </span>
          <span
            className="font-display text-[18px] text-bone"
            style={{ fontWeight: 400, lineHeight: 1.2 }}
            aria-live="polite"
          >
            {total || "—"}
          </span>
        </div>
        <button
          type="button"
          onClick={scrollToConfigurator}
          className="bg-olive px-5 py-3 text-[12px] font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
        >
          Começar a receber
        </button>
      </div>
    </div>
  );
}

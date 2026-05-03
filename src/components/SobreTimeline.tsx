"use client";

import { useEffect, useState } from "react";

export type TimelineMarker = {
  id: string;
  year: string;
  label: string;
};

type Props = {
  markers: TimelineMarker[];
};

/**
 * Timeline lateral sticky desktop. Detecta bloco ativo via IntersectionObserver
 * e marca como aria-current. Hidden em mobile/tablet (vira breadcrumb mono no
 * topo de cada bloco — feito no servidor).
 */
export default function SobreTimeline({ markers }: Props) {
  const [activeId, setActiveId] = useState<string>(markers[0]?.id || "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observers: IntersectionObserver[] = [];
    markers.forEach((m) => {
      const el = document.getElementById(m.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(m.id);
          });
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [markers]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label="Linha do tempo da história Zerbinatti"
      className="hidden lg:block"
    >
      <div className="sticky top-32">
        <ol className="relative ml-2">
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-line"
          />
          {markers.map((m) => {
            const active = activeId === m.id;
            return (
              <li key={m.id} className="relative pl-8 pb-10 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[6px] block h-3 w-3 rounded-full border transition-colors duration-200 ${
                    active
                      ? "border-olive bg-olive"
                      : "border-line bg-bone"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => scrollTo(m.id)}
                  aria-current={active ? "true" : undefined}
                  className="block text-left transition-colors"
                >
                  <span
                    className={`block font-mono text-[14px] font-medium ${
                      active ? "text-ink" : "text-ink-mute"
                    }`}
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {m.year}
                  </span>
                  <span
                    className={`mt-1 block text-[13px] leading-[1.4] ${
                      active ? "text-ink-soft" : "text-ink-mute"
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

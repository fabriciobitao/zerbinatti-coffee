"use client";

import { useState } from "react";

/**
 * Traduz a pontuação SCA para linguagem acessível.
 * A SCA (Specialty Coffee Association) pontua cafés de 0 a 100 em cupping.
 * - <80: não é considerado especial
 * - 80-84: bom café especial
 * - 85-87: muito bom
 * - 88-89: excelente
 * - 90+: excepcional — top 1% mundial
 */
function translateScore(score: string) {
  const numeric = parseInt(score.replace(/[^0-9]/g, ""), 10);
  if (numeric >= 90) {
    return {
      tier: "Excepcional",
      summary: "Top 1% do café especial no mundo.",
      detail:
        "Pontuações 90+ são reservadas a cafés raros — geralmente microlotes de variedades premiadas como Geisha, com processamento e terroir exemplares.",
    };
  }
  if (numeric >= 88) {
    return {
      tier: "Excelente",
      summary: "Entre os melhores cafés especiais do Brasil.",
      detail:
        "A nota 88-89 sinaliza equilíbrio e complexidade altos, com defeitos mínimos. Acima do teto dos supermercados gourmet.",
    };
  }
  if (numeric >= 85) {
    return {
      tier: "Muito bom",
      summary: "Café especial de alta qualidade.",
      detail:
        "De 85 a 87 pontos, você encontra doçura clara, acidez agradável e corpo consistente. Muito além do café de prateleira (que não é pontuado).",
    };
  }
  return {
    tier: "Especial",
    summary: "Qualifica como café especial pela SCA.",
    detail:
      "Cafés com 80+ pontos entram na categoria 'specialty coffee'. Cafés de supermercado comum não são pontuados — ficam abaixo desse patamar.",
  };
}

export function SCABadge({
  score,
  size = "md",
}: {
  score: string;
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);
  const info = translateScore(score);

  const padding = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`inline-flex items-center gap-1.5 rounded-full bg-green-800/10 font-semibold text-green-900 transition-colors hover:bg-green-800/15 ${padding}`}
        aria-label={`SCA ${score} — ${info.tier}`}
      >
        <span>SCA {score}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className="h-3 w-3 opacity-60"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border border-coffee-200 bg-white p-4 text-left text-xs leading-relaxed text-coffee-700 shadow-xl"
        >
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-green-800">
            Escala SCA · {info.tier}
          </span>
          <span className="mt-1 block text-sm font-semibold text-coffee-900">
            {info.summary}
          </span>
          <span className="mt-2 block">{info.detail}</span>
        </span>
      )}
    </span>
  );
}

"use client";

import { useState } from "react";
import type { BrewRecipe } from "@/lib/data/products";

/**
 * Guia de preparo específico por café. Cada SKU traz as receitas da casa
 * para os métodos nos quais ele brilha — não um manual genérico.
 */
export function BrewGuide({ recipes }: { recipes: BrewRecipe[] }) {
  const [active, setActive] = useState(0);
  if (!recipes || recipes.length === 0) return null;
  const recipe = recipes[active];

  return (
    <div className="rounded-2xl border border-coffee-100 bg-white">
      {/* Tabs */}
      <div
        className="flex gap-1 overflow-x-auto border-b border-coffee-100 px-2 pt-2"
        role="tablist"
        aria-label="Métodos de preparo"
      >
        {recipes.map((r, i) => (
          <button
            key={r.method}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-t-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              i === active
                ? "bg-coffee-900 text-coffee-50"
                : "text-coffee-600 hover:bg-coffee-50 hover:text-coffee-900"
            }`}
          >
            {r.method}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
          <Param label="Proporção" value={recipe.ratio} />
          <Param label="Moagem" value={recipe.grind} />
          <Param label="Temperatura" value={recipe.waterTemp} />
          <Param label="Dose" value={recipe.dose} />
          <Param label="Tempo" value={recipe.time} />
        </div>
        {recipe.note && (
          <p className="mt-5 border-t border-coffee-100 pt-4 text-sm leading-relaxed text-coffee-700">
            <span className="font-semibold text-coffee-900">Da casa: </span>
            {recipe.note}
          </p>
        )}
      </div>
    </div>
  );
}

function Param({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-coffee-500">
        {label}
      </div>
      <div className="mt-1 font-serif text-base font-semibold text-coffee-900">
        {value}
      </div>
    </div>
  );
}

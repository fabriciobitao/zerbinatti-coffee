"use client";

import { useMemo, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/config";

/**
 * Assinatura — fluxo único (não comparativo) com configurador inline.
 * Background --ink (única seção dark da Home).
 */

type Frequency = "quinzenal" | "mensal";
type PackageId = "500g-graos" | "250g-graos" | "250g-moido";

type Pkg = {
  id: PackageId;
  label: string;
  price: number;
  pricePerKg: number;
  weight: string;
};

const PACKAGES: Pkg[] = [
  { id: "500g-graos", label: "500g grãos", price: 89.9, pricePerKg: 179.8, weight: "500g em grãos" },
  { id: "250g-graos", label: "250g grãos", price: 49.9, pricePerKg: 199.6, weight: "250g em grãos" },
  { id: "250g-moido", label: "250g moído", price: 49.9, pricePerKg: 199.6, weight: "250g moído" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Ícones hairline (1px stroke) — desenhados na mão, não usar lucide/heroicons
const Icons = {
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2c0 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 4 3 4 7a6 6 0 0 1-12 0c0-5 6-7 6-11z" />
    </svg>
  ),
  pause: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <line x1="9" y1="5" x2="9" y2="19" />
      <line x1="15" y1="5" x2="15" y2="19" />
    </svg>
  ),
  ship: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="14" height="11" />
      <path d="M17 11h4l-2 7h-2" />
      <path d="M21 7l-4 0" />
    </svg>
  ),
  percent: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  ),
};

const GUARANTEES = [
  { icon: Icons.flame, text: "Torra fresca, sob demanda" },
  { icon: Icons.pause, text: "Pause ou cancele quando quiser" },
  { icon: Icons.ship, text: "Frete grátis em todo o Brasil" },
  { icon: Icons.percent, text: "Primeiro envio com 15% de desconto" },
];

export default function Subscription() {
  const [frequency, setFrequency] = useState<Frequency>("mensal");
  const [packageId, setPackageId] = useState<PackageId>("500g-graos");

  const selected = PACKAGES.find((p) => p.id === packageId)!;

  // Total por envio com -15% (primeiro envio)
  const totalPerShipment = useMemo(
    () => Number((selected.price * 0.85).toFixed(2)),
    [selected]
  );
  const pricePerKgFirst = useMemo(
    () => Number((selected.pricePerKg * 0.85).toFixed(2)),
    [selected]
  );

  const subtotalLabel = useMemo(() => {
    if (frequency === "quinzenal") {
      const monthly = Number((totalPerShipment * 2).toFixed(2));
      return `Equivale a ${formatBRL(pricePerKgFirst)}/kg · 2 envios = ${formatBRL(monthly)}/mês`;
    }
    return `Equivale a ${formatBRL(pricePerKgFirst)}/kg · livre de frete`;
  }, [frequency, totalPerShipment, pricePerKgFirst]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Olá! Quero começar minha assinatura Zerbinatti:\n\n• Frequência: ${
      frequency === "mensal" ? "Mensal" : "Quinzenal"
    }\n• Pacote: ${selected.weight}\n• Total por envio (primeiro -15%): ${formatBRL(
      totalPerShipment
    )}\n\nComo prosseguimos?`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="assinatura"
      aria-labelledby="assinatura-title"
      className="dark-section bg-ink py-24 lg:py-40"
    >
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Coluna esquerda */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow">O CARTÃO DA CASA</p>
            <h2 id="assinatura-title" className="text-h1 mt-8 text-bone">
              A casa escolhe.
              <br />
              Você{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                recebe.
              </em>
            </h2>
            <p
              className="text-lede mt-8 text-bone-soft"
              style={{ maxWidth: "440px" }}
            >
              Quinzenal ou mensal. Um pacote por entrega, torrado na semana,
              com a moagem que você preferir.
            </p>

            <ul className="mt-12 space-y-4">
              {GUARANTEES.map((g, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-[15px] leading-[1.6] text-bone-soft"
                >
                  <span className="text-olive shrink-0" aria-hidden="true">
                    {g.icon}
                  </span>
                  {g.text}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 inline-block text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
            >
              Não sabe qual escolher? Faça o teste em 30 segundos →
            </a>
          </div>

          {/* Coluna direita — configurador */}
          <form
            onSubmit={handleSubmit}
            aria-labelledby="config-title"
            className="rounded-[2px] border border-ink-mute/40 bg-ink-soft p-6 sm:p-8 lg:p-12"
          >
            <h3 id="config-title" className="sr-only">
              Configurar assinatura
            </h3>

            {/* Frequência */}
            <fieldset>
              <legend
                className="font-mono text-[11px] font-medium uppercase text-bone-soft"
                style={{ letterSpacing: "0.18em" }}
              >
                Frequência
              </legend>
              <div className="mt-4 flex gap-3">
                {(["quinzenal", "mensal"] as Frequency[]).map((f) => {
                  const active = frequency === f;
                  return (
                    <label
                      key={f}
                      className={`flex-1 cursor-pointer rounded-[2px] border px-6 py-3 text-center text-sm font-medium tracking-[0.04em] transition-colors duration-200 ${
                        active
                          ? "border-bone bg-bone text-ink"
                          : "border-ink-mute/60 bg-transparent text-bone-soft hover:border-bone-soft"
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        value={f}
                        checked={active}
                        onChange={() => setFrequency(f)}
                        className="sr-only"
                      />
                      {f === "quinzenal" ? "Quinzenal" : "Mensal"}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Pacote */}
            <fieldset className="mt-8">
              <legend
                className="font-mono text-[11px] font-medium uppercase text-bone-soft"
                style={{ letterSpacing: "0.18em" }}
              >
                Pacote
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {PACKAGES.map((p) => {
                  const active = packageId === p.id;
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer flex-col items-start gap-1 rounded-[2px] border px-4 py-4 transition-colors duration-200 ${
                        active
                          ? "border-bone bg-bone text-ink"
                          : "border-ink-mute/60 bg-transparent text-bone-soft hover:border-bone-soft"
                      }`}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={p.id}
                        checked={active}
                        onChange={() => setPackageId(p.id)}
                        className="sr-only"
                      />
                      <span className="text-[13px] font-medium">{p.label}</span>
                      <span
                        className={`font-mono text-[12px] ${
                          active ? "text-ink-soft" : "text-ink-mute"
                        }`}
                      >
                        {formatBRL(p.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <hr className="my-8 border-0 border-t border-ink-mute/30" />

            {/* Total */}
            <div aria-live="polite">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-bone-soft">Total por envio</span>
                <span
                  className="font-display text-[36px] text-bone"
                  style={{ fontWeight: 400, lineHeight: 1 }}
                >
                  {formatBRL(totalPerShipment)}
                </span>
              </div>
              <p className="mt-3 font-mono text-[12px] text-ink-mute">
                {subtotalLabel}
              </p>
            </div>

            <button
              type="submit"
              aria-describedby="legal-caption"
              className="mt-8 w-full bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
            >
              Começar a receber
            </button>

            <p
              id="legal-caption"
              className="mt-4 text-[12px] leading-[1.5] text-ink-mute"
            >
              Cobrança recorrente conforme frequência. Cancele a qualquer
              momento, sem perguntas.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/config";
import { track } from "@/lib/analytics/track";

export type Frequency = "quinzenal" | "mensal";
export type PackageId = "500g-graos" | "250g-graos" | "250g-moido";

type Pkg = {
  id: PackageId;
  label: string;
  shortLabel: string;
  price: number;
  pricePerKg: number;
  weight: string;
};

const PACKAGES: Pkg[] = [
  {
    id: "500g-graos",
    label: "Pacote Família",
    shortLabel: "500g grãos",
    price: 89.9,
    pricePerKg: 179.8,
    weight: "500g em grãos",
  },
  {
    id: "250g-graos",
    label: "Pacote Mesa",
    shortLabel: "250g grãos",
    price: 49.9,
    pricePerKg: 199.6,
    weight: "250g em grãos",
  },
  {
    id: "250g-moido",
    label: "Pacote Coador",
    shortLabel: "250g moído",
    price: 49.9,
    pricePerKg: 199.6,
    weight: "250g moído",
  },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

type Props = {
  /** Microcopy do botao principal. Default: "Começar a receber" */
  ctaLabel?: string;
  /** Pacote inicial (querystring `?cafe=`). Aceita slugs do products.ts (zerbinatti-500g-graos) */
  initialPackage?: PackageId | string;
  /** Frequencia inicial (querystring `?freq=`). */
  initialFrequency?: Frequency | string;
  /** ID estavel para `aria-controls`/`aria-labelledby` quando renderizado mais de uma vez. */
  idPrefix?: string;
  /** Marca o configurador para que o sticky CTA mobile o use como referencia (IntersectionObserver). */
  intersectionId?: string;
};

function normalizePackage(value?: string): PackageId {
  if (!value) return "500g-graos";
  // Aceita variantes de slug: "zerbinatti-500g-graos" -> "500g-graos"
  if (value.endsWith("500g-graos")) return "500g-graos";
  if (value.endsWith("250g-graos")) return "250g-graos";
  if (value.endsWith("250g-moido")) return "250g-moido";
  if (value === "500g-graos" || value === "250g-graos" || value === "250g-moido") {
    return value;
  }
  return "500g-graos";
}

function normalizeFrequency(value?: string): Frequency {
  if (value === "quinzenal" || value === "mensal") return value;
  return "mensal";
}

export default function SubscriptionConfigurator({
  ctaLabel = "Começar a receber",
  initialPackage,
  initialFrequency,
  idPrefix = "config",
  intersectionId,
}: Props) {
  const reactId = useId();
  const baseId = `${idPrefix}-${reactId.replace(/:/g, "")}`;

  const [frequency, setFrequency] = useState<Frequency>(
    normalizeFrequency(initialFrequency)
  );
  const [packageId, setPackageId] = useState<PackageId>(
    normalizePackage(initialPackage)
  );

  // Le querystring no client (apenas se nao houver initial via prop)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (initialPackage || initialFrequency) return;
    const sp = new URLSearchParams(window.location.search);
    const cafe = sp.get("cafe");
    const freq = sp.get("freq");
    if (cafe) setPackageId(normalizePackage(cafe));
    if (freq) setFrequency(normalizeFrequency(freq));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selected = PACKAGES.find((p) => p.id === packageId)!;

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
    track("subscribe_started", {
      source: "configurator",
      package: selected.id,
      frequency,
    });
    track("whatsapp_click", { source: "subscription_configurator" });
    const msg = `Olá! Quero começar minha assinatura Zerbinatti:\n\n• Frequência: ${
      frequency === "mensal" ? "Mensal" : "Quinzenal"
    }\n• Pacote: ${selected.weight}\n• Total por envio (primeiro -15%): ${formatBRL(
      totalPerShipment
    )}\n\nComo prosseguimos?`;
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  }

  // Expoe valor total via data attribute para Sticky CTA mobile usar
  const total = formatBRL(totalPerShipment);

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={`${baseId}-title`}
      data-subscription-configurator={intersectionId || true}
      data-total={total}
      className="rounded-[2px] border border-ink-mute/40 bg-ink-soft p-6 sm:p-8 lg:p-12"
    >
      <h3 id={`${baseId}-title`} className="sr-only">
        Configurar assinatura
      </h3>

      {/* Frequencia */}
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
                  name={`${baseId}-frequency`}
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
        <div className="mt-4 flex flex-col gap-3">
          {PACKAGES.map((p) => {
            const active = packageId === p.id;
            return (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-[2px] border px-4 py-4 transition-colors duration-200 ${
                  active
                    ? "border-bone bg-bone text-ink"
                    : "border-ink-mute/60 bg-transparent text-bone-soft hover:border-bone-soft"
                }`}
              >
                <input
                  type="radio"
                  name={`${baseId}-package`}
                  value={p.id}
                  checked={active}
                  onChange={() => setPackageId(p.id)}
                  className="sr-only"
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium">
                    {p.label}
                  </span>
                  <span
                    className={`mt-0.5 font-mono text-[11px] ${
                      active ? "text-ink-soft" : "text-[var(--ink-mute-on-dark)]"
                    }`}
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {p.shortLabel}
                  </span>
                </div>
                <span
                  className={`font-mono text-[12px] ${
                    active ? "text-ink-soft" : "text-bone-soft"
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
      <div aria-live="polite" aria-atomic="true">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-bone-soft">Total por envio</span>
          <span
            className="font-display text-[36px] text-bone"
            style={{ fontWeight: 400, lineHeight: 1 }}
          >
            {total}
          </span>
        </div>
        <p className="mt-3 font-mono text-[12px] text-[var(--ink-mute-on-dark)]">
          {subtotalLabel}
        </p>
        <p className="mt-3 font-mono text-[12px] text-olive">
          1º envio com 15% off — sem fidelidade.
        </p>
      </div>

      <button
        type="submit"
        aria-describedby={`${baseId}-caption`}
        className="mt-8 w-full bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
      >
        {ctaLabel}
      </button>

      <p
        id={`${baseId}-caption`}
        className="mt-4 text-[12px] leading-[1.5] text-[var(--ink-mute-on-dark)]"
      >
        Cobrança recorrente conforme frequência. Cancele a qualquer momento, sem perguntas.
      </p>
    </form>
  );
}

export { PACKAGES, formatBRL };

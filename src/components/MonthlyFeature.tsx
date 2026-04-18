import Link from "next/link";
import { Kicker, PullQuote } from "@/components/ui/Editorial";
import { SCABadge } from "@/components/ui/SCABadge";
import { FreshnessSignal } from "@/components/ui/FreshnessSignal";
import { ScrollIcon } from "@/components/ui/HeraldicIcons";
import { getProductBySlug } from "@/lib/data/products";

/**
 * Slot editorial "Café do mês" — destaca 1 SKU com carta do torrador.
 * Fonte: mudar o slug abaixo para rotacionar. Cada edição ganha sua própria carta.
 */
const edition = {
  slug: "reserva",
  month: "Abril · 2026",
  title: "O café que o mestre colocou na mesa este mês",
  letterTitle: "Carta do torrador",
  letter:
    "Eu torrei este lote pensando na xícara das 7h. A primeira do dia, a que você toma antes de falar com ninguém. O honey da Reserva acorda com doçura — não é fruta gritando, é mel derretendo no chá quente. Se você for pessoa de V60, deixe o bloom crescer sem pressa. Se for de Chemex, baixe a moagem um ponto. Escrevi essa carta hoje de manhã. — Lucca Zerbinatti, mestre de torra",
};

export default function MonthlyFeature() {
  const product = getProductBySlug(edition.slug);
  if (!product) return null;

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-28 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #ebe0d2 0%, #e3d2bd 50%, #dcc7a9 100%)",
      }}
    >
      {/* Glow dourado central — luz de edição especial */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/12 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-coffee-800/10 blur-[120px]" />

      {/* Backdrop tipográfico */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="select-none font-serif text-coffee-300/40"
          style={{
            fontSize: "clamp(14rem, 42vw, 20rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          04
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker>{edition.month}</Kicker>
          <h2 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.02em] text-coffee-900 text-[clamp(2.5rem,7.5vw,4.5rem)]">
            {edition.title.split(" ").slice(0, 4).join(" ")}
            <br />
            <span className="italic text-gold-600">
              {edition.title.split(" ").slice(4).join(" ")}
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-16 md:grid-cols-2 md:gap-14">
          {/* Produto destaque */}
          <Link
            href={`/cafes/${product.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-coffee-950 transition-all hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <div
              className="aspect-[4/5] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 40%, rgba(26,17,8,0.85) 100%), url('https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1200&q=85&auto=format&fit=crop')",
                filter: "sepia(0.25) saturate(1.15)",
              }}
              role="img"
              aria-label={`Edição do mês — ${product.name}`}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
                {product.tag}
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-coffee-50 sm:text-3xl">
                {product.name}
              </h3>
              <p className="mt-1 text-sm italic text-coffee-200">
                {product.tagline}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <SCABadge score={product.score} size="sm" />
                <FreshnessSignal
                  roastDate={product.roastDate}
                  variant="compact"
                />
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 group-hover:text-gold-200">
                Ler a ficha completa →
              </span>
            </div>
          </Link>

          {/* Carta do torrador */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 text-gold-600">
              <ScrollIcon size={28} strokeWidth={1.2} />
              <Kicker>{edition.letterTitle}</Kicker>
            </div>

            <PullQuote cite={edition.letter.split(" — ")[1]} className="mt-6">
              {edition.letter.split(" — ")[0]}
            </PullQuote>

            {/* CTAs antes da lista no mobile (order-1), depois da lista no desktop (md:order-3) */}
            <div className="order-1 mt-6 flex flex-col gap-3 sm:flex-row md:order-3 md:mt-8">
              <Link
                href={`/cafes/${product.slug}`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 hover:shadow-lg"
              >
                Comprar esta edição
              </Link>
              <Link
                href="/safra/2026"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-coffee-300 px-6 py-3 text-sm font-semibold text-coffee-800 transition-all hover:border-coffee-500 hover:bg-white"
              >
                Diário da safra 2026
              </Link>
            </div>

            {/* Por que esta edição — colapsável no mobile via details, aberto no desktop */}
            <details className="monthly-why order-2 mt-8 border-t border-coffee-200 pt-6 md:order-2">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-base font-bold text-coffee-900 md:cursor-default [&::-webkit-details-marker]:hidden">
                <span>Por que esta edição</span>
                <span className="text-gold-600 transition-transform md:hidden" aria-hidden>
                  <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <ul className="mt-3 space-y-2 text-sm text-coffee-700">
                <li>
                  · Fazenda {product.origin.farm.split(" +")[0]} · altitude{" "}
                  {product.origin.altitude}
                </li>
                <li>· Variedade {product.origin.variety}</li>
                <li>· Processo {product.origin.process}</li>
                <li>· Perfil: {product.notes.slice(0, 3).join(" · ")}</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

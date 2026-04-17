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
    <section className="relative overflow-hidden bg-coffee-100/50 py-20 sm:py-28 lg:py-32">
      {/* Backdrop tipográfico */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="select-none font-serif text-coffee-200/40"
          style={{
            fontSize: "clamp(8rem, 20vw, 20rem)",
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
          <h2 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.02em] text-coffee-900 text-[clamp(2.25rem,5.5vw,4.5rem)]">
            {edition.title.split(" ").slice(0, 4).join(" ")}
            <br />
            <span className="italic text-gold-600">
              {edition.title.split(" ").slice(4).join(" ")}
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-14">
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
              <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-300 uppercase">
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

            <div className="mt-8 border-t border-coffee-200 pt-6">
              <h4 className="font-serif text-base font-bold text-coffee-900">
                Por que esta edição
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-coffee-700">
                <li>
                  · Fazenda {product.origin.farm.split(" +")[0]} · altitude{" "}
                  {product.origin.altitude}
                </li>
                <li>· Variedade {product.origin.variety}</li>
                <li>· Processo {product.origin.process}</li>
                <li>· Perfil: {product.notes.slice(0, 3).join(" · ")}</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/cafes/${product.slug}`}
                className="inline-flex items-center justify-center rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 hover:shadow-lg"
              >
                Comprar esta edição
              </Link>
              <Link
                href="/safra/2026"
                className="inline-flex items-center justify-center rounded-full border border-coffee-300 px-6 py-3 text-sm font-semibold text-coffee-800 transition-all hover:border-coffee-500 hover:bg-white"
              >
                Diário da safra 2026
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

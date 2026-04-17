import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";
import { SCABadge } from "@/components/ui/SCABadge";
import { FreshnessSignal } from "@/components/ui/FreshnessSignal";
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
    <section className="bg-coffee-100/50 py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            {edition.month}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            {edition.title}
          </h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
          {/* Produto destaque */}
          <Link
            href={`/cafes/${product.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-coffee-950 transition-all hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <div
              className="aspect-[4/5] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, transparent 40%, rgba(26,17,8,0.85) 100%), url('https://images.unsplash.com/photo-1559526642-c3f001ea68ee?w=1200&q=85&auto=format&fit=crop')",
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
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              {edition.letterTitle}
            </span>
            <blockquote className="mt-4">
              <p className="font-serif text-xl leading-relaxed text-coffee-800 sm:text-2xl">
                &ldquo;{edition.letter.split(" — ")[0]}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-coffee-600">
                — {edition.letter.split(" — ")[1]}
              </footer>
            </blockquote>

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

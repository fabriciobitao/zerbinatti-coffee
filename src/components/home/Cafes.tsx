import { product } from "@/lib/data/products";
import { buildWhatsAppUrl } from "@/lib/config";
import WhatsAppLink from "@/components/WhatsAppLink";

/**
 * Seção CASA 01 / 02 / 03 — três SKUs do mesmo café.
 * Background bone-soft (cria ritmo após o bone do Hero).
 *
 * Imagens: fallback editorial (sem stock photo).
 * Cada card usa um motivo tipográfico/numerário próprio do padrão das PDPs.
 */

type Fallback =
  | { kind: "monogram"; mark: string }
  | { kind: "numeral"; mark: string; sub: string }
  | { kind: "quote"; mark: string };

type Card = {
  numeral: string;
  name: string;
  meta: string;
  description: string;
  notes: string;
  price: string;
  pricePerKg: string;
  fallback: Fallback;
  imageAlt: string;
  skuId: string;
  weight: string;
  priceValue: number;
};

const CARDS: Card[] = [
  {
    numeral: "CASA 01",
    name: "Pacote Família",
    meta: "500g · em grãos · Bourbon + Catuaí",
    description:
      "Melhor R$/kg da casa. Para quem mói em casa e bebe todo dia.",
    notes: "Chocolate · Caramelo · Nozes · Final doce",
    price: "R$ 89,90",
    pricePerKg: "R$ 179,80 / kg",
    fallback: { kind: "monogram", mark: "Z" },
    imageAlt: "Pacote 500g — em grãos, Bourbon e Catuaí",
    skuId: "zerbinatti-500g-graos",
    weight: "500g em grãos",
    priceValue: 89.9,
  },
  {
    numeral: "CASA 02",
    name: "Pacote Mesa",
    meta: "250g · em grãos · Bourbon + Catuaí",
    description:
      "Pacote curto para conhecer o café antes de assinar.",
    notes: "Chocolate · Caramelo · Nozes · Final doce",
    price: "R$ 49,90",
    pricePerKg: "R$ 199,60 / kg",
    fallback: { kind: "numeral", mark: "II", sub: "250g" },
    imageAlt: "Pacote 250g — em grãos, Bourbon e Catuaí",
    skuId: "zerbinatti-250g-graos",
    weight: "250g em grãos",
    priceValue: 49.9,
  },
  {
    numeral: "CASA 03",
    name: "Pacote Coador",
    meta: "250g · moído · moagem média",
    description:
      "Moagem universal — coador, Moka, prensa, cafeteira elétrica.",
    notes: "Chocolate · Caramelo · Nozes · Final doce",
    price: "R$ 49,90",
    pricePerKg: "R$ 199,60 / kg",
    fallback: { kind: "quote", mark: "“" },
    imageAlt: "Pacote 250g — moído, moagem média universal",
    skuId: "zerbinatti-250g-moido",
    weight: "250g moído",
    priceValue: 49.9,
  },
];

function buildBuyLink(card: Card): string {
  const msg = `Olá! Gostaria de comprar o ${card.name} (${card.weight}) — ${card.price}.`;
  return buildWhatsAppUrl(msg);
}

function FallbackArt({
  fallback,
  alt,
}: {
  fallback: Fallback;
  alt: string;
}) {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft sm:aspect-[16/10] lg:aspect-[4/5]"
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {fallback.kind === "monogram" && (
          <span
            className="font-display italic text-olive"
            style={{
              fontWeight: 400,
              fontSize: "clamp(8rem, 22vw, 14rem)",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {fallback.mark}
          </span>
        )}
        {fallback.kind === "numeral" && (
          <div className="text-center">
            <span
              className="block font-display text-olive"
              style={{
                fontWeight: 400,
                fontSize: "clamp(6rem, 16vw, 10rem)",
                lineHeight: 1,
                letterSpacing: "0.02em",
              }}
              aria-hidden="true"
            >
              {fallback.mark}
            </span>
            <span
              className="mt-4 block font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
              aria-hidden="true"
            >
              {fallback.sub}
            </span>
          </div>
        )}
        {fallback.kind === "quote" && (
          <span
            className="font-display italic text-olive"
            style={{
              fontWeight: 400,
              fontSize: "clamp(12rem, 30vw, 18rem)",
              lineHeight: 0.8,
            }}
            aria-hidden="true"
          >
            {fallback.mark}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Cafes() {
  // Reference product to silence unused import while keeping data path clear
  void product;

  return (
    <section
      id="cafes"
      aria-labelledby="cafes-title"
      className="bg-bone-soft py-20 lg:py-32"
    >
      <div className="container-editorial">
        {/* Header da seção */}
        <header className="mx-auto max-w-[720px] text-center">
          <p className="eyebrow">OS TRÊS PACOTES</p>
          <h2
            id="cafes-title"
            className="text-h1 mt-6 text-ink"
          >
            Um café.{" "}
            <em
              className="font-display italic"
              style={{ fontWeight: 400 }}
            >
              Três
            </em>{" "}
            formas de servir.
          </h2>
          <p
            className="text-lede mx-auto mt-6 text-ink-soft"
            style={{ maxWidth: "560px" }}
          >
            Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torrados sob
            demanda em Treviso. Você escolhe a moagem e a gramatura.
          </p>
          <span className="hairline mt-12 block" aria-hidden="true" />
        </header>

        {/* Grid de cards */}
        <div
          role="list"
          className="mt-16 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-24 lg:grid-cols-3 lg:gap-8"
        >
          {CARDS.map((card) => (
            <article
              key={card.numeral}
              role="listitem"
              className="group flex flex-col border border-line bg-bone transition-all duration-[250ms] hover:border-olive hover:shadow-[0_12px_32px_-16px_rgba(27,23,20,0.12)]"
            >
              {/* Fallback editorial */}
              <FallbackArt fallback={card.fallback} alt={card.imageAlt} />

              {/* Texto */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <p
                  className="font-mono text-[12px] font-medium uppercase text-olive"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {card.numeral}
                </p>
                <h3
                  className="mt-3 font-display text-2xl text-ink"
                  style={{ fontWeight: 400, lineHeight: 1.2 }}
                >
                  {card.name}
                </h3>
                <p
                  className="mt-2 font-mono text-[11px] text-ink-mute"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {card.meta}
                </p>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
                  {card.description}
                </p>
                <p
                  className="mt-4 text-[13px] text-ink-mute"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {card.notes}
                </p>

                <div className="mt-auto pt-6">
                  <hr className="border-0 border-t border-line" />
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <data
                      value={card.priceValue}
                      className="font-display text-[28px] text-ink"
                      style={{ fontWeight: 400 }}
                    >
                      {card.price}
                    </data>
                    <span className="font-mono text-[12px] text-ink-mute">
                      {card.pricePerKg}
                    </span>
                  </div>
                  <WhatsAppLink
                    href={buildBuyLink(card)}
                    source="home_cafes"
                    sku={card.skuId}
                    ariaLabel={`Comprar ${card.name}, ${card.meta}`}
                    className="link-text mt-6 inline-flex items-center gap-2"
                  >
                    Comprar <span aria-hidden="true">→</span>
                  </WhatsAppLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

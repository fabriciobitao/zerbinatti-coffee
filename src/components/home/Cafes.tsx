import Image from "next/image";
import { product } from "@/lib/data/products";
import { buildWhatsAppUrl } from "@/lib/config";

/**
 * Seção CASA 01 / 02 / 03 — três SKUs do mesmo café.
 * Background bone-soft (cria ritmo após o bone do Hero).
 */

type Card = {
  numeral: string;
  name: string;
  meta: string;
  description: string;
  notes: string;
  price: string;
  pricePerKg: string;
  image: string;
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
    image:
      "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=900&q=70&auto=format&fit=crop",
    imageAlt:
      "Pacote 500g de Café Zerbinatti em grãos sobre mesa de madeira",
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
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=70&auto=format&fit=crop",
    imageAlt:
      "Pacote 250g de Café Zerbinatti em grãos com fundo desfocado",
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
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=70&auto=format&fit=crop",
    imageAlt:
      "Pacote 250g de Café Zerbinatti moído ao lado de coador de pano e caneca branca",
    skuId: "zerbinatti-250g-moido",
    weight: "250g moído",
    priceValue: 49.9,
  },
];

function buildBuyLink(card: Card): string {
  const msg = `Olá! Gostaria de comprar o ${card.name} (${card.weight}) — ${card.price}.`;
  return buildWhatsAppUrl(msg);
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
              {/* Foto */}
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[4/5]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
                  style={{ filter: "saturate(0.75) contrast(1.05)" }}
                />
              </div>

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
                  <a
                    href={buildBuyLink(card)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Comprar ${card.name}, ${card.meta}`}
                    className="link-text mt-6 inline-flex items-center gap-2"
                  >
                    Comprar <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

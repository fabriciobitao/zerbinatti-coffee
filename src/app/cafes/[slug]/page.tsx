import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SensoryBars from "@/components/SensoryBars";
import { product, getSkuById, type SkuVariant } from "@/lib/data/products";
import { productSchema } from "@/lib/schema";
import { buildWhatsAppUrl } from "@/lib/config";
import WhatsAppLink from "@/components/WhatsAppLink";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return product.skus.map((sku) => ({ slug: sku.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const sku = getSkuById(slug);
  if (!sku) return {};
  const title = `${product.name} ${sku.shortLabel} · Zerbinatti`;
  const description = `${product.name} ${sku.shortLabel} — Bourbon e Catuaí da Serra do Cabral, ${product.origin.altitude}, processo ${product.origin.process}. Notas de ${product.notes.slice(0, 3).join(", ").toLowerCase()}. Torra fresca, frete grátis.`;
  return {
    title,
    description,
    alternates: { canonical: `/cafes/${slug}` },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `/cafes/${slug}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDateBR(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

function daysSince(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

function addDays(iso: string, days: number) {
  const dt = new Date(iso);
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().split("T")[0];
}

export default async function CafePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sku = getSkuById(slug);
  if (!sku) notFound();

  const otherSkus = product.skus.filter((s) => s.id !== slug);
  const dias = daysSince(product.roastDate);
  const validade = addDays(product.roastDate, 180);
  const roastBR = formatDateBR(product.roastDate);
  const validadeBR = formatDateBR(validade);

  // Top 3 reviews para PDP
  const topReviews = product.reviews
    .filter((r) =>
      ["Marina Costa", "Rodrigo Alves", "Pedro Henrique Serra"].includes(
        r.author
      )
    );

  // 3 metodos prioritarios
  const top3Methods = product.brewRecipes.filter((r) =>
    ["V60", "Coado", "Espresso"].includes(r.method)
  );

  const sensoryBars = [
    { label: "Doçura", value: product.sensory.sweetness },
    { label: "Acidez", value: product.sensory.acidity },
    { label: "Corpo", value: product.sensory.body },
    { label: "Complexidade", value: product.sensory.complexity },
  ];

  const buyMsg = `Olá! Tenho interesse no ${product.name} ${sku.label} — ${formatBRL(sku.price)}. Pode me ajudar com a compra?`;
  const buyUrl = buildWhatsAppUrl(buyMsg);
  const subscribeUrl = `/assinatura?cafe=${sku.id}&freq=mensal`;

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema(product)),
          }}
        />

        {/* Breadcrumb */}
        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Cafés", href: "/cafes/zerbinatti-500g-graos" },
              { label: `Casa 01 — ${sku.shortLabel}` },
            ]}
          />
        </div>

        {/* SECAO 1 — Hero PDP */}
        <section
          aria-labelledby="pdp-hero-title"
          className="bg-bone py-12 lg:py-20"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Coluna esquerda — foto/fallback */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <span
                      className="block font-display text-[140px] text-olive"
                      style={{ fontWeight: 400, lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      Z
                    </span>
                    <span
                      className="mt-4 block font-mono text-[11px] uppercase text-ink-mute"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {sku.shortLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coluna direita — ficha + CTAs */}
              <div className="flex flex-col justify-center">
                <p
                  className="font-mono text-[12px] font-medium uppercase text-olive"
                  style={{ letterSpacing: "0.18em" }}
                >
                  CASA 01 · BOURBON + CATUAÍ
                </p>
                <h1
                  id="pdp-hero-title"
                  className="text-display mt-6 text-ink"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
                >
                  {product.name}{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    {sku.label}
                  </em>
                  .
                </h1>
                <p
                  className="text-lede mt-6 italic text-ink-soft"
                  style={{ maxWidth: "480px" }}
                >
                  {sku.description}
                </p>

                {/* Ficha mono */}
                <div className="mt-8 flex flex-col gap-1">
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-px w-16 bg-line"
                  />
                  <p
                    className="font-mono text-[11px] uppercase text-ink-mute"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    LOTE 2026/03 · SAFRA 2025
                  </p>
                  <p
                    className="font-mono text-[11px] uppercase text-ink-mute"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    TORRA {roastBR} · SCORE SCA {product.score}
                  </p>
                </div>

                {/* Selo torra fresca */}
                <div className="mt-8 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="block h-2 w-2 bg-olive"
                  />
                  <span className="text-[13px] font-medium text-olive">
                    Torrado há {dias} dias
                  </span>
                </div>

                {/* Preço */}
                <div className="mt-8">
                  <p
                    className="font-display text-[36px] text-ink"
                    style={{ fontWeight: 400, lineHeight: 1 }}
                  >
                    {formatBRL(sku.price)}
                  </p>
                  <p className="mt-2 font-mono text-[12px] text-ink-mute">
                    {formatBRL(sku.pricePerKg)}/kg
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col gap-3">
                  <WhatsAppLink
                    href={buyUrl}
                    source="pdp"
                    sku={sku.id}
                    className="inline-block w-full bg-olive px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep sm:w-auto"
                    ariaLabel={`Comprar ${product.name} ${sku.label} avulso pelo WhatsApp`}
                  >
                    Comprar avulso
                  </WhatsAppLink>
                  <a
                    href={subscribeUrl}
                    className="link-text inline-flex items-center gap-2"
                    aria-label={`Assinar este café — abre página de assinatura com ${sku.label} pré-selecionado`}
                  >
                    Assinar este café <span aria-hidden="true">→</span>
                  </a>
                </div>

                <p className="mt-6 text-[12px] italic text-ink-mute">
                  Frete grátis · torrado nesta semana
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 2 — Origem e terroir */}
        <section
          aria-labelledby="origem-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-[60%_40%] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow">ORIGEM E TERROIR</p>
                <h2
                  id="origem-title"
                  className="text-h1 mt-6 text-ink"
                >
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    Serra do Cabral
                  </em>
                  , 900 a 1.100m.
                </h2>
                <p
                  className="text-body mt-8 text-ink-soft"
                  style={{ maxWidth: "560px" }}
                >
                  O {product.name} vem da {product.origin.farm}, na{" "}
                  {product.origin.region}, no {product.origin.state}, a{" "}
                  {product.origin.altitude} de altitude. Solo vermelho, dias
                  quentes e noites frias — amplitude térmica que retarda a
                  maturação e concentra açúcares no grão. A variedade{" "}
                  {product.origin.variety} é cultivada em sistema tradicional,
                  colhida manualmente entre maio e setembro, em fases de
                  maturação selecionada. O processo é {product.origin.process}{" "}
                  — secagem em terreiro suspenso por 18 a 22 dias, virado três
                  vezes ao dia. A casa compra deste lote pela quinta safra
                  consecutiva.
                </p>
                <p
                  className="mt-8 font-mono text-[11px] uppercase text-ink-mute"
                  style={{ letterSpacing: "0.18em" }}
                >
                  FAZENDA SANTA RITA + LOTES PARCEIROS · NORTE DE MINAS GERAIS
                </p>
              </div>

              {/* Mapa simbolico — fallback editorial */}
              <div className="relative aspect-square w-full overflow-hidden bg-bone">
                <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
                  <span
                    className="font-display text-[40px] text-olive sm:text-[56px]"
                    style={{ fontWeight: 400, lineHeight: 1.1 }}
                    aria-hidden="true"
                  >
                    9°20&apos;S
                    <br />
                    44°10&apos;W
                  </span>
                  <span
                    className="mt-6 font-mono text-[11px] uppercase text-ink-mute"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    900–1.100m · NORTE DE MINAS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 3 — Perfil sensorial */}
        <section
          aria-labelledby="sensorial-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div
            className="container-editorial"
            style={{ maxWidth: "880px" }}
          >
            <header className="text-center">
              <p className="eyebrow">NA XÍCARA</p>
              <h2
                id="sensorial-title"
                className="text-h1 mt-6 text-ink"
              >
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  {product.notes[0]}
                </em>
                , {product.notes[1].toLowerCase()}, {product.notes[2].toLowerCase()}.
              </h2>
              <p
                className="text-body mx-auto mt-8 text-ink-soft"
                style={{ maxWidth: "640px" }}
              >
                Doçura pronunciada, acidez discreta, corpo encorpado.
                Notas dominantes: {product.notes
                  .slice(0, 3)
                  .map((n) => n.toLowerCase())
                  .join(", ")}. Final {product.notes[3]?.toLowerCase() || "doce"}.
                Resiste bem a leite — entrega no espresso e no espresso com
                leite o mesmo equilíbrio que entrega no coador.
              </p>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <div className="mt-12">
              <SensoryBars bars={sensoryBars} />
            </div>
          </div>
        </section>

        {/* SECAO 4 — Como preparar (3 cards) */}
        <section
          aria-labelledby="preparar-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">MÉTODOS RECOMENDADOS</p>
              <h2 id="preparar-title" className="text-h1 mt-6 text-ink">
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  Três
                </em>{" "}
                jeitos de servir bem.
              </h2>
              <p
                className="text-lede mx-auto mt-6 text-ink-soft"
                style={{ maxWidth: "560px" }}
              >
                Esse café aceita quase qualquer método, mas brilha em coador e
                V60. Para mesa de fim de semana, considere um espresso — é
                onde o corpo dele aparece com mais densidade.
              </p>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <ul
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
              role="list"
            >
              {top3Methods.map((r) => (
                <li
                  key={r.method}
                  className="relative bg-bone p-6 lg:p-8"
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "2px",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-6 top-0 block h-px w-8 bg-olive lg:left-8"
                  />
                  <h3 className="mt-4 text-[16px] font-medium text-ink">
                    {r.method}
                  </h3>
                  <p
                    className="mt-3 font-mono text-[12px] text-ink-soft"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {r.ratio} · {r.grind.toUpperCase()} · {r.waterTemp} · {r.dose} · {r.time}
                  </p>
                  {r.note && (
                    <p className="mt-4 text-[13px] italic leading-[1.5] text-ink-mute">
                      {r.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>

            <p
              className="mt-12 text-center font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
            >
              RECEITAS DA CASA · TESTADAS NO BLEND DA SAFRA ATUAL
            </p>
          </div>
        </section>

        {/* SECAO 5 — Frescor */}
        <section
          aria-labelledby="frescor-pdp-title"
          className="dark-section bg-ink py-20 lg:py-32"
        >
          <div
            className="container-editorial"
            style={{ maxWidth: "880px" }}
          >
            <div className="text-center">
              <p
                className="font-mono text-[11px] font-medium uppercase text-bone-soft"
                style={{ letterSpacing: "0.18em" }}
              >
                FRESCOR
              </p>
              <h2
                id="frescor-pdp-title"
                className="text-h1 mt-8 text-bone"
              >
                Torrado em{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  {roastBR}
                </em>
                , embalado no mesmo dia.
              </h2>
              <p
                className="text-body mx-auto mt-8 text-bone-soft"
                style={{ maxWidth: "640px" }}
              >
                Esse pacote saiu do tambor em {roastBR}. Foi embalado a vácuo
                com válvula desgaseificadora dentro de seis horas — o tempo
                certo para os gases iniciais escaparem sem oxidar o grão.
                Depois de aberto, conserva por até sessenta dias se mantido em
                pote opaco e fechado. Não guardamos café torrado em estoque —
                quando o lote acaba, espera-se a próxima torra.
              </p>

              <div
                className="mx-auto mt-12 inline-flex flex-col items-center gap-3 px-8 py-6 sm:px-12 sm:py-7"
                style={{
                  border: "1px solid var(--olive)",
                  borderRadius: "2px",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="block h-3 w-3 bg-olive"
                  />
                  <span
                    className="font-display text-[20px] text-bone sm:text-[24px]"
                    style={{ fontWeight: 400 }}
                  >
                    Torrado há {dias} dias
                  </span>
                </div>
                <span
                  className="font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  LOTE 2026/03 · VALIDADE {validadeBR}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 6 — Reviews */}
        <section
          aria-labelledby="reviews-pdp-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="max-w-[720px]">
              <p className="eyebrow">O QUE DIZEM</p>
              <h2
                id="reviews-pdp-title"
                className="text-h1 mt-6 text-ink"
              >
                Mesa de quem{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  já bebeu
                </em>
                .
              </h2>
            </header>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {topReviews.map((r) => (
                <article
                  key={r.author}
                  className="rounded-[2px] border border-line bg-bone-soft p-8"
                >
                  <span
                    className="block font-display text-[64px] leading-none text-olive/30"
                    style={{ fontWeight: 400 }}
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p className="mt-2 text-[15px] italic leading-[1.6] text-ink-soft">
                    {r.text}
                  </p>
                  <hr className="my-6 border-0 border-t border-line" />
                  <div>
                    <p className="text-[14px] font-medium text-ink">
                      {r.author}
                    </p>
                    <p
                      className="mt-1 font-mono text-[11px] text-ink-mute"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {r.location} · {r.method}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-12 text-center">
              <span className="link-text">
                Ver todas as {product.reviews.length} avaliações →
              </span>
            </p>
          </div>
        </section>

        {/* SECAO 7 — Cafés relacionados (outros SKUs) */}
        <section
          aria-labelledby="related-title"
          className="bg-bone-soft py-16 lg:py-24"
        >
          <div className="container-editorial">
            <header className="max-w-[640px]">
              <p className="eyebrow">OUTROS PACOTES DA CASA</p>
              <h2
                id="related-title"
                className="text-h1 mt-6 text-ink"
              >
                Mesmo café,{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  outras formas
                </em>
                .
              </h2>
            </header>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
              {otherSkus.map((other: SkuVariant) => (
                <a
                  key={other.id}
                  href={`/cafes/${other.id}`}
                  className="group block bg-bone p-8 transition-colors hover:bg-bone/60"
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "2px",
                  }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      {other.badge && (
                        <p
                          className="font-mono text-[11px] font-medium uppercase text-olive"
                          style={{ letterSpacing: "0.18em" }}
                        >
                          {other.badge}
                        </p>
                      )}
                      <h3 className="mt-3 text-[18px] font-medium text-ink group-hover:text-olive">
                        {other.label}
                      </h3>
                      <p className="mt-3 text-[14px] leading-[1.5] text-ink-soft">
                        {other.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-display text-[24px] text-ink"
                        style={{ fontWeight: 400 }}
                      >
                        {formatBRL(other.price)}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-ink-mute">
                        {formatBRL(other.pricePerKg)}/kg
                      </p>
                    </div>
                  </div>
                  <p
                    className="mt-6 font-mono text-[11px] uppercase text-olive"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Ver pacote →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

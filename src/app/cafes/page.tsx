import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { product } from "@/lib/data/products";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cafés · Zerbinatti",
  description:
    "Os pacotes da casa: Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, em 500g em grãos, 250g em grãos ou 250g moído. Score SCA 85, torra fresca datada.",
  alternates: { canonical: "/cafes" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/cafes",
    title: "Cafés · Zerbinatti",
    description:
      "Três pacotes, um café. Bourbon e Catuaí da Serra do Cabral, torrados na semana.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafés · Zerbinatti",
    description:
      "Bourbon e Catuaí da Serra do Cabral em três pacotes. Score SCA 85.",
  },
};

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cafés da casa Zerbinatti",
  url: `${siteConfig.url}/cafes`,
  description:
    "Pacotes do Café Zerbinatti — blend Bourbon + Catuaí da Serra do Cabral, em três formatos.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: product.skus.map((sku, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/cafes/${sku.id}`,
      name: `${product.name} ${sku.label}`,
    })),
  },
};

export default function CafesIndexPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Cafés" },
            ]}
          />
        </div>

        {/* Hero editorial */}
        <section
          aria-labelledby="cafes-hero"
          className="bg-bone pt-12 pb-20 lg:pt-20 lg:pb-32"
        >
          <div className="container-editorial" style={{ maxWidth: "880px" }}>
            <p className="eyebrow">Pacotes da casa</p>
            <h1
              id="cafes-hero"
              className="text-display mt-8 text-ink"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            >
              Um{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                café
              </em>
              . Três pacotes.
            </h1>
            <p
              className="text-lede mt-8 text-ink-soft"
              style={{ maxWidth: "640px" }}
            >
              Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torra média.
              O que muda é o tamanho e a forma como o pacote chega à sua mesa.
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              Score SCA {product.score} · Safra {product.harvest.replace("Safra ", "")} · Torrado sob demanda
            </p>
            <span className="hairline mt-12 block" aria-hidden="true" />
          </div>
        </section>

        {/* Lista vertical de SKUs */}
        <section
          aria-labelledby="cafes-lista"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <h2 id="cafes-lista" className="sr-only">
            Pacotes disponíveis
          </h2>
          <div className="container-editorial">
            <ul className="space-y-12 lg:space-y-16" role="list">
              {product.skus.map((sku, i) => (
                <li key={sku.id}>
                  <Link
                    href={`/cafes/${sku.id}`}
                    className="group block bg-bone p-8 transition-colors hover:bg-bone/70 lg:p-12"
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: "2px",
                    }}
                  >
                    <div className="grid gap-8 lg:grid-cols-[180px_1fr_auto] lg:items-center lg:gap-12">
                      {/* Numeral CASA */}
                      <div>
                        <p
                          className="font-mono text-[11px] uppercase text-olive"
                          style={{ letterSpacing: "0.18em" }}
                        >
                          Pacote {String(i + 1).padStart(2, "0")}
                        </p>
                        <p
                          className="mt-3 font-display text-[64px] text-ink lg:text-[80px]"
                          style={{ fontWeight: 400, lineHeight: 1 }}
                          aria-hidden="true"
                        >
                          {sku.weight}
                        </p>
                        <p className="mt-2 font-mono text-[11px] uppercase text-ink-mute">
                          {sku.format === "graos" ? "em grãos" : "moído"}
                        </p>
                      </div>

                      {/* Conteúdo */}
                      <div>
                        {sku.badge && (
                          <p
                            className="font-mono text-[11px] font-medium uppercase text-olive"
                            style={{ letterSpacing: "0.18em" }}
                          >
                            {sku.badge}
                          </p>
                        )}
                        <h3
                          className="mt-3 font-display text-[28px] leading-[1.15] text-ink group-hover:text-olive transition-colors lg:text-[36px]"
                          style={{ fontWeight: 400 }}
                        >
                          {product.name}{" "}
                          <em
                            className="font-display italic"
                            style={{ fontWeight: 400 }}
                          >
                            {sku.label}
                          </em>
                          .
                        </h3>
                        <p
                          className="mt-5 text-[16px] leading-[1.65] text-ink-soft"
                          style={{ maxWidth: "560px" }}
                        >
                          {sku.description}
                        </p>
                        <p
                          className="mt-6 font-mono text-[11px] uppercase text-ink-mute"
                          style={{ letterSpacing: "0.18em" }}
                        >
                          Bourbon + Catuaí · Serra do Cabral · {product.roast} torra
                        </p>
                      </div>

                      {/* Preço + CTA */}
                      <div className="lg:text-right">
                        <p
                          className="font-display text-[36px] text-ink lg:text-[44px]"
                          style={{ fontWeight: 400, lineHeight: 1 }}
                        >
                          {formatBRL(sku.price)}
                        </p>
                        <p className="mt-2 font-mono text-[12px] text-ink-mute">
                          {formatBRL(sku.pricePerKg)}/kg
                        </p>
                        <p
                          className="mt-6 font-mono text-[11px] uppercase text-olive"
                          style={{ letterSpacing: "0.18em" }}
                        >
                          Ver pacote →
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA assinatura */}
        <section className="bg-bone py-20 lg:py-32">
          <div
            className="container-editorial text-center"
            style={{ maxWidth: "640px" }}
          >
            <p className="eyebrow">Receber sem pensar</p>
            <h2
              className="text-h1 mt-6 text-ink"
              style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.625rem)" }}
            >
              Prefere que a casa{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                escolha
              </em>{" "}
              por você?
            </h2>
            <p className="text-body mt-6 text-ink-soft">
              A assinatura entrega o pacote quinzenal ou mensal, com torra
              fresca a cada envio. Sem fidelidade, cancele quando quiser.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/assinatura" className="btn btn-primary">
                Conhecer a assinatura
              </Link>
              <Link href="/quiz" className="link-text">
                Fazer o quiz da casa →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

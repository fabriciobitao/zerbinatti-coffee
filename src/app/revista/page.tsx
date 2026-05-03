import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { getArticles, getArticleCount } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import { siteConfig } from "@/lib/site";

const PAGE_SIZE = 12;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Revista · Zerbinatti",
  description:
    "Ensaios sobre café e tradição: técnica, história, lugares e receitas. Editorial da casa, escrito por quem torra. Notas, métodos e memórias da Zerbinatti.",
  alternates: {
    canonical: "/revista",
    types: { "application/rss+xml": "/revista/rss.xml" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/revista",
    title: "Revista · Zerbinatti",
    description:
      "Ensaios sobre café e tradição. Notas da casa: técnica, história, lugares e receitas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revista · Zerbinatti",
    description:
      "Ensaios sobre café e tradição, escritos por quem torra.",
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  tecnica: "Tecnica",
  historia: "Historia",
  receitas: "Receitas",
  lugares: "Lugares",
};

function formatDateBR(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

type SearchParams = { page?: string };

export default async function RevistaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page: pageRaw } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageRaw ?? "1", 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const [articles, total] = await Promise.all([
    getArticles({ limit: PAGE_SIZE, offset }),
    getArticleCount(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const featured = page === 1 ? articles[0] : null;
  const rest = page === 1 ? articles.slice(1) : articles;

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Revista" },
            ]}
          />
        </div>

        {/* Hero editorial */}
        <section
          aria-labelledby="revista-hero"
          className="bg-bone pt-12 pb-20 lg:pt-20 lg:pb-32"
        >
          <div className="container-editorial" style={{ maxWidth: "880px" }}>
            <p className="eyebrow">Notas da casa</p>
            <h1
              id="revista-hero"
              className="text-display mt-8 text-ink"
              style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
            >
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                Revista
              </em>{" "}
              Zerbinatti.
            </h1>
            <p
              className="text-lede mt-8 text-ink-soft"
              style={{ maxWidth: "640px" }}
            >
              Ensaios curtos sobre tecnica, historia, lugares e receitas.
              Escritos por quem torra, para quem bebe em casa.
            </p>
            <span className="hairline mt-12 block" aria-hidden="true" />
          </div>
        </section>

        {/* Conteudo */}
        {articles.length === 0 ? (
          <section className="bg-bone-soft py-32">
            <div
              className="container-editorial text-center"
              style={{ maxWidth: "640px" }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                Em breve
              </p>
              <h2 className="text-h2 mt-6 text-ink">
                A primeira{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  edicao
                </em>{" "}
                esta sendo composta.
              </h2>
              <p className="text-body mt-6 text-ink-soft">
                Voltamos com a estante completa em poucas semanas. Ate la,
                conheca os pacotes da casa ou comece a assinatura.
              </p>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/cafes" className="btn btn-primary">
                  Ver os pacotes
                </Link>
                <Link href="/assinatura" className="link-text">
                  Conhecer a assinatura →
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Featured (apenas pagina 1) */}
            {featured && (
              <section
                aria-labelledby="revista-featured"
                className="bg-bone-soft py-20 lg:py-32"
              >
                <div className="container-editorial">
                  <Link
                    href={`/revista/${featured.slug}`}
                    className="group grid gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone">
                      {featured.coverImage?.asset?._ref ? (
                        <Image
                          src={urlForImage(featured.coverImage)
                            .width(1200)
                            .height(900)
                            .fit("crop")
                            .url()}
                          alt={featured.coverImage.alt ?? featured.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span
                            className="font-display text-[180px] text-olive/30"
                            aria-hidden="true"
                          >
                            Z
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                        {CATEGORY_LABEL[featured.category] ?? featured.category}
                        {" · "}
                        {formatDateBR(featured.publishedAt)}
                      </p>
                      <h2
                        id="revista-featured"
                        className="text-h1 mt-6 text-ink group-hover:text-olive transition-colors"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                      >
                        {featured.title}
                      </h2>
                      <p className="text-lede mt-6 text-ink-soft">
                        {featured.excerpt}
                      </p>
                      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        {featured.readingTime} min de leitura · por{" "}
                        {featured.author}
                      </p>
                      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                        Ler ensaio →
                      </p>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {/* Grid restante */}
            {rest.length > 0 && (
              <section className="bg-bone py-20 lg:py-32">
                <div className="container-editorial">
                  <ul
                    className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16"
                    role="list"
                  >
                    {rest.map((article) => (
                      <li key={article._id}>
                        <Link
                          href={`/revista/${article.slug}`}
                          className="group block"
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-soft">
                            {article.coverImage?.asset?._ref ? (
                              <Image
                                src={urlForImage(article.coverImage)
                                  .width(800)
                                  .height(600)
                                  .fit("crop")
                                  .url()}
                                alt={article.coverImage.alt ?? article.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span
                                  className="font-display text-[80px] text-olive/30"
                                  aria-hidden="true"
                                >
                                  Z
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                            {CATEGORY_LABEL[article.category] ??
                              article.category}
                          </p>
                          <h3 className="mt-4 font-display text-[24px] leading-[1.2] text-ink group-hover:text-olive transition-colors">
                            {article.title}
                          </h3>
                          <p className="mt-4 text-[15px] leading-[1.6] text-ink-soft">
                            {article.excerpt}
                          </p>
                          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                            {formatDateBR(article.publishedAt)} ·{" "}
                            {article.readingTime} min
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Paginacao */}
                  {totalPages > 1 && (
                    <nav
                      aria-label="Paginacao da revista"
                      className="mt-24 flex items-center justify-between border-t border-line pt-10"
                    >
                      <div>
                        {hasPrev && (
                          <Link
                            href={
                              page - 1 === 1
                                ? "/revista"
                                : `/revista?page=${page - 1}`
                            }
                            className="link-text"
                          >
                            ← Edicoes mais recentes
                          </Link>
                        )}
                      </div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        Pagina {page} de {totalPages}
                      </p>
                      <div>
                        {hasNext && (
                          <Link
                            href={`/revista?page=${page + 1}`}
                            className="link-text"
                          >
                            Edicoes anteriores →
                          </Link>
                        )}
                      </div>
                    </nav>
                  )}
                </div>
              </section>
            )}

            {/* RSS */}
            <section className="bg-bone-soft py-12">
              <div className="container-editorial text-center">
                <a
                  href="/revista/rss.xml"
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-olive transition-colors"
                >
                  Assinar feed RSS · {siteConfig.url}/revista/rss.xml
                </a>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

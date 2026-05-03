import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { PortableTextRenderer } from "@/components/PortableTextRenderer";
import ArticleShareButtons from "@/components/ArticleShareButtons";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/client";
import { siteConfig } from "@/lib/site";
import { articleSchema } from "@/lib/schema";

export const revalidate = 60;

const CATEGORY_LABEL: Record<string, string> = {
  tecnica: "Tecnica",
  historia: "Historia",
  receitas: "Receitas",
  lugares: "Lugares",
};

function formatDateBR(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const baseTitle = article.seo?.metaTitle ?? article.title;
  // Garante padrao "Titulo · Zerbinatti" sem duplicar marca
  const title = baseTitle.toLowerCase().includes("zerbinatti")
    ? baseTitle
    : `${baseTitle} · Zerbinatti`;
  const description = article.seo?.metaDescription ?? article.excerpt;
  const ogImage = article.coverImage?.asset?._ref
    ? urlForImage(article.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/revista/${slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      title,
      description,
      url: `/revista/${slug}`,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      }),
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, slug, 3);
  const url = `${siteConfig.url}/revista/${slug}`;
  const coverUrl = article.coverImage?.asset?._ref
    ? urlForImage(article.coverImage).width(1600).height(900).fit("crop").url()
    : null;

  const schema = articleSchema({
    title: article.title,
    description: article.excerpt,
    slug,
    image: coverUrl ?? `${siteConfig.url}/images/og-default.jpg`,
    datePublished: article.publishedAt,
    author: { name: article.author, jobTitle: "Editor" },
    section: CATEGORY_LABEL[article.category] ?? article.category,
  });

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Revista", href: "/revista" },
              { label: article.title },
            ]}
          />
        </div>

        {/* HERO do artigo — meta + titulo */}
        <header className="bg-bone pt-8 pb-12 lg:pt-16 lg:pb-20">
          <div className="container-editorial" style={{ maxWidth: "880px" }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
              {CATEGORY_LABEL[article.category] ?? article.category}
              {" · "}
              {formatDateBR(article.publishedAt)}
              {" · "}
              {article.readingTime} min
            </p>
            <h1
              className="text-display mt-8 text-ink"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              {article.title}
            </h1>
            <p
              className="text-lede mt-8 text-ink-soft"
              style={{ maxWidth: "720px" }}
            >
              {article.excerpt}
            </p>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              Por {article.author}
            </p>
          </div>
        </header>

        {/* COVER */}
        {coverUrl && (
          <figure className="bg-bone">
            <div className="container-editorial">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bone-soft">
                <Image
                  src={coverUrl}
                  alt={article.coverImage?.alt ?? article.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              </div>
              {article.coverImage?.caption && (
                <figcaption
                  className="mt-3 font-mono text-[12px] uppercase tracking-[0.05em] text-ink-mute"
                  style={{ maxWidth: "880px" }}
                >
                  {article.coverImage.caption}
                </figcaption>
              )}
            </div>
          </figure>
        )}

        {/* CORPO */}
        <article className="bg-bone py-20 lg:py-32">
          <div
            className="container-editorial"
            style={{ maxWidth: "720px" }}
          >
            <PortableTextRenderer value={article.body} />

            <hr className="mt-24 mb-12 border-0 border-t border-line" />

            {/* Footer do artigo: autor + share */}
            <footer className="grid gap-8 sm:grid-cols-2 sm:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Texto da casa
                </p>
                <p className="mt-3 font-display text-[20px] italic text-ink">
                  {article.author}
                </p>
              </div>
              <div className="sm:justify-self-end">
                <ArticleShareButtons url={url} title={article.title} />
              </div>
            </footer>
          </div>
        </article>

        {/* RELACIONADOS */}
        {related.length > 0 && (
          <section
            aria-labelledby="relacionados"
            className="bg-bone-soft py-20 lg:py-32"
          >
            <div className="container-editorial">
              <header className="max-w-[640px]">
                <p className="eyebrow">Continue lendo</p>
                <h2
                  id="relacionados"
                  className="text-h1 mt-6 text-ink"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                >
                  Outros ensaios em{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    {(CATEGORY_LABEL[article.category] ?? article.category).toLowerCase()}
                  </em>
                  .
                </h2>
              </header>

              <ul
                className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {related.map((r) => (
                  <li key={r._id}>
                    <Link
                      href={`/revista/${r.slug}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone">
                        {r.coverImage?.asset?._ref ? (
                          <Image
                            src={urlForImage(r.coverImage)
                              .width(800)
                              .height(600)
                              .fit("crop")
                              .url()}
                            alt={r.coverImage.alt ?? r.title}
                            fill
                            sizes="(max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span
                              className="font-display text-[64px] text-olive/30"
                              aria-hidden="true"
                            >
                              Z
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="mt-6 font-display text-[20px] leading-[1.25] text-ink group-hover:text-olive transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                        {formatDateBR(r.publishedAt)} · {r.readingTime} min
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles, getArticleBySlug } from "@/lib/data/articles";
import { Ornament } from "@/components/ui/Ornament";
import { Kicker, AsymmetricDivider } from "@/components/ui/Editorial";
import { articleSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado — Revista Zerbinatti" };
  return {
    title: `${article.title} — Revista Zerbinatti`,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(article)),
        }}
      />
      <Header />
      <main className="bg-coffee-50">
        <article className="pt-28 pb-16">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <nav className="text-xs text-coffee-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-coffee-900">
                Início
              </Link>
              <span className="mx-2">›</span>
              <Link href="/revista" className="hover:text-coffee-900">
                Revista
              </Link>
              <span className="mx-2">›</span>
              <span className="text-coffee-800">{article.category}</span>
            </nav>

            <div className="mt-10">
              <Kicker>{article.category}</Kicker>
            </div>
            <h1 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.025em] text-coffee-900 text-[clamp(2.25rem,6vw,4.5rem)]">
              {article.title}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.12em] text-coffee-600 uppercase">
              <span>Por {article.author}</span>
              <span className="text-gold-500">◆</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span className="text-gold-500">◆</span>
              <span>{article.readingTime} de leitura</span>
            </div>

            <AsymmetricDivider className="my-12" />

            <div className="space-y-7 text-[17px] leading-[1.75] text-coffee-800 sm:text-lg">
              {article.body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "drop-cap drop-cap-gold font-serif text-lg leading-[1.65] sm:text-xl"
                      : "font-serif"
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <Ornament className="my-12" />

            <div className="rounded-2xl border border-coffee-200 bg-white p-6">
              <p className="font-serif text-lg text-coffee-900">
                Gostou desta leitura?
              </p>
              <p className="mt-2 text-sm text-coffee-700">
                Assinantes recebem ensaios inéditos antes de qualquer um — e
                bilhetes escritos à mão pelo torrador a cada caixa.
              </p>
              <Link
                href="/#assinatura"
                className="mt-4 inline-block rounded-full bg-coffee-900 px-6 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700"
              >
                Conhecer planos de assinatura
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-coffee-900">
                Continue lendo
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/revista/${a.slug}`}
                    className="group rounded-xl border border-coffee-100 p-6 transition-all hover:border-coffee-300 hover:bg-coffee-50"
                  >
                    <span className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-bold text-coffee-900 group-hover:text-coffee-700">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm text-coffee-700">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

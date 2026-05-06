import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articles } from "@/lib/data/articles";
import { Ornament, Monogram } from "@/components/ui/Ornament";

export const metadata = {
  title: "Revista Zerbinatti — Ensaios sobre café, terroir e ofício",
  description:
    "Ensaios editoriais da família Zerbinatti sobre café especial, terroir da Serra do Cabral, preparo e a história da casa desde 1897.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Revista() {
  const [featured, ...rest] = articles;
  return (
    <>
      <Header />
      <main className="bg-coffee-50">
        {/* Header editorial */}
        <section className="bg-coffee-950 pt-28 pb-16 sm:pt-32">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <div className="flex justify-center text-gold-500">
              <Monogram size={48} />
            </div>
            <span className="mt-6 block text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
              Revista Zerbinatti
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold text-coffee-50 sm:text-5xl md:text-6xl">
              Ensaios sobre café, terroir e ofício
            </h1>
            <Ornament className="mt-6" />
            <p className="mx-auto mt-8 max-w-2xl text-coffee-300">
              Textos escritos à mão pela família, sem ghostwriter, sem
              marketing digital. Leitura para quem quer entender o que está na
              xícara.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              href={`/revista/${featured.slug}`}
              className="group grid gap-10 rounded-3xl bg-white p-6 shadow-sm transition-all hover:shadow-xl lg:grid-cols-2 lg:p-10"
            >
              <div
                className="aspect-[4/3] rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, #2C1D0E 0%, #5D4037 40%, #B8860B 100%)",
                }}
              />
              <div className="flex flex-col justify-center">
                <span className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                  Leitura em destaque · {featured.category}
                </span>
                <h2 className="mt-3 font-serif text-2xl font-bold text-coffee-900 transition-colors group-hover:text-coffee-700 sm:text-3xl md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-coffee-700 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-coffee-600">
                  <span>Por {featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span>·</span>
                  <span>{featured.readingTime} de leitura</span>
                </div>
                <span className="mt-6 text-sm font-semibold text-coffee-900 underline underline-offset-4">
                  Ler ensaio completo →
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/revista/${a.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="aspect-[16/10]"
                    style={{
                      background:
                        a.category === "Preparo"
                          ? "linear-gradient(135deg, #5D4037, #D4A017)"
                          : a.category === "História"
                          ? "linear-gradient(135deg, #1A1108, #5D4037)"
                          : "linear-gradient(135deg, #2E5A3A, #C4A67D)",
                    }}
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                      {a.category}
                    </span>
                    <h3 className="mt-3 font-serif text-xl font-bold text-coffee-900 group-hover:text-coffee-700">
                      {a.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-coffee-700">
                      {a.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-coffee-600">
                      <span>{a.author}</span>
                      <span>·</span>
                      <span>{a.readingTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

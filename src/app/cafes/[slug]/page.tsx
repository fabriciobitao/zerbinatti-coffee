import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products, getProductBySlug } from "@/lib/data/products";
import { SensoryProfile } from "@/components/ui/SensoryProfile";
import { Reviews } from "@/components/ui/Reviews";
import { Badge } from "@/components/ui/Badge";
import { Ornament } from "@/components/ui/Ornament";
import { AddToCartButton } from "./AddToCartButton";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Café não encontrado — Zerbinatti" };
  return {
    title: `${product.name} — Zerbinatti Coffee`,
    description: product.longDescription,
  };
}

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const pix = product.price * 0.9;
  const related = products.filter((p) => p.slug !== slug);

  return (
    <>
      <Header />
      <main className="bg-coffee-50">
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-12 lg:px-8 lg:pt-32">
          {/* Breadcrumb */}
          <nav
            className="mb-8 text-xs text-coffee-600"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-coffee-900">
              Início
            </Link>
            <span className="mx-2">›</span>
            <Link href="/#cafes" className="hover:text-coffee-900">
              Cafés
            </Link>
            <span className="mx-2">›</span>
            <span className="text-coffee-800">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Product visual */}
            <div className="rounded-3xl bg-gradient-to-b from-coffee-100 to-coffee-200/60 p-12">
              <div className="flex items-center justify-center py-8">
                <div
                  className="relative h-[360px] w-[260px] overflow-hidden rounded-b-lg rounded-t-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4B896 0%, #C4A67D 25%, #B8956A 50%, #C4A67D 75%, #D4B896 100%)",
                    boxShadow:
                      "6px 6px 30px rgba(0,0,0,0.25), inset 3px 0 10px rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="absolute inset-[6%] flex items-center justify-center">
                    <img
                      src="/images/rotulo-500g.png"
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-white/60 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-coffee-600">
                    Score SCA
                  </div>
                  <div className="mt-1 font-serif text-xl font-bold text-green-800">
                    {product.score}
                  </div>
                </div>
                <div className="rounded-lg bg-white/60 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-coffee-600">
                    Torra
                  </div>
                  <div className="mt-1 font-serif text-sm font-bold text-coffee-900">
                    {product.roast}
                  </div>
                </div>
                <div className="rounded-lg bg-white/60 p-3">
                  <div className="text-[10px] uppercase tracking-wide text-coffee-600">
                    Peso
                  </div>
                  <div className="mt-1 font-serif text-sm font-bold text-coffee-900">
                    {product.weight}
                  </div>
                </div>
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={product.tagVariant}>{product.tag}</Badge>
                <Badge variant="score">SCA {product.score}</Badge>
                <Badge variant="discount">-10% PIX</Badge>
              </div>
              <h1 className="mt-4 font-serif text-4xl font-bold text-coffee-900 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-2 font-serif text-lg italic text-coffee-600">
                {product.tagline}
              </p>
              <p className="mt-6 text-coffee-700 leading-relaxed">
                {product.longDescription}
              </p>

              <div className="mt-8 rounded-xl border border-coffee-100 bg-white p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-green-800">
                    {formatCurrency(pix)}
                  </span>
                  <span className="text-sm font-medium text-green-700">
                    no PIX (-10%)
                  </span>
                </div>
                <div className="mt-1 text-sm text-coffee-600">
                  ou {formatCurrency(product.price)} em até 4x sem juros no
                  cartão
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    weight={product.weight}
                  />
                  <Link
                    href="/#assinatura"
                    className="inline-flex items-center justify-center rounded-full border border-coffee-300 px-5 py-3 text-sm font-semibold text-coffee-900 transition-all hover:border-coffee-500 hover:bg-coffee-50"
                  >
                    Assinar com 15% off
                  </Link>
                </div>

                <div className="mt-5 flex items-center gap-3 text-xs text-coffee-600">
                  <svg
                    className="h-4 w-4 text-green-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Frete grátis acima de R$ 99 · Torra sob demanda · Envio em
                  até 5 dias úteis
                </div>
              </div>

              {/* Notas sensoriais em chips */}
              <div className="mt-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-coffee-600 uppercase">
                  Notas sensoriais
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.notes.map((n) => (
                    <span
                      key={n}
                      className="rounded-full bg-coffee-100 px-3 py-1 text-sm text-coffee-800"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Métodos recomendados */}
              <div className="mt-8">
                <h3 className="text-xs font-semibold tracking-[0.2em] text-coffee-600 uppercase">
                  Métodos recomendados
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.recommendedMethods.map((m) => (
                    <span
                      key={m}
                      className="rounded-lg border border-coffee-200 bg-white px-3 py-1.5 text-sm text-coffee-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ficha técnica + sensorial */}
          <div className="mt-20 grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-coffee-100 bg-white p-8">
              <h2 className="font-serif text-2xl font-bold text-coffee-900">
                Ficha de origem
              </h2>
              <Ornament className="mt-3 mb-6" />
              <dl className="space-y-4">
                {[
                  { label: "Fazenda", value: product.origin.farm },
                  {
                    label: "Região / Estado",
                    value: `${product.origin.region} / ${product.origin.state}`,
                  },
                  { label: "Altitude", value: product.origin.altitude },
                  { label: "Variedade botânica", value: product.origin.variety },
                  { label: "Processo", value: product.origin.process },
                  { label: "Safra", value: product.harvest },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between gap-6 border-b border-coffee-100 pb-3 last:border-0"
                  >
                    <dt className="text-sm text-coffee-600">{row.label}</dt>
                    <dd className="text-right text-sm font-semibold text-coffee-900">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-coffee-100 bg-white p-8">
              <h2 className="font-serif text-2xl font-bold text-coffee-900">
                Perfil sensorial
              </h2>
              <Ornament className="mt-3 mb-6" />
              <SensoryProfile profile={product.sensory} size={280} />
              <p className="mt-4 text-center text-xs text-coffee-600">
                Escala 1-5 avaliada em cupping pela nossa equipe
                Q-Grader certificada pela SCA.
              </p>
            </div>
          </div>

          <Reviews reviews={product.reviews} productName={product.name} />

          {/* Relacionados */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
                Você também vai gostar
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/cafes/${p.slug}`}
                    className="group flex items-center gap-5 rounded-2xl border border-coffee-100 bg-white p-5 transition-all hover:border-coffee-300 hover:shadow-lg"
                  >
                    <div
                      className="h-24 w-20 shrink-0 rounded"
                      style={{
                        background:
                          "linear-gradient(135deg, #D4B896 0%, #B8956A 100%)",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="score">SCA {p.score}</Badge>
                      </div>
                      <h3 className="mt-2 font-serif text-lg font-bold text-coffee-900 group-hover:text-coffee-700">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm text-coffee-600 line-clamp-2">
                        {p.tagline}
                      </p>
                      <p className="mt-2 text-sm font-bold text-green-800">
                        {formatCurrency(p.price * 0.9)}{" "}
                        <span className="text-xs font-medium text-green-700">
                          no PIX
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

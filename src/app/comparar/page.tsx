import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ornament } from "@/components/ui/Ornament";
import { SCABadge } from "@/components/ui/SCABadge";
import { FreshnessSignal } from "@/components/ui/FreshnessSignal";
import { SensoryProfile } from "@/components/ui/SensoryProfile";
import { products } from "@/lib/data/products";

export const metadata = {
  title: "Comparar os 3 cafés",
  description:
    "Ficha técnica lado a lado dos três cafés Zerbinatti — Clássico, Reserva e Micro-Lote. Origem, SCA, notas, sensório e receita da casa.",
};

const rows: { label: string; get: (p: (typeof products)[number]) => string }[] = [
  { label: "Fazenda", get: (p) => p.origin.farm },
  { label: "Altitude", get: (p) => p.origin.altitude },
  { label: "Variedade", get: (p) => p.origin.variety },
  { label: "Processo", get: (p) => p.origin.process },
  { label: "Torra", get: (p) => p.roast },
  { label: "Peso", get: (p) => p.weight },
  { label: "Safra", get: (p) => p.harvest },
];

export default function Comparar() {
  return (
    <>
      <Header />
      <main className="bg-coffee-50 pb-24 pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              Comparador
            </span>
            <h1 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
              Os três cafés da casa, lado a lado
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-coffee-600">
              Ficha técnica completa para você escolher com critério.
              Clique em qualquer card para abrir a página do café.
            </p>
            <Ornament className="mt-6" />
          </div>

          {/* Cards topo */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/cafes/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-coffee-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-gold-500 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              >
                <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-700 uppercase">
                  {p.tag}
                </span>
                <h2 className="mt-3 font-serif text-2xl font-bold text-coffee-900">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm italic text-coffee-600">
                  {p.tagline}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <SCABadge score={p.score} size="sm" />
                  <FreshnessSignal roastDate={p.roastDate} variant="compact" />
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-coffee-900">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-xs text-coffee-500">{p.weight}</span>
                </div>
                <span className="mt-auto pt-6 text-sm font-semibold text-gold-700 group-hover:text-gold-800">
                  Ver página completa →
                </span>
              </Link>
            ))}
          </div>

          {/* Tabela de specs — desktop */}
          <div className="mt-14 hidden overflow-hidden rounded-2xl border border-coffee-200 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-coffee-900 text-coffee-50">
                <tr>
                  <th className="p-4 font-semibold">Ficha técnica</th>
                  {products.map((p) => (
                    <th key={p.slug} className="p-4 font-serif text-base">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-coffee-100">
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-coffee-50/40" : "bg-white"}
                  >
                    <td className="p-4 font-medium text-coffee-800">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td key={p.slug} className="p-4 text-coffee-700">
                        {row.get(p)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-coffee-50/40">
                  <td className="p-4 align-top font-medium text-coffee-800">
                    Notas sensoriais
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-4 text-coffee-700">
                      <ul className="space-y-1">
                        {p.notes.map((n) => (
                          <li key={n}>· {n}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr className="bg-white">
                  <td className="p-4 align-top font-medium text-coffee-800">
                    Métodos recomendados
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-4 text-coffee-700">
                      {p.recommendedMethods.join(", ")}
                    </td>
                  ))}
                </tr>
                <tr className="bg-coffee-50/40">
                  <td className="p-4 align-top font-medium text-coffee-800">
                    Perfil sensorial
                  </td>
                  {products.map((p) => (
                    <td key={p.slug} className="p-4">
                      <div className="max-w-[180px]">
                        <SensoryProfile
                          profile={p.sensory}
                          size={180}
                          compact
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Acordeão mobile — specs empilhadas por SKU */}
          <div className="mt-10 space-y-6 md:hidden">
            {products.map((p) => (
              <div
                key={p.slug}
                className="overflow-hidden rounded-2xl border border-coffee-200 bg-white"
              >
                <div className="bg-coffee-900 p-4 text-coffee-50">
                  <h3 className="font-serif text-lg font-bold">{p.name}</h3>
                </div>
                <dl className="divide-y divide-coffee-100 text-sm">
                  {rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start gap-4 p-4"
                    >
                      <dt className="w-28 shrink-0 font-medium text-coffee-800">
                        {row.label}
                      </dt>
                      <dd className="text-coffee-700">{row.get(p)}</dd>
                    </div>
                  ))}
                  <div className="p-4">
                    <dt className="font-medium text-coffee-800">Notas</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {p.notes.map((n) => (
                        <span
                          key={n}
                          className="rounded-full bg-coffee-100 px-3 py-1 text-xs text-coffee-700"
                        >
                          {n}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* CTA rodapé */}
          <div className="mt-16 rounded-2xl border border-coffee-200 bg-white p-8 text-center sm:p-12">
            <h2 className="font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
              Ainda em dúvida?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-coffee-600">
              Responda 4 perguntas no nosso quiz e encontramos o café da casa
              que mais conversa com o seu paladar.
            </p>
            <Link
              href="/#quiz"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-coffee-900 px-8 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 hover:shadow-lg"
            >
              Fazer o quiz do paladar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

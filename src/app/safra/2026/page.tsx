import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ornament, HeritageSeal } from "@/components/ui/Ornament";
import { products } from "@/lib/data/products";

export const metadata = {
  title: "Safra 2026 — diário da colheita",
  description:
    "O que aconteceu no cafezal da Serra do Cabral na safra 2026: clima, colheita, processos e os três lotes que entraram na torrefação.",
};

const timeline = [
  {
    date: "Setembro 2025",
    title: "Florada principal",
    body:
      "Três ondas de floração entre 10 e 28 de setembro. Temperatura noturna baixa segurou a abertura — bom sinal para uniformidade de maturação. Registramos 82mm de chuva no mês, dentro do ideal para a Serra.",
  },
  {
    date: "Dezembro 2025 — Fevereiro 2026",
    title: "Granação lenta",
    body:
      "Verão frio na Serra do Cabral. Frutos cresceram devagar, concentraram açúcar. Esse é exatamente o terroir que queremos — o que dá pontuação SCA. Monitoramento semanal de Brix nos talhões altos.",
  },
  {
    date: "Abril 2026",
    title: "Início da colheita seletiva",
    body:
      "Colheita 100% manual, só cereja madura. Talhões 1 a 4 (base da serra, 900m) colhidos primeiro, seguidos dos talhões altos. Rendimento abaixo da média da região — porque o corte é severo.",
  },
  {
    date: "Abril 2026",
    title: "Processamento diferenciado por lote",
    body:
      "Clássico: natural em terreiro suspenso (12 dias). Reserva: honey (cereja descascado, mucilagem parcial). Microlote Geisha (talhão 7): lavado com fermentação controlada 48h a 18°C.",
  },
  {
    date: "Abril 2026",
    title: "Primeiras torras da safra",
    body:
      "Torra sob demanda iniciada. Cada sacola sai com data de torra no selo. Janela ótima de consumo: 7 a 28 dias. Torramos até quarta para envio na sexta.",
  },
];

const yieldNumbers = [
  { label: "Área colhida", value: "28 ha" },
  { label: "Altitude média", value: "1.050m" },
  { label: "Rendimento", value: "24 sc/ha" },
  { label: "Talhões rastreados", value: "12" },
];

export default function Safra2026() {
  return (
    <>
      <Header />
      <main className="bg-coffee-50 pb-24 pt-28 sm:pt-32">
        {/* Hero editorial */}
        <section className="relative overflow-hidden border-b border-coffee-200">
          <div
            className="aspect-[21/9] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(26,17,8,0.25), rgba(26,17,8,0.65)), url('https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1800&q=85&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="Cafezal em colheita na Serra do Cabral — safra 2026"
          />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-5xl px-6 pb-10 lg:px-8 lg:pb-16">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-300 uppercase">
                Diário da safra
              </span>
              <h1 className="mt-3 font-serif text-3xl font-bold text-coffee-50 sm:text-5xl md:text-6xl">
                Safra 2026
              </h1>
              <p className="mt-3 max-w-2xl text-coffee-100 sm:text-lg">
                Serra do Cabral, Minas Gerais · verão frio, granação lenta,
                três lotes que entraram na torrefação.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Intro editorial */}
          <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <HeritageSeal className="mx-auto text-coffee-800" />
              <Ornament className="mt-6" />
              <p className="mt-8 font-serif text-xl leading-relaxed text-coffee-800 sm:text-2xl">
                Toda safra é um ano de paciência em cada xícara. A de 2026
                veio com verão frio, granação lenta e frutos densos — o tipo
                de ano que o torrador agradece.
              </p>
              <p className="mt-6 text-base leading-relaxed text-coffee-600">
                Esta página é o diário público da safra. O que observamos no
                cafezal, como escolhemos cada processamento, e quais lotes
                viraram o café que você recebe em casa. Sem adjetivo, com
                data.
              </p>
            </div>
          </section>

          {/* Números da safra */}
          <section className="rounded-2xl border border-coffee-200 bg-white p-8 sm:p-10">
            <h2 className="text-center font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
              A safra em números
            </h2>
            <Ornament className="mx-auto mt-4" />
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {yieldNumbers.map((n) => (
                <div key={n.label} className="text-center">
                  <div className="font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                    {n.value}
                  </div>
                  <div className="mt-1 text-xs tracking-[0.15em] text-coffee-600 uppercase">
                    {n.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-20">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Linha do tempo
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                Do cafezal ao torrador
              </h2>
              <Ornament className="mt-4" />
            </div>

            <div className="relative mt-14">
              <div
                className="absolute left-4 top-0 h-full w-px bg-coffee-200 sm:left-1/2"
                aria-hidden
              />
              <div className="space-y-12">
                {timeline.map((item, i) => (
                  <div
                    key={item.title}
                    className={`relative grid gap-6 sm:grid-cols-2 sm:gap-10 ${
                      i % 2 === 0 ? "" : "sm:[&>div:first-child]:col-start-2"
                    }`}
                  >
                    <div
                      className={`ml-10 sm:ml-0 ${
                        i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:pl-10"
                      }`}
                    >
                      <span className="text-xs font-medium tracking-[0.2em] text-gold-700 uppercase">
                        {item.date}
                      </span>
                      <h3 className="mt-2 font-serif text-xl font-bold text-coffee-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-coffee-700">
                        {item.body}
                      </p>
                    </div>
                    <div
                      className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-500 ring-4 ring-coffee-50 sm:left-1/2"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lotes desta safra */}
          <section className="mt-20">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Os três lotes
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                O que entrou na torrefação
              </h2>
              <Ornament className="mt-4" />
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/cafes/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-coffee-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-gold-500 hover:shadow-xl"
                >
                  <span className="text-[11px] font-semibold tracking-[0.25em] text-gold-700 uppercase">
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-bold text-coffee-900">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-coffee-700">
                    {p.origin.variety} · {p.origin.process}
                  </p>
                  <p className="mt-1 text-xs text-coffee-500">
                    Altitude {p.origin.altitude} · SCA {p.score}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-coffee-700">
                    {p.longDescription.slice(0, 140)}…
                  </p>
                  <span className="mt-auto pt-5 text-sm font-semibold text-gold-700 group-hover:text-gold-800">
                    Ver ficha completa →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA final */}
          <section className="mt-20 rounded-2xl bg-coffee-900 p-10 text-center sm:p-14">
            <h2 className="font-serif text-2xl font-bold text-coffee-50 sm:text-3xl">
              Receba a safra 2026 em casa
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-coffee-200">
              Torrado sob demanda, enviado com data de torra. Assine e a
              próxima sacola sai da torrefação direto para você.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#assinatura"
                className="inline-flex items-center justify-center rounded-full bg-gold-500 px-8 py-3 text-sm font-bold text-coffee-950 transition-all hover:bg-gold-400 hover:shadow-xl"
              >
                Assinar a casa
              </Link>
              <Link
                href="/#cafes"
                className="inline-flex items-center justify-center rounded-full border border-coffee-600 px-8 py-3 text-sm font-semibold text-coffee-50 transition-all hover:border-gold-500"
              >
                Comprar avulso
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

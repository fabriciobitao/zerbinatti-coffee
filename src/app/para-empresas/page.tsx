import Header from "@/components/Header";
import Footer from "@/components/Footer";
import B2BForm from "@/components/B2BForm";
import B2BCalculator from "@/components/B2BCalculator";
import { Ornament, Monogram } from "@/components/ui/Ornament";

export const metadata = {
  title: "Para Empresas — Zerbinatti Coffee B2B",
  description:
    "Café especial Zerbinatti para cafeterias, restaurantes, torrefações e escritórios. Parceria direta com a fazenda, alocação exclusiva, preços escalonados.",
};

const segments = [
  {
    title: "Cafeterias e coffee shops",
    description:
      "Grãos torrados sob demanda, selos exclusivos por barista, suporte técnico de calibragem e troca de perfil conforme sua persona.",
    bullets: ["Grão torrado 1kg ou 500g", "Rótulo co-branding possível", "Troca de lote mensal"],
  },
  {
    title: "Restaurantes e hotéis",
    description:
      "Blend desenhado para o perfil do seu cliente e da sua cozinha. Entregas recorrentes e consultoria de apresentação.",
    bullets: ["Blend exclusivo a partir de 10kg/mês", "Treinamento para brigada", "Embalagem personalizada"],
  },
  {
    title: "Torrefações parceiras",
    description:
      "Venda de verde em lotes rastreados, direto da Fazenda Santa Rita. Transparência total de origem e preço.",
    bullets: ["Verde por lote rastreado", "Contratos de até 24 meses", "Visita à fazenda disponível"],
  },
  {
    title: "Escritórios e coworkings",
    description:
      "Programa corporativo. Seu time bebe café de especialidade e você deixa de ser refém das cápsulas caras.",
    bullets: ["Entregas quinzenais ou mensais", "Kit de equipamentos opcional", "Faturamento CNPJ"],
  },
];

const clients = [
  "Padaria Artesanal SP",
  "Hotel Fasano Rio",
  "Café Dona Deôla",
  "Coworking Trampos",
  "Brasserie Mendonça",
  "Suplicy Cafés",
];

export default function ParaEmpresas() {
  return (
    <>
      <Header />
      <main className="bg-coffee-50">
        {/* Hero */}
        <section className="bg-coffee-950 pt-28 pb-20 sm:pt-32">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <div className="flex justify-center text-gold-500">
              <Monogram size={56} />
            </div>
            <span className="mt-6 block text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
              Zerbinatti B2B
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold text-coffee-50 sm:text-5xl md:text-6xl">
              Café especial do produtor direto para o seu negócio
            </h1>
            <Ornament className="mt-6" />
            <p className="mx-auto mt-8 max-w-2xl text-coffee-300 sm:text-lg">
              Três gerações de cafeicultura familiar em Serra do Cabral, MG.
              Atendemos cafeterias, restaurantes, torrefações, hotéis e
              escritórios que não abrem mão de rastreabilidade e qualidade.
            </p>
            <a
              href="#formulario"
              className="mt-10 inline-block rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-coffee-950 transition-all hover:bg-gold-400 hover:shadow-xl"
            >
              Falar com o comercial
            </a>
          </div>
        </section>

        {/* Segmentos */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Segmentos atendidos
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                Cada negócio, um programa feito sob medida
              </h2>
              <Ornament className="mt-6" />
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {segments.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-coffee-200 bg-white p-8"
                >
                  <h3 className="font-serif text-xl font-bold text-coffee-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-coffee-700">{s.description}</p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-coffee-700"
                      >
                        <span className="mt-0.5 text-gold-600">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prova social */}
        <section className="border-y border-coffee-200 bg-white py-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <p className="text-center text-xs font-semibold tracking-[0.3em] text-coffee-600 uppercase">
              Alguns parceiros que já servem Zerbinatti
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 text-center sm:grid-cols-3 md:grid-cols-6">
              {clients.map((c) => (
                <div
                  key={c}
                  className="font-serif text-sm italic text-coffee-600"
                >
                  {c}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-coffee-500">
              * Nomes ilustrativos — lista real disponível sob NDA.
            </p>
          </div>
        </section>

        {/* Por que Zerbinatti */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Por que Zerbinatti
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                Produtor, torrador e parceiro na mesma mesa
              </h2>
              <Ornament className="mt-6" />
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  t: "Fazenda própria",
                  d: "Somos produtores desde 1897. Você compra do dono, não de intermediário.",
                },
                {
                  t: "Q-Graders na mesa",
                  d: "Toda safra passa por cupping SCA. Só lotes 85+ saem da fazenda.",
                },
                {
                  t: "Contrato anual",
                  d: "Preço travado, alocação garantida, previsibilidade para você operar.",
                },
              ].map((i) => (
                <div key={i.t} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-coffee-900">
                    {i.t}
                  </h3>
                  <p className="mt-2 text-sm text-coffee-700">{i.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculadora */}
        <section className="border-y border-coffee-200 bg-coffee-50 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Calculadora de consumo
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                Simule o consumo do seu time em 10 segundos
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-coffee-700">
                Ajuste os sliders para ver volume mensal, tier de preço e
                estimativa. Proposta formal em até 1 dia útil.
              </p>
              <Ornament className="mt-6" />
            </div>
            <div className="mt-12">
              <B2BCalculator />
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section id="formulario" className="bg-coffee-100/50 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center">
              <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
                Pedido de orçamento
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
                Conte sobre o seu projeto
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-coffee-700">
                Preencha o formulário e enviaremos uma proposta com preço,
                logística e amostra grátis para teste.
              </p>
            </div>
            <div className="mt-10">
              <B2BForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

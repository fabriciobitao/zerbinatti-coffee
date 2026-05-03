import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SubscriptionConfigurator from "@/components/SubscriptionConfigurator";
import EditorialFAQ from "@/components/EditorialFAQ";
import StickySubscriptionCTA from "@/components/StickySubscriptionCTALazy";
import {
  faqPageSchema,
  subscriptionOfferSchema,
} from "@/lib/schema";
import { buildWhatsAppUrl } from "@/lib/config";
import { product } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Assinatura · Zerbinatti",
  description:
    "Café brasileiro torrado na semana, entregue a cada quinzena ou mês. Frete grátis, cancele em 1 clique, primeiro envio com 15% off. Casa italiana desde 1897.",
  alternates: { canonical: "/assinatura" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/assinatura",
    title: "Assinatura · Zerbinatti",
    description:
      "Café fresco a cada quinzena ou mês. Frete grátis, cancele em 1 clique. Primeiro envio com 15% off.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Assinatura · Zerbinatti",
    description:
      "Café fresco a cada quinzena ou mês. Frete grátis, cancele quando quiser.",
  },
};

const FAQ_ITEMS = [
  {
    q: "1. Posso pausar ou cancelar quando quiser?",
    a: "Sim. A assinatura é livre — pause por uma viagem, cancele a qualquer momento, sem multa, sem ligação, sem perguntas. Tudo na sua conta, em dois cliques. Volta quando voltar.",
  },
  {
    q: "2. Quando o café é torrado?",
    a: "Cada lote sai do tambor na semana do seu envio, nunca antes. A data exata vem impressa na etiqueta — você confere. Não trabalhamos com café estocado em prateleira.",
  },
  {
    q: "3. Quanto tempo leva para chegar?",
    a: "Entre dois e cinco dias úteis para a maior parte do Brasil. Capitais do Sudeste e Sul recebem em até 48h. Frete grátis em todos os pacotes da assinatura, independente de CEP.",
  },
  {
    q: "4. Posso trocar o ritmo ou o pacote no meio do caminho?",
    a: "Sim. Mude de quinzenal para mensal, ou de 250g para 500g, a qualquer momento. A alteração vale a partir do próximo envio. Sem taxa, sem fila.",
  },
  {
    q: "5. O café muda de safra para safra?",
    a: "O blend da casa é estável — Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torra média. Mas cada safra tem seu caráter próprio. As notas no cartão da casa explicam o que mudou. Em geral: pequenas diferenças de doçura e acidez, nunca um café irreconhecível.",
  },
  {
    q: "6. E se eu não gostar do primeiro envio?",
    a: "Mande um e-mail. Reembolsamos o pacote — você fica com o café, sem precisar devolver. Confiamos no que mandamos, e preferimos perder um pacote do que um cliente.",
  },
  {
    q: "7. A assinatura tem fidelidade ou multa?",
    a: "Não. Zero. Nem três meses, nem seis. Cancele depois do primeiro envio se for o caso — o cartão não é cobrado de novo.",
  },
  {
    q: "8. Vocês entregam em todo o Brasil?",
    a: "Sim, em todos os estados. Áreas remotas podem ter prazo um pouco maior; o sistema avisa no checkout.",
  },
];

const GUARANTEES_HERO = [
  "Torra fresca, datada",
  "Pause/cancele em 1 clique",
  "Frete grátis em todo o Brasil",
  "1º envio com 15% off",
];

const GUARANTEES_STRIP = [
  {
    title: "CANCELE EM 1 CLIQUE",
    sub: "Pelo portal Stripe — sem ligar, sem perguntas",
  },
  {
    title: "FRETE GRÁTIS",
    sub: "Em todo o Brasil, sempre",
  },
  {
    title: "TORRA FRESCA, DATADA",
    sub: "Da torrefação à sua porta em até 7 dias",
  },
  {
    title: "1º ENVIO COM 15% OFF",
    sub: "Aplicado automaticamente no checkout",
  },
];

const STEPS = [
  {
    n: "01",
    t: "Você escolhe o ritmo",
    d: "Quinzenal ou mensal. Pacote em grãos ou moído, 250g ou 500g. Defina uma vez — ajuste quando quiser.",
  },
  {
    n: "02",
    t: "A casa torra na semana",
    d: "Cada lote sai da torrefação no início da semana do envio. Nada parado em prateleira. Nada esperando.",
  },
  {
    n: "03",
    t: "Sai em até 48 horas",
    d: "Embalagem com válvula desgaseificadora, etiqueta com lote e data de torra. Frete grátis para todo o Brasil.",
  },
  {
    n: "04",
    t: "Você bebe fresco",
    d: "A xícara que sai em casa é a mesma que sai aqui. É esse o ponto — e o único ponto.",
  },
];

const BOX_ITEMS = [
  {
    t: "O café da safra",
    d: "Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, blend único da casa. Score SCA 85.",
  },
  {
    t: "Etiqueta do lote",
    d: "Data exata da torra, número do lote, recomendação de descanso. Cada pacote é rastreável.",
  },
  {
    t: "Cartão de preparo",
    d: "Receita curta para o método mais pedido do mês — V60, prensa, Moka. Uma proporção, uma temperatura, um tempo.",
  },
  {
    t: "Notas da safra",
    d: "Bilhete impresso da casa: o que mudou no perfil sensorial entre uma colheita e outra, em duas frases.",
  },
  {
    t: "Embalagem com válvula",
    d: "Pacote stand-up com válvula unidirecional. O café respira para fora, o ar não entra. Conserva por até 60 dias depois de aberto.",
  },
];

// 6 reviews mais editoriais
const REVIEWS = product.reviews
  .filter((r) =>
    [
      "Marina Costa",
      "Rodrigo Alves",
      "Pedro Henrique Serra",
      "Camila Okada",
      "Gustavo Nakamura",
      "Beatriz Lemos",
    ].includes(r.author)
  );

const HeroIcons = {
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2c0 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 4 3 4 7a6 6 0 0 1-12 0c0-5 6-7 6-11z" />
    </svg>
  ),
  pause: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <line x1="9" y1="5" x2="9" y2="19" />
      <line x1="15" y1="5" x2="15" y2="19" />
    </svg>
  ),
  ship: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="14" height="11" />
      <path d="M17 11h4l-2 7h-2" />
      <path d="M21 7l-4 0" />
    </svg>
  ),
  percent: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  ),
};

const HERO_ICONS = [HeroIcons.flame, HeroIcons.pause, HeroIcons.ship, HeroIcons.percent];

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={i < rating ? "text-olive" : "text-line"}
          aria-hidden="true"
        >
          <polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function AssinaturaPage() {
  const subscriptionPlanSchema = subscriptionOfferSchema({
    id: "assinatura-mensal-pacote-familia",
    name: "Assinatura Zerbinatti — Pacote Família, mensal",
    description:
      "Assinatura mensal do Pacote Família (500g em grãos), torrado na semana do envio. Frete grátis, sem fidelidade, cancele quando quiser. Primeiro envio com 15% off.",
    price: 89.9,
    recurrence: "monthly",
  });

  const faqSchema = faqPageSchema(
    FAQ_ITEMS.map((f) => ({ question: f.q, answer: f.a }))
  );

  const whatsappContact = buildWhatsAppUrl(
    "Olá! Tenho uma dúvida sobre a assinatura Zerbinatti — pode me ajudar?"
  );

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(subscriptionPlanSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Breadcrumb sobre fundo ink */}
        <div className="dark-section bg-ink pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            variant="dark"
            items={[
              { label: "Início", href: "/" },
              { label: "Assinatura" },
            ]}
          />
        </div>

        {/* SECAO 1 — Hero + configurador */}
        <section
          aria-labelledby="hero-assinatura-title"
          className="dark-section bg-ink pb-24 lg:pb-40"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Coluna esquerda */}
              <div className="flex flex-col justify-center">
                <p
                  className="font-sans text-[11px] font-medium uppercase text-olive-on-dark"
                  style={{ letterSpacing: "0.28em" }}
                >
                  ASSINATURA · DAL 1897
                </p>
                <h1
                  id="hero-assinatura-title"
                  className="text-display mt-8 text-bone"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
                >
                  Café especial{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    torrado na semana
                  </em>
                  , em casa.
                </h1>
                <p
                  className="text-lede mt-8 text-bone-soft"
                  style={{ maxWidth: "480px" }}
                >
                  Quinzenal ou mensal. Pause quando quiser. Frete grátis. Cancele em 1 clique.
                </p>

                <ul className="mt-12 space-y-4" role="list">
                  {GUARANTEES_HERO.map((g, i) => (
                    <li
                      key={g}
                      className="flex items-center gap-4 text-[15px] leading-[1.6] text-bone-soft"
                    >
                      <span className="text-olive shrink-0" aria-hidden="true">
                        {HERO_ICONS[i]}
                      </span>
                      {g}
                    </li>
                  ))}
                </ul>

                <a
                  href="/quiz"
                  className="mt-8 inline-block text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
                >
                  Não sei o que escolher. Faça o teste em 30s →
                </a>
              </div>

              {/* Coluna direita — configurador */}
              <SubscriptionConfigurator
                idPrefix="hero-config"
                intersectionId="hero"
              />
            </div>
          </div>
        </section>

        {/* SECAO 2 — Strip de garantias */}
        <section className="bg-bone py-16">
          <div className="container-editorial">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {GUARANTEES_STRIP.map((g, i) => (
                <li
                  key={g.title}
                  className={`flex items-start gap-4 lg:px-8 ${
                    i > 0 ? "lg:border-l lg:border-line" : ""
                  }`}
                >
                  <span className="text-olive shrink-0 pt-0.5" aria-hidden="true">
                    {HERO_ICONS[i]}
                  </span>
                  <div>
                    <p
                      className="font-mono text-[11px] font-medium uppercase text-olive"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {g.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.4] text-ink-soft">
                      {g.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECAO 3 — Como funciona */}
        <section
          aria-labelledby="como-funciona-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">O RITUAL</p>
              <h2
                id="como-funciona-title"
                className="text-h1 mt-6 text-ink"
              >
                Quatro passos.{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  Sem
                </em>{" "}
                surpresa.
              </h2>
              <p className="text-lede mx-auto mt-6 text-ink-soft">
                O mesmo gesto, repetido a cada envio. Você não precisa pensar nele.
              </p>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" role="list">
              {STEPS.map((s, i) => (
                <li key={s.n} className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-[14px] font-medium text-olive"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {s.n}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden h-px w-10 bg-line lg:inline-block"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 text-[16px] font-medium text-ink">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                    {s.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECAO 4 — O que entra na caixa */}
        <section
          aria-labelledby="caixa-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-stretch">
            {/* Foto / fallback */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="font-display text-[120px] text-olive"
                  style={{ fontWeight: 400 }}
                  aria-hidden="true"
                >
                  Z
                </span>
              </div>
            </div>

            {/* Lista */}
            <div className="px-5 py-12 sm:px-8 lg:px-20 lg:py-0">
              <div className="max-w-[480px]">
                <p className="eyebrow">DENTRO DO PACOTE</p>
                <h2 id="caixa-title" className="text-h1 mt-6 text-ink">
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    Pouca coisa
                  </em>
                  ,<br />
                  tudo necessário.
                </h2>
              </div>

              <ul className="mt-12 border-t border-line">
                {BOX_ITEMS.map((it) => (
                  <li
                    key={it.t}
                    className="border-b border-line py-6"
                  >
                    <h3 className="text-[16px] font-medium text-ink">
                      {it.t}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-ink-soft">
                      {it.d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECAO 5 — Frescor */}
        <section
          aria-labelledby="frescor-title"
          className="dark-section bg-ink py-20 lg:py-32"
        >
          <div className="container-editorial">
            <div className="mx-auto max-w-[880px] text-center">
              <p
                className="font-sans text-[11px] font-medium uppercase text-olive-on-dark"
                style={{ letterSpacing: "0.28em" }}
              >
                TORRA → ENTREGA EM ATÉ 7 DIAS
              </p>
              <h2
                id="frescor-title"
                className="text-h1 mt-8 text-bone"
              >
                Café especial é,{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  antes de tudo
                </em>
                , café fresco.
              </h2>
              <p
                className="text-body mx-auto mt-8 text-bone-soft"
                style={{ maxWidth: "680px" }}
              >
                A diferença entre um café especial e um café qualquer não está só na nota da SCA — está no tempo. Café perde aroma rápido. Em prateleira de supermercado, um pacote pode ter três, seis, doze meses de torra. Aqui o ciclo é outro: torra na segunda, embala na terça, sai na quarta. A xícara que você prepara em casa, no sábado, foi grão verde até dez dias antes. É por isso que a casa não vende café envelhecido em estoque, e é por isso que a assinatura existe — para garantir que esse ritmo se repita, todo mês, sem que você precise lembrar.
              </p>
              <span
                className="mx-auto mt-16 block h-px w-20 bg-line-dark"
                aria-hidden="true"
              />
              <p
                className="mt-8 font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
                style={{ letterSpacing: "0.18em" }}
              >
                LOTE NA ETIQUETA · DATA DA TORRA NA ETIQUETA · NADA ESCONDIDO
              </p>
            </div>
          </div>
        </section>

        {/* SECAO 6 — Historia condensada */}
        <section
          aria-labelledby="historia-curta-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="font-display text-[80px] text-olive"
                  style={{ fontWeight: 400 }}
                  aria-hidden="true"
                  lang="la"
                >
                  MDCCCXCVII
                </span>
              </div>
            </div>
            <div className="px-5 py-12 sm:px-8 lg:px-20 lg:py-0">
              <div className="max-w-[560px]">
                <p
                  className="font-sans text-[11px] font-medium uppercase text-olive"
                  style={{ letterSpacing: "0.28em" }}
                >
                  1897 — TREVISO, ITÁLIA
                </p>
                <h2
                  id="historia-curta-title"
                  className="text-h1 mt-6 text-ink"
                >
                  Quatro gerações,{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    o mesmo gesto
                  </em>
                  .
                </h2>
                <p className="text-body mt-8 text-ink-soft">
                  Giuseppe Zerbinatti torrou seu primeiro lote em 1897, em Treviso. Quatro gerações depois, mudamos de continente, de máquinas e de fazenda — mas o gesto continua o mesmo: torrar pouco, torrar fresco, torrar para alguém que vai beber em casa, não em uma prateleira de supermercado.
                </p>
                <a
                  href="/sobre"
                  className="link-text mt-8 inline-flex items-center gap-2"
                >
                  Conheça nossa história <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 7 — Reviews */}
        <section
          aria-labelledby="reviews-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">O QUE DIZEM</p>
              <h2
                id="reviews-title"
                className="text-h1 mt-6 text-ink"
              >
                Mesa de quem{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  já recebe
                </em>
                .
              </h2>
              <p
                className="text-lede mx-auto mt-6 text-ink-soft"
                style={{ maxWidth: "560px" }}
              >
                Mais de duas mil casas brasileiras assinam a Zerbinatti hoje. As avaliações abaixo vêm de assinantes ativos, com nome, cidade e método de preparo.
              </p>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {REVIEWS.map((r) => (
                <article
                  key={r.author}
                  className="rounded-[2px] border border-line bg-bone p-8"
                >
                  <span
                    className="font-display text-[64px] leading-none text-olive/30 block"
                    style={{ fontWeight: 400 }}
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p className="mt-2 text-[15px] italic leading-[1.6] text-ink-soft">
                    {r.text}
                  </p>
                  <hr className="my-6 border-0 border-t border-line" />
                  <div className="flex items-start justify-between gap-4">
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
                    <StarRow rating={r.rating} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECAO 8 — Configurador 2a aparicao */}
        <section
          aria-labelledby="config-2-title"
          className="dark-section bg-ink py-20 lg:py-32"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Configurador a esquerda */}
              <SubscriptionConfigurator
                idPrefix="bottom-config"
                intersectionId="bottom"
                ctaLabel="Quero começar — frete grátis"
                headingLevel={3}
              />

              {/* Texto a direita */}
              <div className="flex flex-col justify-center">
                <p
                  className="font-sans text-[11px] font-medium uppercase text-olive-on-dark"
                  style={{ letterSpacing: "0.28em" }}
                >
                  JÁ INVESTIGOU? COMECE AGORA
                </p>
                <h2
                  id="config-2-title"
                  className="text-h1 mt-8 text-bone"
                >
                  Tudo no lugar. Falta{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    o primeiro envio
                  </em>
                  .
                </h2>
                <p
                  className="text-body mt-8 text-bone-soft"
                  style={{ maxWidth: "480px" }}
                >
                  Você leu o que entra na caixa, viu como funciona o frescor, conheceu nossa história e o que dizem assinantes. O configurador ao lado é o mesmo do topo — escolha frequência e pacote, e o pacote sai na próxima janela de torra.
                </p>
                <ul className="mt-12 border-t border-line-dark">
                  {[
                    "Frete grátis",
                    "Cancele em 1 clique",
                    "1º envio com 15% off",
                  ].map((it) => (
                    <li
                      key={it}
                      className="border-b border-line-dark py-4 text-[15px] text-bone-soft"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 9 — FAQ */}
        <section
          aria-labelledby="faq-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial" style={{ maxWidth: "880px" }}>
            <header>
              <p className="eyebrow">PERGUNTAS FREQUENTES</p>
              <h2 id="faq-title" className="text-h1 mt-6 text-ink">
                O que{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  perguntam
                </em>{" "}
                antes de assinar.
              </h2>
            </header>
            <div className="mt-12">
              <EditorialFAQ items={FAQ_ITEMS} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* SECAO 10 — CTA final */}
        <section
          aria-labelledby="cta-final-title"
          className="dark-section bg-ink py-20 lg:py-32"
        >
          <div className="container-editorial" style={{ maxWidth: "880px" }}>
            <div className="text-center">
              <p
                className="font-mono text-[11px] font-medium uppercase text-bone-soft"
                style={{ letterSpacing: "0.18em" }}
              >
                O CARTÃO DA CASA
              </p>
              <h2
                id="cta-final-title"
                className="text-h1 mt-8 text-bone"
              >
                Comece pelo{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  primeiro
                </em>{" "}
                envio.
              </h2>
              <p
                className="text-body mx-auto mt-8 text-bone-soft"
                style={{ maxWidth: "580px" }}
              >
                A casa torra, embala, despacha. Você abre o pacote, pesa os grãos, prepara a xícara. O resto do mês passa. No próximo, chega outro. Esse é o acordo.
              </p>

              <div className="mt-12 flex flex-col items-center gap-6">
                <a
                  href="#hero-config"
                  className="bg-olive px-10 py-5 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                  style={{ borderRadius: "2px" }}
                >
                  Começar a receber
                </a>
                <a
                  href={whatsappContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
                >
                  Tenho dúvidas, prefiro falar com a casa →
                </a>
              </div>

              <p
                className="mt-12 font-mono text-[11px] uppercase text-olive-on-dark"
                style={{ letterSpacing: "0.18em" }}
              >
                PRIMEIRO ENVIO COM 15% · FRETE GRÁTIS · SEM FIDELIDADE
              </p>
            </div>
          </div>
        </section>

        <StickySubscriptionCTA />
      </main>
      <Footer />
    </>
  );
}

// Silence "only used as a type" warning by keeping image import for future use
void Image;

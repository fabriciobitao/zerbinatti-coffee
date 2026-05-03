import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import EditorialFAQ from "@/components/EditorialFAQ";
import B2BForm from "@/components/B2BForm";
import { faqPageSchema } from "@/lib/schema";
import { buildWhatsAppUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Para empresas · Zerbinatti",
  description:
    "Café para empresas: máquina profissional em comodato + grão torrado na semana. Quatro modelos para equipes de 5 a 500. Manutenção e treinamento inclusos.",
  alternates: { canonical: "/para-empresas" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/para-empresas",
    title: "Para empresas · Zerbinatti",
    description:
      "Máquina em comodato + grão recorrente. O mesmo café da assinatura B2C, agora na copa da empresa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Para empresas · Zerbinatti",
    description:
      "Máquina em comodato + grão torrado na semana. Quatro modelos para equipes de 5 a 500.",
  },
};

const RAZOES = [
  {
    n: "01",
    t: "O grão é o mesmo da assinatura B2C",
    d: 'Não temos blend "industrial" ou "corporativo". A empresa serve o mesmo café que vai para a casa de assinantes — Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torra média. A xícara da copa é a xícara do cliente.',
  },
  {
    n: "02",
    t: "Máquina em comodato, manutenção inclusa",
    d: "Você não compra máquina. Recebe em comodato durante a vigência do contrato, com manutenção preventiva trimestral, atendimento técnico em até 24h em capitais, e troca em caso de falha estrutural. Sem custo extra.",
  },
  {
    n: "03",
    t: "Treinamento de equipe",
    d: "Visita inicial de barista para configurar a máquina, calibrar moagem e treinar quem opera. Refresh anual incluso. Não adianta máquina boa com extração ruim — a casa garante as duas pontas.",
  },
  {
    n: "04",
    t: "Contrato curto, ajuste fácil",
    d: "Contratos de doze meses (mínimo legal para comodato), com revisão de consumo a cada três meses. Subiu o headcount? Aumenta o pacote. Caiu? Reduz. Sem multa por ajuste.",
  },
];

const MODELOS = [
  {
    tag: "STARTER",
    faixa: "5–15 pessoas · até 60 cafés/dia",
    body: "Máquina semi-automática italiana de uma boca, moedor profissional doméstico, grãos entregues quinzenal ou mensalmente. Para escritórios pequenos, estúdios, consultórios.",
    inclusos: [
      "MÁQUINA EM COMODATO",
      "MANUTENÇÃO TRIMESTRAL",
      "TREINAMENTO INICIAL",
    ],
  },
  {
    tag: "SILVER",
    faixa: "15–40 pessoas · até 150 cafés/dia",
    body: "Máquina profissional de duas bocas, moedor on-demand, entrega quinzenal padrão. Inclui treinamento de barista presencial. O modelo mais escolhido por agências e escritórios em crescimento.",
    inclusos: [
      "MÁQUINA EM COMODATO",
      "MANUTENÇÃO TRIMESTRAL",
      "TREINAMENTO PRESENCIAL",
      "MOEDOR ON-DEMAND",
    ],
  },
  {
    tag: "GOLD",
    faixa: "40–120 pessoas · até 400 cafés/dia",
    body: "Máquina profissional de duas ou três bocas, moedor automático com dosagem programável, entrega semanal. Inclui visita técnica mensal e relatório de consumo.",
    inclusos: [
      "MÁQUINA EM COMODATO",
      "VISITA TÉCNICA MENSAL",
      "RELATÓRIO DE CONSUMO",
      "ENTREGA SEMANAL",
    ],
  },
  {
    tag: "PLATINUM",
    faixa: "120+ pessoas · 400+ cafés/dia",
    body: "Máquina top de linha (La Marzocco ou equivalente), dois moedores dedicados, entrega semanal ou bissemanal, barista da casa em visita semanal nos primeiros 90 dias. Customizável.",
    inclusos: [
      "MÁQUINA TOP DE LINHA",
      "BARISTA SEMANAL · 90 DIAS",
      "DOIS MOEDORES",
      "OPERAÇÃO CUSTOMIZADA",
    ],
  },
];

const CASOS = [
  {
    n: "CASO 01",
    t: "Escritório de advocacia, São Paulo",
    sub: "28 advogados · plano Silver · cliente desde 2022",
    body: "Saíram de máquina de cápsula com café de marca branca. Em três meses, consumo de café por pessoa subiu 40% — não porque incentivamos, mas porque a equipe começou a fazer café para clientes em reunião em vez de oferecer água. O ROI, segundo o sócio que assina, está na percepção do cliente que entra na sala.",
  },
  {
    n: "CASO 02",
    t: "Studio de design, Rio de Janeiro",
    sub: "12 pessoas · plano Starter · cliente desde 2024",
    body: "Buscavam algo que combinasse com a estética do escritório — máquina de bancada visível, café de origem, embalagem que não fosse vergonhosa em prateleira aberta. Entregamos a Starter com moedor manual italiano e pacote de 500g visível. Hoje a copa virou parte do tour de visita do estúdio.",
  },
  {
    n: "CASO 03",
    t: "Hub de tecnologia, Campinas",
    sub: "180 pessoas · plano Gold · cliente desde 2023",
    body: "Vinham de operação tradicional de café com terceirizada. Trocaram pelo Gold para reduzir desperdício (estavam jogando litros fora por dia) e melhorar a percepção do benefício. O consumo se estabilizou em 320 cafés/dia, o desperdício caiu para perto de zero, e o NPS interno do benefício café subiu 28 pontos no primeiro semestre.",
  },
];

const FAQ_B2B = [
  {
    q: "1. A máquina é nossa ao final do contrato?",
    a: "Não. A máquina é em comodato — fica conosco enquanto a empresa for cliente. O modelo de comodato (sem compra) reduz drasticamente o investimento inicial e libera a empresa de manutenção, depreciação e revenda. Se quiser comprar a máquina, é possível negociar separadamente.",
  },
  {
    q: "2. Qual é o prazo mínimo de contrato?",
    a: "Doze meses, exigência legal do comodato. Após esse período, o contrato segue mensal sem renovação automática longa — basta avisar com 30 dias se quiser encerrar.",
  },
  {
    q: "3. Como funciona a manutenção?",
    a: "Inclusa. Manutenção preventiva trimestral, atendimento técnico em até 24h nas capitais que cobrimos (SP, RJ, BH, Campinas, região), 48h em demais cidades. Em caso de pane que não permita reparo no local, máquina substituta no mesmo dia útil.",
  },
  {
    q: "4. Vocês entregam fora de SP, RJ, BH e Campinas?",
    a: "Sim, para grão. A entrega da máquina e a manutenção técnica seguem dentro do raio operacional. Para empresas fora do raio, o modelo é só de fornecimento de grão (sem máquina) — usamos sua infraestrutura existente.",
  },
  {
    q: "5. Posso ajustar o pacote no meio do contrato?",
    a: "Sim. Revisão de consumo a cada três meses. Aumentou a equipe? Sobe o pacote, sem renegociação. Reduziu? Diminui o pacote sem multa. O que muda é só o custo mensal de grão; comodato segue intacto.",
  },
];

export default function ParaEmpresasPage() {
  const faqSchema = faqPageSchema(
    FAQ_B2B.map((f) => ({ question: f.q, answer: f.a }))
  );
  const whatsappComercial = buildWhatsAppUrl(
    "Olá! Tenho interesse no café corporativo Zerbinatti. Pode me passar uma proposta?"
  );

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in">
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
              { label: "Para Empresas" },
            ]}
          />
        </div>

        {/* SECAO 1 — Hero */}
        <section
          aria-labelledby="b2b-hero-title"
          className="dark-section bg-ink pb-20 lg:pb-32"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-[60%_40%] lg:gap-16">
              <div className="flex flex-col justify-center">
                <p
                  className="font-mono text-[12px] font-medium uppercase text-olive"
                  style={{ letterSpacing: "0.18em" }}
                >
                  CAFÉ CORPORATIVO
                </p>
                <h1
                  id="b2b-hero-title"
                  className="text-display mt-8 text-bone"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
                >
                  Café da{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    casa
                  </em>
                  ,<br />
                  na sua empresa.
                </h1>
                <p
                  className="text-lede mt-8 text-bone-soft"
                  style={{ maxWidth: "520px" }}
                >
                  Máquina profissional em comodato, grãos torrados na semana,
                  atendimento técnico incluso. Quatro modelos para equipes de
                  cinco a quinhentos. Sem pegadinha, sem fidelidade longa, sem
                  café requentado.
                </p>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#form-b2b"
                    className="bg-olive px-10 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                    style={{ borderRadius: "2px" }}
                  >
                    Montar meu plano
                  </a>
                  <a
                    href={whatsappComercial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
                  >
                    Falar com a casa →
                  </a>
                </div>

                <p
                  className="mt-12 font-mono text-[11px] uppercase text-[var(--ink-mute-on-dark)]"
                  style={{ letterSpacing: "0.18em" }}
                >
                  + DE 80 EMPRESAS ATENDIDAS · SP · RJ · BH · CAMPINAS · REGIÃO
                </p>
              </div>

              {/* Foto / fallback */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
                <div className="flex h-full w-full items-center justify-center">
                  <span
                    className="font-display text-[160px] text-olive"
                    style={{ fontWeight: 400 }}
                    aria-hidden="true"
                  >
                    Z
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECAO 2 — Por que empresas escolhem (4 razoes) */}
        <section
          aria-labelledby="razoes-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="max-w-[720px]">
              <p className="eyebrow">O QUE NOS CONTRATAM POR</p>
              <h2 id="razoes-title" className="text-h1 mt-6 text-ink">
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  Quatro
                </em>{" "}
                razões. Nenhuma promocional.
              </h2>
              <p className="text-body mt-6 text-ink-soft">
                O café corporativo virou commodity. Você compra grão de
                qualquer torrefação, aluga máquina de qualquer fornecedor, e o
                resultado na xícara é sempre o mesmo: previsível, sem caráter,
                esquecível. Não é o que oferecemos.
              </p>
            </header>

            <hr className="mt-12 border-0 border-t border-line" />

            <ul className="divide-y divide-line" role="list">
              {RAZOES.map((r) => (
                <li key={r.n} className="py-8 lg:py-10">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-4">
                    <span
                      className="font-mono text-[14px] font-medium text-olive whitespace-nowrap"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {r.n} ·
                    </span>
                    <h3 className="text-[18px] font-medium text-ink">
                      {r.t}
                    </h3>
                  </div>
                  <p
                    className="mt-3 text-[16px] leading-[1.7] text-ink-soft lg:pl-12"
                    style={{ maxWidth: "720px" }}
                  >
                    {r.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECAO 3 — 4 modelos */}
        <section
          aria-labelledby="modelos-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">QUATRO MODELOS</p>
              <h2 id="modelos-title" className="text-h1 mt-6 text-ink">
                Por porte de equipe,{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  não por preço
                </em>
                .
              </h2>
              <p
                className="text-lede mx-auto mt-6 text-ink-soft"
                style={{ maxWidth: "560px" }}
              >
                Os modelos são definidos pelo número estimado de cafés/dia,
                não por uma tabela de preços fechada. O valor mensal é
                calculado sobre o consumo de grão; a máquina é em comodato.
              </p>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {MODELOS.map((m) => (
                <article
                  key={m.tag}
                  className="flex flex-col bg-bone p-8"
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: "2px",
                  }}
                >
                  <p
                    className="font-mono text-[12px] font-medium uppercase text-olive"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    {m.tag}
                  </p>
                  <p className="mt-3 font-mono text-[11px] italic text-ink-mute">
                    {m.faixa}
                  </p>
                  <hr className="my-5 border-0 border-t border-line w-8" />
                  <p className="text-[14px] leading-[1.6] text-ink-soft">
                    {m.body}
                  </p>
                  <hr className="my-6 border-0 border-t border-line" />
                  <ul className="space-y-2" role="list">
                    {m.inclusos.map((it) => (
                      <li
                        key={it}
                        className="flex items-center gap-2 font-mono text-[11px] uppercase text-ink-soft"
                        style={{ letterSpacing: "0.05em" }}
                      >
                        <span
                          aria-hidden="true"
                          className="block h-1 w-1 bg-olive shrink-0"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#form-b2b"
                    className="link-text mt-8 inline-flex items-center gap-2"
                  >
                    Pedir proposta {m.tag.charAt(0) + m.tag.slice(1).toLowerCase()} <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>

            <p
              className="mt-12 text-center font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
            >
              TODOS OS MODELOS INCLUEM MANUTENÇÃO · TREINAMENTO · COMODATO
            </p>
          </div>
        </section>

        {/* SECAO 4 — Cases */}
        <section
          aria-labelledby="cases-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="max-w-[720px]">
              <p className="eyebrow">CASOS DA CASA</p>
              <h2 id="cases-title" className="text-h1 mt-6 text-ink">
                Três empresas{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  que servem o nosso café
                </em>
                .
              </h2>
              <p className="text-body mt-6 text-ink-soft">
                Tirados da nossa carteira ativa. Nomes alterados a pedido — o
                resto é real.
              </p>
            </header>

            <hr className="mt-12 border-0 border-t border-line" />

            <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-0">
              {CASOS.map((c, i) => (
                <article
                  key={c.n}
                  className={`lg:px-8 ${
                    i > 0 ? "lg:border-l lg:border-line" : ""
                  }`}
                >
                  <p
                    className="font-mono text-[11px] font-medium uppercase text-olive"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    {c.n}
                  </p>
                  <h3 className="mt-3 text-[16px] font-medium text-ink">
                    {c.t}
                  </h3>
                  <p className="mt-1 font-mono text-[12px] italic text-ink-mute">
                    {c.sub}
                  </p>
                  <hr className="my-5 border-0 border-t border-line w-10" />
                  <p className="text-[14px] leading-[1.6] text-ink-soft">
                    {c.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECAO 5 — FAQ B2B */}
        <section
          aria-labelledby="faq-b2b-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div
            className="container-editorial"
            style={{ maxWidth: "880px" }}
          >
            <header>
              <p className="eyebrow">PERGUNTAS DE QUEM CONTRATA</p>
              <h2 id="faq-b2b-title" className="text-h1 mt-6 text-ink">
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  Antes
                </em>{" "}
                de assinar o contrato.
              </h2>
            </header>
            <div className="mt-12">
              <EditorialFAQ items={FAQ_B2B} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* SECAO 6 — Form */}
        <section
          id="form-b2b"
          aria-labelledby="b2b-form-title"
          className="dark-section bg-ink py-20 lg:py-32 scroll-mt-24"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Coluna esquerda */}
              <div className="flex flex-col justify-center">
                <p
                  className="font-mono text-[11px] font-medium uppercase text-bone-soft"
                  style={{ letterSpacing: "0.18em" }}
                >
                  O CARTÃO DA CASA, PARA EMPRESAS
                </p>
                <h2
                  id="b2b-form-title"
                  className="text-h1 mt-8 text-bone"
                >
                  Comece pela{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    simulação
                  </em>
                  .
                </h2>
                <p
                  className="text-body mt-8 text-bone-soft"
                  style={{ maxWidth: "480px" }}
                >
                  Em três campos — número de pessoas, modelo da máquina,
                  frequência de entrega — calculamos o pacote ideal e enviamos
                  por e-mail em até 24 horas úteis. Sem compromisso, sem
                  ligação automática.
                </p>

                <ul className="mt-12 border-t border-line-dark">
                  {[
                    "Resposta em até 24h úteis",
                    "Sem ligação automática",
                    "Sem compromisso de fechamento",
                  ].map((it) => (
                    <li
                      key={it}
                      className="border-b border-line-dark py-4 text-[15px] text-bone-soft"
                    >
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappComercial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
                >
                  Prefere falar agora? Fale direto com a casa →
                </a>
              </div>

              {/* Coluna direita — form */}
              <B2BForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

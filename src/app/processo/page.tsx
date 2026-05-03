import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Do grão à xícara — Processo Zerbinatti Coffee",
  description:
    "Cada etapa que um grão Zerbinatti percorre: colheita seletiva, secagem em terreiro suspenso, cupping SCA, torra sob demanda, embalagem com válvula, despacho em até cinco dias úteis.",
  alternates: { canonical: "/processo" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/processo",
    title: "Do grão à xícara — Processo Zerbinatti Coffee",
    description:
      "Colheita, secagem, cupping, torra sob demanda, embalagem com válvula, despacho. Cada etapa do café Zerbinatti.",
  },
};

const STEPS = [
  {
    n: "I",
    title: "Colheita seletiva",
    body:
      "Só cerejas maduras são colhidas, manualmente, em fases de maturação. A colheita acontece entre maio e setembro, na Serra do Cabral. O grão verde nunca entra no lote — vai pra apartação e segue caminho próprio.",
  },
  {
    n: "II",
    title: "Secagem natural",
    body:
      "As cerejas inteiras secam em terreiro suspenso por dezoito a vinte e dois dias, viradas três vezes ao dia para secagem homogênea. O método preserva os açúcares e dá ao café o caráter doce que define a casa.",
  },
  {
    n: "III",
    title: "Beneficiamento",
    body:
      "Separação por densidade, tamanho e cor. Defeitos vão para apartação. Só os grãos perfeitos seguem para o cupping — em geral, menos de setenta por cento da colheita bruta.",
  },
  {
    n: "IV",
    title: "Cupping SCA",
    body:
      "Cada lote é provado por Q-Graders certificados pela Specialty Coffee Association. A nota mínima de aprovação é oitenta e cinco. Lotes abaixo desse limiar são reservados para outros usos — não entram no pacote da casa.",
  },
  {
    n: "V",
    title: "Torra sob demanda",
    body:
      "Não torramos para estoque. Cada lote sai do tambor na semana do envio, nunca antes. A data exata vem impressa na etiqueta. Café envelhecido em prateleira não sai daqui.",
  },
  {
    n: "VI",
    title: "Embalagem com válvula",
    body:
      "Pacote stand-up metalizado com válvula desgaseificadora unidirecional — o café respira para fora, o ar não entra. Etiqueta com lote, data de torra e recomendação de descanso. Conserva por até sessenta dias depois de aberto.",
  },
  {
    n: "VII",
    title: "Despacho",
    body:
      "Em até cinco dias úteis após a confirmação do pagamento. Frete grátis acima de R$ 99 e em todos os envios da assinatura. Código de rastreio por e-mail e WhatsApp assim que o pacote sai.",
  },
];

export default function Processo() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Processo — Do grão à xícara",
    url: `${siteConfig.url}/processo`,
    description:
      "Cada etapa do café Zerbinatti, da colheita ao despacho.",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  const bcSchema = breadcrumbSchema([
    { name: "Início", url: siteConfig.url },
    { name: "Processo", url: `${siteConfig.url}/processo` },
  ]);

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bcSchema) }}
        />

        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Processo" },
            ]}
          />
        </div>

        {/* Hero */}
        <section
          aria-labelledby="processo-title"
          className="bg-bone py-12 lg:py-20"
        >
          <div
            className="container-editorial mx-auto"
            style={{ maxWidth: "720px" }}
          >
            <p className="eyebrow">DO GRÃO À XÍCARA</p>
            <h1
              id="processo-title"
              className="text-h1 mt-6 text-ink"
            >
              Sete etapas,{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                um pacote
              </em>
              .
            </h1>
            <p className="text-lede mt-6 text-ink-soft">
              Café especial não começa no torrador — começa antes da cereja
              cair do pé. Cada etapa abaixo é parte do contrato da casa com
              quem assina.
            </p>
          </div>
        </section>

        {/* Etapas */}
        <section
          aria-label="Etapas do processo"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div
            className="container-editorial mx-auto"
            style={{ maxWidth: "720px" }}
          >
            <ol className="space-y-12">
              {STEPS.map((step) => (
                <li
                  key={step.n}
                  className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[80px_1fr] sm:gap-8"
                >
                  <div>
                    <span
                      className="font-display italic text-olive"
                      style={{
                        fontWeight: 400,
                        fontSize: "40px",
                        lineHeight: 1,
                      }}
                      aria-hidden="true"
                    >
                      {step.n}
                    </span>
                  </div>
                  <div>
                    <h2
                      className="font-display text-ink"
                      style={{
                        fontWeight: 400,
                        fontSize: "24px",
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-body mt-4 text-ink-soft">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Fechamento */}
        <section className="bg-bone py-20 lg:py-24">
          <div
            className="container-editorial mx-auto text-center"
            style={{ maxWidth: "720px" }}
          >
            <span className="hairline mx-auto block" aria-hidden="true" />
            <p
              className="mt-12 font-display italic text-ink"
              style={{ fontWeight: 400, fontSize: "22px", lineHeight: 1.45 }}
            >
              Torrar pouco, torrar fresco, torrar para alguém que vai beber em
              casa, não em uma prateleira de supermercado.
            </p>
            <p
              className="mt-8 font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
            >
              CASA EDITORIAL · QUARTA GERAÇÃO
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

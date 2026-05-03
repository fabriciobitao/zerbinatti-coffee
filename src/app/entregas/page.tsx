import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de entregas — Zerbinatti Coffee",
  description:
    "Prazos por região, frete grátis acima de R$ 99, embalagem com válvula, código de rastreio. Política de troca em até 7 dias úteis (CDC).",
  alternates: { canonical: "/entregas" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/entregas",
    title: "Política de entregas — Zerbinatti Coffee",
    description:
      "Prazos por região, frete grátis acima de R$ 99, embalagem com válvula, código de rastreio. Política de troca em até 7 dias úteis.",
  },
};

export default function Entregas() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Política de entregas — Zerbinatti Coffee",
    url: `${siteConfig.url}/entregas`,
    description:
      "Política completa de entregas Zerbinatti: prazos, frete, rastreamento e devoluções.",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  const bcSchema = breadcrumbSchema([
    { name: "Início", url: siteConfig.url },
    { name: "Entregas", url: `${siteConfig.url}/entregas` },
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
              { label: "Entregas" },
            ]}
          />
        </div>

        {/* Hero */}
        <section
          aria-labelledby="entregas-title"
          className="bg-bone py-12 lg:py-20"
        >
          <div className="container-editorial mx-auto" style={{ maxWidth: "720px" }}>
            <p className="eyebrow">LOGÍSTICA DA CASA</p>
            <h1
              id="entregas-title"
              className="text-h1 mt-6 text-ink"
            >
              Política de{" "}
              <em className="font-display italic" style={{ fontWeight: 400 }}>
                entregas
              </em>
              .
            </h1>
            <p className="text-lede mt-6 text-ink-soft">
              Como o pacote sai daqui, em quantos dias chega na sua porta, e o
              que acontece se algo der errado no caminho.
            </p>
            <p
              className="mt-8 font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
            >
              ATUALIZADO EM ABRIL DE 2026
            </p>
          </div>
        </section>

        {/* Corpo */}
        <section className="bg-bone pb-24 lg:pb-32">
          <div
            className="container-editorial mx-auto space-y-16"
            style={{ maxWidth: "720px" }}
          >
            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Torra sob demanda
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Torramos o seu café depois que você compra. O pedido entra na
                próxima leva de torra da semana e é despachado em até cinco dias
                úteis após a confirmação do pagamento. Café parado em prateleira
                não sai daqui.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Prazos por região
              </h2>
              <ul className="mt-6 divide-y divide-line">
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">
                    Capitais Sudeste e Sul
                  </span>
                  <span
                    className="font-mono text-[13px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    2 a 4 dias úteis após a postagem
                  </span>
                </li>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">Demais capitais</span>
                  <span
                    className="font-mono text-[13px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    4 a 7 dias úteis após a postagem
                  </span>
                </li>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">Interior</span>
                  <span
                    className="font-mono text-[13px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    5 a 10 dias úteis após a postagem
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-body-sm text-ink-mute">
                Áreas remotas podem ter prazo adicional — o sistema avisa no
                checkout, antes do pagamento.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Frete grátis
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Pedidos avulsos acima de R$ 99 têm frete grátis para todo o
                Brasil. A assinatura tem frete grátis em todos os envios,
                independente do CEP.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Embalagem
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Pacote stand-up metalizado com válvula desgaseificadora — o café
                respira para fora, o ar não entra. Etiqueta com lote e data
                exata da torra. Conserva por até sessenta dias depois de aberto,
                em pote opaco e fechado.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Rastreamento
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Assim que o pacote é despachado, você recebe o código de
                rastreio por e-mail e WhatsApp. Atualizações automáticas a cada
                etapa do trajeto.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Trocas e devoluções
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Por se tratar de alimento, aceitamos troca ou devolução em caso
                de defeito de fabricação ou avaria no transporte, mediante
                registro em até sete dias úteis após o recebimento, conforme o
                Código de Defesa do Consumidor (art. 49). Mande um e-mail com
                foto do pacote e número do pedido para{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="link-text"
                >
                  {CONTACT_EMAIL}
                </a>
                . Se o caso é de descontentamento com o café, mande um e-mail
                também — reembolsamos o pacote sem precisar devolver. Confiamos
                no que mandamos.
              </p>
            </div>

            <span className="hairline mt-12 block" aria-hidden="true" />

            <p
              className="text-center font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.18em" }}
            >
              CASA EDITORIAL · DAL 1897
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

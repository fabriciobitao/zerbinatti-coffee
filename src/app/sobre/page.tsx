import type { Metadata } from "next";
import Image from "next/image";
import { BLUR } from "@/lib/photo-blur";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import SobreTimeline from "@/components/SobreTimeline";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre · Zerbinatti",
  description:
    "Quatro gerações de uma casa italiana de café, de Treviso (1897) à Serra do Cabral (2026). A história curta da casa — a longa está na xícara.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: "/sobre",
    title: "Sobre · Zerbinatti",
    description:
      "De Treviso à Serra do Cabral: 129 anos da casa, em quatro gerações. O mesmo gesto, repetido.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre · Zerbinatti",
    description:
      "Quatro gerações Zerbinatti, de Treviso à Serra do Cabral. Desde 1897.",
  },
};

const TIMELINE = [
  { id: "bloco-1897", year: "1897", label: "Treviso" },
  { id: "bloco-1923", year: "1923", label: "Travessia" },
  { id: "bloco-1983", year: "1983", label: "Serra do Cabral" },
  { id: "bloco-2026", year: "2026", label: "Hoje" },
];

const BLOCOS = [
  {
    id: "bloco-1897",
    eyebrow: "I · A PRIMEIRA TORRA",
    h2Pre: "Treviso, ",
    h2Italic: "1897.",
    h2Pos: " Giuseppe abre uma casa.",
    fallback: "MDCCCXCVII",
    fallbackBg: "bg-bone-soft",
    fallbackSize: "text-[96px]",
    body: "Giuseppe Zerbinatti tinha vinte e dois anos quando torrou seu primeiro lote, num porão do Vêneto, com uma moedeira de bronze que ainda hoje guardamos na torrefação. O café chegava a Treviso pelo porto de Trieste — sacos do Brasil, da Etiópia, de Java. Giuseppe escolhia, torrava, vendia. A casa abriu em 1897, num fim de rua estreita, com balança italiana e cadernos manuscritos onde anotava cada lote: data, origem, peso, tempo de tambor. Os cadernos ainda existem. Estão em italiano, com letra inclinada, e seguem servindo como referência sempre que decidimos uma torra. O ofício, ali, era o que é hoje: poucos sacos, muita atenção, nenhuma pressa.",
    caption: "MDCCCXCVII · Treviso, Vêneto. Moedeira de bronze original ainda em uso.",
  },
  {
    id: "bloco-1923",
    eyebrow: "II · A TRAVESSIA",
    h2Pre: "Em 1923, a ",
    h2Italic: "casa",
    h2Pos: " atravessa o Atlântico.",
    fallback: "MCMXXIII",
    fallbackBg: "bg-bone-soft",
    fallbackSize: "text-[96px]",
    body: "A primeira guerra havia passado, a segunda se anunciava. Em 1923, o filho de Giuseppe, Antonio, embarcou em Gênova com a moedeira de bronze, o caderno de receitas e três sacos de café que sobraram do estoque do pai. Desembarcou em Santos. A casa, que nasceu na Itália comprando café brasileiro, agora se mudava para a fonte. Antonio abriu a primeira torrefação em São Paulo, na Mooca, em 1925 — bairro de italianos, freguesia de italianos, café para italianos. Por três décadas, foi um nome conhecido entre famílias da colônia. Não era um nome grande. Não foi feito para ser. Era o nome da casa, e a casa fazia uma coisa só: torrar pouco, torrar bem, torrar para quem ia beber em casa.",
    caption: "MCMXXIII · Gênova → Santos. Antonio Zerbinatti atravessa o Atlântico.",
  },
  {
    id: "bloco-1983",
    eyebrow: "III · A SERRA DO CABRAL",
    h2Pre: "Anos 1980. A ",
    h2Italic: "terceira",
    h2Pos: " geração escolhe a fonte.",
    fallback: "MCMLXXXIII",
    fallbackBg: "bg-bone-soft",
    fallbackSize: "text-[80px]",
    body: "Carlo Zerbinatti, neto de Giuseppe, herdou a torrefação em 1978 e tomou uma decisão que mudou a casa: parar de comprar café no atravessador e ir direto à fazenda. Procurou por dois anos. Subiu serras em Minas, no Espírito Santo, no Sul. Em 1983 chegou à Serra do Cabral, no norte mineiro — altitudes entre novecentos e mil e cem metros, terra vermelha, dias quentes e noites frias. O café que provou na Fazenda Santa Rita tinha a doçura limpa que Carlo procurava havia uma década. Fechou a parceria com aperto de mão. Quarenta e três anos depois, o aperto de mão continua valendo, e o café da Santa Rita ainda é a base do blend que sai dos nossos pacotes — junto a três ou quatro lotes parceiros da mesma microrregião.",
    caption: "MCMLXXXIII · Serra do Cabral, MG. Fazenda Santa Rita, parceira até hoje.",
  },
  {
    id: "bloco-2026",
    eyebrow: "IV · HOJE",
    h2Pre: "2026. A ",
    h2Italic: "quarta",
    h2Pos: " geração torra a próxima safra.",
    // Foto real: peneira de palha tradicional, instrumento de ofício preservado.
    photo: "/images/farm/peneira-cafe.jpg",
    photoAlt:
      "Mão calejada do trabalhador segurando peneira de palha tradicional usada na separação do café",
    photoPosition: "center center",
    fallback: "Z",
    fallbackBg: "bg-bone-soft",
    fallbackSize: "text-[160px]",
    body: "A casa hoje é tocada pela quarta geração — netos de Carlo, bisnetos de Antonio, tataranetos de Giuseppe. A torrefação saiu da Mooca, mas continua em São Paulo. A moedeira de bronze segue funcionando — usamos para amostras de controle. Os cadernos italianos seguem na estante. O café que sai dos pacotes hoje é diferente do de 1897 — mais limpo, mais doce, com perfil mais definido — mas o gesto que produz é o mesmo: torrar pouco, torrar fresco, torrar para alguém que vai beber em casa, não em uma prateleira de supermercado. A diferença entre 1897 e 2026, do ponto de vista da casa, é só de logística. O café da xícara é a mesma promessa.",
    caption: "MMXXVI · Serra do Cabral. Peneira tradicional na separação do lote.",
  },
];

// Tipagem inline pra permitir bloco com photo opcional sem quebrar os anteriores
type Bloco = (typeof BLOCOS)[number] & {
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
};

const PRINCIPIOS = [
  {
    n: "01",
    t: "Torra pouca, torra fresca",
    d: "Nunca produzimos para estoque. Cada lote tem destino antes de ir ao tambor.",
  },
  {
    n: "02",
    t: "Compra direta, sem atravessador",
    d: "A relação com a fazenda é feita por aperto de mão e renovada a cada safra. Quatro décadas e contando.",
  },
  {
    n: "03",
    t: "O blend é estável, a safra é honesta",
    d: "A receita não muda, mas cada colheita tem seu caráter. O cartão da casa avisa o que muda — sem maquiar.",
  },
  {
    n: "04",
    t: "O cliente é uma mesa, não um carrinho",
    d: "Falamos com casas, não com perfis. Quem assina recebe o nome de quem torrou. O telefone é atendido por quem trabalha na torrefação.",
  },
];

export default function SobrePage() {
  const articleSchemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Nossa História — Famiglia Zerbinatti",
    description:
      "Quatro gerações de uma casa italiana de café, de Treviso (1897) à Serra do Cabral (2026).",
    url: `${siteConfig.url}/sobre`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      foundingDate: "1897",
      foundingLocation: {
        "@type": "Place",
        name: "Treviso, Itália",
      },
      founder: {
        "@type": "Person",
        name: "Giuseppe Zerbinatti",
      },
    },
  };

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchemaData),
          }}
        />

        {/* Breadcrumb */}
        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Nossa História" },
            ]}
          />
        </div>

        {/* HERO */}
        <section
          aria-labelledby="sobre-hero-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <div className="mx-auto max-w-[720px] text-center">
              <p
                className="font-sans text-[11px] font-medium uppercase text-olive"
                style={{ letterSpacing: "0.28em" }}
              >
                1897 — TREVISO, ITÁLIA
              </p>
              <h1
                id="sobre-hero-title"
                className="text-display mt-8 text-ink"
              >
                Quatro{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  gerações
                </em>
                ,<br />
                o mesmo gesto.
              </h1>
              <p
                className="text-lede mx-auto mt-8 italic text-ink-soft"
                style={{ maxWidth: "580px" }}
              >
                Uma casa atravessou um século, um oceano e três mudanças de continente sem mudar o que faz. Esta é a história curta — a longa está na xícara.
              </p>
              <span
                className="mx-auto mt-12 block h-px w-20 bg-line"
                aria-hidden="true"
              />
              <p
                className="mt-8 font-mono text-[11px] uppercase text-ink-mute"
                style={{ letterSpacing: "0.18em" }}
              >
                <span lang="la">MDCCCXCVII</span> · TREVISO →{" "}
                <span lang="la">MMXXVI</span> · SERRA DO CABRAL
              </p>
            </div>
          </div>
        </section>

        {/* TIMELINE + BLOCOS */}
        <section
          aria-label="Cronologia da casa"
          className="bg-bone pb-20 lg:pb-32"
        >
          <div className="container-editorial">
            <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
              {/* Timeline lateral (desktop) */}
              <SobreTimeline markers={TIMELINE} />

              {/* Conteudo editorial */}
              <div className="lg:max-w-[680px]">
                {BLOCOS.map((b, i) => (
                  <section
                    key={b.id}
                    id={b.id}
                    aria-labelledby={`${b.id}-title`}
                    className={`scroll-mt-32 ${
                      i > 0 ? "border-t border-line pt-20 mt-20 lg:pt-24 lg:mt-24" : ""
                    }`}
                  >
                    {/* Eyebrow mobile como breadcrumb mono */}
                    <p
                      className="font-mono text-[11px] font-medium uppercase text-olive lg:hidden"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {b.eyebrow}
                    </p>
                    {/* Eyebrow desktop */}
                    <p
                      className="hidden font-mono text-[12px] font-medium uppercase text-olive lg:block"
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {b.eyebrow}
                    </p>

                    <h2
                      id={`${b.id}-title`}
                      className="mt-6 text-ink"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem, 4vw, 3rem)",
                        fontWeight: 400,
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {b.h2Pre}
                      <em
                        className="font-display italic"
                        style={{ fontWeight: 400 }}
                      >
                        {b.h2Italic}
                      </em>
                      {b.h2Pos}
                    </h2>

                    {/* Foto / fallback */}
                    <figure className="mt-12">
                      <div
                        className={`relative aspect-[4/5] w-full overflow-hidden ${b.fallbackBg}`}
                      >
                        {(b as Bloco).photo ? (
                          <Image
                            src={(b as Bloco).photo as string}
                            alt={(b as Bloco).photoAlt as string}
                            fill
                            quality={75}
                            placeholder="blur"
                            blurDataURL={BLUR.peneiraCafe}
                            sizes="(min-width: 1024px) 680px, 100vw"
                            className="object-cover"
                            style={{
                              objectPosition:
                                (b as Bloco).photoPosition ?? "center center",
                              filter: "saturate(0.92) contrast(1.04)",
                            }}
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span
                              className={`font-display ${b.fallbackSize} text-olive`}
                              style={{
                                fontWeight: 400,
                                filter:
                                  i < 3 ? "sepia(0.4) contrast(0.95)" : "none",
                              }}
                              aria-hidden="true"
                              lang={b.fallback === "Z" ? undefined : "la"}
                            >
                              {b.fallback}
                            </span>
                          </div>
                        )}
                      </div>
                      <figcaption
                        className="mt-3 text-[13px] italic text-ink-soft"
                      >
                        {b.caption}
                      </figcaption>
                    </figure>

                    <p className="text-body mt-8 text-ink-soft">{b.body}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPIOS */}
        <section
          aria-labelledby="principios-title"
          className="bg-bone-soft py-20 lg:py-32"
        >
          <div className="container-editorial">
            <header className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow">O QUE NÃO MUDA</p>
              <h2
                id="principios-title"
                className="text-h1 mt-6 text-ink"
              >
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  Quatro
                </em>{" "}
                princípios, um por geração.
              </h2>
              <span className="hairline mt-12 block" aria-hidden="true" />
            </header>

            <div className="mt-16 grid gap-0 sm:grid-cols-2">
              {PRINCIPIOS.map((p, i) => (
                <article
                  key={p.n}
                  className={`p-8 lg:p-12 ${
                    i % 2 === 0 ? "sm:border-r sm:border-line" : ""
                  } ${i < 2 ? "sm:border-b sm:border-line" : ""} ${
                    i > 0 ? "border-t border-line sm:border-t-0" : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-[14px] font-medium text-olive"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {p.n} ·
                    </span>
                    <h3 className="text-[16px] font-medium text-ink">
                      {p.t}
                    </h3>
                  </div>
                  <p className="mt-3 pl-8 text-[15px] leading-[1.6] text-ink-soft">
                    {p.d}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* A MARCA DA FAMÍLIA — artefato histórico, não brand atual */}
        <section
          aria-labelledby="marca-familia-title"
          className="bg-bone py-20 lg:py-32"
        >
          <div className="container-editorial">
            <div className="mx-auto grid max-w-[1040px] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
              {/* Logo histórico — apresentado como artefato */}
              <figure className="order-2 lg:order-1">
                <div
                  className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden border border-line bg-white"
                  style={{ boxShadow: "0 1px 0 0 var(--line)" }}
                >
                  <Image
                    src="/images/marca/logo-zerbinatti.jpg"
                    alt="Marca registrada da Famiglia Zerbinatti — manuscrita em script marrom, com bandeiras Itália e Brasil, datas 1897 e 2023"
                    fill
                    quality={88}
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-contain p-8"
                  />
                </div>
                <figcaption
                  className="mt-4 text-center font-mono text-[11px] uppercase text-ink-mute"
                  style={{ letterSpacing: "0.18em" }}
                >
                  Marca registrada · Famiglia Zerbinatti
                </figcaption>
              </figure>

              {/* Texto editorial */}
              <div className="order-1 lg:order-2">
                <p className="eyebrow">A MARCA DA FAMÍLIA</p>
                <h2
                  id="marca-familia-title"
                  className="text-h1 mt-6 text-ink"
                >
                  Dall&apos;Italia{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    al Brasile
                  </em>
                  , dal 1897.
                </h2>
                <p className="text-body mt-8 text-ink-soft">
                  A marca foi desenhada por Antonio Zerbinatti e segue em uso
                  pela família — manuscrita, com a moldura italiana e o grão
                  brasileiro. Aparece no carimbo dos sacos, no cartão que
                  acompanha cada pacote da casa e no portão da torrefação.
                </p>
                <p className="text-body mt-4 text-ink-soft">
                  É o que se entrega no aperto de mão. O que está no site é o
                  vestido editorial em que a marca circula online — escolhido
                  pela quarta geração para conversar com a mesa de quem assina.
                  Os dois convivem, e cada um faz a sua parte.
                </p>
                <p
                  className="mt-10 font-mono text-[11px] uppercase text-olive"
                  style={{ letterSpacing: "0.18em" }}
                >
                  REG. MMXXIII · BRASIL
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          aria-labelledby="sobre-cta-title"
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
                id="sobre-cta-title"
                className="text-h1 mt-8 text-bone"
              >
                Hoje a casa{" "}
                <em
                  className="font-display italic"
                  style={{ fontWeight: 400 }}
                >
                  torra
                </em>{" "}
                para a sua mesa.
              </h2>
              <p
                className="text-body mx-auto mt-8 text-bone-soft"
                style={{ maxWidth: "580px" }}
              >
                O melhor jeito de conhecer a história da família é beber o café que ela faz há cento e vinte e nove anos. A assinatura começa com 15% no primeiro envio.
              </p>

              <div className="mt-12 flex flex-col items-center gap-6">
                <a
                  href="/assinatura"
                  className="bg-olive px-10 py-5 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
                  style={{ borderRadius: "2px" }}
                >
                  Começar a receber
                </a>
                <a
                  href="/fazenda"
                  className="text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
                >
                  Conheça a Serra do Cabral →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

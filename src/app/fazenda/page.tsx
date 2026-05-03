import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "A fazenda — Serra do Cabral, Norte de Minas | Zerbinatti Coffee",
  description:
    "Fazenda Santa Rita e parceiros da Serra do Cabral: altitude entre 900 e 1.100m, Bourbon Amarelo e Catuaí Vermelho, processo natural em terreiro suspenso. Compra direta há mais de quatro décadas.",
  alternates: { canonical: "/fazenda" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/fazenda",
    title: "A fazenda — Serra do Cabral | Zerbinatti Coffee",
    description:
      "Fazenda Santa Rita e parceiros da Serra do Cabral: altitude, variedades, processo, parceria de mais de quatro décadas.",
  },
};

export default function Fazenda() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "A fazenda — Serra do Cabral",
    url: `${siteConfig.url}/fazenda`,
    description:
      "Origem do café Zerbinatti: Fazenda Santa Rita e parceiros na Serra do Cabral, norte de Minas Gerais. Compra direta, sem atravessador.",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  const bcSchema = breadcrumbSchema([
    { name: "Início", url: siteConfig.url },
    { name: "A fazenda", url: `${siteConfig.url}/fazenda` },
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
              { label: "A fazenda" },
            ]}
          />
        </div>

        {/* Hero — full-bleed lavoura, texto sobreposto na faixa do céu */}
        <section
          aria-labelledby="fazenda-title"
          className="relative bg-ink"
        >
          <div className="relative h-[88vh] min-h-[560px] w-full overflow-hidden lg:h-[100vh] lg:max-h-[860px]">
            <Image
              src="/images/farm/fazenda-lavoura.jpg"
              alt="Fileiras de cafezeiros se estendendo até a manga ao fundo, sob céu aberto, na Serra do Cabral"
              fill
              priority
              fetchPriority="high"
              quality={84}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: "center 65%",
                filter: "saturate(0.78) contrast(1.05)",
              }}
            />
            {/* Gradient para legibilidade do texto */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(27,23,20,0.55) 0%, rgba(27,23,20,0.22) 32%, rgba(27,23,20,0) 60%, rgba(27,23,20,0.45) 100%)",
              }}
            />

            {/* Texto editorial sobre a foto */}
            <div className="absolute inset-x-0 top-0 px-5 pt-12 sm:px-8 lg:px-16 lg:pt-20">
              <div className="container-editorial mx-auto" style={{ maxWidth: "780px" }}>
                <p
                  className="font-mono text-[11px] uppercase text-bone"
                  style={{ letterSpacing: "0.28em", opacity: 0.92 }}
                >
                  ORIGEM E TERROIR
                </p>
                <h1
                  id="fazenda-title"
                  className="text-h1 mt-6 text-bone"
                  style={{ textShadow: "0 1px 24px rgba(27,23,20,0.35)" }}
                >
                  Fazenda{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    Santa Rita
                  </em>
                  , Serra do Cabral.
                </h1>
              </div>
            </div>

            {/* Coordenadas no rodapé */}
            <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8 lg:px-16 lg:pb-12">
              <div className="container-editorial mx-auto" style={{ maxWidth: "780px" }}>
                <p
                  className="font-mono text-[11px] uppercase text-bone"
                  style={{ letterSpacing: "0.18em", opacity: 0.92 }}
                >
                  MMXXVI · NORTE DE MINAS · 9°20&apos;S 44°10&apos;W
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lede após a foto */}
        <section className="bg-bone py-16 lg:py-24">
          <div
            className="container-editorial mx-auto"
            style={{ maxWidth: "720px" }}
          >
            <p className="text-lede text-ink-soft">
              Norte de Minas Gerais, entre novecentos e mil e cem metros de
              altitude. A casa compra deste lote pela quadragésima terceira
              safra consecutiva.
            </p>
          </div>
        </section>

        {/* Corpo */}
        <section className="bg-bone pb-24 lg:pb-32">
          <div
            className="container-editorial mx-auto space-y-20"
            style={{ maxWidth: "720px" }}
          >
            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                A microrregião
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                A Serra do Cabral atravessa o norte mineiro entre os municípios
                de Buenópolis, Joaquim Felício e Francisco Dumont. Solo
                vermelho profundo, dias quentes, noites com até doze graus de
                amplitude térmica — combinação que retarda a maturação da
                cereja e concentra açúcares no grão. É essa lentidão natural
                que define o perfil sensorial da região: doçura limpa, corpo
                redondo, acidez na medida.
              </p>
            </div>

            {/* Foto editorial 1 — chegada */}
            <figure className="-mx-5 sm:-mx-8 lg:mx-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft sm:aspect-[3/4] lg:aspect-[16/10]">
                <Image
                  src="/images/farm/fazenda-chegada.jpg"
                  alt="Vista do interior do veículo chegando à fazenda, fileiras de cafezeiros ladeando a estrada de terra"
                  fill
                  quality={82}
                  sizes="(min-width: 720px) 720px, 100vw"
                  className="object-cover"
                  style={{
                    objectPosition: "center 45%",
                    filter: "saturate(0.85) contrast(1.04)",
                  }}
                />
              </div>
              <figcaption
                className="mt-4 px-5 font-mono text-[11px] uppercase text-ink-mute sm:px-8 lg:px-0"
                style={{ letterSpacing: "0.18em" }}
              >
                Chegada à fazenda · Maio, início de colheita
              </figcaption>
            </figure>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Variedades cultivadas
              </h2>
              <ul className="mt-6 divide-y divide-line">
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">Bourbon Amarelo</span>
                  <span
                    className="font-mono text-[12px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Doçura pronunciada · corpo de mel
                  </span>
                </li>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">Catuaí Vermelho</span>
                  <span
                    className="font-mono text-[12px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Equilíbrio · acidez frutada discreta
                  </span>
                </li>
                <li className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="text-body text-ink">Mundo Novo</span>
                  <span
                    className="font-mono text-[12px] text-ink-mute"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    Em parcelas selecionadas · corpo encorpado
                  </span>
                </li>
              </ul>
            </div>

            {/* Foto editorial 2 — frutos verdes */}
            <figure className="-mx-5 sm:-mx-8 lg:mx-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft sm:aspect-[3/4]">
                <Image
                  src="/images/farm/cafe-frutos-verdes.jpg"
                  alt="Cachos de frutos verdes do café no pé, ainda em maturação, em meio à folhagem densa do cafezeiro"
                  fill
                  quality={82}
                  sizes="(min-width: 720px) 720px, 100vw"
                  className="object-cover"
                  style={{
                    objectPosition: "center center",
                    filter: "saturate(0.92) contrast(1.05)",
                  }}
                />
              </div>
              <figcaption
                className="mt-4 px-5 font-mono text-[11px] uppercase text-ink-mute sm:px-8 lg:px-0"
                style={{ letterSpacing: "0.18em" }}
              >
                Cachos em maturação · A cereja precisa do seu tempo
              </figcaption>
            </figure>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Processo
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Colheita manual seletiva entre maio e setembro, em fases de
                maturação. Processo natural — secagem em terreiro suspenso por
                dezoito a vinte e dois dias, com a cereja inteira, virada três
                vezes ao dia para secagem homogênea. O método preserva os
                açúcares e dá ao café o caráter doce que define a casa há mais
                de um século.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Os parceiros
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                A Fazenda Santa Rita é a base do blend, mas não a única origem.
                Trabalhamos com três a quatro lotes parceiros da mesma
                microrregião, escolhidos a cada safra por compatibilidade
                sensorial. Todos compartilham o mesmo terroir e o mesmo
                protocolo de pós-colheita. O blend final é refinado em sessões
                de cupping com Q-Graders certificados pela SCA — só lotes com
                pontuação igual ou superior a oitenta e cinco entram no pacote.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Quarenta e três safras de aperto de mão
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Carlo Zerbinatti, neto de Giuseppe, fechou a parceria com a
                Santa Rita em 1983 — sem contrato, no aperto de mão. Quatro
                décadas depois, o aperto de mão continua valendo. A relação é
                renovada a cada colheita, sem intermediação, sem leilão, sem
                atravessador. É o tipo de continuidade que um marketplace de
                café especial dificilmente reproduz.
              </p>
            </div>

            <div>
              <h2
                className="font-display text-ink"
                style={{ fontWeight: 400, fontSize: "28px", lineHeight: 1.2 }}
              >
                Visitas
              </h2>
              <p className="text-body mt-4 text-ink-soft">
                Recebemos visitas agendadas para cafeterias, jornalistas e
                clubes de café. Um programa de agroturismo, com cupping e
                passeio pelo terreiro, está em montagem para a próxima safra.
              </p>
            </div>

            <span className="hairline mt-12 block" aria-hidden="true" />

            <p
              className="text-center font-mono text-[11px] uppercase text-olive"
              style={{ letterSpacing: "0.18em" }}
            >
              MDCCCXCVII · TREVISO → MMXXVI · SERRA DO CABRAL
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

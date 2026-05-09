import HomeHeader from "@/components/home/HomeHeader";
import HomeFooter from "@/components/home/HomeFooter";
import CartDrawer from "@/components/home/CartDrawer";
import RevealObserver from "@/components/home/RevealObserver";

export const metadata = {
  title: "Fazenda Zerbinatti — Serra do Cabral, MG",
  description:
    "Café especial Zerbinatti cultivado entre 640–760m na Serra do Cabral, Minas Gerais. Herança italiana desde 1897, três gerações, variedade Arara, SCA 88+.",
  alternates: { canonical: "/fazenda" },
  openGraph: {
    title: "Fazenda Zerbinatti — Serra do Cabral desde 1897",
    description:
      "Café especial cultivado entre 640–760m na Serra do Cabral, MG. Três gerações da família Zerbinatti, variedade Arara, SCA 88+.",
    url: "/fazenda",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fazenda Zerbinatti — Serra do Cabral desde 1897",
    description:
      "Café especial cultivado entre 640–760m na Serra do Cabral, MG. Três gerações da família, variedade Arara.",
  },
};

const numbers = [
  {
    v: "640",
    suffix: "–760m",
    t: "Altitude",
    d: "Serra do Cabral, MG. Noites frias e dias ensolarados — o range ideal para o adensamento do grão.",
  },
  {
    v: "88",
    suffix: "/100",
    t: "SCA",
    d: "Pontuação SCA entre 85 e 90+ nos lotes premiados. Cupping liderado por Q-grader certificado.",
  },
  {
    v: "III",
    suffix: "",
    t: "Gerações",
    d: "Da chegada da família Zerbinatti em 1897 até hoje — fidelidade ao método, evolução no rigor.",
  },
  {
    v: "1897",
    suffix: "",
    t: "Desde",
    d: "O início da história. Italianos no Brasil, mãos na terra, um sonho que virou herança líquida.",
  },
];

const detailCards = [
  {
    icon: "I",
    title: "Variedade",
    items: [
      "Arara — 100% da produção atual",
      "Híbrido de Obatã × Catuaí Amarelo",
      "Outras variedades em estudo para futuras safras",
    ],
  },
  {
    icon: "II",
    title: "Processo",
    items: [
      "Colheita 100% seletiva, manual",
      "Natural e Cereja Descascado",
      "Secagem ao sol em terreiro",
      "Torra artesanal sob demanda",
    ],
  },
  {
    icon: "III",
    title: "Terroir",
    items: [
      "Solo de origem vulcânica",
      "Microclima de altitude",
      "Sombreamento natural",
      "Manejo regenerativo",
    ],
  },
];

export default function Fazenda() {
  return (
    <main className="novo-layout">
      <HomeHeader />

      {/* Hero compacto */}
      <section className="farm-hero">
        <div className="farm-hero-bg" />
        <div className="farm-hero-content">
          <div className="farm-hero-inner">
            <a href="/" className="farm-back">
              <span aria-hidden>←</span> Voltar para a loja
            </a>
            <span className="eyebrow">Origem · Serra do Cabral</span>
            <h1 className="farm-hero-title">
              Fazenda <em>Zerbinatti</em>
              <span className="farm-hero-subtitle">
                Café especial Serra do Cabral · desde 1897
              </span>
            </h1>
            <p className="farm-hero-desc">
              Em Minas Gerais, entre 640 e 760 metros de altitude, plantamos
              Arábica especial em solo vulcânico — o terroir que a família
              Zerbinatti escolheu há mais de um século.
            </p>

            <div className="farm-hero-meta">
              <div>
                <div className="v">
                  640<small>–760m</small>
                </div>
                <div className="l">Altitude</div>
              </div>
              <div>
                <div className="v">
                  88<small>/100</small>
                </div>
                <div className="l">SCA</div>
              </div>
              <div>
                <div className="v">III</div>
                <div className="l">Gerações</div>
              </div>
              <div>
                <div className="v">1897</div>
                <div className="l">Desde</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Herança 1897 */}
      <section className="farm-heritage">
        <div className="farm-heritage-inner">
          <div className="farm-heritage-image reveal">
            <div className="stamp">
              <div className="y">1897</div>
              <div className="l">Famiglia Zerbinatti</div>
            </div>
          </div>

          <div className="farm-heritage-text reveal">
            <span className="eyebrow">Herança</span>
            <h2 className="display">
              A história começou em <em>1897</em>
            </h2>
            <p className="body-lg">
              A família Zerbinatti chegou da Itália no fim do século XIX
              carregando um sonho simples — cultivar café de qualidade no
              Brasil. Três gerações depois, seguimos fiéis ao método.
            </p>
            <p className="body">
              Colheita seletiva, secagem ao sol em terreiro, torra
              artesanal sob demanda. Cada saca é assinada à mão, com lote,
              data e quem torrou. Rastreabilidade não é jargão: é o jeito
              que sempre fizemos.
            </p>
            <p className="body">
              A Serra do Cabral nos deu o terroir; a família, o método; o
              tempo, a paciência. O resto é xícara.
            </p>
          </div>
        </div>
      </section>

      {/* Números da fazenda */}
      <section className="farm-numbers">
        <div className="farm-numbers-bg" />
        <div className="farm-numbers-inner">
          <div className="farm-section-head reveal">
            <span className="eyebrow">Indicadores</span>
            <h2 className="display">
              Números da <em>fazenda</em>
            </h2>
            <p>
              Os parâmetros que sustentam a qualidade — auditados a cada
              safra, comunicados sem segredo.
            </p>
          </div>

          <div className="farm-numbers-grid">
            {numbers.map((n) => (
              <div key={n.t} className="farm-num-cell reveal">
                <div className="v">
                  {n.v}
                  {n.suffix && <small>{n.suffix}</small>}
                </div>
                <div className="t">{n.t}</div>
                <div className="d">{n.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detalhes (variedades, processo, terroir) */}
      <section className="farm-details">
        <div className="farm-details-inner">
          <div className="farm-section-head reveal">
            <span className="eyebrow">Manejo</span>
            <h2 className="display">
              Variedades, processo &amp; <em>terroir</em>
            </h2>
            <p>
              Do plantio à torra, três pilares regem a fazenda — cada um
              com decisões deliberadas que viram nota sensorial.
            </p>
          </div>

          <div className="farm-details-grid">
            {detailCards.map((card) => (
              <div key={card.title} className="farm-detail-card reveal">
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitas CTA */}
      <section className="farm-visit">
        <div className="farm-visit-inner reveal">
          <span className="eyebrow">Visitas</span>
          <h2 className="display">
            Venha conhecer a <em>fazenda</em>
          </h2>
          <p>
            Recebemos cafeterias, jornalistas e clubes de café em visitas
            agendadas. Em breve abriremos o programa de agroturismo com
            degustação guiada e passeio pelo terreiro.
          </p>
          <div className="farm-visit-cta">
            <a href="/para-empresas" className="btn btn-gold">
              <span>Falar com a fazenda</span>
              <span className="arrow">→</span>
            </a>
            <a href="/#cafes" className="btn btn-ghost">
              <span>Ver os cafés</span>
            </a>
          </div>
        </div>
      </section>

      <HomeFooter />
      <CartDrawer />
      <RevealObserver />
    </main>
  );
}

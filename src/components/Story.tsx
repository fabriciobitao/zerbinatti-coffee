import {
  Kicker,
  PullQuote,
  DropCap,
  AsymmetricDivider,
  Marginalia,
} from "@/components/ui/Editorial";
import { FleurIcon, MountainIcon, ScrollIcon } from "@/components/ui/HeraldicIcons";

export default function Story() {
  return (
    <section
      id="origem"
      className="relative overflow-hidden bg-coffee-50 py-24 sm:py-32 lg:py-40"
    >
      {/* Fundo tipográfico gigante */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="select-none font-serif font-bold text-coffee-100/60"
          style={{
            fontSize: "clamp(16rem, 48vw, 34rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          IV
        </span>
      </div>

      {/* Marginalia vertical desktop */}
      <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
        <Marginalia>Cap. II · Giuseppe → Lucca</Marginalia>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header editorial */}
        <div className="mx-auto max-w-3xl text-center">
          <Kicker>A casa Zerbinatti</Kicker>
          {/* Marginalia horizontal — mobile (substitui a vertical oculta) */}
          <div className="mt-4 flex justify-center lg:hidden">
            <span className="marginalia-h">Cap. II · Giuseppe → Lucca</span>
          </div>
          <h2 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.02em] text-coffee-900 text-[clamp(2.75rem,8vw,5rem)]">
            Quatro gerações,
            <br />
            <span className="italic text-gold-600">um ofício.</span>
          </h2>
          <AsymmetricDivider className="mx-auto mt-8 justify-center" />
        </div>

        {/* Grid asymmetric: mobile mostra texto primeiro (order), desktop volta para esq→dir */}
        <div className="mt-16 grid grid-cols-12 gap-8 lg:gap-14">
          {/* Imagem + elementos flutuantes — vem DEPOIS no mobile (order-2), antes no desktop */}
          <div className="order-2 col-span-12 mt-10 lg:order-1 lg:col-span-5 lg:mt-8">
            <div className="relative">
              {/* Imagem principal duotone */}
              <div className="grain-local relative overflow-hidden rounded-2xl">
                <div
                  className="aspect-[4/5] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=85&auto=format&fit=crop')",
                    filter: "sepia(0.35) saturate(1.1) contrast(1.05)",
                  }}
                  role="img"
                  aria-label="Cerejas de café maduras no cafezal — safra Zerbinatti"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(93,58,31,0.15), rgba(212,160,23,0.1))",
                  }}
                />
              </div>

              {/* Selo 1897 flutuante */}
              <div className="absolute -bottom-4 -right-2 rounded-xl bg-coffee-900 p-4 shadow-2xl sm:-bottom-8 sm:-right-8 sm:p-6">
                <div className="flex items-center gap-3 text-gold-400">
                  <FleurIcon size={32} strokeWidth={1} />
                  <div>
                    <div className="text-xs tracking-[0.2em] text-coffee-200 uppercase">
                      Dal
                    </div>
                    <div className="font-serif text-2xl font-bold leading-none text-coffee-50">
                      1897
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-card — data */}
              <div className="absolute -top-3 -left-2 rounded-lg border border-coffee-200 bg-coffee-50 px-3 py-2 shadow-lg sm:-top-4 sm:-left-4 sm:px-4">
                <div className="text-xs tracking-[0.2em] text-coffee-700 uppercase">
                  Primeira torra
                </div>
                <div className="font-serif text-sm font-bold text-coffee-900">
                  Giugno 1952
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo editorial — order-1 mobile (vem primeiro) */}
          <div className="order-1 col-span-12 lg:order-2 lg:col-span-7 lg:pl-6">
            <div className="flex items-center gap-4 text-coffee-700">
              <MountainIcon size={36} strokeWidth={1.2} className="text-gold-600" />
              <h3 className="font-serif text-2xl font-bold text-coffee-800 sm:text-3xl">
                Da Itália à Serra do Cabral
              </h3>
            </div>

            <DropCap className="mt-8">
              Em 1897, Giuseppe Zerbinatti desembarcou em Santos vindo do
              norte da Itália. Em 1952, o neto fez a primeira torra comercial.
              Hoje, a quarta geração toca a casa — os mesmos cadernos de torra,
              um padrão de especialidade que o tempo ensinou a reconhecer.
            </DropCap>

            <p className="mt-6 text-base leading-relaxed text-coffee-700 sm:text-lg">
              Torramos em lotes pequenos porque, acima desse volume, o controle
              fino de temperatura é impossível. Toda sacola sai da torrefação
              com data, produtor nomeado e receita da casa. Nada entra anônimo.
            </p>

            <PullQuote cite="Lucca Zerbinatti, mestre de torra">
              Tradição, para nós, não é decoração — é método. É o que permite
              ao café especial atravessar quatro gerações sem virar commodity.
            </PullQuote>

            {/* Stats com ícones */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-coffee-200 pt-8 sm:gap-8">
              <div>
                <div className="text-gold-600">
                  <FleurIcon size={24} strokeWidth={1.2} />
                </div>
                <div className="mt-4 font-serif text-3xl font-bold leading-none text-coffee-900 sm:text-4xl">
                  100%
                </div>
                <div className="mt-2 text-xs tracking-[0.2em] text-coffee-700 uppercase">
                  Arábica
                </div>
              </div>
              <div>
                <div className="text-gold-600">
                  <MountainIcon size={24} strokeWidth={1.2} />
                </div>
                <div className="mt-4 font-serif text-3xl font-bold leading-none text-coffee-900 sm:text-4xl">
                  85+
                </div>
                <div className="mt-2 text-xs tracking-[0.2em] text-coffee-700 uppercase">
                  Pontos SCA
                </div>
              </div>
              <div>
                <div className="text-gold-600">
                  <ScrollIcon size={24} strokeWidth={1.2} />
                </div>
                <div
                  className="mt-4 font-serif text-3xl font-bold leading-none text-coffee-900 sm:text-4xl"
                  aria-label="quatro"
                >
                  IV
                </div>
                <div className="mt-2 text-xs tracking-[0.2em] text-coffee-700 uppercase">
                  Gerações
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

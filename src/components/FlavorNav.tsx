import Link from "next/link";
import {
  ChocolateIcon,
  CaramelIcon,
  CherryIcon,
  HoneyIcon,
  FloralIcon,
  CitrusIcon,
} from "@/components/ui/HeraldicIcons";
import { Kicker, AsymmetricDivider } from "@/components/ui/Editorial";

type Flavor = {
  key: string;
  label: string;
  description: string;
  slug: string;
  icon: React.FC<{ className?: string; size?: number }>;
};

const flavors: Flavor[] = [
  {
    key: "chocolate",
    label: "Chocolate",
    description: "Corpo redondo, doçura firme",
    slug: "classico",
    icon: ChocolateIcon,
  },
  {
    key: "caramelo",
    label: "Caramelo",
    description: "Final doce e persistente",
    slug: "classico",
    icon: CaramelIcon,
  },
  {
    key: "frutas-vermelhas",
    label: "Frutas vermelhas",
    description: "Acidez fina, fruta madura",
    slug: "reserva",
    icon: CherryIcon,
  },
  {
    key: "mel",
    label: "Mel silvestre",
    description: "Doçura de flor, sedoso",
    slug: "reserva",
    icon: HoneyIcon,
  },
  {
    key: "floral",
    label: "Floral",
    description: "Jasmim, delicadeza",
    slug: "microlote",
    icon: FloralIcon,
  },
  {
    key: "citrico",
    label: "Cítrico",
    description: "Bergamota, acidez brilhante",
    slug: "microlote",
    icon: CitrusIcon,
  },
];

export default function FlavorNav() {
  return (
    <section className="relative overflow-hidden bg-coffee-50 py-20 sm:py-28">
      {/* Tipografia backdrop */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span
          className="select-none font-serif italic text-coffee-100/60"
          style={{
            fontSize: "clamp(13rem, 35vw, 22rem)",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          palato
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header assimétrico */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
          <div className="max-w-xl">
            <Kicker>Navegue pelo paladar</Kicker>
            <h2 className="mt-6 font-serif font-bold leading-[0.95] tracking-[-0.02em] text-coffee-900 text-[clamp(2.25rem,5vw,4rem)]">
              O que sua xícara
              <br />
              <span className="italic text-gold-600">quer hoje?</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <AsymmetricDivider className="mb-5" />
            <p className="text-base leading-relaxed text-coffee-600 sm:text-lg">
              Escolha uma nota e a gente te leva direto ao café da casa que
              mais entrega esse perfil.
            </p>
          </div>
        </div>

        {/* Grid editorial — 2 colunas mobile, 3 tablet, 6 desktop com hover/active dramático */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-coffee-200 bg-coffee-200 sm:mt-16 sm:grid-cols-3 lg:grid-cols-6">
          {flavors.map((flavor) => {
            const Icon = flavor.icon;
            return (
              <Link
                key={flavor.key}
                href={`/cafes/${flavor.slug}`}
                className="group relative flex min-h-[180px] flex-col items-start gap-3 bg-coffee-50 p-4 transition-all duration-500 hover:bg-coffee-900 active:bg-coffee-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gold-500 sm:gap-4 sm:p-6 lg:p-8"
              >
                {/* Número de ordem tipográfico */}
                <span className="font-serif text-xs tracking-[0.2em] text-coffee-600 uppercase transition-colors group-hover:text-gold-400 group-active:text-gold-400">
                  {String(flavors.indexOf(flavor) + 1).padStart(2, "0")}
                </span>

                <Icon
                  size={40}
                  className="text-coffee-800 transition-all duration-500 group-hover:text-gold-400 group-hover:scale-110 group-active:text-gold-400 sm:!w-[48px] sm:!h-[48px] lg:!w-[56px] lg:!h-[56px]"
                />

                <div>
                  <h3 className="font-serif text-base font-bold leading-tight text-coffee-900 transition-colors group-hover:text-coffee-50 group-active:text-coffee-50 sm:text-lg lg:text-xl">
                    {flavor.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-coffee-700 transition-colors group-hover:text-coffee-300 group-active:text-coffee-300 sm:mt-2">
                    {flavor.description}
                  </p>
                </div>

                <span className="mt-auto flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.15em] text-coffee-800 transition-colors group-hover:text-gold-400 group-active:text-gold-400 sm:pt-4">
                  Ver café
                  <svg
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M2 6h8M7 3l3 3-3 3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

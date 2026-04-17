import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";

type Flavor = {
  key: string;
  label: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
};

const flavors: Flavor[] = [
  {
    key: "chocolate",
    label: "Chocolate",
    description: "Corpo redondo, doçura firme",
    slug: "classico",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="20" height="20" rx="2" />
        <path d="M10 6v20M16 6v20M22 6v20M6 12h20M6 20h20" />
      </svg>
    ),
  },
  {
    key: "caramelo",
    label: "Caramelo",
    description: "Final doce, persistente",
    slug: "classico",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 10c0-3 4-5 8-5s8 2 8 5v12c0 3-4 5-8 5s-8-2-8-5V10z" />
        <path d="M12 14c2 0 3 1 4 2 1-1 2-2 4-2" />
      </svg>
    ),
  },
  {
    key: "frutas-vermelhas",
    label: "Frutas vermelhas",
    description: "Acidez fina, doçura de fruta",
    slug: "reserva",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="18" r="6" />
        <circle cx="20" cy="18" r="6" />
        <path d="M12 12v-2M20 12v-2M14 10l2-3M18 10l-2-3" />
      </svg>
    ),
  },
  {
    key: "mel",
    label: "Mel",
    description: "Doçura de flor, sedoso",
    slug: "reserva",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4l10 6v12l-10 6-10-6V10z" />
        <path d="M16 10l5 3v6l-5 3-5-3v-6z" />
      </svg>
    ),
  },
  {
    key: "floral",
    label: "Floral",
    description: "Jasmim, notas delicadas",
    slug: "microlote",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="3" />
        <path d="M16 13V7M16 19v6M13 16H7M19 16h6M11 11l-3-3M21 11l3-3M11 21l-3 3M21 21l3 3" />
      </svg>
    ),
  },
  {
    key: "citrico",
    label: "Cítrico",
    description: "Acidez brilhante, bergamota",
    slug: "microlote",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="10" />
        <path d="M16 6v20M6 16h20M9 9l14 14M23 9L9 23" />
      </svg>
    ),
  },
];

export default function FlavorNav() {
  return (
    <section className="bg-coffee-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Navegue pelo paladar
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl">
            O que sua xícara quer hoje?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-600">
            Escolha um perfil de sabor e a gente te leva direto para o café da
            casa que mais entrega aquela nota.
          </p>
          <Ornament className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {flavors.map((flavor) => (
            <Link
              key={flavor.key}
              href={`/cafes/${flavor.slug}`}
              className="group flex flex-col items-center rounded-xl border border-coffee-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-coffee-100 text-coffee-700 transition-colors group-hover:bg-gold-500/15 group-hover:text-gold-700">
                <div className="h-8 w-8">{flavor.icon}</div>
              </div>
              <h3 className="mt-4 font-serif text-base font-bold text-coffee-900">
                {flavor.label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-coffee-600">
                {flavor.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

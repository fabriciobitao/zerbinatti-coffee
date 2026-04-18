import Link from "next/link";
import { buildWhatsAppUrl, CONTACT_EMAIL } from "@/lib/config";
import { Ornament } from "@/components/ui/Ornament";

type Plan = {
  name: string;
  tagline: string;
  volume: string;
  equipment: string;
  idealFor: string;
  features: string[];
  savings: string;
  ctaLabel: string;
  whatsAppMessage: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Essential",
    tagline: "Entrada em especialidade",
    volume: "A partir de 10 kg/mês",
    equipment:
      "Máquina 1 grupo (Rancilio Classe 5 ou equivalente) + moedor on-demand Eureka Specialita",
    idealFor: "Bistrôs, restaurantes, padarias premium",
    features: [
      "Sem investimento inicial",
      "Manutenção preventiva trimestral",
      "Contrato 12 meses",
      "SLA técnico 48h",
      "Entrega semanal SP/RJ/MG",
    ],
    savings: "Equivale a ~R$ 45.000 em equipamento",
    ctaLabel: "Falar sobre o Essential",
    whatsAppMessage:
      "Olá! Tenho interesse no plano Essential da Zerbinatti (comodato + café em grãos).",
  },
  {
    name: "Specialty",
    tagline: "Cafeteria de especialidade",
    volume: "A partir de 25 kg/mês",
    equipment:
      "Máquina 2 grupos (Victoria Arduino Eagle One ou Nuova Simonelli Appia Life) + moedor Mahlkönig E65S",
    idealFor: "Cafeterias independentes de especialidade",
    features: [
      "Sem investimento inicial",
      "Barista Q-grader na consultoria",
      "Treinamento inicial incluso",
      "Contrato 12 meses flexível",
      "SLA técnico 24h",
      "Kit de PDV com storytelling de origem",
    ],
    savings: "Equivale a ~R$ 110.000 em equipamento",
    ctaLabel: "Falar sobre o Specialty",
    whatsAppMessage:
      "Olá! Tenho interesse no plano Specialty da Zerbinatti (comodato + café em grãos).",
    highlighted: true,
  },
  {
    name: "Signature",
    tagline: "Flagship e hotelaria premium",
    volume: "A partir de 50 kg/mês",
    equipment:
      "La Marzocco Linea PB 2-3 grupos + moedor Mahlkönig E65S GbW + segundo moedor para filtrado",
    idealFor: "Hotéis boutique, cafeterias flagship, restaurantes premium",
    features: [
      "Sem investimento inicial",
      "Barista training mensal",
      "Co-marketing + PDV customizado",
      "Contrato 12 meses, renovação automática",
      "SLA técnico 24h com técnico dedicado",
      "Private label opcional",
    ],
    savings: "Equivale a R$ 150.000–R$ 190.000 em equipamento",
    ctaLabel: "Falar sobre o Signature",
    whatsAppMessage:
      "Olá! Tenho interesse no plano Signature da Zerbinatti (comodato + café em grãos).",
  },
];

function IconCup({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
      <path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M8 3c-.5 1 .5 1.5 0 2.5M12 3c-.5 1 .5 1.5 0 2.5" />
    </svg>
  );
}

function IconMachine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="3" width="16" height="14" rx="2" />
      <path d="M8 7h8" />
      <circle cx="9" cy="12" r="1.3" />
      <circle cx="15" cy="12" r="1.3" />
      <path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

function IconGrinder({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3h8l-1 6H9L8 3Z" />
      <rect x="7" y="9" width="10" height="7" rx="1" />
      <path d="M10 16v3h4v-3" />
      <path d="M12 12v1" />
    </svg>
  );
}

function IconTruck({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
  );
}

function IconMedal({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3h8l-2 6h-4L8 3Z" />
      <circle cx="12" cy="15" r="5" />
      <path d="m10 14 1.5 1.5L14 13" />
    </svg>
  );
}

function IconDiagnosis({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

function IconBlueprint({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10M7 12h6M7 16h8" />
    </svg>
  );
}

function IconInstall({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 4 9 13h4l-1 7 5-9h-4l1-7Z" />
    </svg>
  );
}

function IconBeans({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="9" cy="12" rx="4" ry="6" transform="rotate(-20 9 12)" />
      <ellipse cx="15" cy="12" rx="4" ry="6" transform="rotate(20 15 12)" />
      <path d="M7 8c1 2 1 6 0 8M17 8c-1 2-1 6 0 8" />
    </svg>
  );
}

const steps = [
  {
    title: "Diagnóstico",
    description:
      "Nosso consultor visita seu estabelecimento e entende seu fluxo de operação.",
    Icon: IconDiagnosis,
  },
  {
    title: "Plano sob medida",
    description:
      "Recomendamos o plano, a máquina e o blend ideais para seu perfil de cliente.",
    Icon: IconBlueprint,
  },
  {
    title: "Instalação em 7 dias",
    description:
      "Equipamento entregue, instalado e calibrado. Time treinado no primeiro dia.",
    Icon: IconInstall,
  },
  {
    title: "Grão fresco toda semana",
    description:
      "Torrefação sob demanda, entrega programada. Suporte contínuo com Q-grader.",
    Icon: IconBeans,
  },
];

const includedItems: string[] = [
  "Equipamento profissional em comodato (sem capex)",
  "Café em grãos torrado sob demanda, score SCA 84+",
  "Consultoria técnica com Q-grader dedicado",
  "Treinamento inicial de barista (4h)",
  "Manutenção preventiva e corretiva",
  "Kit de material de PDV (cardápio, placa, fichas de origem)",
  "Portal B2B para pedidos recorrentes",
];

function planIcon(name: string) {
  if (name === "Essential") return IconCup;
  if (name === "Specialty") return IconMachine;
  return IconMedal;
}

export default function B2B() {
  const diagnosticUrl = buildWhatsAppUrl(
    "Olá! Quero um diagnóstico B2B da Zerbinatti para minha cafeteria/hotel/restaurante."
  );

  return (
    <section
      id="contato"
      className="relative overflow-hidden py-10 sm:py-24 lg:py-32"
      style={{
        background:
          "linear-gradient(180deg, #ebe0d2 0%, #e3d2bd 50%, #dcc7a9 100%)",
      }}
    >
      {/* Glows ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-gold-400/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-coffee-700/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Para cafeterias · hotéis · restaurantes
          </span>
          <h2 className="mt-4 font-serif text-2xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            Abra uma cafeteria de especialidade sem investir em equipamento
          </h2>
          <Ornament className="mt-5" />
          <p className="mt-6 text-base leading-relaxed text-coffee-700 sm:mt-8 sm:text-lg">
            Grão premium rastreável (SCA 84+) com equipamento profissional em
            comodato. Da cafeteria de bairro ao hotel flagship — você foca no
            serviço, nós levamos a máquina, o moedor e o barista consultor.
          </p>
        </div>

        {/* Estatistica-ancora */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-gold-500/40 bg-white/60 px-6 py-5 text-center shadow-sm backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-8 sm:text-left">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600"
            >
              <IconMedal className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-coffee-900">
              Economize até <strong className="font-semibold">R$ 190.000</strong> em capex
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-coffee-300 sm:block"
          />
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coffee-900/10 text-coffee-800"
            >
              <IconCup className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-coffee-900">
              Atendemos <strong className="font-semibold">120+ cafeterias</strong> no Brasil
            </span>
          </div>
        </div>

        {/* Planos */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:mt-20 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => {
            const Icon = planIcon(plan.name);
            const waUrl = buildWhatsAppUrl(plan.whatsAppMessage);
            const isHighlighted = plan.highlighted;
            return (
              <article
                key={plan.name}
                className={[
                  "relative flex flex-col rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 sm:p-8",
                  isHighlighted
                    ? "border-2 border-gold-500 ring-4 ring-gold-500/20 md:-translate-y-3"
                    : "border border-coffee-200 hover:-translate-y-1 hover:shadow-lg",
                ].join(" ")}
              >
                {isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-coffee-950 uppercase shadow-md">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2 14 9l7 1-5 5 1.5 7L12 18l-5.5 4L8 15l-5-5 7-1Z" />
                      </svg>
                      Mais popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12",
                      isHighlighted
                        ? "bg-gold-500/15 text-gold-600"
                        : "bg-coffee-900/5 text-coffee-800",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-coffee-900 sm:text-2xl">
                      {plan.name}
                    </h3>
                    <p className="text-xs tracking-wide text-coffee-600 uppercase">
                      {plan.tagline}
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-base text-coffee-900 sm:mt-5 sm:text-lg">
                  {plan.volume}
                </p>

                <dl className="mt-4 space-y-3 border-t border-coffee-100 pt-4 text-sm sm:mt-5 sm:space-y-4 sm:pt-5">
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.18em] text-gold-600 uppercase">
                      Equipamento incluso
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-coffee-700">
                      {plan.equipment}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.18em] text-gold-600 uppercase">
                      Ideal para
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-coffee-700">
                      {plan.idealFor}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2 sm:mt-6 sm:space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-coffee-800">
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={[
                    "mt-6 rounded-xl px-4 py-3 text-sm font-medium",
                    isHighlighted
                      ? "bg-gold-500/10 text-coffee-900"
                      : "bg-coffee-900/[0.04] text-coffee-800",
                  ].join(" ")}
                >
                  {plan.savings}
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.97] sm:mt-6 sm:px-6 sm:py-3.5",
                    isHighlighted
                      ? "bg-gold-500 text-coffee-950 hover:bg-gold-600 hover:shadow-lg"
                      : "bg-coffee-900 text-coffee-50 hover:bg-coffee-700 hover:shadow-lg",
                  ].join(" ")}
                >
                  {plan.ctaLabel}
                </a>
              </article>
            );
          })}
        </div>

        {/* Como funciona o comodato */}
        <div className="mt-14 sm:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              O processo
            </span>
            <h3 className="mt-3 font-serif text-2xl font-bold text-coffee-900 sm:text-3xl md:text-4xl">
              Como funciona o comodato
            </h3>
            <Ornament className="mt-4" />
          </div>

          <ol className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.Icon;
              return (
                <li
                  key={step.title}
                  className="relative flex flex-col rounded-2xl border border-coffee-200 bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:bg-white hover:shadow-md sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-coffee-900/5 text-coffee-800 sm:h-11 sm:w-11"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-serif text-2xl leading-none text-gold-500/60 sm:text-3xl"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="mt-4 font-serif text-base font-semibold text-coffee-900 sm:mt-5 sm:text-lg">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-coffee-700">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* O que está incluído */}
        <div className="mt-14 sm:mt-28">
          <div className="overflow-hidden rounded-3xl border border-coffee-200 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.1fr_1.9fr]">
              <div className="relative border-b border-coffee-100 bg-coffee-900 p-6 text-coffee-50 sm:p-10 lg:border-r lg:border-b-0">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl"
                />
                <span className="relative text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
                  O pacote completo
                </span>
                <h3 className="relative mt-3 font-serif text-2xl leading-tight font-bold sm:text-3xl">
                  O que está incluído
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-coffee-200/90">
                  Um único parceiro, um único contrato — da máquina ao grão,
                  do barista ao PDV. Foque no cliente, deixe o café com a gente.
                </p>
                <div className="relative mt-6 flex items-center gap-3 text-xs tracking-wide text-gold-400 uppercase">
                  <IconTruck className="h-4 w-4" />
                  <span>Entrega semanal programada</span>
                </div>
                <div className="relative mt-3 flex items-center gap-3 text-xs tracking-wide text-gold-400 uppercase">
                  <IconGrinder className="h-4 w-4" />
                  <span>Calibração on-site</span>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-x-6 gap-y-3 p-6 sm:gap-y-4 sm:p-10 md:grid-cols-2">
                {includedItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-coffee-800"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600"
                    >
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTAs finais */}
        <div className="mt-12 sm:mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-serif text-xl font-bold text-coffee-900 sm:text-3xl">
              Pronto para servir o melhor café especial do Brasil?
            </h3>
            <p className="mt-4 text-base text-coffee-700">
              Um consultor visita seu estabelecimento sem custo e sem compromisso.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={diagnosticUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-coffee-950 shadow-md transition-all duration-200 hover:bg-gold-600 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
                Solicitar diagnóstico gratuito
              </a>

              <Link
                href="/para-empresas"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-coffee-300 bg-white/60 px-8 py-4 text-sm font-medium text-coffee-900 transition-all duration-200 hover:border-coffee-500 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 active:scale-[0.97]"
              >
                Ver programa completo
              </Link>
            </div>

            <div className="mt-5">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium text-coffee-700 underline underline-offset-4 hover:text-coffee-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                Ou envie e-mail
              </a>
            </div>

            <p className="mt-6 text-xs tracking-wide text-coffee-600">
              Atendemos todo Brasil. Em SP/RJ/MG entrega semanal. Demais estados sob consulta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

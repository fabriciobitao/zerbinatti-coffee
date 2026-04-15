const plans = [
  {
    name: "Descoberta",
    price: "R$ 69,90",
    frequency: "/mês",
    description: "Perfeito para quem está começando no mundo do café especial.",
    features: [
      "1 pacote de 500g por mês",
      "Blend escolhido pelo mestre torrador",
      "Ficha de degustação inclusa",
      "Frete grátis",
    ],
    cta: "Começar Descoberta",
    highlight: false,
  },
  {
    name: "Connoisseur",
    price: "R$ 122,90",
    frequency: "/mês",
    description: "Para quem busca cafés únicos de diferentes regiões do Brasil.",
    features: [
      "2 pacotes de 500g por mês",
      "Single origins exclusivos",
      "Notas de degustação detalhadas",
      "Acesso a micro-lotes primeiro",
      "Frete grátis",
    ],
    cta: "Ser Connoisseur",
    highlight: true,
  },
  {
    name: "Colecionador",
    price: "R$ 209,90",
    frequency: "/mês",
    description: "A experiência completa para verdadeiros apaixonados.",
    features: [
      "3 pacotes de 500g por mês",
      "Micro-lotes e raridades",
      "Kit de degustação profissional",
      "Convite para eventos exclusivos",
      "Desconto de 15% na loja",
      "Frete grátis",
    ],
    cta: "Ser Colecionador",
    highlight: false,
  },
];

export default function Subscription() {
  return (
    <section id="assinatura" className="bg-coffee-950 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
            Assinatura
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-coffee-50 md:text-5xl">
            Café Especial Todo Mês
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-400">
            Receba cafés selecionados na sua porta. Pause, troque ou cancele
            quando quiser. Sem compromisso.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-gold-500" />
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all ${
                plan.highlight
                  ? "border-2 border-gold-500 bg-coffee-900 shadow-2xl shadow-gold-500/10"
                  : "border border-coffee-800 bg-coffee-900/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-xs font-bold tracking-wide text-coffee-950 uppercase">
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-serif text-2xl font-bold text-coffee-50">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-coffee-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="font-serif text-4xl font-bold text-coffee-50">
                  {plan.price}
                </span>
                <span className="text-coffee-400">{plan.frequency}</span>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-gold-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-coffee-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-full py-3 text-sm font-semibold tracking-wide transition-all ${
                  plan.highlight
                    ? "bg-gold-500 text-coffee-950 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
                    : "border border-coffee-600 text-coffee-200 hover:border-gold-500 hover:text-gold-400"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-sm text-coffee-500">
            ✦ Satisfação garantida ou seu dinheiro de volta no primeiro mês ✦
          </p>
        </div>
      </div>
    </section>
  );
}

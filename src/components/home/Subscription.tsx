import SubscriptionConfigurator from "@/components/SubscriptionConfigurator";

/**
 * Assinatura na Home — bloco editorial split 50/50.
 * Configurador delegado ao componente reutilizado por /assinatura.
 */

const Icons = {
  flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2c0 4-3 5-3 9a3 3 0 0 0 6 0c0-2-1-3-1-5 2 1 4 3 4 7a6 6 0 0 1-12 0c0-5 6-7 6-11z" />
    </svg>
  ),
  pause: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      <line x1="9" y1="5" x2="9" y2="19" />
      <line x1="15" y1="5" x2="15" y2="19" />
    </svg>
  ),
  ship: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="14" height="11" />
      <path d="M17 11h4l-2 7h-2" />
      <path d="M21 7l-4 0" />
    </svg>
  ),
  percent: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </svg>
  ),
};

const GUARANTEES = [
  { icon: Icons.flame, text: "Torra fresca, sob demanda" },
  { icon: Icons.pause, text: "Pause ou cancele quando quiser" },
  { icon: Icons.ship, text: "Frete grátis em todo o Brasil" },
  { icon: Icons.percent, text: "Primeiro envio com 15% de desconto" },
];

export default function Subscription() {
  return (
    <section
      id="assinatura"
      aria-labelledby="assinatura-title"
      className="dark-section bg-ink py-24 lg:py-40"
    >
      <div className="container-editorial">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Coluna esquerda */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow text-bone-soft">O CARTÃO DA CASA</p>
            <h2 id="assinatura-title" className="text-h1 mt-8 text-bone">
              A casa escolhe.
              <br />
              Você{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                recebe.
              </em>
            </h2>
            <p
              className="text-lede mt-8 text-bone-soft"
              style={{ maxWidth: "440px" }}
            >
              Quinzenal ou mensal. Um pacote por entrega, torrado na semana,
              com a moagem que você preferir.
            </p>

            <ul className="mt-12 space-y-4">
              {GUARANTEES.map((g, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-[15px] leading-[1.6] text-bone-soft"
                >
                  <span className="text-olive shrink-0" aria-hidden="true">
                    {g.icon}
                  </span>
                  {g.text}
                </li>
              ))}
            </ul>

            <a
              href="/quiz"
              className="mt-8 inline-block text-sm font-medium text-bone underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
            >
              Não sabe qual escolher? Faça o teste em 30 segundos →
            </a>
          </div>

          {/* Coluna direita — configurador */}
          <SubscriptionConfigurator idPrefix="home-config" />
        </div>
      </div>
    </section>
  );
}

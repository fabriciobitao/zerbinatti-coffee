"use client";

import { buildWhatsAppUrl } from "@/lib/config";
import { FAQ } from "@/components/ui/FAQ";
import { Ornament } from "@/components/ui/Ornament";

const faqItems = [
  {
    q: "Posso pausar ou cancelar a qualquer momento?",
    a: "Sim. Pause, adie a próxima remessa ou cancele a assinatura sem multa, sem pergunta. Tudo pela área do cliente ou via WhatsApp. Você continua no controle.",
  },
  {
    q: "Quando chega a primeira caixa?",
    a: "Assinaturas confirmadas até quarta-feira entram na torra da semana e são postadas na sexta. Capitais recebem em 3-5 dias úteis; interior em 5-8 dias úteis.",
  },
  {
    q: "Posso escolher o café de cada mês ou muda sozinho?",
    a: "No Apreciador, o mestre torrador seleciona. No Sommelier e Herdeiro você pode trocar, fixar um favorito ou pedir surpresa — a decisão é sua.",
  },
  {
    q: "Qual a diferença entre assinar e comprar avulso?",
    a: "Assinantes pagam até 15% menos, recebem antes dos avulsos em lançamentos de micro-lote, e têm frete grátis sempre. Além de um bilhete escrito à mão do torrador explicando o café do mês.",
  },
  {
    q: "Meu plano atende dois ou mais bebedores?",
    a: "O Apreciador (500g/mês) rende para 1 pessoa que toma 2 xícaras/dia. O Sommelier (1kg/mês) atende casal. O Herdeiro (1,5kg/mês) é perfeito para família de 3-4 pessoas.",
  },
  {
    q: "Como funciona a garantia de satisfação?",
    a: "Se o primeiro mês não te conquistar, devolvemos 100% do valor. Sem precisar devolver o pacote. Simples assim — confiamos no café que torramos.",
  },
];

type Plan = {
  name: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  frequency: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

const plans: Plan[] = [
  {
    name: "Apreciador",
    price: "R$ 69,99",
    frequency: "/mês",
    description: "Perfeito para quem está começando no mundo do café especial.",
    features: [
      "1 pacote de 500g por mês",
      "Blend escolhido pelo mestre torrador",
      "Ficha de degustação inclusa",
      "15% off do preço avulso",
      "Frete grátis",
    ],
    cta: "Ser Apreciador",
    highlight: false,
  },
  {
    name: "Sommelier",
    price: "R$ 122,90",
    frequency: "/mês",
    description: "Para quem já sabe a diferença que um Zerbinatti faz na xícara.",
    features: [
      "2 pacotes de 500g por mês",
      "Single origins exclusivos",
      "Notas de degustação detalhadas",
      "Acesso a micro-lotes primeiro",
      "Frete grátis",
    ],
    cta: "Ser Sommelier",
    highlight: true,
  },
  {
    name: "Herdeiro",
    price: "R$ 209,90",
    frequency: "/mês",
    description: "O legado Zerbinatti começa em 1897. Agora passa por você.",
    features: [
      "3 pacotes de 500g por mês",
      "Micro-lotes e raridades",
      "Kit de degustação profissional",
      "Convite para eventos exclusivos",
      "Desconto de 15% na loja",
      "Frete grátis",
    ],
    cta: "Ser Herdeiro",
    highlight: false,
  },
];

function subscribeUrl(planName: string, price: string) {
  const msg = `Olá! Quero assinar o plano ${planName} (${price}/mês) da Zerbinatti Coffee. Pode me guiar para finalizar a assinatura?`;
  return buildWhatsAppUrl(msg);
}

export default function Subscription() {
  return (
    <section id="assinatura" className="bg-coffee-950 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
            Assinatura
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-50 sm:text-4xl md:text-5xl">
            A curadoria da casa, todo mês na sua mesa
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-coffee-300">
            O mestre de torra escolhe o café do mês. Você recebe torrado sob
            demanda, com ficha técnica e carta da casa. Pause, troque ou
            cancele com um clique — sem ligação, sem multa.
          </p>
          <Ornament className="mt-6" />
        </div>

        {/* Plans */}
        <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-5 transition-all sm:p-8 ${
                plan.highlight
                  ? "border-2 border-gold-500 bg-coffee-900 shadow-2xl shadow-gold-500/10"
                  : "border border-coffee-800 bg-coffee-900/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-xs font-bold tracking-wide text-coffee-950 uppercase">
                  Mais popular
                </div>
              )}

              <div className="mb-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-coffee-50">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-coffee-300">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.originalPrice && (
                  <div className="mb-1 text-sm text-coffee-500 line-through">
                    {plan.originalPrice}
                  </div>
                )}
                <span className="font-serif text-3xl font-bold text-coffee-50 sm:text-4xl">
                  {plan.price}
                </span>
                <span className="text-coffee-300">{plan.frequency}</span>
                {plan.savings && (
                  <div className="mt-2 inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-semibold text-gold-400">
                    {plan.savings}
                  </div>
                )}
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
                    <span className="text-sm text-coffee-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={subscribeUrl(plan.name, plan.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto block w-full rounded-full py-3 text-center text-sm font-semibold tracking-wide transition-all ${
                  plan.highlight
                    ? "bg-gold-500 text-coffee-950 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
                    : "bg-coffee-700 text-coffee-50 hover:bg-coffee-600 hover:shadow-lg"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-16 rounded-2xl border border-coffee-800 bg-coffee-900/40 p-6 sm:p-10">
          <h3 className="text-center font-serif text-xl font-bold text-coffee-50 sm:text-2xl">
            Como funciona
          </h3>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "1",
                t: "Escolha seu plano",
                d: "Apreciador, Sommelier ou Herdeiro — cancele quando quiser.",
              },
              {
                n: "2",
                t: "Nós torramos e enviamos",
                d: "Seu café sai da torrefação para sua casa em até 5 dias úteis.",
              },
              {
                n: "3",
                t: "Pause, troque ou adie",
                d: "Vai viajar? Pausa com um clique. Sem multa, sem burocracia.",
              },
              {
                n: "4",
                t: "Receba todo mês",
                d: "Café fresco chegando sozinho — você só abre e prepara.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-sm font-bold text-coffee-950">
                  {s.n}
                </div>
                <h4 className="mt-4 font-serif text-lg font-bold text-coffee-50">
                  {s.t}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-coffee-300">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
              Dúvidas frequentes
            </span>
            <h3 className="mt-3 font-serif text-2xl font-bold text-coffee-50 sm:text-3xl">
              Tudo que você precisa saber antes de assinar
            </h3>
          </div>
          <div className="mt-8 rounded-2xl border border-coffee-800 bg-coffee-900/40 px-6 sm:px-8">
            <FAQ items={faqItems} theme="dark" />
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-sm text-coffee-300">
            ✦ Satisfação garantida ou seu dinheiro de volta no primeiro mês ✦
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const questions = [
  {
    step: 1,
    label: "Preparo",
    question: "Como você costuma preparar seu café?",
    options: [
      { text: "Coador / Filtro", points: { classico: 3, reserva: 1, micro: 0 } },
      { text: "Cafeteira Italiana (Moka)", points: { classico: 2, reserva: 2, micro: 1 } },
      { text: "Espresso / Máquina", points: { classico: 1, reserva: 2, micro: 2 } },
      { text: "Prensa Francesa", points: { classico: 1, reserva: 2, micro: 3 } },
      { text: "Hario V60 / Chemex", points: { classico: 0, reserva: 2, micro: 3 } },
    ],
  },
  {
    step: 2,
    label: "Sabor",
    question: "Quais sabores mais te agradam?",
    options: [
      { text: "Chocolate e caramelo", points: { classico: 3, reserva: 1, micro: 0 } },
      { text: "Nozes e amêndoas", points: { classico: 2, reserva: 2, micro: 1 } },
      { text: "Frutas vermelhas e mel", points: { classico: 0, reserva: 3, micro: 1 } },
      { text: "Cítricos e florais", points: { classico: 0, reserva: 1, micro: 3 } },
      { text: "Ainda estou descobrindo", points: { classico: 2, reserva: 2, micro: 1 } },
    ],
  },
  {
    step: 3,
    label: "Intensidade",
    question: "Qual intensidade você prefere?",
    options: [
      { text: "Suave e delicado", points: { classico: 1, reserva: 1, micro: 3 } },
      { text: "Equilibrado", points: { classico: 2, reserva: 3, micro: 1 } },
      { text: "Encorpado e forte", points: { classico: 3, reserva: 1, micro: 0 } },
    ],
  },
  {
    step: 4,
    label: "Momento",
    question: "Quando é seu momento de café?",
    options: [
      { text: "Logo ao acordar, preciso de energia", points: { classico: 3, reserva: 1, micro: 0 } },
      { text: "Após as refeições, com calma", points: { classico: 1, reserva: 3, micro: 1 } },
      { text: "À tarde, um ritual de pausa", points: { classico: 1, reserva: 2, micro: 2 } },
      { text: "Na mesa com família e amigos", points: { classico: 0, reserva: 1, micro: 3 } },
    ],
  },
];

type ProductKey = "classico" | "reserva" | "micro";

const catalog: Record<
  ProductKey,
  {
    id: string;
    slug: string;
    name: string;
    price: number;
    weight: string;
    roast: string;
    description: string;
  }
> = {
  classico: {
    id: "classico-500g",
    slug: "classico",
    name: "Clássico Zerbinatti",
    price: 69.9,
    weight: "500g",
    roast: "Torra Média",
    description:
      "Blend da família desde 1897. Chocolate, caramelo e nozes — o café do dia a dia que atravessa gerações.",
  },
  reserva: {
    id: "reserva-500g",
    slug: "reserva",
    name: "Reserva Especial",
    price: 89.9,
    weight: "500g",
    roast: "Torra Média-Clara",
    description:
      "Single origin com doçura de frutas vermelhas e mel. Para quem busca equilíbrio e complexidade.",
  },
  micro: {
    id: "microlote-500g",
    slug: "microlote",
    name: "Micro-Lote Premium",
    price: 119.9,
    weight: "500g",
    roast: "Torra Clara",
    description:
      "Geisha SCA 90+. Jasmim, bergamota, mel de laranjeira. Raridade da safra 2025.",
  },
};

const profiles: Record<
  ProductKey,
  { name: string; tagline: string; description: string }
> = {
  classico: {
    name: "O Clássico",
    tagline: "Quem sabe o que gosta e volta sempre.",
    description:
      "Você prefere cafés doces, encorpados e previsíveis no melhor sentido — um abraço firme de manhã. Valoriza consistência mais que surpresa.",
  },
  reserva: {
    name: "O Curador",
    tagline: "Equilíbrio entre doçura e descoberta.",
    description:
      "Seu paladar busca o ponto onde doçura encontra acidez e corpo encontra clareza. Aprecia o café que conversa com a comida e dura na memória.",
  },
  micro: {
    name: "O Explorador",
    tagline: "Paladar treinado, quer o que poucos provam.",
    description:
      "Você caça cafés raros, florais, de complexidade viva. Toma café como toma vinho — com atenção, em xícara pequena, notas anotadas.",
  },
};

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [finished, setFinished] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { addItem } = useCart();

  const getScores = () => {
    const totals = { classico: 0, reserva: 0, micro: 0 };
    answers.forEach((answerIdx, stepIdx) => {
      if (answerIdx !== null) {
        const pts = questions[stepIdx].options[answerIdx].points;
        totals.classico += pts.classico;
        totals.reserva += pts.reserva;
        totals.micro += pts.micro;
      }
    });
    return totals;
  };

  /**
   * Converte scores em % de match. Usa o teto teórico do questionário
   * (soma máxima possível) para normalizar — assim um match de 100%
   * representa "perfeitamente aderente" e não só "o café que mais pontuou".
   */
  const getRanking = () => {
    const scores = getScores();
    const maxPerKey = questions.reduce((acc, q) => {
      const localMax = Math.max(
        ...q.options.map((o) => Math.max(o.points.classico, o.points.reserva, o.points.micro))
      );
      return acc + localMax;
    }, 0);
    const entries = (Object.entries(scores) as [ProductKey, number][])
      .map(([key, score]) => ({
        key,
        score,
        match: Math.round((score / maxPerKey) * 100),
      }))
      .sort((a, b) => b.score - a.score);
    return entries;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      localStorage.setItem("zerbinatti-quiz-email", email);
    } catch {}
    try {
      const ranking = getRanking();
      const winner = ranking[0];
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quiz",
          email,
          metadata: {
            recommended: catalog[winner.key].name,
            profile: profiles[winner.key].name,
            match: winner.match,
            source: "quiz",
          },
        }),
      });
    } catch {}
    setEmailSubmitted(true);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
    setEmailSubmitted(false);
    setEmail("");
  };

  // Landing state
  if (!started) {
    return (
      <section id="quiz" className="relative overflow-hidden bg-coffee-50 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=30')" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">Descobrir meu café</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            Qual café combina com você?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-coffee-600 sm:mt-6 sm:text-lg">
            Quatro perguntas. Ao final, a casa traduz seu paladar em um perfil
            e te indica os três cafés que melhor conversam com ele.
          </p>

          <div className="mt-8 flex items-center justify-center gap-1.5 sm:mt-12 sm:gap-3">
            {["Preparo", "Sabor", "Intensidade", "Momento", "Perfil"].map((step, i) => (
              <div key={step} className="flex items-center gap-1.5 sm:gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:text-sm ${i === 4 ? "bg-gold-500 text-coffee-950" : "bg-coffee-200 text-coffee-800"}`}>
                    {i + 1}
                  </div>
                  <span className="mt-1 hidden text-xs text-coffee-600 sm:block">{step}</span>
                </div>
                {i < 4 && <div className="h-px w-4 bg-coffee-300 sm:mb-5 sm:w-12" />}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            className="mt-12 rounded-full bg-coffee-900 px-10 py-4 text-sm font-semibold tracking-wide text-coffee-50 uppercase transition-all duration-200 hover:bg-coffee-800 hover:shadow-xl active:scale-[0.97]"
          >
            Começar — 2 minutos
          </button>
          <p className="mt-4 text-sm text-coffee-600">Sem cadastro para começar. Sua resposta fica só com você.</p>
        </div>
      </section>
    );
  }

  // Result state
  if (finished) {
    const ranking = getRanking();
    const winnerKey = ranking[0].key;
    const profile = profiles[winnerKey];
    const topProduct = catalog[winnerKey];
    const subscriptionDiscount = topProduct.price * 0.85;

    return (
      <section id="quiz" className="bg-coffee-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Profile card */}
          <div className="text-center">
            <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
              Seu perfil
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
              Você é <span className="italic text-coffee-700">{profile.name}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base italic text-coffee-600">
              {profile.tagline}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-coffee-700">
              {profile.description}
            </p>
          </div>

          {/* Top recommendation */}
          <div className="mx-auto mt-12 max-w-md rounded-2xl border-2 border-gold-500 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-coffee-950">
                Melhor match · {ranking[0].match}%
              </span>
              <span className="text-xs text-coffee-600">{topProduct.roast}</span>
            </div>
            <div className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full bg-coffee-100">
              <img src="/images/rotulo-500g.png" alt={topProduct.name} className="h-16 w-auto object-contain" />
            </div>
            <h3 className="mt-4 text-center font-serif text-2xl font-bold text-coffee-900">{topProduct.name}</h3>
            <p className="mt-3 text-center text-coffee-700">{topProduct.description}</p>

            <div className="mt-6 rounded-lg bg-coffee-50 p-4 text-center">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl font-bold text-green-800">
                  {(topProduct.price * 0.9).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-sm text-green-700">no PIX</span>
              </div>
              <div className="mt-1 text-sm text-coffee-600">
                ou {topProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no cartão
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() =>
                  addItem({
                    id: topProduct.id,
                    name: topProduct.name,
                    price: topProduct.price,
                    weight: topProduct.weight,
                  })
                }
                className="w-full rounded-full bg-gold-500 py-3.5 text-sm font-bold tracking-wide text-coffee-950 transition-all duration-200 hover:bg-gold-400 hover:shadow-lg active:scale-[0.97]"
              >
                Adicionar ao carrinho
              </button>
              <Link
                href={`/cafes/${topProduct.slug}`}
                className="w-full rounded-full border border-coffee-300 py-3 text-center text-sm font-semibold text-coffee-900 transition-all hover:border-coffee-500 hover:bg-white"
              >
                Ver ficha completa
              </Link>
            </div>
          </div>

          {/* Outros matches */}
          <div className="mt-10">
            <h3 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-coffee-600">
              Também conversam com seu perfil
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {ranking.slice(1).map((r) => {
                const p = catalog[r.key];
                return (
                  <Link
                    key={r.key}
                    href={`/cafes/${p.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-coffee-200 bg-white p-4 transition-all hover:border-coffee-400 hover:shadow-md"
                  >
                    <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded bg-coffee-100">
                      <img src="/images/rotulo-500g.png" alt="" className="h-11 w-auto object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-coffee-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-coffee-800">
                          {r.match}% match
                        </span>
                        <span className="text-[10px] text-coffee-500">{p.roast}</span>
                      </div>
                      <h4 className="mt-2 font-serif text-base font-bold text-coffee-900 group-hover:text-coffee-700">
                        {p.name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-coffee-600">{p.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Upsell: assinatura */}
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-coffee-900 bg-coffee-900 p-6 text-left shadow-lg">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-coffee-950 uppercase">
                Economize 15%
              </div>
            </div>
            <h4 className="mt-3 font-serif text-lg font-bold text-coffee-50">
              Receba o {topProduct.name} todo mês por{" "}
              {subscriptionDiscount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </h4>
            <p className="mt-2 text-sm text-coffee-300">
              Torra sob demanda · frete grátis · pause quando quiser. Economia
              anual de{" "}
              <span className="font-semibold text-gold-400">
                {((topProduct.price - subscriptionDiscount) * 12).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                )}
              </span>
              .
            </p>
            <Link
              href="/#assinatura"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gold-500 py-3 text-sm font-bold text-coffee-950 transition-all hover:bg-gold-400"
            >
              Ver planos de assinatura
            </Link>
          </div>

          {/* Email capture */}
          {!emailSubmitted ? (
            <form
              onSubmit={handleEmailSubmit}
              className="mx-auto mt-10 max-w-md rounded-2xl border border-coffee-200 bg-white p-6 text-left"
            >
              <label htmlFor="quiz-email" className="text-xs font-semibold tracking-[0.2em] text-coffee-600 uppercase">
                Guarde seu perfil
              </label>
              <p className="mt-2 text-sm text-coffee-700">
                Deixe seu e-mail e a casa envia a ficha do seu café + 10% off na
                primeira compra.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  id="quiz-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="flex-1 rounded-full border border-coffee-200 bg-coffee-50 px-4 py-2.5 text-sm text-coffee-900 outline-none placeholder:text-coffee-500 focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-coffee-900 px-5 py-2.5 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700 active:scale-[0.97]"
                >
                  Receber
                </button>
              </div>
              <p className="mt-3 text-[11px] text-coffee-500">
                Sem spam. Consulte nossa{" "}
                <Link href="/privacidade" className="underline hover:text-coffee-800">
                  política de privacidade
                </Link>
                .
              </p>
            </form>
          ) : (
            <div className="mx-auto mt-10 max-w-md rounded-2xl border border-green-700 bg-green-700/10 p-6 text-center">
              <p className="text-sm font-semibold text-green-800">
                ✓ Enviamos seu perfil e o cupom para {email}.
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={restart}
              className="text-sm text-coffee-600 underline hover:text-coffee-900"
            >
              Refazer o quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Question state
  const q = questions[currentStep];
  const progress = ((currentStep + 1) / (questions.length + 1)) * 100;

  return (
    <section id="quiz" className="bg-coffee-50 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between text-xs text-coffee-600">
          <span>Pergunta {currentStep + 1} de {questions.length}</span>
          <span className="font-semibold uppercase tracking-wider text-gold-600">{q.label}</span>
        </div>
        <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-coffee-200">
          <div className="h-full rounded-full bg-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="mb-10 flex items-center justify-center gap-3">
          {questions.map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                i < currentStep ? "bg-gold-500 text-coffee-950" :
                i === currentStep ? "bg-coffee-900 text-coffee-50 ring-4 ring-coffee-900/20" :
                "bg-coffee-200 text-coffee-500"
              }`}>
                {i < currentStep ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < questions.length - 1 && (
                <div className={`h-px w-6 transition-colors duration-300 ${i < currentStep ? "bg-gold-500" : "bg-coffee-200"}`} />
              )}
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-coffee-200" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-200 text-xs font-bold text-coffee-500">5</div>
          </div>
        </div>

        <h3 className="text-center font-serif text-2xl font-bold text-coffee-900 md:text-3xl">{q.question}</h3>

        <div className="mt-8 space-y-3">
          {q.options.map((option) => (
            <button
              key={option.text}
              onClick={() => handleAnswer(q.options.indexOf(option))}
              className={`w-full rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 hover:border-gold-500 hover:bg-gold-500/5 hover:shadow-md active:scale-[0.98] sm:px-6 sm:py-4 ${
                answers[currentStep] === q.options.indexOf(option)
                  ? "border-gold-500 bg-gold-500/10 text-coffee-900"
                  : "border-coffee-200 bg-white text-coffee-800"
              }`}
            >
              <span className="text-base font-medium">{option.text}</span>
            </button>
          ))}
        </div>

        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="mt-6 text-sm text-coffee-500 hover:text-coffee-700"
          >
            ← Voltar
          </button>
        )}
      </div>
    </section>
  );
}

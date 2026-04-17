"use client";

import { useState } from "react";
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
      { text: "Chocolate e Caramelo", points: { classico: 3, reserva: 1, micro: 0 } },
      { text: "Nozes e Amêndoas", points: { classico: 2, reserva: 2, micro: 1 } },
      { text: "Frutas Vermelhas e Mel", points: { classico: 0, reserva: 3, micro: 1 } },
      { text: "Cítricos e Florais", points: { classico: 0, reserva: 1, micro: 3 } },
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
    question: "Quando é seu momento favorito de café?",
    options: [
      { text: "Logo ao acordar, preciso de energia", points: { classico: 3, reserva: 1, micro: 0 } },
      { text: "Após as refeições, com calma", points: { classico: 1, reserva: 3, micro: 1 } },
      { text: "À tarde, um ritual de pausa", points: { classico: 1, reserva: 2, micro: 2 } },
      { text: "Degustação com amigos/família", points: { classico: 0, reserva: 1, micro: 3 } },
    ],
  },
];

const results: Record<string, { id: string; name: string; price: number; weight: string; description: string; roast: string }> = {
  classico: {
    id: "classico-500g",
    name: "Clássico Zerbinatti",
    price: 69.9,
    weight: "500g",
    description: "Blend tradicional com notas de chocolate, caramelo e nozes. Corpo encorpado e acidez suave — perfeito para o dia a dia.",
    roast: "Torra Média",
  },
  reserva: {
    id: "reserva-500g",
    name: "Reserva Especial",
    price: 89.9,
    weight: "500g",
    description: "Single origin de colheita seletiva. Notas de frutas vermelhas e mel com acidez equilibrada — para quem busca complexidade.",
    roast: "Torra Média-Clara",
  },
  micro: {
    id: "microlote-500g",
    name: "Micro-Lote Premium",
    price: 119.9,
    weight: "500g",
    description: "Lote exclusivo com notas florais, cítricas e acidez brilhante — para paladares refinados que buscam raridade.",
    roast: "Torra Clara",
  },
};

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [finished, setFinished] = useState(false);
  const { addItem } = useCart();

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

  const getResult = () => {
    const scores = getScores();
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    return results[winner];
  };

  const restart = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers(questions.map(() => null));
    setFinished(false);
  };

  // Landing state
  if (!started) {
    return (
      <section id="quiz" className="relative overflow-hidden bg-coffee-50 py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=30')" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">Experiência Personalizada</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">Descubra Seu Café Ideal</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-coffee-600 sm:mt-6 sm:text-lg">
            Responda 4 perguntas rápidas e nosso algoritmo encontra o café perfeito para o seu paladar.
          </p>

          <div className="mt-8 flex items-center justify-center gap-1.5 sm:mt-12 sm:gap-3">
            {["Preparo", "Sabor", "Intensidade", "Momento", "Resultado"].map((step, i) => (
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
            Começar o Quiz — 2 minutos
          </button>
          <p className="mt-4 text-sm text-coffee-600">Mais de 2.000 pessoas já descobriram seu café ideal</p>
        </div>
      </section>
    );
  }

  // Result state
  if (finished) {
    const result = getResult();
    return (
      <section id="quiz" className="bg-coffee-50 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">Seu Resultado</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">Seu café ideal é</h2>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-gold-500 bg-white p-5 shadow-xl sm:mt-10 sm:p-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-coffee-100">
              <img src="/images/rotulo-500g.png" alt={result.name} className="h-16 w-auto object-contain" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-coffee-900">{result.name}</h3>
            <p className="mt-1 text-sm text-gold-600">{result.roast} · {result.weight}</p>
            <p className="mt-4 text-coffee-600">{result.description}</p>

            <div className="mt-6 rounded-lg bg-coffee-50 p-4">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl font-bold text-green-800">
                  {(result.price * 0.9).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-sm text-green-700">no PIX</span>
              </div>
              <div className="mt-1 text-sm text-coffee-400">
                ou {result.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no cartão
              </div>
            </div>

            <button
              onClick={() => addItem({ id: result.id, name: result.name, price: result.price, weight: result.weight })}
              className="mt-6 w-full rounded-full bg-gold-500 py-3.5 text-sm font-bold tracking-wide text-coffee-950 transition-all duration-200 hover:bg-gold-400 hover:shadow-lg active:scale-[0.97]"
            >
              Adicionar ao Carrinho
            </button>
          </div>

          <button onClick={restart} className="mt-6 text-sm text-coffee-500 hover:text-coffee-700">
            Refazer o Quiz
          </button>
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
        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between text-xs text-coffee-400">
          <span>Pergunta {currentStep + 1} de {questions.length}</span>
          <span>{q.label}</span>
        </div>
        <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-coffee-200">
          <div className="h-full rounded-full bg-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Step indicators */}
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
          {/* Result step */}
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-coffee-200" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-coffee-200 text-xs font-bold text-coffee-500">5</div>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-center font-serif text-2xl font-bold text-coffee-900 md:text-3xl">{q.question}</h3>

        {/* Options */}
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

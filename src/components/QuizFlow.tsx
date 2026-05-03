"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics/track";

type Step = "intro" | "q1" | "q2" | "q3" | "result";
type Choice = "A" | "B" | "C" | "D";

const QUESTIONS: {
  key: "q1" | "q2" | "q3";
  index: string;
  h2Pre: string;
  h2Italic: string;
  h2Pos: string;
  lede: string;
  options: { letter: Choice; title: string; sub: string }[];
}[] = [
  {
    key: "q1",
    index: "01 / 03",
    h2Pre: "Como você ",
    h2Italic: "prepara",
    h2Pos: " café em casa?",
    lede: "Marque o método principal. Se usa mais de um, escolha o mais frequente.",
    options: [
      {
        letter: "A",
        title: "Coador, prensa ou Moka",
        sub: "Método tradicional, moagem média ou grossa. Funciona com café moído pronto.",
      },
      {
        letter: "B",
        title: "V60, Chemex ou Aeropress",
        sub: "Métodos de filtro com moagem específica. Você tem moedor ou compra moído sob medida.",
      },
      {
        letter: "C",
        title: "Espresso (máquina de bar ou cafeteira italiana profissional)",
        sub: "Moagem fina, pressão alta, dose precisa. Consumo elevado.",
      },
      {
        letter: "D",
        title: "Cafeteira elétrica de filtro",
        sub: "Padrão de escritório ou casa pragmática. Moagem média, café pronto em minutos.",
      },
    ],
  },
  {
    key: "q2",
    index: "02 / 03",
    h2Pre: "Que ",
    h2Italic: "tipo",
    h2Pos: " de café te agrada mais?",
    lede: "Sem certo ou errado. A casa só usa essa resposta para ajustar a recomendação.",
    options: [
      {
        letter: "A",
        title: "Encorpado, doce, com notas de chocolate e nozes",
        sub: 'Café "de domingo", que enche a boca, vai bem com leite. Brasil clássico.',
      },
      {
        letter: "B",
        title: "Equilibrado, com acidez frutada discreta",
        sub: "Café limpo, doçura presente, leve acidez de fruta seca ou cítrica. Caráter brasileiro contemporâneo.",
      },
      {
        letter: "C",
        title: "Vivo, ácido, com notas florais ou frutadas marcantes",
        sub: 'Cafés mais "experimentais", cup score alto, perfil quase de chá. Para quem já bebeu muito especial.',
      },
      {
        letter: "D",
        title: "Honestamente, ainda estou descobrindo",
        sub: "Sem preferência fechada. Quer começar pelo blend da casa e ir refinando.",
      },
    ],
  },
  {
    key: "q3",
    index: "03 / 03",
    h2Pre: "Quantos cafés você ",
    h2Italic: "toma",
    h2Pos: " por dia, em média?",
    lede: "Para casa inteira ou só pra você — pensa no consumo total.",
    options: [
      {
        letter: "A",
        title: "Um por dia, ou só de fim de semana",
        sub: "Consumo leve. Um pacote dura entre quatro e seis semanas.",
      },
      {
        letter: "B",
        title: "Dois a três por dia",
        sub: "Consumo médio. Um pacote de 250g dura 2–3 semanas. Um de 500g, 5–6 semanas.",
      },
      {
        letter: "C",
        title: "Quatro ou mais, todos os dias",
        sub: "Consumo alto. Um pacote de 500g dura cerca de 3 semanas. Quinzenal recomendado.",
      },
      {
        letter: "D",
        title: "Casa inteira bebe — somos 3 ou mais",
        sub: "Consumo coletivo. 500g desaparece em duas semanas ou menos.",
      },
    ],
  },
];

type ResultKey = "A" | "B" | "C";

const RESULTS: Record<
  ResultKey,
  {
    cafe: string;
    freq: "mensal" | "quinzenal";
    h2Pre: string;
    h2Italic: string;
    h2Pos: string;
    body: string;
    pkgTitle: string;
    pkgFreqLine: string;
    perKgLine: string;
  }
> = {
  A: {
    cafe: "zerbinatti-250g-moido",
    freq: "mensal",
    h2Pre: "Pacote ",
    h2Italic: "Coador",
    h2Pos: ", mensal.",
    body: "Pelo método e pelo consumo, sua casa pede praticidade — não vale a pena ter moedor para o ritmo que você tem. O Pacote Coador chega moído na medida certa para coador, prensa ou cafeteira elétrica. Frequência mensal cobre seu consumo sem sobrar pacote aberto. O blend da casa entrega o que você indicou: encorpado, doce, sem amargor.",
    pkgTitle: "Pacote Coador — 250g moído",
    pkgFreqLine: "Mensal · R$ 42,42 por envio (1º com -15%)",
    perKgLine:
      "Equivale a R$ 169,66/kg · frete grátis · 1º envio com -15%",
  },
  B: {
    cafe: "zerbinatti-250g-graos",
    freq: "mensal",
    h2Pre: "Pacote ",
    h2Italic: "Mesa",
    h2Pos: ", mensal.",
    body: "Você mói em casa e bebe em ritmo médio — o Pacote Mesa de 250g em grãos é o ponto de partida ideal. Conhece o café antes de fixar o 500g, e a frequência mensal acompanha o seu consumo sem deixar grão envelhecendo no pote. O blend da casa entrega o equilíbrio que você descreveu: doçura presente, acidez na medida, corpo redondo.",
    pkgTitle: "Pacote Mesa — 250g em grãos",
    pkgFreqLine: "Mensal · R$ 42,42 por envio (1º com -15%)",
    perKgLine:
      "Equivale a R$ 169,66/kg · frete grátis · 1º envio com -15%",
  },
  C: {
    cafe: "zerbinatti-500g-graos",
    freq: "quinzenal",
    h2Pre: "Pacote ",
    h2Italic: "Família",
    h2Pos: ", quinzenal.",
    body: "Consumo alto, casa que mói em casa, café diário — o Pacote Família de 500g em grãos é o melhor R$/kg da casa, e a quinzenal garante que sempre haja torra fresca em circulação. O blend entrega o que você procura: corpo, doçura, persistência. Quem bebe nesse volume não pode pagar caro por kg, nem aceitar grão velho. O pacote resolve as duas pontas.",
    pkgTitle: "Pacote Família — 500g em grãos",
    pkgFreqLine: "Quinzenal · R$ 76,42 por envio (1º com -15%)",
    perKgLine:
      "Equivale a R$ 152,84/kg · frete grátis · 1º envio com -15%",
  },
};

function decideResult(answers: {
  q1?: Choice;
  q2?: Choice;
  q3?: Choice;
}): ResultKey {
  const { q1, q3 } = answers;
  // Casa que bebe muito ou consumo alto -> Familia (C)
  if (q3 === "C" || q3 === "D") return "C";
  // Metodo coado/eletrico ou descobrindo -> Coador moido (A)
  if (q1 === "A" || q1 === "D") return "A";
  // Demais (V60/Espresso + consumo medio/baixo) -> Mesa graos (B)
  return "B";
}

export default function QuizFlow() {
  const [step, setStep] = useState<Step>("intro");
  const [transitioning, setTransitioning] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [answers, setAnswers] = useState<{
    q1?: Choice;
    q2?: Choice;
    q3?: Choice;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(m.matches);
    const handler = () => setReduceMotion(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  function go(next: Step) {
    if (reduceMotion) {
      setStep(next);
      return;
    }
    setTransitioning(true);
    window.setTimeout(() => {
      setStep(next);
      setTransitioning(false);
    }, 200);
  }

  function handleAnswer(qKey: "q1" | "q2" | "q3", letter: Choice) {
    setAnswers((prev) => ({ ...prev, [qKey]: letter }));
  }

  function handleNext(qKey: "q1" | "q2" | "q3") {
    if (qKey === "q1") go("q2");
    else if (qKey === "q2") go("q3");
    else {
      const result = decideResult(answers);
      track("quiz_completed", { result });
      go("result");
    }
  }

  function handleBack(current: "q1" | "q2" | "q3") {
    if (current === "q1") go("intro");
    else if (current === "q2") go("q1");
    else go("q2");
  }

  const transitionClass = reduceMotion
    ? ""
    : `transition-all duration-200 ${
        transitioning
          ? "opacity-0 translate-x-2"
          : "opacity-100 translate-x-0"
      }`;

  return (
    <div className={transitionClass}>
      {step === "intro" && (
        <div className="mx-auto max-w-[720px] text-center">
          <p
            className="font-mono text-[12px] font-medium uppercase text-olive"
            style={{ letterSpacing: "0.18em" }}
          >
            EM 30 SEGUNDOS
          </p>
          <h1
            className="text-display mt-8 text-ink"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            <em
              className="font-display italic"
              style={{ fontWeight: 400 }}
            >
              Não sabe
            </em>{" "}
            qual pacote começar?
          </h1>
          <p
            className="text-lede mx-auto mt-8 italic text-ink-soft"
            style={{ maxWidth: "560px" }}
          >
            Três perguntas, uma recomendação. Sem cadastro, sem e-mail. A casa
            indica o pacote e a frequência que combinam com o seu ritmo.
          </p>
          <p
            className="mt-12 font-mono text-[11px] uppercase text-ink-mute"
            style={{ letterSpacing: "0.18em" }}
          >
            3 PERGUNTAS · 30 SEGUNDOS · SEM CADASTRO
          </p>
          <button
            type="button"
            onClick={() => go("q1")}
            className="mt-12 bg-olive px-10 py-5 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
            style={{ borderRadius: "2px" }}
          >
            Começar o teste
          </button>
        </div>
      )}

      {(step === "q1" || step === "q2" || step === "q3") && (
        <QuestionScreen
          q={QUESTIONS.find((x) => x.key === step)!}
          selected={answers[step]}
          onSelect={(letter) => handleAnswer(step, letter)}
          onNext={() => handleNext(step)}
          onBack={() => handleBack(step)}
          isLast={step === "q3"}
        />
      )}

      {step === "result" && (
        <ResultScreen result={RESULTS[decideResult(answers)]} />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function QuestionScreen({
  q,
  selected,
  onSelect,
  onNext,
  onBack,
  isLast,
}: {
  q: (typeof QUESTIONS)[number];
  selected?: Choice;
  onSelect: (letter: Choice) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
}) {
  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!selected) return;
    onNext();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-[720px]"
      aria-labelledby={`${q.key}-title`}
    >
      <p
        className="font-mono text-[12px] font-medium uppercase text-ink-mute"
        style={{ letterSpacing: "0.18em" }}
        role="status"
        aria-live="polite"
      >
        {q.index}
      </p>

      <fieldset className="mt-6">
        <legend
          id={`${q.key}-title`}
          className="text-h1 text-ink"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 3rem)" }}
        >
          {q.h2Pre}
          <em
            className="font-display italic"
            style={{ fontWeight: 400 }}
          >
            {q.h2Italic}
          </em>
          {q.h2Pos}
        </legend>
        <p
          className="text-lede mt-6 italic text-ink-soft"
          style={{ maxWidth: "560px" }}
        >
          {q.lede}
        </p>

        <div className="mt-10 flex flex-col gap-4" role="radiogroup">
          {q.options.map((opt) => {
            const active = selected === opt.letter;
            return (
              <label
                key={opt.letter}
                className={`block cursor-pointer p-5 sm:p-6 transition-colors duration-200 ${
                  active
                    ? "border-2 border-olive bg-bone"
                    : "border border-line bg-bone-soft hover:border-olive"
                }`}
                style={{ borderRadius: "2px" }}
              >
                <input
                  type="radio"
                  name={q.key}
                  value={opt.letter}
                  checked={active}
                  onChange={() => onSelect(opt.letter)}
                  className="sr-only"
                />
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-[14px] font-medium text-olive"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    {opt.letter} ·
                  </span>
                  <span className="text-[16px] font-medium text-ink">
                    {opt.title}
                  </span>
                </div>
                <p className="mt-2 pl-6 text-[14px] leading-[1.5] text-ink-soft">
                  {opt.sub}
                </p>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-12 flex items-center justify-between gap-6">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-ink-mute underline decoration-1 underline-offset-4 transition-colors hover:text-olive"
        >
          ← Voltar
        </button>
        <button
          type="submit"
          disabled={!selected}
          aria-disabled={!selected}
          className="bg-olive px-7 py-3.5 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderRadius: "2px" }}
        >
          {isLast ? "Ver recomendação →" : "Próxima pergunta →"}
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------

function ResultScreen({
  result,
}: {
  result: (typeof RESULTS)[ResultKey];
}) {
  const href = `/assinatura?cafe=${result.cafe}&freq=${result.freq}`;

  return (
    <div
      role="region"
      aria-labelledby="resultado-title"
      className="mx-auto max-w-[720px]"
    >
      <p
        className="text-center font-mono text-[12px] font-medium uppercase text-ink-mute"
        style={{ letterSpacing: "0.18em" }}
      >
        RESULTADO
      </p>
      <p
        className="mt-6 text-center font-mono text-[12px] font-medium uppercase text-olive"
        style={{ letterSpacing: "0.18em" }}
      >
        O CARTÃO DA CASA RECOMENDA
      </p>
      <h2
        id="resultado-title"
        className="text-display mt-6 text-center text-ink"
        style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
      >
        {result.h2Pre}
        <em
          className="font-display italic"
          style={{ fontWeight: 400 }}
        >
          {result.h2Italic}
        </em>
        {result.h2Pos}
      </h2>
      <p
        className="text-body mx-auto mt-8 text-center text-ink-soft"
        style={{ maxWidth: "580px" }}
      >
        {result.body}
      </p>
      <span className="hairline mx-auto mt-12 block" aria-hidden="true" />

      {/* Card do pacote */}
      <article
        className="mt-12 grid gap-6 bg-bone-soft p-8 sm:grid-cols-[40%_60%] sm:gap-8 sm:p-10"
        style={{
          border: "1px solid var(--line)",
          borderRadius: "2px",
        }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone">
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="font-display text-[80px] text-olive"
              style={{ fontWeight: 400 }}
              aria-hidden="true"
            >
              Z
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <p
            className="font-mono text-[11px] font-medium uppercase text-olive"
            style={{ letterSpacing: "0.18em" }}
          >
            CASA 01 · BOURBON + CATUAÍ
          </p>
          <h3 className="mt-3 text-[18px] font-medium text-ink">
            {result.pkgTitle}
          </h3>
          <p className="mt-2 text-[14px] font-medium text-olive">
            {result.pkgFreqLine}
          </p>
          <p className="mt-2 font-mono text-[11px] italic text-ink-mute">
            {result.perKgLine}
          </p>
          <a
            href={href}
            className="mt-6 inline-block w-full bg-olive px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep"
            style={{ borderRadius: "2px" }}
          >
            Assinar este café
          </a>
          <a
            href="/assinatura"
            className="link-text mt-4 inline-flex items-center gap-2"
          >
            Ver outros pacotes <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    </div>
  );
}

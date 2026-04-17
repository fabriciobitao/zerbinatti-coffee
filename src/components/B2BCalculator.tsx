"use client";

import { useState, useMemo } from "react";
import { buildWhatsAppUrl } from "@/lib/config";

/**
 * Calculadora de consumo B2B.
 * Heurística: 10g de café moído por xícara (padrão SCA para filtrado).
 * Preço por kg escalonado por volume (atacado).
 */
const GRAMS_PER_CUP = 10;
const WORK_DAYS_PER_MONTH = 22;

function pricePerKg(kgPerMonth: number): number {
  if (kgPerMonth >= 50) return 89;
  if (kgPerMonth >= 20) return 99;
  if (kgPerMonth >= 10) return 109;
  return 119;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function B2BCalculator() {
  const [people, setPeople] = useState(15);
  const [cupsPerDay, setCupsPerDay] = useState(3);
  const [workDays, setWorkDays] = useState(WORK_DAYS_PER_MONTH);

  const result = useMemo(() => {
    const cupsMonth = people * cupsPerDay * workDays;
    const gramsMonth = cupsMonth * GRAMS_PER_CUP;
    const kgMonth = gramsMonth / 1000;
    const kgMonthRounded = Math.ceil(kgMonth * 2) / 2; // arredonda para 0,5kg
    const unitPrice = pricePerKg(kgMonthRounded);
    const totalMonth = kgMonthRounded * unitPrice;
    const tier =
      kgMonthRounded >= 50
        ? "Platinum"
        : kgMonthRounded >= 20
        ? "Gold"
        : kgMonthRounded >= 10
        ? "Silver"
        : "Starter";
    return {
      cupsMonth,
      kgMonth: kgMonthRounded,
      unitPrice,
      totalMonth,
      tier,
    };
  }, [people, cupsPerDay, workDays]);

  const whatsappMsg = `Olá! Fiz a simulação B2B no site: ${people} pessoas, ${cupsPerDay} xícaras/dia, ${workDays} dias úteis/mês = ${result.kgMonth}kg/mês (estimativa ${formatBRL(result.totalMonth)}/mês). Podem preparar uma proposta formal?`;

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* Inputs */}
      <div className="md:col-span-3 rounded-2xl border border-coffee-200 bg-white p-6 sm:p-8">
        <h3 className="font-serif text-xl font-bold text-coffee-900">
          Quanto seu time consome?
        </h3>
        <p className="mt-2 text-sm text-coffee-600">
          Estimativa baseada em 10g de café moído por xícara (padrão SCA para
          filtrado).
        </p>

        <div className="mt-8 space-y-6">
          {/* Pessoas */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="people"
                className="text-sm font-semibold text-coffee-800"
              >
                Pessoas no escritório
              </label>
              <span className="font-serif text-lg font-bold text-coffee-900">
                {people}
              </span>
            </div>
            <input
              id="people"
              type="range"
              min={1}
              max={200}
              step={1}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="mt-3 w-full accent-gold-500"
            />
            <div className="mt-1 flex justify-between text-xs text-coffee-500">
              <span>1</span>
              <span>200</span>
            </div>
          </div>

          {/* Xícaras por dia */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="cups"
                className="text-sm font-semibold text-coffee-800"
              >
                Xícaras por pessoa/dia
              </label>
              <span className="font-serif text-lg font-bold text-coffee-900">
                {cupsPerDay}
              </span>
            </div>
            <input
              id="cups"
              type="range"
              min={1}
              max={8}
              step={1}
              value={cupsPerDay}
              onChange={(e) => setCupsPerDay(Number(e.target.value))}
              className="mt-3 w-full accent-gold-500"
            />
            <div className="mt-1 flex justify-between text-xs text-coffee-500">
              <span>1</span>
              <span>8</span>
            </div>
          </div>

          {/* Dias úteis */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="days"
                className="text-sm font-semibold text-coffee-800"
              >
                Dias úteis/mês
              </label>
              <span className="font-serif text-lg font-bold text-coffee-900">
                {workDays}
              </span>
            </div>
            <input
              id="days"
              type="range"
              min={10}
              max={30}
              step={1}
              value={workDays}
              onChange={(e) => setWorkDays(Number(e.target.value))}
              className="mt-3 w-full accent-gold-500"
            />
            <div className="mt-1 flex justify-between text-xs text-coffee-500">
              <span>10</span>
              <span>30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="md:col-span-2 flex flex-col justify-between rounded-2xl bg-coffee-900 p-6 text-coffee-50 sm:p-8">
        <div>
          <span className="text-xs font-medium tracking-[0.3em] text-gold-400 uppercase">
            Tier {result.tier}
          </span>
          <div className="mt-4">
            <div className="text-xs tracking-[0.15em] text-coffee-300 uppercase">
              Consumo estimado
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-bold text-coffee-50 sm:text-5xl">
                {result.kgMonth.toLocaleString("pt-BR", {
                  minimumFractionDigits: result.kgMonth % 1 === 0 ? 0 : 1,
                })}
              </span>
              <span className="text-lg text-coffee-300">kg/mês</span>
            </div>
            <div className="mt-1 text-xs text-coffee-400">
              ≈ {result.cupsMonth.toLocaleString("pt-BR")} xícaras
            </div>
          </div>

          <div className="mt-6 border-t border-coffee-800 pt-6">
            <div className="text-xs tracking-[0.15em] text-coffee-300 uppercase">
              Estimativa mensal
            </div>
            <div className="mt-1 font-serif text-3xl font-bold text-gold-400">
              {formatBRL(result.totalMonth)}
            </div>
            <div className="mt-1 text-xs text-coffee-400">
              {formatBRL(result.unitPrice)}/kg · tier {result.tier}
            </div>
          </div>

          <div className="mt-6 space-y-2 text-xs text-coffee-300">
            <div className="flex justify-between">
              <span>Starter</span>
              <span>{formatBRL(119)}/kg</span>
            </div>
            <div className="flex justify-between">
              <span>Silver (10kg+)</span>
              <span>{formatBRL(109)}/kg</span>
            </div>
            <div className="flex justify-between">
              <span>Gold (20kg+)</span>
              <span>{formatBRL(99)}/kg</span>
            </div>
            <div className="flex justify-between">
              <span>Platinum (50kg+)</span>
              <span>{formatBRL(89)}/kg</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <a
            href={buildWhatsAppUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-gold-500 px-6 py-3 text-center text-sm font-bold text-coffee-950 transition-all hover:bg-gold-400 hover:shadow-xl"
          >
            Receber proposta formal
          </a>
          <a
            href="#formulario"
            className="block w-full rounded-full border border-coffee-700 px-6 py-3 text-center text-sm font-semibold text-coffee-100 transition-all hover:border-gold-500"
          >
            Pedir por e-mail
          </a>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-coffee-500">
          Estimativa. Preço final depende do perfil escolhido (blend, single
          origin, microlote) e logística. Amostra grátis na 1ª proposta.
        </p>
      </div>
    </div>
  );
}

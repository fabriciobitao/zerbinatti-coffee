"use client";

import { useEffect, useState } from "react";
import CoffeeBean3D from "@/components/ui/CoffeeBean3D";
import { SplitReveal, Kicker, Marginalia } from "@/components/ui/Editorial";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-coffee-50 pt-24 pb-16 sm:pt-28 sm:pb-24">
      {/* Backdrop tipográfico gigante — número 1897 em outline */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-[1800ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <span
          className="select-none font-serif font-bold leading-none text-coffee-200/50"
          style={{
            fontSize: "clamp(22rem, 55vw, 42rem)",
            WebkitTextStroke: "1.5px rgb(215 204 200 / 0.45)",
            color: "transparent",
            letterSpacing: "-0.04em",
          }}
        >
          1897
        </span>
      </div>

      {/* Glow ambiental */}
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-gold-400/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-[-10%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-coffee-700/10 blur-[120px]" />

      {/* Marginália vertical esquerda — desktop */}
      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block">
        <Marginalia>
          Serra do Cabral · Minas Gerais · Italia 1897
        </Marginalia>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 lg:px-8">
        {/* Coluna esquerda — conteúdo editorial */}
        <div className="col-span-12 lg:col-span-7 lg:pt-14">
          {/* Marginalia horizontal — mobile only (substitui a vertical) */}
          <div
            className={`mb-6 flex items-center gap-2 transition-opacity duration-700 lg:hidden ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="marginalia-h">
              Serra do Cabral · MG · Italia 1897
            </span>
          </div>

          <div
            className={`transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Kicker>Dal 1897 · Famiglia Zerbinatti</Kicker>
          </div>

          {/* Título editorial em escala dramática — mobile condensa em 2 linhas */}
          <h1 className="mt-6 font-serif font-bold leading-[0.92] tracking-[-0.035em] text-coffee-900 sm:mt-8">
            <span className="block text-[clamp(3.25rem,13vw,7.5rem)]">
              <SplitReveal text="Café brasileiro," stagger={0.06} />
            </span>
            <span
              className="mt-1 block italic text-gold-600 text-[clamp(3.25rem,13vw,7.5rem)] sm:mt-2"
              style={{ fontWeight: 400 }}
            >
              <SplitReveal text="casa italiana," stagger={0.06} />
            </span>
            <span className="mt-1 block text-[clamp(3rem,12vw,7.5rem)] sm:mt-2">
              <SplitReveal text="desde 1897." stagger={0.06} />
            </span>
          </h1>

          {/* Lede + ornamento */}
          <div
            className={`mt-10 max-w-xl transition-all duration-700 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 text-gold-600" aria-hidden>
              <span className="h-px w-8 bg-current" />
              <svg className="h-2 w-2" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="2" />
              </svg>
            </div>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-coffee-700 sm:text-xl md:text-2xl">
              Quatro gerações torrando café especial na Serra do Cabral.
              Lotes rastreados, torra sob demanda, data de torra em cada sacola.
            </p>
          </div>

          {/* Stats em linha editorial */}
          <div
            className={`mt-10 grid max-w-lg grid-cols-3 gap-x-8 transition-all duration-700 delay-[900ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              ["900-1.200m", "Altitude"],
              ["Natural·Honey", "Processo"],
              ["85 a 90+", "Pontos SCA"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-coffee-900/20 pt-3">
                <div className="font-serif text-xl font-bold text-coffee-900 sm:text-2xl">
                  {value}
                </div>
                <div className="mt-1 text-xs tracking-[0.2em] text-coffee-700 uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col gap-3 transition-all duration-700 delay-[1100ms] sm:flex-row sm:items-center sm:gap-6 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#quiz"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-coffee-900 px-8 py-4 text-sm font-semibold tracking-wide text-coffee-50 transition-all duration-500 hover:bg-coffee-950 hover:shadow-[0_25px_50px_-15px_rgba(26,17,8,0.5)] active:scale-[0.98]"
            >
              Descobrir meu café
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#cafes"
              className="link-editorial inline-flex min-h-[44px] items-center text-sm font-semibold uppercase tracking-[0.2em] text-coffee-900 underline decoration-coffee-400 underline-offset-[6px] decoration-1"
            >
              Ver os três cafés
            </a>
          </div>

          {/* Badge safra — rebaixado, elegante */}
          <div
            className={`mt-12 inline-flex items-center gap-3 transition-all duration-700 delay-[1300ms] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
            </span>
            <span className="text-xs font-medium tracking-[0.2em] text-coffee-700 uppercase">
              Safra 2026 · torrado esta semana
            </span>
          </div>
        </div>

        {/* Coluna direita — grão 3D signature (md+) */}
        <div className="hidden md:col-span-12 md:block lg:col-span-5 lg:pt-4">
          <div className="relative flex items-center justify-center lg:justify-end">
            <div
              className={`float-subtle transition-all duration-1000 delay-300 ${
                loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <CoffeeBean3D size={420} />
            </div>

            {/* Metadata flutuante ao lado do grão */}
            <div
              className={`absolute bottom-10 right-[-20px] max-w-[180px] rounded-xl border border-coffee-200/80 bg-coffee-50/80 p-4 backdrop-blur-sm transition-all delay-[1500ms] duration-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="text-xs font-semibold tracking-[0.2em] text-coffee-800 uppercase">
                Torra da semana
              </div>
              <div className="mt-2 font-serif text-lg font-bold leading-tight text-coffee-900">
                Yellow Bourbon
              </div>
              <div className="mt-1 text-xs text-coffee-700">
                Talhão alto · 1.050m · honey
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grão fantasma mobile — posicionado absoluto, atrás do conteúdo, signature preservada */}
      <div
        className={`pointer-events-none absolute right-[-60px] top-[8%] md:hidden transition-all duration-1000 delay-300 ${
          loaded ? "opacity-60 scale-100" : "opacity-0 scale-90"
        }`}
        aria-hidden
      >
        <div className="float-subtle">
          <CoffeeBean3D size={220} />
        </div>
      </div>

      {/* Metadata card — mobile, abaixo do CTA, em linha editorial */}
      <div
        className={`relative mx-auto mt-10 max-w-7xl px-6 md:hidden ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } transition-all duration-700 delay-[1500ms]`}
      >
        <div className="inline-flex items-center gap-4 rounded-xl border border-coffee-200/80 bg-coffee-50/80 p-4 backdrop-blur-sm">
          <div className="h-10 w-px bg-gold-500/60" />
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] text-coffee-800 uppercase">
              Torra da semana
            </div>
            <div className="mt-1 font-serif text-base font-bold leading-tight text-coffee-900">
              Yellow Bourbon
            </div>
            <div className="mt-0.5 text-xs text-coffee-700">
              Talhão alto · 1.050m · honey
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue minimalista */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-[1800ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] text-coffee-700 uppercase">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-coffee-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}

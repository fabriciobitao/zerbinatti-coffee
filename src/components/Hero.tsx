"use client";

import { useEffect, useState } from "react";
import { SplitReveal, Kicker, Marginalia } from "@/components/ui/Editorial";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-24 pb-20 sm:pt-28 sm:pb-28"
      style={{ backgroundColor: "#1a1108" }}
    >
      {/* Fotografia de fundo — mesa escura com café, mergulhada */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          filter: "brightness(0.42) saturate(1.15) contrast(1.05)",
        }}
      />

      {/* Overlay principal — mergulha o lado esquerdo em escuro para legibilidade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(26,17,8,0.97) 0%, rgba(26,17,8,0.88) 38%, rgba(26,17,8,0.55) 70%, rgba(26,17,8,0.25) 100%)",
        }}
      />

      {/* Vinheta superior+inferior — cinematográfica */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bokeh dourado — luzes fora de foco flutuando */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[12%] right-[8%] h-[320px] w-[320px] rounded-full bg-gold-500/30 blur-[80px] bokeh-pulse"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] right-[28%] h-[180px] w-[180px] rounded-full bg-gold-400/35 blur-[60px] bokeh-pulse"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[15%] right-[18%] h-[240px] w-[240px] rounded-full bg-gold-600/25 blur-[90px] bokeh-pulse"
        style={{ animationDelay: "3s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[30%] left-[18%] h-[200px] w-[200px] rounded-full bg-gold-500/15 blur-[100px] bokeh-pulse"
        style={{ animationDelay: "2.2s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[22%] left-[42%] h-[140px] w-[140px] rounded-full bg-gold-400/20 blur-[70px] bokeh-pulse"
        style={{ animationDelay: "4s" }}
      />

      {/* Vapor subindo — detalhe fino atmosférico */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] right-[22%] hidden lg:block"
      >
        <div className="steam-wisp h-40 w-16 rounded-full bg-gradient-to-t from-transparent via-coffee-50/15 to-transparent blur-xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[28%] right-[32%] hidden lg:block"
      >
        <div className="steam-wisp steam-wisp-delay-1 h-48 w-14 rounded-full bg-gradient-to-t from-transparent via-coffee-50/12 to-transparent blur-xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] right-[14%] hidden lg:block"
      >
        <div className="steam-wisp steam-wisp-delay-2 h-36 w-12 rounded-full bg-gradient-to-t from-transparent via-coffee-50/10 to-transparent blur-lg" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] right-[40%] hidden lg:block"
      >
        <div className="steam-wisp steam-wisp-delay-3 h-44 w-16 rounded-full bg-gradient-to-t from-transparent via-coffee-50/8 to-transparent blur-xl" />
      </div>

      {/* Marginália vertical esquerda — desktop */}
      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 hidden lg:block opacity-70">
        <Marginalia>
          Serra do Cabral · Minas Gerais · Italia 1897
        </Marginalia>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 lg:px-8">
        {/* Coluna esquerda — conteúdo editorial escuro */}
        <div className="col-span-12 lg:col-span-7 lg:pt-10">
          {/* Marginalia horizontal — mobile only */}
          <div
            className={`mb-6 flex items-center gap-2 transition-opacity duration-700 lg:hidden ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="marginalia-h"
              style={{ color: "rgba(240, 215, 123, 0.7)" }}
            >
              Serra do Cabral · MG · Italia 1897
            </span>
          </div>

          {/* Kicker premium — badge dourado */}
          <div
            className={`transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-gold-400 backdrop-blur-sm"
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_12px_rgba(230,190,68,0.8)]"
                aria-hidden
              />
              Colheita limitada 2026
            </span>
          </div>

          {/* Título editorial cinematográfico */}
          <h1 className="mt-7 font-serif font-bold leading-[0.95] tracking-[-0.035em] text-coffee-50 sm:mt-9">
            <span className="block text-[clamp(2.75rem,8vw,5.5rem)]">
              <SplitReveal text="Do legado" stagger={0.06} />
            </span>
            <span
              className="mt-1 block italic text-gold-500 text-[clamp(2.75rem,8vw,5.5rem)] sm:mt-2"
              style={{ fontWeight: 400 }}
            >
              <SplitReveal text="Zerbinatti 1897" stagger={0.06} />
            </span>
            <span className="mt-1 block text-[clamp(2.75rem,8vw,5.5rem)] sm:mt-2">
              <SplitReveal text="para sua xícara." stagger={0.06} />
            </span>
          </h1>

          {/* Lede com ornamento dourado */}
          <div
            className={`mt-8 max-w-xl transition-all duration-700 delay-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3 text-gold-500" aria-hidden>
              <span className="h-px w-8 bg-current" />
              <svg className="h-2 w-2" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="6" cy="6" r="2" />
              </svg>
            </div>
            <p className="mt-5 font-serif text-lg italic leading-relaxed text-coffee-200 sm:text-xl md:text-2xl">
              Quatro gerações torrando café especial na Serra do Cabral.
              Lotes rastreados, torra sob demanda, data de torra em cada sacola.
            </p>
          </div>

          {/* Stats — borda dourada sutil sobre fundo escuro */}
          <div
            className={`mt-10 grid max-w-lg grid-cols-3 gap-x-6 transition-all duration-700 delay-[900ms] sm:gap-x-8 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              ["900-1.200m", "Altitude"],
              ["Natural·Honey", "Processo"],
              ["85 a 90+", "Pontos SCA"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-gold-500/30 pt-3">
                <div className="font-serif text-xl font-bold text-gold-400 sm:text-2xl">
                  {value}
                </div>
                <div className="mt-1 text-[10px] tracking-[0.22em] text-coffee-300 uppercase sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs — dourado contrastante + link secundário */}
          <div
            className={`mt-10 flex flex-col gap-4 transition-all duration-700 delay-[1100ms] sm:flex-row sm:items-center sm:gap-6 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#quiz"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold tracking-wide text-coffee-950 shadow-[0_20px_50px_-12px_rgba(212,160,23,0.55)] transition-all duration-500 hover:bg-gold-400 hover:shadow-[0_25px_60px_-12px_rgba(230,190,68,0.7)] active:scale-[0.98]"
            >
              Descobrir meu café
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#contato"
              className="link-editorial inline-flex min-h-[44px] items-center text-sm font-medium tracking-[0.18em] text-gold-300 underline decoration-gold-500/60 underline-offset-[6px] decoration-1 uppercase hover:text-gold-200"
            >
              Solicitar amostras e informações
            </a>
          </div>

          {/* Badge safra discreto */}
          <div
            className={`mt-10 inline-flex items-center gap-3 transition-all duration-700 delay-[1300ms] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            <span className="text-[10px] font-medium tracking-[0.22em] text-coffee-300 uppercase sm:text-xs">
              Safra 2026 · torrado esta semana
            </span>
          </div>
        </div>

        {/* Coluna direita — fotografia de produto (lg+) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div
            className={`relative h-full min-h-[640px] transition-all duration-1000 delay-300 ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative h-full min-h-[640px] overflow-hidden rounded-2xl shadow-[0_50px_100px_-25px_rgba(0,0,0,0.85)] ring-1 ring-gold-500/25">
              <div
                className="absolute inset-0 bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1600&q=90&auto=format&fit=crop')",
                  backgroundPosition: "center 65%",
                  filter: "saturate(1.1) contrast(1.08)",
                }}
                role="img"
                aria-label="Xícara de café fumegante em ambiente escuro com bokeh dourado"
              />
              {/* Gradiente inferior — integra com o fundo escuro */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,17,8,0.55), transparent)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fotografia mobile — aparece abaixo do texto */}
      <div
        className={`relative mx-auto mt-14 max-w-7xl px-6 lg:hidden transition-all duration-1000 delay-200 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-[0_40px_80px_-25px_rgba(0,0,0,0.85)] ring-1 ring-gold-500/25">
          <div
            className="aspect-[4/5] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=90&auto=format&fit=crop')",
              filter: "saturate(1.1) contrast(1.08)",
            }}
            role="img"
            aria-label="Pacote Zerbinatti Coffee com xícara fumegante e grãos torrados sobre mesa de madeira"
          />
          {/* Badge safra — canto */}
          <div className="absolute top-4 left-4 rounded-md border border-gold-500/50 bg-coffee-950/90 px-3 py-1.5 backdrop-blur-sm">
            <div className="text-[9px] tracking-[0.25em] text-gold-400 uppercase">
              Safra
            </div>
            <div className="font-serif text-base font-bold leading-none text-coffee-50">
              2026
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue minimalista dourado */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-1000 delay-[1800ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.25em] text-gold-400/80 uppercase">
            Scroll
          </span>
          <div className="h-10 w-px bg-gradient-to-b from-gold-500/70 to-transparent" />
        </div>
      </div>

      {/* Kicker unused import guard — manter compatibilidade se algo referenciar */}
      <span className="hidden">
        <Kicker>Dal 1897</Kicker>
      </span>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fadeClass = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

  return (
    <>
    <section className="relative flex min-h-screen items-center overflow-hidden bg-coffee-950">
      {/* Farm background with Ken Burns */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2s] ease-out ${
          loaded ? "scale-100" : "scale-110"
        }`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611070257888-7e50e5915d7c?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-coffee-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950/50 via-coffee-950/60 to-coffee-950/90" />

      {/* Ambient glow — amber halo behind product (desktop) — agora MUITO mais amplo pra acompanhar pacote dominante */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[1100px] w-[1100px] rounded-full bg-gradient-radial from-amber-500/55 via-amber-700/25 to-transparent blur-[180px] hidden md:block" />
      <div className="absolute right-[10%] top-[52%] -translate-y-1/2 h-[680px] w-[680px] rounded-full bg-gold-400/30 blur-[130px] hidden md:block" />
      <div className="absolute right-[16%] top-[48%] -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-amber-300/20 blur-[90px] hidden md:block" />

      {/* Product image right (desktop) — DOMINANTE, ~62% da viewport, altura quase total */}
      <div className="absolute right-[-2%] top-0 bottom-0 w-[62%] hidden md:flex items-center justify-center">
        <img
          src="/images/pacote-zerbinatti-2026.webp"
          alt="Pacote Zerbinatti Caffè 250g sobre grãos torrados"
          width={1075}
          height={1800}
          className={`relative h-[96vh] max-h-[1100px] w-auto max-w-full object-contain transition-all duration-[1400ms] delay-500 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            filter:
              "drop-shadow(0 80px 100px rgba(0,0,0,0.92)) drop-shadow(0 40px 50px rgba(0,0,0,0.6)) drop-shadow(0 0 140px rgba(217,165,77,0.55)) drop-shadow(0 0 50px rgba(255,200,120,0.3)) contrast(1.08) saturate(1.1)",
          }}
        />
        {/* Floor shadow editorial — bem mais densa e larga pra ancorar pacote gigante */}
        <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 h-24 w-[70%] rounded-[50%] bg-black/85 blur-[60px]" />
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 h-14 w-[50%] rounded-[50%] bg-black/70 blur-3xl" />
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 h-8 w-[34%] rounded-[50%] bg-black/55 blur-xl" />
        {/* Vignettes integrando pacote ao cenario escuro — gradient mais suave pra nao cortar a esquerda do pacote */}
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/55 via-transparent to-coffee-950/15 pointer-events-none" />
      </div>

      {/* Mobile product — PROTAGONISTA: visivel na primeira dobra (top ~42vh, ocupa ~52vh ate o fundo) */}
      <div className="pointer-events-none absolute left-1/2 top-[42vh] -translate-x-1/2 flex h-[52vh] max-h-[480px] w-[88vw] max-w-[420px] items-end justify-center md:hidden">
        {/* Mobile glow halo */}
        <div className="absolute inset-x-0 bottom-6 mx-auto h-[360px] w-[360px] rounded-full bg-gold-400/30 blur-[100px]" />
        <div className="absolute inset-x-0 bottom-10 mx-auto h-[240px] w-[240px] rounded-full bg-amber-500/25 blur-[75px]" />
        {/* Floor shadow mobile */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-10 w-[78%] rounded-[50%] bg-black/80 blur-[36px]" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-6 w-[55%] rounded-[50%] bg-black/65 blur-2xl" />
        <img
          src="/images/pacote-zerbinatti-2026.webp"
          alt="Pacote Zerbinatti Caffè 250g"
          width={1075}
          height={1800}
          className={`relative h-full w-auto object-contain transition-all duration-[1200ms] delay-300 ease-out ${
            loaded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
          style={{
            filter:
              "drop-shadow(0 40px 55px rgba(0,0,0,0.9)) drop-shadow(0 18px 25px rgba(0,0,0,0.55)) drop-shadow(0 0 80px rgba(217,165,77,0.45)) drop-shadow(0 0 30px rgba(255,200,120,0.25)) contrast(1.07) saturate(1.08)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-lg pt-6 pb-0 sm:pt-8 md:pt-20 md:pb-0">
          <img src="/images/logo-white.png" alt="Zerbinatti Coffee" className={`mb-3 h-10 sm:mb-4 sm:h-14 md:mb-8 md:h-24 lg:h-28 ${fadeClass("delay-0")}`} />

          <div className={fadeClass("delay-200")}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-coffee-900/60 px-3 py-1.5 backdrop-blur-sm md:mb-6 md:px-4 md:py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-[10px] tracking-[0.2em] text-gold-400 uppercase md:text-xs">Colheita Limitada 2026</span>
            </div>
          </div>

          <h1 className={`font-serif text-2xl font-bold leading-tight tracking-tight text-coffee-50 sm:text-3xl md:text-5xl lg:text-6xl ${fadeClass("delay-300")}`}>
            Do Nosso <span className="italic text-gold-400">Legado</span>
            <br />Para Sua Mesa
            <br /><span className="text-base font-normal text-coffee-300 sm:text-xl md:text-3xl lg:text-4xl">Desde 1897</span>
          </h1>

          {/* Parágrafo, stats, CTAs e selos — escondidos no mobile pra não competir com o pacote na primeira dobra. Aparecem após scroll via md:block */}
          <p className={`mt-4 hidden max-w-md text-base leading-relaxed text-coffee-200 sm:mt-6 sm:text-lg md:block ${fadeClass("delay-[500ms]")}`}>
            Café moído torrado premium da fazenda. 100% Arábica, secagem natural, torra média-clara. Notas de frutas e caramelo.
          </p>

          <div className={`mt-6 hidden grid-cols-3 gap-2 sm:mt-8 sm:gap-4 md:grid ${fadeClass("delay-[600ms]")}`}>
            {[["Altitude", "640-760m"], ["Secagem", "Natural"], ["Torra", "Média Clara"]].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-2 text-center backdrop-blur-sm sm:p-3">
                <div className="text-[10px] text-coffee-400 sm:text-xs">{label}</div>
                <div className="mt-0.5 text-xs font-semibold text-coffee-100 sm:mt-1 sm:text-sm">{value}</div>
              </div>
            ))}
          </div>

          <div className={`mt-10 hidden flex-col gap-4 sm:flex-row md:flex ${fadeClass("delay-[700ms]")}`}>
            <a href="#cafes" className="rounded-full bg-gold-500 px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-coffee-950 uppercase transition-all duration-200 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.97] sm:px-8 sm:py-4">
              Comprar Avulso
            </a>
            <a href="#assinatura" className="rounded-full border border-coffee-400/30 px-6 py-3.5 text-center text-sm font-medium tracking-wide text-coffee-200 transition-all duration-200 hover:border-coffee-300 hover:text-coffee-50 active:scale-[0.97] sm:px-8 sm:py-4">
              Assinar Mensal
            </a>
          </div>

          <div className={`mt-12 hidden items-center gap-4 md:flex ${fadeClass("delay-[800ms]")}`}>
            <img src="/images/selo-scaa.png" alt="SCAA" className="h-10" />
            <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-10" />
            <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-10" />
            <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-10" />
          </div>
        </div>
      </div>

      {/* Mobile-only: CTA fixo na base da primeira dobra (acima do pacote nao, mas perto do fim da tela). Stats/parágrafo/selos viram conteúdo de scroll. */}
      <div className={`absolute bottom-4 left-0 right-0 z-20 px-6 md:hidden ${fadeClass("delay-[700ms]")}`}>
        <div className="flex gap-2">
          <a href="#cafes" className="flex-1 rounded-full bg-gold-500 px-4 py-3 text-center text-xs font-semibold tracking-wide text-coffee-950 uppercase shadow-lg shadow-black/40 active:scale-[0.97]">
            Comprar
          </a>
          <a href="#assinatura" className="flex-1 rounded-full border border-coffee-400/40 bg-coffee-950/60 px-4 py-3 text-center text-xs font-medium tracking-wide text-coffee-100 backdrop-blur-sm active:scale-[0.97]">
            Assinar
          </a>
        </div>
      </div>


      {/* Scroll indicator (desktop only — mobile usa CTAs fixos no rodape) */}
      <div className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block ${fadeClass("delay-[1200ms]")}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-coffee-500 uppercase">Explore</span>
          <div className="relative h-10 w-4 rounded-full border border-coffee-600/40">
            <div className="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-gold-400" />
          </div>
        </div>
      </div>
    </section>

    {/* Mobile-only: parágrafo + stats + selos (continuação do hero, abaixo do viewport inicial) */}
    <section className="bg-coffee-950 px-6 py-10 md:hidden">
      <p className="max-w-md text-base leading-relaxed text-coffee-200">
        Café moído torrado premium da fazenda. 100% Arábica, secagem natural, torra média-clara. Notas de frutas e caramelo.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[["Altitude", "640-760m"], ["Secagem", "Natural"], ["Torra", "Média Clara"]].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-2 text-center backdrop-blur-sm">
            <div className="text-[10px] text-coffee-400">{label}</div>
            <div className="mt-0.5 text-xs font-semibold text-coffee-100">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <img src="/images/selo-scaa.png" alt="SCAA" className="h-10" />
        <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-10" />
        <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-10" />
        <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-10" />
      </div>
    </section>
    </>
  );
}

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

      {/* Ambient glow */}
      <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-amber-900/20 blur-[120px]" />

      {/* Product image right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
        <div
          className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 via-transparent to-coffee-950/40" />
      </div>

      {/* Mobile product */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[300px] md:hidden">
        <div className="absolute inset-0 bg-contain bg-bottom bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/30 to-coffee-950/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-lg pt-24 pb-80 md:pb-0">
          <img src="/images/logo-white.png" alt="Zerbinatti Coffee" className={`mb-8 h-20 md:h-24 lg:h-28 ${fadeClass("delay-0")}`} />

          <div className={fadeClass("delay-200")}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-coffee-900/60 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-xs tracking-[0.2em] text-gold-400 uppercase">Colheita Limitada 2026</span>
            </div>
          </div>

          <h1 className={`font-serif text-4xl font-bold leading-tight tracking-tight text-coffee-50 md:text-5xl lg:text-6xl ${fadeClass("delay-300")}`}>
            Do Nosso <span className="italic text-gold-400">Legado</span>
            <br />Para Sua Mesa
            <br /><span className="text-2xl font-normal text-coffee-300 md:text-3xl lg:text-4xl">Desde 1897</span>
          </h1>

          <p className={`mt-6 max-w-md text-lg leading-relaxed text-coffee-200 ${fadeClass("delay-[500ms]")}`}>
            Café moído torrado premium da fazenda. 100% Arábica, secagem natural, torra média-clara. Notas de frutas e caramelo.
          </p>

          <div className={`mt-8 grid grid-cols-3 gap-4 ${fadeClass("delay-[600ms]")}`}>
            {[["Altitude", "900-1000m"], ["Secagem", "Natural"], ["Torra", "Média Clara"]].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-3 text-center backdrop-blur-sm">
                <div className="text-xs text-coffee-400">{label}</div>
                <div className="mt-1 text-sm font-semibold text-coffee-100">{value}</div>
              </div>
            ))}
          </div>

          <div className={`mt-10 flex flex-col gap-4 sm:flex-row ${fadeClass("delay-[700ms]")}`}>
            <a href="#cafes" className="rounded-full bg-gold-500 px-8 py-4 text-center text-sm font-semibold tracking-wide text-coffee-950 uppercase transition-all duration-200 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.97]">
              Comprar Avulso
            </a>
            <a href="#assinatura" className="rounded-full border border-coffee-400/30 px-8 py-4 text-center text-sm font-medium tracking-wide text-coffee-200 transition-all duration-200 hover:border-coffee-300 hover:text-coffee-50 active:scale-[0.97]">
              Assinar Mensal
            </a>
          </div>

          <div className={`mt-12 flex items-center gap-4 ${fadeClass("delay-[800ms]")}`}>
            <img src="/images/selo-scaa.png" alt="SCAA" className="h-10" />
            <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-10" />
            <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-10" />
            <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-10" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${fadeClass("delay-[1200ms]")}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-coffee-500 uppercase">Explore</span>
          <div className="relative h-10 w-4 rounded-full border border-coffee-600/40">
            <div className="absolute left-1/2 top-1.5 h-2 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-gold-400" />
          </div>
        </div>
      </div>
    </section>
  );
}

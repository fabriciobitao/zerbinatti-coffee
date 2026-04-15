import CoffeeBag from "./CoffeeBag";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-coffee-950">
      {/* Background base */}
      <div className="absolute inset-0 bg-coffee-950" />

      {/* Farm image - do centro para a esquerda, combinando com tons quentes */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611070257888-7e50e5915d7c?w=1920&q=80')",
        }}
      />
      {/* Blend da fazenda */}
      <div className="absolute inset-0 bg-coffee-950/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950/50 via-coffee-950/60 to-coffee-950/90" />

      {/* Ambient glow */}
      <div className="absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-amber-900/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-800/10 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-12 pt-24">
          {/* Left: text */}
          <div className="max-w-lg flex-1">
            {/* Logo */}
            <img
              src="/images/logo-white.png"
              alt="Zerbinatti Coffee"
              className="mb-8 h-14"
            />

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-coffee-900/60 px-4 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              <span className="text-xs tracking-[0.2em] text-gold-400 uppercase">
                Colheita Limitada 2026
              </span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-coffee-50 md:text-5xl lg:text-6xl">
              Do Nosso{" "}
              <span className="italic text-gold-400">Legado</span>
              <br />
              Para Sua Mesa
              <br />
              <span className="text-2xl font-normal text-coffee-300 md:text-3xl lg:text-4xl">
                Desde 1897
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-coffee-200">
              Café moído torrado premium da fazenda. 100% Arábica, secagem
              natural, torra média-clara. Notas de frutas e caramelo.
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-3 text-center backdrop-blur-sm">
                <div className="text-xs text-coffee-400">Altitude</div>
                <div className="mt-1 text-sm font-semibold text-coffee-100">
                  900-1000m
                </div>
              </div>
              <div className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-3 text-center backdrop-blur-sm">
                <div className="text-xs text-coffee-400">Secagem</div>
                <div className="mt-1 text-sm font-semibold text-coffee-100">
                  Natural
                </div>
              </div>
              <div className="rounded-lg border border-coffee-700/50 bg-coffee-900/40 p-3 text-center backdrop-blur-sm">
                <div className="text-xs text-coffee-400">Torra</div>
                <div className="mt-1 text-sm font-semibold text-coffee-100">
                  Média Clara
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cafes"
                className="rounded-full bg-gold-500 px-8 py-4 text-center text-sm font-semibold tracking-wide text-coffee-950 uppercase transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
              >
                Explorar Cafés
              </a>
              <a
                href="#assinatura"
                className="rounded-full border border-coffee-400/30 px-8 py-4 text-center text-sm font-medium tracking-wide text-coffee-200 transition-all hover:border-coffee-300 hover:text-coffee-50"
              >
                Assinar Mensal
              </a>
            </div>

            {/* Selos */}
            <div className="mt-12 flex items-center gap-4">
              <img src="/images/selo-scaa.png" alt="SCAA Certified" className="h-10" />
              <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-10" />
              <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-10" />
              <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-10" />
            </div>
          </div>

          {/* Right: 3D coffee bag mockup */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative">
              {/* Glow behind bag */}
              <div className="absolute -inset-16 rounded-full bg-amber-700/15 blur-3xl" />
              <CoffeeBag size="hero" />
            </div>
          </div>
        </div>

        {/* Mobile: bag below text */}
        <div className="mt-10 flex justify-center md:hidden">
          <CoffeeBag size="lg" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-coffee-500 uppercase">
            Explore
          </span>
          <div className="h-10 w-px animate-pulse bg-gradient-to-b from-coffee-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}

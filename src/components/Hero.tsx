export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-coffee-950">
      {/* Background - dark base */}
      <div className="absolute inset-0 bg-coffee-950" />

      {/* Product image - posicionada à direita */}
      <div
        className="absolute inset-0 bg-contain bg-right-bottom bg-no-repeat md:bg-cover md:bg-right"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      {/* Gradient overlay - escurece à esquerda, mantém produto visível à direita */}
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/70 via-transparent to-coffee-950/50" />

      {/* Content - alinhado à esquerda */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-lg pt-24 lg:max-w-xl">
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
            Para Sua Xícara
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-coffee-200">
            Café moído torrado premium da fazenda. 100% Arábica, secagem
            natural, torra média-clara. Notas de frutas e caramelo.
          </p>

          {/* Flavor notes */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-coffee-300">
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-gold-500/50" />
              <span>Xícara Limpa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-gold-500/50" />
              <span>Corpo Encorpado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-px w-4 bg-gold-500/50" />
              <span>Acidez Equilibrada</span>
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

          {/* Trust badges - selos reais */}
          <div className="mt-12 flex items-center gap-4">
            <img src="/images/selo-scaa.png" alt="SCAA Certified" className="h-10" />
            <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-10" />
            <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-10" />
            <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-10" />
          </div>
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

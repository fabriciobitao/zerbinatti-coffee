export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-coffee-950">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-950/60 via-coffee-950/40 to-coffee-950" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-coffee-900/60 px-4 py-2 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          <span className="text-xs tracking-[0.2em] text-gold-400 uppercase">
            Colheita Limitada 2026
          </span>
        </div>

        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-coffee-50 md:text-7xl lg:text-8xl">
          Do Nosso{" "}
          <span className="italic text-gold-400">Legado</span>
          <br />
          Para Sua Xícara
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-coffee-300 md:text-xl">
          Uma família italiana cultivando café especial
          no coração do Brasil. Qualidade que transcende o tempo.
        </p>

        {/* Flavor notes */}
        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-coffee-400">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold-500/50" />
            <span>Xícara Limpa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold-500/50" />
            <span>Corpo Encorpado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-gold-500/50" />
            <span>Acidez Equilibrada</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#cafes"
            className="rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold tracking-wide text-coffee-950 uppercase transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20"
          >
            Explorar Cafés
          </a>
          <a
            href="#origem"
            className="rounded-full border border-coffee-400/30 px-8 py-4 text-sm font-medium tracking-wide text-coffee-200 transition-all hover:border-coffee-300 hover:text-coffee-50"
          >
            Nossa História
          </a>
        </div>

        {/* Trust badges - selos reais */}
        <div className="mt-16 flex items-center justify-center gap-6 opacity-80">
          <img src="/images/selo-scaa.png" alt="SCAA Certified" className="h-12" />
          <img src="/images/selo-100.png" alt="Zerbinatti 100" className="h-12" />
          <img src="/images/selo-cup.png" alt="Zerbinatti Cup" className="h-12" />
          <img src="/images/selo-brasil.png" alt="Brasil Prod" className="h-12" />
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

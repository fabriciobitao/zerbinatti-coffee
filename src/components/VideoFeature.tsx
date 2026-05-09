import { Ornament } from "@/components/ui/Ornament";

export default function VideoFeature() {
  return (
    <section
      id="video"
      className="relative overflow-hidden bg-coffee-950 py-20 sm:py-28 lg:py-36"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-gold-500/15 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[700px] rounded-full bg-amber-700/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[400px] w-[600px] rounded-full bg-gold-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="text-[11px] font-medium tracking-[0.35em] text-gold-400 uppercase sm:text-xs">
            Nosso Cafe em Movimento
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-coffee-50 sm:text-5xl md:text-6xl lg:text-7xl">
            Da Fazenda <span className="italic text-gold-400">para o Mundo</span>
          </h2>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-coffee-300 sm:text-lg">
            Mais de um seculo de tradicao em cada grao. Conheca a historia que se
            transforma em cafe a cada colheita.
          </p>
        </div>

        {/* Video stage — full-bleed cinematic */}
        <div className="relative mx-auto max-w-[1400px]">
          {/* Outer glow frame */}
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-gold-500/40 via-amber-600/20 to-gold-400/30 blur-2xl sm:-inset-4" />
          <div className="absolute -inset-1 rounded-[1.75rem] bg-gradient-to-br from-gold-400/60 via-transparent to-gold-500/40 opacity-70" />

          {/* Frame */}
          <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-500/25 bg-black shadow-[0_50px_120px_-20px_rgba(0,0,0,0.95),0_30px_60px_-15px_rgba(217,165,77,0.25)] ring-1 ring-gold-500/10 sm:rounded-[1.75rem]">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://player.vimeo.com/video/1171854594?autoplay=0&loop=0&muted=0&title=0&byline=0&portrait=0"
                title="Zerbinatti Coffee — Da Fazenda para o Mundo"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>

          {/* Corner ornaments */}
          <div className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 border-l-2 border-t-2 border-gold-400/60 sm:h-14 sm:w-14" />
          <div className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 border-r-2 border-t-2 border-gold-400/60 sm:h-14 sm:w-14" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-10 w-10 border-b-2 border-l-2 border-gold-400/60 sm:h-14 sm:w-14" />
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-10 w-10 border-b-2 border-r-2 border-gold-400/60 sm:h-14 sm:w-14" />
        </div>

        {/* CTA below */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-16">
          <span className="text-[11px] tracking-[0.3em] text-coffee-400 uppercase">
            Colheita 2026 ja disponivel
          </span>
          <a
            href="#cafes"
            className="rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold tracking-wide text-coffee-950 uppercase transition-all duration-200 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/30 active:scale-[0.97]"
          >
            Provar Nosso Cafe
          </a>
        </div>
      </div>
    </section>
  );
}

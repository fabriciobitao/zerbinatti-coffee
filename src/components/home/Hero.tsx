import Image from "next/image";

/**
 * Hero — split editorial 60/40.
 * Tipografia à esquerda (60%), foto fullbleed à direita (40%) em desktop.
 * Mobile: stack vertical (texto em cima, foto embaixo).
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative bg-bone"
    >
      <div className="lg:grid lg:grid-cols-[60%_40%] lg:min-h-[min(100vh,820px)]">
        {/* Coluna esquerda — tipografia */}
        <div className="flex flex-col justify-center px-5 pt-[100px] pb-12 sm:px-8 lg:px-16 lg:pt-[120px] lg:pb-16 lg:pr-16">
          <div className="max-w-[640px]">
            <p className="eyebrow">DAL 1897 · QUARTA GERAÇÃO</p>

            <h1
              id="hero-title"
              className="text-display mt-8 text-ink"
            >
              Café especial brasileiro,
              <br />
              <em className="not-italic font-display italic" style={{ fontWeight: 400 }}>
                casa italiana.
              </em>
            </h1>

            <p className="text-lede mt-8 text-ink-soft" style={{ maxWidth: "480px" }}>
              Uma casa, quatro gerações, um pacote a cada quinze dias. A
              curadoria fica por nossa conta.
            </p>

            <div
              role="group"
              aria-label="Ações principais"
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-4"
            >
              <a href="#assinatura" className="btn btn-primary">
                Começar a receber
              </a>
              <a href="#cafes" className="btn btn-secondary">
                Conhecer os cafés
              </a>
            </div>

            <p
              className="mt-12 font-mono text-[11px] uppercase text-ink-mute lg:mt-16"
              style={{ letterSpacing: "0.18em" }}
            >
              EST. MDCCCXCVII · TREVISO → SERRA DO CABRAL
            </p>
          </div>
        </div>

        {/* Coluna direita — fotografia fullbleed */}
        <div className="relative h-[60vw] max-h-[500px] w-full overflow-hidden lg:h-auto lg:max-h-none">
          <Image
            src="/images/hero-pacote-zerbinatti.jpg"
            alt="Pacote de Café Zerbinatti em mesa de madeira, luz natural lateral"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-center"
            style={{ filter: "saturate(0.7) contrast(1.05)" }}
          />
        </div>
      </div>
    </section>
  );
}

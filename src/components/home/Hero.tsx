import Image from "next/image";

/**
 * Hero — split editorial 60/40.
 * Tipografia à esquerda (60%), foto fullbleed à direita (40%) em desktop.
 * Mobile: stack vertical (texto em cima, foto embaixo).
 *
 * Foto: POV chegando à Fazenda Santa Rita pela estrada de terra,
 * janela do veículo no canto inferior. Vertical 9:16 — preserva céu + chão.
 * O leve overlay multiply em bone-soft suaviza o azul vivo sem matar o documental.
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

        {/* Coluna direita — fotografia fullbleed (POV de chegada à fazenda) */}
        <div className="relative h-[78vw] max-h-[640px] w-full overflow-hidden lg:h-auto lg:max-h-none">
          <Image
            src="/images/farm/fazenda-chegada.jpg"
            alt="Estrada de terra entre fileiras de cafezeiros na Fazenda Santa Rita, Serra do Cabral, fotografada da janela do veículo"
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{
              objectPosition: "center 40%",
              filter: "saturate(0.82) contrast(1.04)",
            }}
          />
          {/* Overlay editorial sutil — amarra o céu vivo à paleta bone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(180deg, rgba(244,239,230,0.18) 0%, rgba(244,239,230,0) 35%, rgba(244,239,230,0) 100%)",
            }}
          />
          {/* Caption sobre a foto, canto inferior — discreta */}
          <figcaption
            className="absolute bottom-5 left-5 right-5 font-mono text-[10px] uppercase text-bone lg:bottom-8 lg:left-8 lg:right-8"
            style={{
              letterSpacing: "0.22em",
              textShadow: "0 1px 8px rgba(27,23,20,0.55)",
            }}
          >
            <span className="block">Fazenda Santa Rita</span>
            <span className="mt-1 block opacity-80">
              Serra do Cabral · MMXXVI
            </span>
          </figcaption>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

/**
 * História 1897 — bloco editorial 40/60 invertido.
 * Foto à esquerda fullbleed, texto à direita.
 * Volta ao background --bone (depois do dark da Assinatura).
 */
export default function Story1897() {
  return (
    <section
      id="historia"
      aria-labelledby="historia-title"
      className="bg-bone py-20 lg:py-32"
    >
      <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-center">
        {/* Foto à esquerda — fullbleed */}
        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[560px]">
          <Image
            src="https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=70&auto=format&fit=crop"
            alt="Detalhe do ofício de torra de café — herança italiana mantida em Minas Gerais"
            fill
            sizes="(max-width: 1023px) 100vw, 40vw"
            className="object-cover"
            style={{ filter: "sepia(0.15) saturate(0.75) contrast(1.05)" }}
          />
        </div>

        {/* Texto à direita */}
        <div className="px-5 py-12 sm:px-8 lg:px-20 lg:py-0">
          <div className="max-w-[580px]">
            <p className="eyebrow">1897 — TREVISO, ITÁLIA</p>
            <h2 id="historia-title" className="text-h1 mt-8 text-ink">
              Quatro gerações,
              <br />
              o mesmo{" "}
              <em
                className="font-display italic"
                style={{ fontWeight: 400 }}
              >
                gesto.
              </em>
            </h2>
            <p className="text-body mt-8 text-ink-soft">
              Giuseppe Zerbinatti torrou seu primeiro lote em 1897, em Treviso,
              antes de atravessar o Atlântico. O ofício fez a travessia com
              ele: a moedeira de bronze, o relógio de bolso para cronometrar a
              torra, o caderno de receitas que ainda hoje guardamos. Quatro
              gerações depois, mudamos de continente, de máquinas e de fazenda,
              mas o gesto continua o mesmo — torrar pouco, torrar fresco,
              torrar para alguém que vai beber em casa, não em uma prateleira
              de supermercado.
            </p>
            <p
              className="mt-12 font-mono text-[11px] uppercase text-olive"
              style={{ letterSpacing: "0.18em" }}
            >
              MDCCCXCVII · TREVISO → MMXXVI · SERRA DO CABRAL
            </p>
            <a href="/sobre" className="link-text mt-6 inline-flex items-center gap-2">
              Conheça nossa história <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

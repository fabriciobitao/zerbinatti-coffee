import Image from "next/image";

/**
 * História 1897 — bloco editorial 40/60.
 * Coluna esquerda: foto da peneira tradicional (mão calejada, instrumento de ofício).
 * Coluna direita: texto editorial.
 *
 * A peneira ancora a tese do bloco — "o mesmo gesto, quatro gerações" —
 * com mais peso que um numeral romano genérico.
 */
export default function Story1897() {
  return (
    <section
      id="historia"
      aria-labelledby="historia-title"
      className="bg-bone py-20 lg:py-32"
    >
      <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-stretch">
        {/* Coluna esquerda — fotografia editorial */}
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft lg:aspect-auto lg:h-full lg:min-h-[620px]">
          <Image
            src="/images/farm/peneira-cafe.jpg"
            alt="Mão calejada de trabalhador segurando peneira de palha tradicional usada na separação do café"
            fill
            quality={82}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{
              objectPosition: "center center",
              filter: "saturate(0.92) contrast(1.04)",
            }}
          />
          {/* Caption-numeral no canto — substitui o ornamento */}
          <figcaption
            className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8"
            style={{
              textShadow: "0 1px 10px rgba(27,23,20,0.6)",
            }}
          >
            <span
              className="block font-display italic text-bone"
              style={{
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
              lang="la"
              aria-hidden="true"
            >
              MDCCCXCVII
            </span>
            <span
              className="mt-3 block font-mono text-[10px] uppercase text-bone"
              style={{ letterSpacing: "0.28em", opacity: 0.86 }}
            >
              Peneira de palha · ofício preservado
            </span>
          </figcaption>
        </figure>

        {/* Texto à direita */}
        <div className="px-5 py-12 sm:px-8 lg:px-20 lg:py-16">
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

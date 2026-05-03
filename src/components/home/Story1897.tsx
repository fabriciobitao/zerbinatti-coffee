/**
 * História 1897 — bloco editorial 40/60 invertido.
 * Coluna esquerda: arte editorial (numeral romano MDCCCXCVII em Fraunces italic).
 * Coluna direita: texto editorial.
 * Background --bone (depois do dark da Assinatura — cria respiração).
 */
export default function Story1897() {
  return (
    <section
      id="historia"
      aria-labelledby="historia-title"
      className="bg-bone py-20 lg:py-32"
    >
      <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-center">
        {/* Coluna esquerda — fallback editorial (numeral romano) */}
        <div
          className="relative aspect-[4/5] w-full overflow-hidden bg-bone-soft lg:aspect-auto lg:h-full lg:min-h-[560px]"
          role="img"
          aria-label="Numeral romano MDCCCXCVII — ano de fundação da casa em Treviso"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <span
              className="font-display italic text-olive"
              style={{
                fontWeight: 400,
                fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
                lineHeight: 1.05,
                letterSpacing: "0.04em",
              }}
              aria-hidden="true"
            >
              MDCCCXCVII
            </span>
            <span
              className="mt-6 block h-px w-16 bg-olive"
              aria-hidden="true"
            />
            <span
              className="mt-6 font-mono text-[11px] uppercase text-ink-mute"
              style={{ letterSpacing: "0.28em" }}
              aria-hidden="true"
            >
              TREVISO · ITÁLIA
            </span>
          </div>
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

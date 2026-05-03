import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Página não encontrada — Zerbinatti Coffee",
};

/**
 * 404 editorial — paleta bone/ink/olive, Fraunces serif italic.
 * Sem rounded-full, sem coffee/gold legados.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="flex min-h-[80vh] items-center justify-center bg-bone py-32"
      >
        <div className="container-editorial mx-auto max-w-[640px] text-center">
          <p
            className="font-mono text-[11px] font-medium uppercase text-olive"
            style={{ letterSpacing: "0.28em" }}
          >
            404 · PÁGINA NÃO ENCONTRADA
          </p>

          <span
            className="mt-10 block font-display text-ink"
            style={{
              fontWeight: 400,
              fontSize: "clamp(7rem, 18vw, 12rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
            aria-hidden="true"
          >
            404
          </span>

          <h1
            className="mt-10 font-display italic text-ink"
            style={{
              fontWeight: 400,
              fontSize: "clamp(1.75rem, 3.5vw, 2rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
            }}
          >
            Esta página não existe.
          </h1>

          <p className="text-body mt-8 text-ink-soft">
            Pode ser link velho, endereço digitado errado ou página retirada do
            ar. O que está no menu acima continua firme — comece por lá.
          </p>

          <span className="hairline mx-auto mt-12 block" aria-hidden="true" />

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center bg-olive px-8 py-4 text-xs font-medium uppercase tracking-[0.06em] text-bone transition-colors hover:bg-olive-deep sm:w-auto"
              style={{ borderRadius: "2px" }}
            >
              Voltar ao início
            </Link>
            <Link
              href="/assinatura"
              className="link-text inline-flex items-center gap-2"
            >
              Conhecer assinatura <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

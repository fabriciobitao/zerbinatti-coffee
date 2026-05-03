import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Inscrição cancelada | Zerbinatti",
  description: "Sua inscrição na newsletter Zerbinatti foi cancelada.",
  robots: { index: false, follow: false },
};

type SearchParams = { status?: string };

export default async function ObrigadoUnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status } = await searchParams;
  const isError = status === "error";

  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <section className="pt-[120px] pb-32 lg:pt-[160px] lg:pb-48">
          <div
            className="container-editorial text-center"
            style={{ maxWidth: "640px" }}
          >
            {isError ? (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                  Link inválido
                </p>
                <h1
                  className="text-display mt-8 text-ink"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
                >
                  Não conseguimos{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    cancelar
                  </em>
                  .
                </h1>
                <p className="text-lede mt-8 text-ink-soft">
                  Use o link mais recente da sua caixa de entrada ou escreva
                  para contato@zerbinatticoffee.com.
                </p>
                <div className="mt-12">
                  <Link href="/" className="btn btn-primary">
                    Voltar para a home
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-olive">
                  Inscrição cancelada
                </p>
                <h1
                  className="text-display mt-8 text-ink"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
                >
                  Sem{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    problema
                  </em>
                  .
                </h1>
                <p className="text-lede mt-8 text-ink-soft">
                  Você não receberá mais a newsletter Zerbinatti. Quando quiser
                  voltar, a casa estará aqui.
                </p>
                <div className="mt-12">
                  <Link href="/" className="btn btn-primary">
                    Voltar para a home
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

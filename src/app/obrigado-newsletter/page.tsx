import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Inscrição confirmada | Zerbinatti",
  description: "Sua inscrição na newsletter Zerbinatti foi confirmada.",
  robots: { index: false, follow: false },
};

type SearchParams = { status?: string };

export default async function ObrigadoNewsletterPage({
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
                  Algo travou no caminho
                </p>
                <h1
                  className="text-display mt-8 text-ink"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
                >
                  Link <em className="font-display italic" style={{ fontWeight: 400 }}>expirou</em> ou inválido.
                </h1>
                <p className="text-lede mt-8 text-ink-soft">
                  Os links de confirmação valem por 24 horas. Tente se inscrever
                  novamente — mandamos um link novo na hora.
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
                  Você está na lista
                </p>
                <h1
                  className="text-display mt-8 text-ink"
                  style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
                >
                  Inscrição{" "}
                  <em
                    className="font-display italic"
                    style={{ fontWeight: 400 }}
                  >
                    confirmada
                  </em>
                  .
                </h1>
                <p className="text-lede mt-8 text-ink-soft">
                  Uma vez por mês: notas de safra, novidades da torrefação,
                  rituais. Sem ruído, sem promoção forçada.
                </p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                  Primeiro envio na próxima janela editorial · cancele quando
                  quiser
                </p>
                <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link href="/" className="btn btn-primary">
                    Voltar para a home
                  </Link>
                  <Link href="/revista" className="link-text">
                    Ler a revista →
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

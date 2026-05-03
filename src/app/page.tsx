import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Placeholder MINIMO durante reformulacao da Home.
// O outro agente vai substituir este conteudo pela nova Home premium.
export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-coffee-950 pt-24 min-h-screen">
        <section className="mx-auto max-w-4xl px-6 py-32 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold-400">
            Em reformulação
          </p>
          <h1 className="mt-6 font-serif text-5xl font-bold text-coffee-50 sm:text-6xl">
            Café Zerbinatti
          </h1>
          <p className="mt-6 text-lg text-coffee-300">
            Nova home em construção. Volte em instantes.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

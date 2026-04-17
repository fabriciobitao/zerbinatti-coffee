import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Ornament, Monogram } from "@/components/ui/Ornament";

export const metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70vh] items-center bg-coffee-50 pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <div className="flex justify-center text-gold-500">
            <Monogram size={56} />
          </div>
          <span className="mt-6 block text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            Erro 404
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold text-coffee-900 sm:text-5xl">
            Essa xícara está vazia
          </h1>
          <Ornament className="mt-6" />
          <p className="mx-auto mt-8 max-w-lg text-coffee-700">
            A página que você procura não existe — pode ter sido movida, ou
            nunca ter existido. Mas enquanto você está aqui, que tal um café
            especial?
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-coffee-900 px-7 py-3 text-sm font-semibold text-coffee-50 transition-all hover:bg-coffee-700"
            >
              Voltar ao início
            </Link>
            <Link
              href="/#cafes"
              className="inline-flex items-center justify-center rounded-full border border-coffee-300 px-7 py-3 text-sm font-semibold text-coffee-900 transition-all hover:border-coffee-500 hover:bg-white"
            >
              Ver nossos cafés
            </Link>
          </div>
          <div className="mt-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-coffee-600">
              Ou siga por aqui
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/#assinatura" className="text-coffee-700 underline underline-offset-4 hover:text-coffee-900">
                Assinatura
              </Link>
              <Link href="/para-empresas" className="text-coffee-700 underline underline-offset-4 hover:text-coffee-900">
                B2B
              </Link>
              <Link href="/revista" className="text-coffee-700 underline underline-offset-4 hover:text-coffee-900">
                Revista
              </Link>
              <Link href="/#quiz" className="text-coffee-700 underline underline-offset-4 hover:text-coffee-900">
                Quiz do café
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

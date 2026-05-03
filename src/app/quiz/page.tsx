import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import QuizFlow from "@/components/QuizFlow";

export const metadata: Metadata = {
  title: "Quiz — Qual Pacote de Café Zerbinatti é Para Você?",
  description:
    "Em 30 segundos, descubra qual pacote da Zerbinatti combina com seu ritmo. 3 perguntas, sem cadastro.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    title: "Qual pacote Zerbinatti para você? — Teste de 30s",
    description:
      "Três perguntas, uma recomendação. A casa indica o pacote e a frequência.",
    url: "/quiz",
    type: "website",
  },
};

export default function QuizPage() {
  return (
    <>
      <Header />
      <main id="main" className="page-fade-in bg-bone">
        <div className="pt-[100px] lg:pt-[120px]">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Teste" },
            ]}
          />
        </div>

        <section
          aria-label="Teste de recomendação"
          className="bg-bone py-16 lg:py-24"
        >
          <div className="container-editorial">
            <QuizFlow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

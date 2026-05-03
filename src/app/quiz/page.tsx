import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import QuizFlow from "@/components/QuizFlow";

export const metadata: Metadata = {
  title: "Quiz · Zerbinatti",
  description:
    "Três perguntas, 30 segundos, uma recomendação. Descubra qual pacote Zerbinatti combina com seu ritmo de consumo. Sem cadastro, sem fricção.",
  alternates: { canonical: "/quiz" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/quiz",
    title: "Quiz · Zerbinatti",
    description:
      "3 perguntas, 30 segundos. A casa indica o pacote e a frequência.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz · Zerbinatti",
    description:
      "3 perguntas, 30 segundos. A casa indica o pacote certo para você.",
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

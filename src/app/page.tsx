import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Cafes from "@/components/home/Cafes";
import Subscription from "@/components/home/Subscription";
import Story1897 from "@/components/home/Story1897";

export const metadata: Metadata = {
  title:
    "Zerbinatti Coffee — Café Especial Brasileiro por Assinatura | Desde 1897",
  description:
    "Receba café especial brasileiro torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal, frescor garantido. Tradição italiana desde 1897.",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title:
      "Zerbinatti Coffee — Café Especial Brasileiro por Assinatura | Desde 1897",
    description:
      "Café especial brasileiro torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal. Tradição italiana desde 1897.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Zerbinatti Coffee — Café Especial Brasileiro por Assinatura | Desde 1897",
    description:
      "Café especial brasileiro torrado na semana, direto da Serra do Cabral. Tradição italiana desde 1897.",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="page-fade-in">
        <Hero />
        <Cafes />
        <Subscription />
        <Story1897 />
      </main>
      <Footer />
    </>
  );
}

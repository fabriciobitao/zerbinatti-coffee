import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Cafes from "@/components/home/Cafes";
import Subscription from "@/components/home/Subscription";
import Story1897 from "@/components/home/Story1897";

export const metadata: Metadata = {
  title: "Zerbinatti · Café brasileiro, casa italiana desde 1897",
  description:
    "Café brasileiro torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal, frete grátis, cancele em 1 clique. Casa italiana desde 1897.",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Zerbinatti · Café brasileiro, casa italiana desde 1897",
    description:
      "Café torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal, frete grátis. Quatro gerações, o mesmo gesto.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zerbinatti · Café brasileiro, casa italiana desde 1897",
    description:
      "Café torrado na semana, direto da Serra do Cabral. Assinatura quinzenal ou mensal. Quatro gerações desde 1897.",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="page-fade-in">
        <Hero />
        <Cafes />
        <Subscription />
        <Story1897 />
      </main>
      <Footer />
    </>
  );
}

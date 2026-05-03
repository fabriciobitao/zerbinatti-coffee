import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Cafes from "@/components/home/Cafes";
import Subscription from "@/components/home/Subscription";
import Story1897 from "@/components/home/Story1897";

export const metadata: Metadata = {
  title: "Zerbinatti Coffee | Café especial brasileiro, casa italiana",
  description:
    "Casa familiar de café desde 1897. Bourbon Amarelo e Catuaí Vermelho da Serra do Cabral, torrados sob demanda. Receba um pacote a cada quinze dias — a curadoria fica por nossa conta.",
  alternates: { canonical: "/" },
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

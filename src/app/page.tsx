import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BestSellers from "@/components/BestSellers";
import Story from "@/components/Story";
import Products from "@/components/Products";
import Quiz from "@/components/Quiz";
import Subscription from "@/components/Subscription";
import B2B from "@/components/B2B";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <BestSellers />
        <Story />
        <Products />
        <Quiz />
        <Subscription />
        <B2B />
      </main>
      <Footer />
    </>
  );
}

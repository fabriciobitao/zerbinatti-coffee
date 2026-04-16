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
import SectionFade from "@/components/WaveDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <BestSellers />
        <SectionFade topColor="#D7CCC8" bottomColor="#1A1108" />
        <Subscription />
        <SectionFade topColor="#1A1108" bottomColor="#FDFBF7" />
        <Story />
        <Quiz />
        <B2B />
        <SectionFade topColor="#F6F3F0" bottomColor="#1A1108" />
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BestSellers from "@/components/BestSellers";
import Story from "@/components/Story";
import Products from "@/components/Products";
import FlavorNav from "@/components/FlavorNav";
import MonthlyFeature from "@/components/MonthlyFeature";
import Quiz from "@/components/Quiz";
import Combos from "@/components/Combos";
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
        <FlavorNav />
        <Quiz />
        <Products />
        <BestSellers />
        <SectionFade topColor="#dcc7a9" bottomColor="#1A1108" />
        <Subscription />
        <SectionFade topColor="#1A1108" bottomColor="#dcc7a9" />
        <Combos />
        <MonthlyFeature />
        <Story />
        <B2B />
        <SectionFade topColor="#dcc7a9" bottomColor="#1A1108" />
      </main>
      <Footer />
    </>
  );
}

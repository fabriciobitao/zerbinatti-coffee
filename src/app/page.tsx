import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Products from "@/components/Products";
import Subscription from "@/components/Subscription";
import Quiz from "@/components/Quiz";
import B2B from "@/components/B2B";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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

/**
 * Home page (route group `(home)`).
 *
 * Composta a partir dos componentes Wave B em `src/components/home/`,
 * espelhando a ordem das secoes em public/novo-layout/index.html:
 *   header → hero → #cafes → #processo → #video → #galeria → #laudo
 *   → #assinatura → #historia → footer.
 *
 * - `<main className="novo-layout">` ativa o escopo do `novo-layout.css`
 *   carregado em `(home)/layout.tsx`.
 * - Server Component (async) porque `<Cafes />` faz fetch Shopify SSR.
 * - `<HomeHeader />` (client) ja monta `<MobileDrawer />` internamente.
 * - `<CartDrawer />` montado em paralelo no fim — fica off-canvas a direita.
 */

import HomeHeader from '@/components/home/HomeHeader';
import Hero from '@/components/home/Hero';
import { Cafes } from '@/components/home/Cafes';
import Processo from '@/components/home/Processo';
import VideoFeature from '@/components/home/VideoFeature';
import Galeria from '@/components/home/Galeria';
import CuppingReport from '@/components/home/CuppingReport';
import Subscription from '@/components/home/Subscription';
import Historia from '@/components/home/Historia';
import HomeFooter from '@/components/home/HomeFooter';
import CartDrawer from '@/components/home/CartDrawer';
import RevealObserver from '@/components/home/RevealObserver';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/seo/schemas';
import { faqs } from '@/lib/data/faqs';
import { products } from '@/lib/data/products';

export const revalidate = 3600;

export default async function HomePage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cafés Zerbinatti",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://zerbinatticoffee.com/cafes/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <main id="main" className="novo-layout">
      <JsonLd data={[faqSchema(faqs), itemListSchema]} />
      <HomeHeader />
      <Hero />
      <Cafes />
      <Processo />
      <Subscription />
      <VideoFeature />
      <Galeria />
      <CuppingReport />
      <Historia />
      <HomeFooter />
      <CartDrawer />
      <RevealObserver />
    </main>
  );
}

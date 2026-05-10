/**
 * /en — versao da home em ingles, canonica pra compartilhamento (OG/Twitter).
 *
 * Reusa 100% dos componentes da home em PT. O LocaleProvider em
 * `src/app/en/layout.tsx` trava `locale=en`, entao todos os `<T>` /
 * `useT()` resolvem o dicionario em ingles ja no SSR.
 *
 * Internal links (#cafes, #processo, etc): Header/Footer/Drawer detectam
 * o pathname `/en` via `usePathname()` e prefixam ancoras com `/en#...`
 * pra manter o usuario na bolha EN durante a navegacao na home.
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
import { products } from '@/lib/data/products';

export const revalidate = 3600;

export default async function HomePageEN() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zerbinatti Coffees",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://zerbinatti.coffee/cafes/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <main id="main" className="novo-layout">
      <JsonLd data={[itemListSchema]} />
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

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

export default async function HomePage() {
  return (
    <main className="novo-layout">
      <HomeHeader />
      <Hero />
      <Cafes />
      <Processo />
      <VideoFeature />
      <Galeria />
      <CuppingReport />
      <Subscription />
      <Historia />
      <HomeFooter />
      <CartDrawer />
    </main>
  );
}

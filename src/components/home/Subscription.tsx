// Subscription — Server Component. Reproduz a <section class="subscribe-section" id="assinatura">
// de public/novo-layout/index.html. Layout de duas colunas: texto + 3 cards de planos.
// CTAs nos cards abrem WhatsApp (deeplink) ate Shopify Subscriptions ser plugado.

import { T } from '@/lib/i18n';
import SubscriptionPlanCard from './SubscriptionPlanCard';

export default function Subscription() {
  return (
    <section className="subscribe-section" id="assinatura">
      <div className="sub-inner">
        <div className="sub-text reveal">
          <span className="sub-mark" aria-hidden="true">— Clube Zerbinatti</span>
          <T k="sub.eyebrow" as="h2" className="sub-mega" />
          <T k="sub.title" as="p" className="sub-tagline" />
          <T k="sub.desc" as="p" className="body-lg" />
          <div className="sub-perks" aria-hidden="true">
            <span><i>✦</i> 10% off em cada entrega</span>
            <span><i>✦</i> Pause ou cancele quando quiser</span>
            <span><i>✦</i> Torra do mês selecionada à mão</span>
          </div>
          <a href="#planos" className="btn btn-gold">
            <T k="sub.cta" html as="span" />
          </a>
        </div>
        <div className="sub-cards reveal" id="planos">
          <SubscriptionPlanCard planKey="plan1" />
          <SubscriptionPlanCard planKey="plan2" featured />
          <SubscriptionPlanCard planKey="plan3" />
        </div>
      </div>
    </section>
  );
}

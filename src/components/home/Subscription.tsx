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
          <T k="sub.eyebrow" as="span" className="eyebrow" />
          <T k="sub.title" as="h2" className="display" />
          <T k="sub.desc" as="p" className="body-lg" />
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

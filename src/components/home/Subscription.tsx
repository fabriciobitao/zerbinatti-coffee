// Subscription — Server Component. Reproduz a <section class="subscribe-section" id="assinatura">
// de public/novo-layout/index.html. Layout de duas colunas: texto + 3 cards de planos.
// Temporariamente sem CTA principal — secao serve so de marketing com selo "Em breve"
// ate a loja liberar assinaturas.

import { T } from '@/lib/i18n';
import SubscriptionPlanCard from './SubscriptionPlanCard';

export default function Subscription({ id = 'assinatura' }: { id?: string } = {}) {
  return (
    <section className="subscribe-section" id={id}>
      <div className="sub-inner">
        <div className="sub-text reveal">
          <span className="sub-mark" aria-hidden="true">— Clube Zerbinatti</span>
          <T k="sub.eyebrow" as="h2" className="sub-mega" />
          <T k="sub.title" as="p" className="sub-tagline" />
          <T k="sub.desc" as="p" className="body-lg" />
          <div className="sub-perks" aria-hidden="true">
            <span><i>✦</i> <T k="sub.perk.discount" /></span>
            <span><i>✦</i> <T k="sub.perk.flex" /></span>
            <span><i>✦</i> <T k="sub.perk.curated" /></span>
          </div>
          <span
            className="sub-coming-soon-seal"
            data-coming-soon="true"
          >
            <T k="cta.comingSoon" />
          </span>
        </div>
        <div className="sub-cards reveal" id="planos">
          <SubscriptionPlanCard planKey="plan1" featured />
          <SubscriptionPlanCard planKey="plan2" />
          <SubscriptionPlanCard planKey="plan3" />
        </div>
      </div>
    </section>
  );
}

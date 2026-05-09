// SubscriptionPlanCard — Server Component.
// Renderiza um card de plano de assinatura individual. Toda copy via i18n.
// Temporariamente sem link, sem preco e sem clique — apenas marketing
// enquanto a loja nao esta liberada pra assinaturas.

import { T } from '@/lib/i18n';

type PlanKey = 'plan1' | 'plan2' | 'plan3';
const PLAN_NUMERAL: Record<PlanKey, string> = {
  plan1: 'I',
  plan2: 'II',
  plan3: 'III',
};

interface SubscriptionPlanCardProps {
  planKey: PlanKey;
  featured?: boolean;
}

export default function SubscriptionPlanCard({
  planKey,
  featured = false,
}: SubscriptionPlanCardProps) {
  return (
    <div
      className={`plan${featured ? ' featured' : ''}`}
      data-coming-soon="true"
      aria-disabled="true"
    >
      <div className="num">{PLAN_NUMERAL[planKey]}</div>
      <div className="info">
        <T k={`sub.${planKey}.title`} html as="div" className="name" />
        <T k={`sub.${planKey}.freq`} as="div" className="freq" />
        <T k={`sub.${planKey}.desc`} as="div" className="desc" />
        {featured ? <T k="sub.featured.badge" as="div" className="badge" /> : null}
      </div>
    </div>
  );
}

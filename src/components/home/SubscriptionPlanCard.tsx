// SubscriptionPlanCard — Server Component.
// Renderiza um card de plano de assinatura individual. Toda copy via i18n.
// Temporariamente sem link e sem preco enquanto a loja nao esta liberada —
// mantem so as opcoes visiveis para o usuario.

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
    >
      <div className="num">{PLAN_NUMERAL[planKey]}</div>
      <div className="info">
        <T k={`sub.${planKey}.title`} html as="div" className="name" />
        <T k={`sub.${planKey}.freq`} as="div" className="freq" />
        <T k={`sub.${planKey}.desc`} as="div" className="desc" />
        {featured ? <T k="sub.plan2.badge" as="div" className="badge" /> : null}
      </div>
    </div>
  );
}

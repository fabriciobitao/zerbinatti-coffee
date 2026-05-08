// SubscriptionPlanCard — Server Component.
// Renderiza um card de plano de assinatura individual. Toda copy via i18n.
// CTA abre WhatsApp (deeplink) com mensagem pre-preenchida do plano —
// Shopify Subscriptions ainda nao esta plugado (so marketing).

import { T } from '@/lib/i18n';
import { dictionary, DEFAULT_LOCALE } from '@/lib/i18n/dictionary';

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
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5511999998888';

  // Lookup da mensagem de WhatsApp no dicionario default (server-side).
  // Fallback: mensagem generica em PT — caso a chave nao exista no dicionario.
  const ptMap = dictionary[DEFAULT_LOCALE] as Record<string, string>;
  const fallbackMsg = `Olá! Quero assinar o plano ${ptMap[`sub.${planKey}.title`] ?? planKey}.`;
  const waMsg = ptMap[`sub.whatsapp.msg.${planKey}`] ?? fallbackMsg;
  const href = `https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`plan${featured ? ' featured' : ''}`}
    >
      <div className="num">{PLAN_NUMERAL[planKey]}</div>
      <div className="info">
        <T k={`sub.${planKey}.title`} html as="div" className="name" />
        <T k={`sub.${planKey}.freq`} as="div" className="freq" />
        <T k={`sub.${planKey}.desc`} as="div" className="desc" />
        {featured ? <T k="sub.featured.badge" as="div" className="badge" /> : null}
      </div>
      <div className="price-col">
        <T k={`sub.${planKey}.price`} as="div" className="price" />
        <T k="sub.priceMonthOff" as="div" className="price-sub" />
      </div>
    </a>
  );
}

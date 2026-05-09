/**
 * dataLayer helper type-safe pra GA4 e-commerce events.
 *
 * Padrao GA4 Enhanced Ecommerce:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 *
 * Eventos suportados:
 *   view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout,
 *   purchase (Shopify dispara client-side via Storefront API), search,
 *   sign_up, generate_lead (form B2B / newsletter).
 */

export type GA4Item = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
};

type EcommerceEvent =
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "purchase";

type LeadEvent = "generate_lead" | "sign_up";

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

function getDataLayer(): Array<Record<string, unknown>> | null {
  if (typeof window === "undefined") return null;
  const w = window as DataLayerWindow;
  if (!w.dataLayer) w.dataLayer = [];
  return w.dataLayer;
}

export function pushEvent(
  event: string,
  params: Record<string, unknown> = {},
): void {
  const dl = getDataLayer();
  if (!dl) return;
  dl.push({ event, ...params });
}

/**
 * GA4 ecommerce events. Sempre limpa o objeto `ecommerce` antes pra evitar
 * vazamento de items entre eventos (boa pratica GTM).
 */
export function pushEcommerce(
  event: EcommerceEvent,
  params: {
    currency?: string;
    value?: number;
    items: GA4Item[];
    [key: string]: unknown;
  },
): void {
  const dl = getDataLayer();
  if (!dl) return;
  dl.push({ ecommerce: null });
  dl.push({
    event,
    ecommerce: {
      currency: params.currency ?? "BRL",
      value: params.value,
      items: params.items,
      ...Object.fromEntries(
        Object.entries(params).filter(
          ([k]) => !["currency", "value", "items"].includes(k),
        ),
      ),
    },
  });
}

export function pushLead(
  event: LeadEvent,
  params: { method?: string; form_name?: string; [key: string]: unknown },
): void {
  const dl = getDataLayer();
  if (!dl) return;
  dl.push({ event, ...params });
}

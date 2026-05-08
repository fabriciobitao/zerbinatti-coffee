/**
 * Editorial enrichment for the "classico-zerbinatti" product.
 *
 * Shopify holds: title, descriptionHtml, images, variants, prices.
 * We hold here (not in Shopify): sensory profile (1-5), flavor chip i18n keys,
 * origin metadata, recommended methods (i18n keys), harvest, SCA score,
 * and the variant→UI-slot mapping.
 *
 * Strings the user sees are referenced as i18n KEYS, never raw strings,
 * so the locale switcher keeps working. Origin metadata is factual and
 * stays as raw values (place names, altitude, etc).
 */

export type SensoryProfile = {
  sweetness: number; // doçura
  acidity: number; // acidez
  body: number; // corpo
  complexity: number; // complexidade
};

export type EditorialOrigin = {
  farm: string;
  region: string;
  state: string;
  altitude: string;
  variety: string;
  process: string;
  harvest: string;
};

export type EditorialVariantSlot = {
  /** Stable UI slot id used by components (e.g. tabs/cards/CTAs). */
  slotKey: string;
  /** Match rule against Shopify selectedOptions to bind this slot to a variant. */
  matchOption: { name: string; value: string };
};

export type EditorialProduct = {
  /** Shopify product handle this enrichment applies to. */
  handle: string;
  /** i18n keys, e.g. 'note.chocolate'. */
  flavorChipsKeys: string[];
  sensory: SensoryProfile;
  /** SCA cupping score as string (allows '84.75', '90+', etc). */
  scaScore: string;
  origin: EditorialOrigin;
  /** i18n keys, e.g. 'method.espresso'. */
  recommendedMethodsKeys: string[];
  variantSlots: EditorialVariantSlot[];
};

export const editorialClassico: EditorialProduct = {
  handle: "classico-zerbinatti",

  flavorChipsKeys: [
    "note.chocoLeite",
    "note.caramelo",
    "note.nozes",
    "note.finalDoce",
  ],

  sensory: {
    sweetness: 4,
    acidity: 2,
    body: 4,
    complexity: 3,
  },

  // Aligned with Shopify descriptionHtml (84.75 SCA — Valim Farms).
  scaScore: "84.75",

  origin: {
    farm: "Valim Farms",
    region: "Serra do Cabral",
    state: "Minas Gerais",
    altitude: "640 a 760m",
    variety: "Catuaí Vermelho + Mundo Novo",
    process: "Natural",
    harvest: "Safra 2025",
  },

  recommendedMethodsKeys: [
    "method.espresso",
    "method.french-press",
    "method.moka",
    "method.pour-over",
  ],

  // Bound to the live store's "Tamanho" option.
  variantSlots: [
    {
      slotKey: "classico-250g",
      matchOption: { name: "Tamanho", value: "250g" },
    },
    {
      slotKey: "classico-500g",
      matchOption: { name: "Tamanho", value: "500g" },
    },
  ],
};

/** All editorial enrichments, keyed by Shopify handle. */
export const editorialByHandle: Record<string, EditorialProduct> = {
  [editorialClassico.handle]: editorialClassico,
};

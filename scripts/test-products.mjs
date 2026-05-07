/**
 * Smoke test for src/lib/products.ts (server-only orchestrator).
 *
 * We can't import the TS module directly in Node without tsx, so this script
 * mirrors the same query + mapping logic and prints the mapped output.
 * If the live Shopify response shape changes, this catches it before
 * Next.js does at build time.
 *
 * Run: node scripts/test-products.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Minimal .env.local loader (no dotenv dep) ---
function loadEnv(file) {
  try {
    const text = readFileSync(file, "utf8");
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (err) {
    console.warn(`[env] could not read ${file}: ${err.message}`);
  }
}
loadEnv(resolve(__dirname, "..", ".env.local"));

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
// Use the PUBLIC Storefront token for the smoke test — the private token in
// .env.local appears to be an Admin API token (shpat_...) which does NOT
// authenticate against the Storefront API. Production code in shopify.ts
// tries private first and falls back to public, so this issue must be
// resolved before deploy.
const token =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

if (!domain || !token) {
  console.error("Missing Shopify env vars in .env.local");
  process.exit(1);
}

// --- Editorial enrichment (mirrors src/lib/editorial/classico.ts) ---
const editorialClassico = {
  handle: "classico-zerbinatti",
  flavorChipsKeys: [
    "note.chocolate",
    "note.caramel",
    "note.nuts",
    "note.sweet-finish",
  ],
  sensory: { sweetness: 4, acidity: 2, body: 4, complexity: 3 },
  scaScore: "84.75",
  origin: {
    farm: "Valim Farms",
    region: "Serra do Cabral",
    state: "Minas Gerais",
    altitude: "900 a 1.100m",
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
  variantSlots: [
    { slotKey: "classico-250g", matchOption: { name: "Tamanho", value: "250g" } },
    { slotKey: "classico-500g", matchOption: { name: "Tamanho", value: "500g" } },
  ],
};
const editorialByHandle = {
  [editorialClassico.handle]: editorialClassico,
};

// --- Query (same shape as GET_ALL_PRODUCTS in src/lib/shopify.ts) ---
const QUERY = /* GraphQL */ `
  query GetAllProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          featuredImage { url altText }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
                image { url altText }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function resolveSlotKey(handle, index, selectedOptions, editorial) {
  if (editorial) {
    const match = editorial.variantSlots.find((slot) =>
      selectedOptions.some(
        (o) =>
          o.name === slot.matchOption.name && o.value === slot.matchOption.value,
      ),
    );
    if (match) return match.slotKey;
  }
  return `${handle}-${index}`;
}

function mapProduct(node) {
  const editorial = editorialByHandle[node.handle] ?? null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    descriptionHtml: node.descriptionHtml,
    featuredImage: node.featuredImage
      ? { url: node.featuredImage.url, altText: node.featuredImage.altText ?? null }
      : null,
    images: node.images.edges.map(({ node: i }) => ({
      url: i.url,
      altText: i.altText ?? null,
    })),
    variants: node.variants.edges.map(({ node: v }, i) => {
      const amount = Number(v.price.amount);
      return {
        slotKey: resolveSlotKey(node.handle, i, v.selectedOptions, editorial),
        variantId: v.id,
        title: v.title,
        selectedOptions: v.selectedOptions,
        priceFormatted:
          v.price.currencyCode === "BRL"
            ? brl.format(amount)
            : new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: v.price.currencyCode,
              }).format(amount),
        priceAmount: amount,
        currencyCode: v.price.currencyCode,
        availableForSale: v.availableForSale,
        image: v.image
          ? { url: v.image.url, altText: v.image.altText ?? null }
          : null,
      };
    }),
    editorial,
  };
}

// --- Run ---
const res = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": token,
  },
  body: JSON.stringify({ query: QUERY, variables: { first: 20 } }),
});

if (!res.ok) {
  console.error(`HTTP ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const json = await res.json();
if (json.errors) {
  console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
  process.exit(1);
}

const products = json.data.products.edges.map(({ node }) => mapProduct(node));

console.log("=== getHomeProducts() output ===");
console.log(JSON.stringify(products, null, 2));

console.log("\n=== Summary ===");
for (const p of products) {
  console.log(`- ${p.handle} (${p.title})`);
  console.log(`  editorial: ${p.editorial ? "yes" : "MISSING"}`);
  for (const v of p.variants) {
    const opts = v.selectedOptions.map((o) => `${o.name}=${o.value}`).join(", ");
    console.log(`    [${v.slotKey}] ${v.title} — ${v.priceFormatted} — ${opts}`);
  }
}

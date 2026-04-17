/**
 * Configuração central do site — URL canônica, branding, analytics.
 * Use process.env.NEXT_PUBLIC_SITE_URL em produção para setar domínio real.
 */
export const siteConfig = {
  name: "Zerbinatti Coffee",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://cafe-alpha-five.vercel.app",
  tagline: "Café brasileiro, casa italiana, desde 1897",
  description:
    "Café brasileiro de quatro gerações, torrado sob demanda na Serra do Cabral (MG). Blend tradicional, single origin e microlotes raros, com data de torra e ficha técnica em cada sacola.",
  foundingYear: 1897,
  locale: "pt_BR",
  twitter: "@zerbinatticoffee",
};

export const gaId = process.env.NEXT_PUBLIC_GA_ID;
export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Organization JSON-LD — inserida no layout raiz, cobre todas as páginas.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    foundingDate: "1897",
    founder: { "@type": "Person", name: "Giuseppe Zerbinatti" },
    description: siteConfig.description,
    sameAs: [
      "https://instagram.com/zerbinatticoffee",
      "https://youtube.com/@zerbinatticoffee",
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "MG",
      addressCountry: "BR",
    },
  };
}

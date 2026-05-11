import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "../(home)/novo-layout.css";
import "../(home)/export.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE_EN = "Export — Zerbinatti Specialty Coffee, direct from the farm";
const DESCRIPTION_EN =
  "Brazilian specialty coffee export, directly from Valim Farms in Serra do Cabral (MG). Three generations, SCA 85+, worldwide shipping. Request a quote from the farm.";

// Metadata canonica EN para /export. Caminho canonical internacional pra
// importadores/roasters de fora. og:locale=en_US, hreflang aponta para
// as 3 versoes.
export const metadata: Metadata = {
  title: TITLE_EN,
  description: DESCRIPTION_EN,
  alternates: {
    canonical: "/export",
    languages: {
      "pt-BR": "/exportacao",
      "en": "/export",
      "es": "/es/exportacion",
      "x-default": "/export",
    },
  },
  openGraph: {
    title: TITLE_EN,
    description: DESCRIPTION_EN,
    url: `${SITE_URL}/export`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Brazilian specialty coffee export, direct from the farm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_EN,
    description: DESCRIPTION_EN,
    images: [OG_IMAGE],
  },
};

// /export e rota EN canonica internacional (vive na raiz, fora de /en).
// Wrap dedicado garante SSR em ingles + skip de auto-detect do provider
// externo (root layout pula sync de <html lang> para este pathname).
export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="en" persistent={false}>
      {children}
    </LocaleProvider>
  );
}

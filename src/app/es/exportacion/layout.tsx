import type { Metadata } from "next";
import "../../(home)/export.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE_ES = "Exportación — Café Especial Zerbinatti, directo de la finca";
const DESCRIPTION_ES =
  "Exportación de café especial brasileño directo de Valim Farms, Serra do Cabral (MG). Tres generaciones, SCA 85+, embarques mundiales. Solicita una negociación con la finca.";

// Metadata canonica ES para /es/exportacion. LocaleProvider ja vem do
// /es/layout.tsx (initialLocale='es') — aqui so importamos o CSS da
// secao e sobrescrevemos title/description/canonical.
export const metadata: Metadata = {
  title: TITLE_ES,
  description: DESCRIPTION_ES,
  alternates: {
    canonical: "/es/exportacion",
    languages: {
      "pt-BR": "/exportacao",
      "en": "/export",
      "es": "/es/exportacion",
      "x-default": "/export",
    },
  },
  openGraph: {
    title: TITLE_ES,
    description: DESCRIPTION_ES,
    url: `${SITE_URL}/es/exportacion`,
    siteName: SITE_NAME,
    type: "website",
    locale: "es_ES",
    alternateLocale: ["pt_BR", "en_US"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Exportación de café especial directo de la finca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_ES,
    description: DESCRIPTION_ES,
    images: [OG_IMAGE],
  },
};

export default function EsExportacionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

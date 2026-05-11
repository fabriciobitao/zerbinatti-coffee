import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "../(home)/novo-layout.css";
import "../(home)/export.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE_PT = "Exportação — Café Especial Zerbinatti, direto da fazenda";
const DESCRIPTION_PT =
  "Exportação de café especial brasileiro direto da Valim Farms, Serra do Cabral (MG). Três gerações, SCA 85+, embarques mundiais. Solicite uma negociação com a fazenda.";

// Metadata canonica PT para /exportacao. og:locale=pt_BR, hreflang aponta
// para as 3 versoes (PT canonica + EN /export + ES /es/exportacion).
export const metadata: Metadata = {
  title: TITLE_PT,
  description: DESCRIPTION_PT,
  alternates: {
    canonical: "/exportacao",
    languages: {
      "pt-BR": "/exportacao",
      "en": "/export",
      "es": "/es/exportacion",
      "x-default": "/export",
    },
  },
  openGraph: {
    title: TITLE_PT,
    description: DESCRIPTION_PT,
    url: `${SITE_URL}/exportacao`,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Exportação de café especial direto da fazenda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_PT,
    description: DESCRIPTION_PT,
    images: [OG_IMAGE],
  },
};

// LocaleProvider aninhado fixa locale=pt no SSR e desliga persistencia
// (a pagina canonica e PT independente do que o visitante tenha em
// localStorage). Toggle de idioma na header navega para /export ou
// /es/exportacion conforme o codigo escolhido.
export default function ExportacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="pt" persistent={false}>
      {children}
    </LocaleProvider>
  );
}

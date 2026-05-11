import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "../(home)/novo-layout.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE_ES = "Zerbinatti — Café Especial Brasileño, herencia italiana desde 1897";
const DESCRIPTION_ES =
  "Café especial brasileño con herencia italiana desde 1897. Tres generaciones cultivando 100% Arábica entre 640–760m en la Serra do Cabral, Minas Gerais. Directo de la finca a tu taza.";

// Metadata por defecto para /es/*. Cada pagina filha sobrescreve title/description/canonical.
// Por enquanto so /es/exportacion existe — quando expandir, este layout
// segue valido (mantem locale=es como base pro segmento).
export const metadata: Metadata = {
  title: TITLE_ES,
  description: DESCRIPTION_ES,
  alternates: {
    canonical: "/es",
    languages: {
      "pt-BR": "/",
      "en": "/en",
      "es": "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    title: TITLE_ES,
    description: DESCRIPTION_ES,
    url: `${SITE_URL}/es`,
    siteName: SITE_NAME,
    type: "website",
    locale: "es_ES",
    alternateLocale: ["pt_BR", "en_US"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Café especial brasileño, directo de la finca",
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

// LocaleProvider aninhado: trava `locale=es` no SSR e desliga persistencia,
// mesmo padrao do /en/layout.tsx. Garante que descendentes renderizem em
// espanhol ja na primeira pintura, sem flash em portugues.
export default function EsLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="es" persistent={false}>
      {children}
    </LocaleProvider>
  );
}

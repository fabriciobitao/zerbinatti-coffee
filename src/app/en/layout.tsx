import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import "../(home)/novo-layout.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE_EN = "Zerbinatti — Brazilian Specialty Coffee, Italian heritage since 1897";
const DESCRIPTION_EN =
  "Brazilian specialty coffee with Italian heritage since 1897. Three generations growing 100% Arabica at 640–760m on Serra do Cabral, Minas Gerais. Direct from the farm to your cup, small-batch artisan roasted.";

// Metadata dedicada a versao em ingles. Quando alguem compartilha
// https://zerbinatti.coffee/en, crawlers do Facebook/X/LinkedIn/WhatsApp
// leem estas tags (sem executar JS) — tudo em ingles.
export const metadata: Metadata = {
  title: TITLE_EN,
  description: DESCRIPTION_EN,
  alternates: {
    canonical: "/en",
    languages: {
      "pt-BR": "/",
      "en": "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: TITLE_EN,
    description: DESCRIPTION_EN,
    url: `${SITE_URL}/en`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Brazilian specialty coffee, direct from the farm",
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

// LocaleProvider aninhado: trava `locale=en` no SSR e desliga persistencia.
// O provider externo (root layout) continua existindo com auto-detect, mas
// o contexto interno tem prioridade pros descendentes — todo `<T>` dentro
// renderiza em ingles ja na primeira pintura, sem flash em PT.
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale="en" persistent={false}>
      {children}
    </LocaleProvider>
  );
}

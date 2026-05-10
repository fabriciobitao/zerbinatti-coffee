import type { Metadata } from "next";
import "./for-business.css";

const SITE_URL = "https://zerbinatti.coffee";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";

const TITLE = "For Business — Zerbinatti Specialty Coffee";
const DESCRIPTION =
  "Zerbinatti B2B program — direct-from-the-farm specialty coffee for cafés, restaurants, hotels, roasteries and offices. Three generations, 85+ SCA scores, annual contracts with locked pricing.";

// Metadata canonica EN. /en/for-business e a UNICA pagina B2B daqui pra
// frente — /para-empresas redireciona 301 pra ca. og:locale=en_US,
// hreflang aponta pt-BR -> /para-empresas (que redireciona pra ca de novo,
// mantendo cadeia coerente apos 301).
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/en/for-business",
    languages: {
      "en": "/en/for-business",
      "x-default": "/en/for-business",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/en/for-business`,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
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
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ForBusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

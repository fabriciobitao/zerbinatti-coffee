import type { Metadata } from "next";
import Script from "next/script";
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Allura,
  JetBrains_Mono,
} from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
import { CartHydrator } from "@/lib/cart/CartHydrator";
import { LocaleProvider } from "@/lib/i18n";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = "https://zerbinatticoffee.com";
const OG_IMAGE = "/assets/og-share.jpg";
const SITE_NAME = "Zerbinatti";
const TITLE_DEFAULT = "Zerbinatti — Café Especial Brasileiro desde 1897";
const TITLE_TEMPLATE = "%s | Zerbinatti Coffee";
const DESCRIPTION =
  "Café especial brasileiro com herança italiana desde 1897. Três gerações cultivando 100% Arábica na Serra do Cabral, MG. Direto do produtor para sua xícara.";

const SEO_INDEX = process.env.SEO_INDEX === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE_DEFAULT, template: TITLE_TEMPLATE },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Família Zerbinatti", url: SITE_URL }],
  creator: "Zerbinatti Coffee",
  publisher: "Zerbinatti Coffee",
  keywords: [
    "café especial",
    "café Zerbinatti",
    "café Serra do Cabral",
    "café arábica brasileiro",
    "café arara",
    "specialty coffee Brazil",
    "café premium",
    "café single origin",
    "café fazenda Minas Gerais",
    "torra sob demanda",
  ],
  alternates: {
    canonical: "/",
  },
  robots: SEO_INDEX
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "none",
          "max-snippet": -1,
        },
      },
  openGraph: {
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["en_US", "es_ES"],
    images: [
      {
        url: OG_IMAGE,
        width: 673,
        height: 706,
        alt: "Zerbinatti — Café especial direto da fazenda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  category: "food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${allura.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/gruta.css" />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <LocaleProvider>
          <CartProvider>
            <CartHydrator />
            {children}
            <CartToasts />
          </CartProvider>
        </LocaleProvider>
        <Script src="/gruta.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

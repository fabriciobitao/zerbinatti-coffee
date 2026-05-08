import type { Metadata } from "next";
import Script from "next/script";
import {
  Playfair_Display,
  Inter,
  Cormorant_Garamond,
  Allura,
  JetBrains_Mono,
  Press_Start_2P,
} from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
import { CartHydrator } from "@/lib/cart/CartHydrator";
import { LocaleProvider } from "@/lib/i18n";
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

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zerbinatti Coffee | From the 1897 Legacy to Your Cup",
  description:
    "Café especial brasileiro com herança italiana desde 1897. Colheita limitada, qualidade premium, direto da fazenda para sua xícara.",
  keywords: [
    "café especial",
    "specialty coffee",
    "Brazilian coffee",
    "Zerbinatti",
    "café premium",
    "single origin",
  ],
  robots: {
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
    title: "Zerbinatti Coffee | Since 1897",
    description:
      "Café especial brasileiro com herança italiana desde 1897. Qualidade premium, colheita limitada.",
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${allura.variable} ${jetbrains.variable} ${pressStart.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="/gruta.css" />
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

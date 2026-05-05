import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
import { siteConfig, gaId, metaPixelId } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Analytics } from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsentLazy";
import "./globals.css";

// Fraunces — display serif italic dramático (assinatura tipográfica)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Inter — sans humanista para corpo
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// JetBrains Mono — números, lote, safra, eyebrows técnicos
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Café brasileiro, casa italiana, desde 1897`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "café especial",
    "specialty coffee",
    "café brasileiro",
    "Zerbinatti",
    "café torrado sob demanda",
    "single origin",
    "Serra do Cabral",
    "assinatura de café",
    "microlote",
  ],
  authors: [{ name: "Família Zerbinatti" }],
  creator: "Zerbinatti Coffee",
  publisher: "Zerbinatti Coffee",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Café brasileiro, casa italiana, desde 1897`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Café brasileiro, casa italiana, desde 1897`,
    description: siteConfig.description,
    site: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        {/*
          Preload do hero foi removido daqui (era global, mas /assinatura e
          /cafes/[slug] nao usam essa imagem — desperdicava ~238KB e atrasava
          recursos criticos). O priority + fetchPriority no <Image> da home
          ja sinaliza prioridade alta para o browser na rota correta.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-ink focus:text-bone focus:px-4 focus:py-2 focus:rounded"
        >
          Pular para o conteúdo
        </a>
        <CartProvider>
          {children}
          <CartToasts />
        </CartProvider>
        <Analytics gaId={gaId} metaPixelId={metaPixelId} />
        <CookieConsent />
      </body>
    </html>
  );
}

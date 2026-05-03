import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
import { siteConfig, gaId, metaPixelId, organizationSchema } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
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
    "café premium",
    "single origin",
    "Serra do Cabral",
    "assinatura de café",
    "café gourmet",
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
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Zerbinatti Coffee — café brasileiro, casa italiana, desde 1897",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Café brasileiro, casa italiana, desde 1897`,
    description: siteConfig.description,
    site: siteConfig.twitter,
    images: ["/images/og-default.jpg"],
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/hero-pacote-zerbinatti.jpg"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
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
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
import { siteConfig, gaId, metaPixelId, organizationSchema } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
        alt: "Zerbinatti Coffee — Café brasileiro, casa italiana, desde 1897",
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          {children}
          <CartToasts />
        </CartProvider>
        <Analytics gaId={gaId} metaPixelId={metaPixelId} />
      </body>
    </html>
  );
}

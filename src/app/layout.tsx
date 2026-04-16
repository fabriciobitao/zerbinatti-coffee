import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { CartProvider, CartToasts } from "@/lib/cart-context";
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          {children}
          <CartToasts />
        </CartProvider>
      </body>
    </html>
  );
}

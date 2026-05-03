/**
 * Layout isolado para o Studio — Sanity precisa controlar o <html>
 * e injetar metadados proprios. Este layout substitui o RootLayout
 * herdado do app/layout.tsx para esta rota.
 */
export const metadata = {
  title: "Zerbinatti — Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

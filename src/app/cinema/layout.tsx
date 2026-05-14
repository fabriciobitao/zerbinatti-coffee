import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./cinema.css";

export const metadata: Metadata = {
  title: "Cinema — Zerbinatti",
  description:
    "Protótipo cinematográfico do redesign Zerbinatti — quatro gerações, três continentes, uma origem.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: { canonical: "/cinema" },
};

export default function CinemaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

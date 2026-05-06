import { ReactNode } from "react";

type Variant =
  | "limited"
  | "score"
  | "discount"
  | "new"
  | "popular"
  | "neutral";

const variants: Record<Variant, string> = {
  limited: "bg-coffee-900/90 text-gold-400 backdrop-blur-sm",
  score: "bg-green-800/10 text-green-800",
  discount: "bg-green-800 text-white",
  new: "bg-gold-500 text-coffee-950",
  popular: "bg-gold-500 text-coffee-950",
  neutral: "bg-coffee-100 text-coffee-800",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

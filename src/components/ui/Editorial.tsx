import { ReactNode } from "react";

/**
 * Primitivos tipográficos editoriais — usados em revista, stories, seções hero.
 * Todos baseados em classes utilitárias definidas em globals.css.
 */

/* Kicker — eyebrow com ornamento tipográfico */
export function Kicker({
  children,
  className = "",
  color = "gold",
}: {
  children: ReactNode;
  className?: string;
  color?: "gold" | "coffee" | "light";
}) {
  const colorClass =
    color === "gold"
      ? "text-gold-600"
      : color === "coffee"
      ? "text-coffee-700"
      : "text-coffee-300";
  return <span className={`kicker ${colorClass} ${className}`}>{children}</span>;
}

/* Pull quote — citação editorial com aspas ornamentadas */
export function PullQuote({
  children,
  cite,
  className = "",
}: {
  children: ReactNode;
  cite?: string;
  className?: string;
}) {
  return (
    <figure className={`my-12 ${className}`}>
      <blockquote className="pull-quote">{children}</blockquote>
      {cite && (
        <figcaption className="mt-4 pl-6 text-sm uppercase tracking-[0.2em] text-coffee-500">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
}

/* DropCap — primeira letra editorial */
export function DropCap({
  children,
  variant = "coffee",
  className = "",
}: {
  children: ReactNode;
  variant?: "coffee" | "gold";
  className?: string;
}) {
  const variantClass = variant === "gold" ? "drop-cap drop-cap-gold" : "drop-cap";
  return (
    <p
      className={`${variantClass} font-serif text-lg leading-relaxed text-coffee-800 sm:text-xl ${className}`}
    >
      {children}
    </p>
  );
}

/* Lede — parágrafo de abertura em serifa itálica */
export function Lede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`text-lede text-coffee-700 ${className}`}>{children}</p>;
}

/* Marginalia — anotação vertical tipo manuscrito antigo */
export function Marginalia({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`marginalia ${className}`} aria-hidden>
      {children}
    </div>
  );
}

/* AsymmetricDivider — quebra ornamental de seção (variação do Ornament) */
export function AsymmetricDivider({
  className = "",
  color = "gold",
}: {
  className?: string;
  color?: "gold" | "coffee" | "light";
}) {
  const stroke =
    color === "gold"
      ? "text-gold-500"
      : color === "coffee"
      ? "text-coffee-700"
      : "text-coffee-200";
  return (
    <div
      className={`flex items-center gap-3 ${stroke} ${className}`}
      aria-hidden
    >
      <span className="h-px w-6 bg-current opacity-60" />
      <span className="h-px w-16 bg-current" />
      <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="currentColor">
        <circle cx="6" cy="6" r="2" />
      </svg>
      <span className="h-px w-4 bg-current opacity-40" />
    </div>
  );
}

/* Display — título gigante editorial (hero scale) */
export function Display({
  children,
  italic = false,
  as: Tag = "h1",
  className = "",
}: {
  children: ReactNode;
  italic?: boolean;
  as?: "h1" | "h2" | "h3" | "div";
  className?: string;
}) {
  const cls = italic ? "text-display-italic" : "text-display";
  return <Tag className={`${cls} ${className}`}>{children}</Tag>;
}

/* SplitReveal — texto que revela por linha ao montar (client-side) */
export function SplitReveal({
  text,
  className = "",
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-rise inline-block"
          style={{ animationDelay: `${i * stagger}s` }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

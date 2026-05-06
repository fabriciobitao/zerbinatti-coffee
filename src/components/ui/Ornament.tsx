/**
 * Ornamento italiano usado para dividir seções.
 * Substitui o `h-px w-16 bg-gold-500` genérico — signature visual da marca 1897.
 */
export function Ornament({
  color = "gold",
  className = "",
}: {
  color?: "gold" | "coffee" | "light";
  className?: string;
}) {
  const strokeClass =
    color === "gold"
      ? "text-gold-500"
      : color === "coffee"
      ? "text-coffee-700"
      : "text-coffee-200";
  return (
    <div
      className={`mx-auto flex items-center justify-center gap-2 ${className}`}
      aria-hidden="true"
    >
      <span className={`block h-px w-12 bg-current ${strokeClass}`} />
      <svg
        className={`h-3 w-3 ${strokeClass}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
      </svg>
      <span className={`block h-px w-12 bg-current ${strokeClass}`} />
    </div>
  );
}

/**
 * Monograma Z da casa Zerbinatti (1897).
 * Sistema heráldico — aplicar em selos, headers editoriais, PDP.
 */
export function Monogram({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="32" cy="32" r="30" />
      <circle cx="32" cy="32" r="26" strokeDasharray="2 3" opacity="0.4" />
      <path
        d="M20 22 L44 22 L22 42 L44 42"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path d="M14 32 L18 32 M46 32 L50 32" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Selo "Dal 1897" — aplicado em headers editoriais como marca de herança.
 */
export function HeritageSeal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center ${className}`}
      aria-label="Desde 1897"
    >
      <span className="text-[10px] font-medium tracking-[0.3em] uppercase">
        Dal
      </span>
      <span className="font-serif text-2xl leading-none">1897</span>
      <span className="mt-0.5 text-[10px] font-medium tracking-[0.2em] uppercase">
        Famiglia Zerbinatti
      </span>
    </div>
  );
}

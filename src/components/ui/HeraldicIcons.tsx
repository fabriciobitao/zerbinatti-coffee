/**
 * Sistema proprietário de ícones heráldicos Zerbinatti.
 * Vocabulário visual italiano — nada de icon packs genéricos.
 * Todos desenhados em viewBox 48x48 com strokeWidth 1.2 (linha fina editorial).
 */

type IconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* Grão de café — desenhado como noz italiana com ranhura central */
export function BeanIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 6c8 0 14 6 14 18s-6 18-14 18S10 36 10 24 16 6 24 6z" />
      <path d="M18 10c2 5 2 10 0 14s-2 9 0 14" opacity="0.5" />
      <path d="M30 10c-2 5-2 10 0 14s2 9 0 14" opacity="0.5" />
      <path d="M24 8v32" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

/* Xícara italiana de bar — espresso tipo bar italiano, pires largo */
export function EspressoIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M12 22h20v8a8 8 0 01-8 8h-4a8 8 0 01-8-8v-8z" />
      <path d="M32 24h3a4 4 0 010 8h-3" />
      <path d="M8 42h32" />
      <path d="M18 14c0-3 2-3 2-6M24 14c0-3 2-3 2-6" opacity="0.55" />
    </svg>
  );
}

/* Cereja — fruto do cafeeiro em estilo botânico antigo */
export function CherryIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="17" cy="32" r="8" />
      <circle cx="31" cy="32" r="8" />
      <path d="M17 24c0-6 7-12 7-16" />
      <path d="M31 24c0-4-3-7-7-8" />
      <path d="M18 12l6-2 5 3" opacity="0.6" />
      <path d="M15 30c1-1 2-1 3 0" opacity="0.5" />
      <path d="M29 30c1-1 2-1 3 0" opacity="0.5" />
    </svg>
  );
}

/* Colmeia — sabor mel, geometria hexagonal italiana */
export function HoneyIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 6l14 8v20l-14 8-14-8V14z" />
      <path d="M24 18l7 4v8l-7 4-7-4v-8z" />
      <path d="M24 6v12M24 30v12M38 14l-7 4M10 14l7 4M38 34l-7-4M10 34l7-4" opacity="0.4" />
    </svg>
  );
}

/* Flor — floral, desenhado como rosa dos ventos italiana */
export function FloralIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="4" />
      <path d="M24 20V8M24 28v12M20 24H8M28 24h12" />
      <path d="M21 21l-7-7M27 21l7-7M21 27l-7 7M27 27l7 7" />
      <circle cx="24" cy="24" r="14" strokeDasharray="1 3" opacity="0.35" />
      <circle cx="24" cy="8" r="1.5" fill="currentColor" />
      <circle cx="24" cy="40" r="1.5" fill="currentColor" />
      <circle cx="8" cy="24" r="1.5" fill="currentColor" />
      <circle cx="40" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}

/* Limão — cítrico, fruto estilizado com folha e brilho */
export function CitrusIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <ellipse cx="24" cy="26" rx="13" ry="15" transform="rotate(-20 24 26)" />
      <path d="M18 20l12 12M24 18l6 6M20 26l6 6" opacity="0.55" />
      <path d="M32 11c3-3 6-3 8-1" opacity="0.8" />
      <path d="M34 14c2-2 4-2 6-1" opacity="0.5" />
    </svg>
  );
}

/* Tablete de chocolate — aroma chocolate, desenho italiano com marcas */
export function ChocolateIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <rect x="10" y="10" width="28" height="28" rx="2" />
      <path d="M10 19h28M10 29h28M19 10v28M29 10v28" opacity="0.55" />
      <path d="M14 14l2 2M24 14l2 2M34 14l2 2" opacity="0.4" />
    </svg>
  );
}

/* Caramelo — gota derretendo, doçura */
export function CaramelIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 6c6 10 10 16 10 22a10 10 0 01-20 0c0-6 4-12 10-22z" />
      <path d="M18 26c2 2 2 4 0 6" opacity="0.5" />
      <path d="M24 14c2 4 2 6 0 10" opacity="0.5" />
    </svg>
  );
}

/* Noz — sabor nozes, formato de meia-noz aberta */
export function NutIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 8c10 0 16 8 16 18 0 8-7 14-16 14S8 34 8 26c0-10 6-18 16-18z" />
      <path d="M24 14c0 6-4 10-10 12M24 14c0 6 4 10 10 12M24 14v26" opacity="0.55" />
      <path d="M16 32c2-1 4-1 6 0M26 32c2-1 4-1 6 0" opacity="0.4" />
    </svg>
  );
}

/* Montanha — Serra do Cabral, origem */
export function MountainIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M4 38l12-20 6 10 4-6 10 16H4z" />
      <path d="M16 18l-4 8M26 22l2 4M16 10v4" opacity="0.5" />
      <circle cx="36" cy="10" r="3" opacity="0.7" />
    </svg>
  );
}

/* Flor-de-lis Zerbinatti — heráldico italiano, centro do sistema */
export function FleurIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 6c-2 6-6 8-6 12 0 3 2 5 6 5s6-2 6-5c0-4-4-6-6-12z" />
      <path d="M18 23c-4 2-8 6-8 11h8" />
      <path d="M30 23c4 2 8 6 8 11h-8" />
      <path d="M18 34c0 4 3 6 6 8 3-2 6-4 6-8" />
      <path d="M14 34h20" opacity="0.6" />
      <path d="M24 18v24" opacity="0.4" strokeDasharray="2 3" />
    </svg>
  );
}

/* Selo com estrela italiana — timbre de qualidade, usado como badge */
export function StarSealIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="16" strokeDasharray="1 3" opacity="0.5" />
      <path d="M24 12l3 8 8 1-6 5 2 9-7-4-7 4 2-9-6-5 8-1z" />
    </svg>
  );
}

/* Pergaminho — herança, história */
export function ScrollIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M8 10h26c2 0 4 2 4 4v22c0 2-2 4-4 4H14c-2 0-4-2-4-4V10z" />
      <path d="M8 10c-2 0-4 2-4 4s2 4 4 4" />
      <path d="M14 20h18M14 26h18M14 32h12" opacity="0.55" />
    </svg>
  );
}

/* Balança — transparência, peso justo */
export function ScaleIcon({ className = "", size = 48, strokeWidth = 1.2 }: IconProps) {
  return (
    <svg {...base(size)} strokeWidth={strokeWidth} className={className} aria-hidden="true">
      <path d="M24 8v32" />
      <path d="M10 40h28" />
      <path d="M14 14h20" />
      <path d="M10 14l-4 10h8z M38 14l-4 10h8z" />
    </svg>
  );
}

// Selo circular "Desde 1897" — SVG inline puro.
// Observacao: o novo-layout/index.html nao define um <svg class="heritage-seal">
// explicitamente; usa um carimbo retangular .overlay-stamp dentro de
// .story-image. Mantemos esse selo aqui como peca utilitaria reusavel para
// headers editoriais (PDP, /historia, /fazenda) — render presentacional puro,
// sem state. Stroke usa currentColor; quem chama controla cor via CSS.

type HeritageSealProps = {
  size?: number;
  className?: string;
};

export function HeritageSeal({ size = 96, className }: HeritageSealProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-label="Desde 1897 — Famiglia Zerbinatti"
      role="img"
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.85"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="2 3"
        opacity="0.45"
      />
      <text
        x="60"
        y="46"
        textAnchor="middle"
        fontFamily="var(--mono, monospace)"
        fontSize="8"
        letterSpacing="2.5"
        fill="currentColor"
      >
        DESDE
      </text>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontFamily="var(--serif, Georgia, serif)"
        fontStyle="italic"
        fontSize="32"
        fill="currentColor"
      >
        1897
      </text>
      <text
        x="60"
        y="94"
        textAnchor="middle"
        fontFamily="var(--mono, monospace)"
        fontSize="6"
        letterSpacing="2"
        fill="currentColor"
        opacity="0.7"
      >
        FAMIGLIA ZERBINATTI
      </text>
    </svg>
  );
}

export default HeritageSeal;

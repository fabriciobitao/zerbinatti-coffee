/**
 * Grão de café 3D — signature visual Zerbinatti.
 * Construído em SVG + CSS transform. Rotaciona continuamente, sem JS.
 * Múltiplos radial gradients simulam a curvatura e ranhura central.
 */
export default function CoffeeBean3D({
  size = 280,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: 800 }}
      aria-hidden
    >
      <div className="bean-rotate absolute inset-0 flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox="0 0 300 300"
          style={{ filter: "drop-shadow(0 40px 50px rgba(26,17,8,0.4))" }}
        >
          <defs>
            {/* Gradiente principal do grão — volume e brilho */}
            <radialGradient id="bean-body" cx="35%" cy="25%" r="85%">
              <stop offset="0%" stopColor="#8B5E3C" />
              <stop offset="30%" stopColor="#5D3A1F" />
              <stop offset="65%" stopColor="#3A2312" />
              <stop offset="100%" stopColor="#1A1108" />
            </radialGradient>

            {/* Highlight superior */}
            <radialGradient id="bean-highlight" cx="40%" cy="20%" r="30%">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
            </radialGradient>

            {/* Gradiente da ranhura central */}
            <linearGradient id="bean-groove" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0F0804" stopOpacity="0" />
              <stop offset="50%" stopColor="#0F0804" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0F0804" stopOpacity="0" />
            </linearGradient>

            {/* Textura radial sutil */}
            <radialGradient id="bean-texture" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#5D3A1F" stopOpacity="0" />
              <stop offset="100%" stopColor="#1A1108" stopOpacity="0.35" />
            </radialGradient>
          </defs>

          {/* Corpo do grão (forma de amêndoa) */}
          <ellipse
            cx="150"
            cy="150"
            rx="90"
            ry="130"
            fill="url(#bean-body)"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="90"
            ry="130"
            fill="url(#bean-texture)"
          />

          {/* Highlight */}
          <ellipse cx="150" cy="150" rx="90" ry="130" fill="url(#bean-highlight)" />

          {/* Ranhura central (a fenda do grão) */}
          <path
            d="M150 25 Q155 90 150 150 Q145 210 150 275"
            stroke="url(#bean-groove)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M150 28 Q155 90 150 150 Q145 210 150 272"
            stroke="#0F0804"
            strokeWidth="1.2"
            fill="none"
            opacity="0.9"
          />

          {/* Linhas laterais sutis imitando curvatura */}
          <path
            d="M100 70 Q95 150 105 235"
            stroke="#0F0804"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M200 70 Q205 150 195 235"
            stroke="#0F0804"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />

          {/* Contorno sutil */}
          <ellipse
            cx="150"
            cy="150"
            rx="90"
            ry="130"
            fill="none"
            stroke="#0F0804"
            strokeWidth="0.8"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Sombra de chão elíptica estática, para ancorar visualmente */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "-8%",
          width: "70%",
          height: "6%",
          background:
            "radial-gradient(ellipse, rgba(26,17,8,0.45), transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}

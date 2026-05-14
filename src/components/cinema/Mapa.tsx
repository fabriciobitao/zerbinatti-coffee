"use client";

import { useEffect, useRef } from "react";

/**
 * Simplified world map. viewBox 0 0 1000 500.
 * Continent paths are blocky stand-ins (lo-fi editorial feel, not geographic precision).
 * Origin city = Brasil (Alta Mogiana, ~ x:340 y:300).
 * Arcs drawn with quadratic curves; control points lifted above the start/end pair.
 */

type City = { id: string; x: number; y: number; label: string };
type Arc = {
  id: string;
  to: City;
  color: string;
  dashed?: boolean;
};

const BRASIL: City = { id: "brasil", x: 340, y: 305, label: "Alta Mogiana" };

const TARGETS: City[] = [
  { id: "espanha", x: 490, y: 190, label: "Espanha" },
  { id: "franca", x: 515, y: 165, label: "França" },
  { id: "suica", x: 540, y: 180, label: "Suíça" },
  { id: "suecia", x: 555, y: 105, label: "Suécia" },
  { id: "oregon", x: 175, y: 165, label: "Oregon" },
];

const ARCS: Arc[] = [
  { id: "brasil-espanha", to: TARGETS[0], color: "#FF4FA3" },
  { id: "brasil-franca", to: TARGETS[1], color: "#FFD93C" },
  { id: "brasil-suica", to: TARGETS[2], color: "#3CD982" },
  { id: "brasil-suecia", to: TARGETS[3], color: "#A878FF" },
  { id: "brasil-oregon", to: TARGETS[4], color: "#3B82F6", dashed: true },
];

function arcPath(from: City, to: City) {
  const mx = (from.x + to.x) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const lift = Math.min(180, dist * 0.55);
  const cy = Math.min(from.y, to.y) - lift;
  return `M ${from.x} ${from.y} Q ${mx} ${cy} ${to.x} ${to.y}`;
}

export default function Mapa() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    let trigger: { kill: () => void } | null = null;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const paths = pathsRef.current.filter(Boolean);
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });

      const wrap = wrapRef.current;
      if (!wrap) return;

      trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top 70%",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self: { progress: number }) => {
          paths.forEach((p) => {
            const len = parseFloat(p.style.strokeDasharray || "0");
            p.style.strokeDashoffset = `${len * (1 - self.progress)}`;
          });
        },
      });
    })();

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section className="cn-mapa" aria-label="Rota transatlântica">
      <div className="cn-mapa-inner">
        <h2 className="cn-mapa-title cn-fade-in">
          O café já atravessa oceanos.
        </h2>

        <div ref={wrapRef} className="cn-mapa-svg-wrap">
          <svg
            className="cn-mapa-svg"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Mapa-múndi com rotas saindo do Brasil para Espanha, França, Suíça, Suécia e Oregon."
          >
            {/* Simplified blocky continents */}
            {/* North America */}
            <path
              className="cn-mapa-continent"
              d="M70 110 L240 95 L300 130 L295 200 L240 230 L185 235 L130 215 L80 175 Z"
            />
            {/* South America */}
            <path
              className="cn-mapa-continent"
              d="M295 240 L355 245 L375 305 L355 380 L320 420 L290 405 L280 340 Z"
            />
            {/* Europe */}
            <path
              className="cn-mapa-continent"
              d="M475 110 L560 105 L580 145 L575 195 L530 215 L490 200 L475 165 Z"
            />
            {/* Africa */}
            <path
              className="cn-mapa-continent"
              d="M495 215 L580 215 L600 270 L585 340 L545 390 L510 360 L490 290 Z"
            />
            {/* Asia */}
            <path
              className="cn-mapa-continent"
              d="M590 110 L820 100 L880 145 L870 215 L780 235 L680 220 L605 195 Z"
            />
            {/* Oceania */}
            <path
              className="cn-mapa-continent"
              d="M810 340 L880 335 L900 370 L865 395 L820 385 Z"
            />

            {/* Arcs */}
            {ARCS.map((arc, i) => (
              <path
                key={arc.id}
                ref={(el) => {
                  if (el) pathsRef.current[i] = el;
                }}
                className="cn-mapa-arc"
                d={arcPath(BRASIL, arc.to)}
                stroke={arc.color}
                strokeDasharray={arc.dashed ? "6 6" : undefined}
              />
            ))}

            {/* Cities */}
            <g>
              <circle
                className="cn-mapa-city-pulse"
                cx={BRASIL.x}
                cy={BRASIL.y}
                r={6}
              />
              <circle
                className="cn-mapa-city"
                cx={BRASIL.x}
                cy={BRASIL.y}
                r={5}
              />
              <text
                className="cn-mapa-label"
                x={BRASIL.x + 10}
                y={BRASIL.y + 4}
                style={{ fontWeight: 600, fill: "var(--cn-gold)" }}
              >
                {BRASIL.label.toUpperCase()}
              </text>

              {TARGETS.map((c) => (
                <g key={c.id}>
                  <circle
                    className="cn-mapa-city-pulse"
                    cx={c.x}
                    cy={c.y}
                    r={4.5}
                  />
                  <circle
                    className="cn-mapa-city"
                    cx={c.x}
                    cy={c.y}
                    r={3.5}
                  />
                  <text
                    className="cn-mapa-label"
                    x={c.x + 8}
                    y={c.y - 8}
                  >
                    {c.label.toUpperCase()}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

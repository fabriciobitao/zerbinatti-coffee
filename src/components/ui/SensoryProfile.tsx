import { SensoryProfile as Profile } from "@/lib/data/products";

/**
 * Radar chart sensorial (SVG puro, sem dependência externa).
 * Escala 1-5 nos 4 eixos: doçura, acidez, corpo, complexidade.
 */
export function SensoryProfile({
  profile,
  size = 240,
  compact = false,
}: {
  profile: Profile;
  size?: number;
  compact?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.36;

  const axes = [
    { key: "sweetness", label: "Doçura", angle: -Math.PI / 2 },
    { key: "acidity", label: "Acidez", angle: 0 },
    { key: "body", label: "Corpo", angle: Math.PI / 2 },
    { key: "complexity", label: "Complexidade", angle: Math.PI },
  ] as const;

  const toPoint = (value: number, angle: number) => {
    const r = (value / 5) * radius;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };

  const polygon = axes
    .map((a) => {
      const [x, y] = toPoint(profile[a.key], a.angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {[1, 2, 3, 4, 5].map((r) => (
          <circle
            key={r}
            cx={cx}
            cy={cy}
            r={(r / 5) * radius}
            fill="none"
            stroke="var(--color-coffee-200)"
            strokeWidth="1"
            opacity={r === 5 ? 0.6 : 0.25}
          />
        ))}
        {/* Axis lines */}
        {axes.map((a) => {
          const [x2, y2] = toPoint(5, a.angle);
          return (
            <line
              key={a.key}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke="var(--color-coffee-200)"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
        {/* Data polygon */}
        <polygon
          points={polygon}
          fill="var(--color-gold-500)"
          fillOpacity="0.18"
          stroke="var(--color-gold-600)"
          strokeWidth="2"
        />
        {/* Data points */}
        {axes.map((a) => {
          const [x, y] = toPoint(profile[a.key], a.angle);
          return (
            <circle
              key={a.key}
              cx={x}
              cy={y}
              r={4}
              fill="var(--color-gold-500)"
              stroke="var(--color-coffee-900)"
              strokeWidth="1.5"
            />
          );
        })}
        {/* Labels */}
        {!compact &&
          axes.map((a) => {
            const [x, y] = toPoint(5.8, a.angle);
            return (
              <text
                key={a.key}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-coffee-700"
                fontSize={12}
                fontWeight={600}
              >
                {a.label}
              </text>
            );
          })}
      </svg>
      {compact && (
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-coffee-600">
          {axes.map((a) => (
            <div key={a.key} className="flex justify-between gap-3">
              <dt>{a.label}</dt>
              <dd className="font-semibold text-coffee-900">
                {profile[a.key]}/5
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

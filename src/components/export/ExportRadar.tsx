/**
 * ExportRadar — SVG radar SCA com 10 dimensoes, server-rendered.
 * Total 84.75. Renderizado direto no JSX (sem mutation DOM client-side).
 */

const RADAR_DATA = [
  { label: 'Fragrance', value: 8.25 },
  { label: 'Flavor', value: 8.0 },
  { label: 'Aftertaste', value: 8.75 },
  { label: 'Acidity', value: 8.0 },
  { label: 'Body', value: 8.75 },
  { label: 'Balance', value: 8.25 },
  { label: 'Overall', value: 8.5 },
  { label: 'Uniform.', value: 10.0 },
  { label: 'Clean cup', value: 10.0 },
  { label: 'Sweetness', value: 10.0 },
];

const CX = 230;
const CY = 230;
const R = 130;
const MAX = 10;
const N = RADAR_DATA.length;
const angleAt = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N;
const fmt = (n: number) => Number(n.toFixed(3));

export default function ExportRadar() {
  const rings = [0.4, 0.6, 0.8, 1];
  const axes = RADAR_DATA.map((_, i) => {
    const a = angleAt(i);
    return { x: fmt(CX + R * Math.cos(a)), y: fmt(CY + R * Math.sin(a)) };
  });
  const points = RADAR_DATA.map((d, i) => {
    const a = angleAt(i);
    const r = R * (d.value / MAX);
    return { x: fmt(CX + r * Math.cos(a)), y: fmt(CY + r * Math.sin(a)) };
  });
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const labels = RADAR_DATA.map((d, i) => {
    const a = angleAt(i);
    const lr = R + 22;
    const x = fmt(CX + lr * Math.cos(a));
    const y = fmt(CY + lr * Math.sin(a));
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (Math.cos(a) > 0.25) anchor = 'start';
    else if (Math.cos(a) < -0.25) anchor = 'end';
    return { x, y, anchor, label: d.label.toUpperCase(), value: d.value.toFixed(2) };
  });

  return (
    <svg viewBox="0 0 460 460" aria-label="SCA cupping radar — 10 attributes">
      {rings.map((p) => (
        <circle
          key={p}
          cx={CX}
          cy={CY}
          r={R * p}
          className={`ring${p === 1 ? ' outer' : ''}`}
        />
      ))}
      {axes.map((a, i) => (
        <line key={i} x1={CX} y1={CY} x2={a.x} y2={a.y} className="axis" />
      ))}
      <polygon points={polyPoints} className="poly" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} className="dot" />
      ))}
      {labels.map((l, i) => (
        <g key={i}>
          <text
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            dominantBaseline="middle"
            className="label"
          >
            {l.label}
          </text>
          <text
            x={l.x}
            y={l.y + 12}
            textAnchor={l.anchor}
            dominantBaseline="middle"
            className="label v"
          >
            {l.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

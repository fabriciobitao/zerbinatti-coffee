// CuppingReport — Server Component. Reproduz verbatim a <section
// class="cupping" id="laudo"> de public/novo-layout/index.html.
//
// O HTML original usava <script>initRadar()</script> para construir o radar
// dinamicamente no DOM. Aqui reescrevemos a mesma logica para gerar o SVG
// estaticamente em build/render — mantendo cx=260, cy=260, R=200, max=10 e
// os mesmos valores RADAR_DATA (10 dimensoes SCA: Fragrancia, Sabor,
// Retrogosto, Acidez, Corpo, Equilibrio, Geral, Uniformidade, Limpidez,
// Docura — todos em escala 0–10). Os labels sao constantes visuais (igual
// ao HTML original que tambem nao traduz os labels do radar).

import { T } from '@/lib/i18n';

type Dim = { k: string; label: string; value: number };

// Mesma ordem e mesmos valores do RADAR_DATA em public/novo-layout/index.html
// (linhas 3354–3365). NAO mexer sem atualizar os dois lados — total = 84.75.
const RADAR_DATA: Dim[] = [
  { k: 'FA', label: 'Fragrância', value: 8.25 },
  { k: 'FL', label: 'Sabor', value: 8.0 },
  { k: 'AF', label: 'Retrogosto', value: 8.75 },
  { k: 'AC', label: 'Acidez', value: 8.0 },
  { k: 'BD', label: 'Corpo', value: 8.75 },
  { k: 'BA', label: 'Equilíbrio', value: 8.25 },
  { k: 'OV', label: 'Geral', value: 8.5 },
  { k: 'UN', label: 'Uniformid.', value: 8.0 },
  { k: 'CL', label: 'Limpidez', value: 8.0 },
  { k: 'SW', label: 'Doçura', value: 10.0 },
];

const CX = 260;
const CY = 260;
const R = 200;
const MAX = 10;

function angleAt(i: number, n: number) {
  return -Math.PI / 2 + (i * 2 * Math.PI) / n;
}

function fmt(n: number) {
  // 3 casas para evitar drift entre Math.cos/Math.sin diferentes; o original
  // usava precisao do float padrao. 3 casas e mais que suficiente visualmente.
  return Number(n.toFixed(3));
}

export default function CuppingReport() {
  const N = RADAR_DATA.length;

  // Eixos centrais e poligono dos pontos
  const axes = RADAR_DATA.map((_, i) => {
    const a = angleAt(i, N);
    return {
      x: fmt(CX + R * Math.cos(a)),
      y: fmt(CY + R * Math.sin(a)),
    };
  });

  const points = RADAR_DATA.map((d, i) => {
    const a = angleAt(i, N);
    const r = R * (d.value / MAX);
    return {
      x: fmt(CX + r * Math.cos(a)),
      y: fmt(CY + r * Math.sin(a)),
    };
  });

  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const labels = RADAR_DATA.map((d, i) => {
    const a = angleAt(i, N);
    const lr = R + 32;
    const x = fmt(CX + lr * Math.cos(a));
    const y = fmt(CY + lr * Math.sin(a));
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (Math.cos(a) > 0.2) anchor = 'start';
    else if (Math.cos(a) < -0.2) anchor = 'end';
    return { x, y, anchor, label: d.label.toUpperCase(), value: d.value.toFixed(2) };
  });

  return (
    <section className="cupping" id="laudo">
      <div className="cupping-grain" />
      <div className="cupping-inner">
        <div className="cupping-head reveal">
          <T k="cup.eyebrow" as="span" className="eyebrow" />
          <T k="cup.title" html as="h2" className="display" />
          <p
            className="body-lg"
            style={{ margin: '24px auto 0', maxWidth: 620 }}
          >
            <T k="cup.desc" />
          </p>
        </div>

        <div className="cupping-card reveal">
          <div className="cupping-meta">
            <div className="cupping-id">
              <div className="label">Sample ID</div>
              <div className="cupping-sku">TS-00986028</div>
              <div className="cupping-name">Zerbinatti · Arara Natural</div>
            </div>
            <div className="cupping-attrs">
              <div>
                <T k="cup.species" as="div" className="k" />
                <div className="v">Arábica</div>
              </div>
              <div>
                <T k="meta.var" as="div" className="k" />
                <div className="v">Arara</div>
              </div>
              <div>
                <T k="meta.proc" as="div" className="k" />
                <T k="proc.natural" as="div" className="v" />
              </div>
              <div>
                <T k="meta.origem" as="div" className="k" />
                <T k="cup.brasil" as="div" className="v" />
              </div>
              <div>
                <T k="gal.safra" as="div" className="k" />
                <div className="v">2025</div>
              </div>
              <div>
                <T k="cup.analysis" as="div" className="k" />
                <T k="cup.analysisDate" as="div" className="v" />
              </div>
            </div>
            <div className="cupping-descriptors">
              <div className="label" style={{ marginBottom: 10 }}>
                <T k="cup.descriptors" />
              </div>
              <div className="feature-notes">
                <T k="cup.note.limpo" as="span" className="chip" />
                <T k="cup.note.doce" as="span" className="chip" />
                <T k="cup.note.bomCorpo" as="span" className="chip" />
                <T k="cup.note.macio" as="span" className="chip" />
                <T k="note.caramelo" as="span" className="chip" />
                <T k="cup.note.acidezMed" as="span" className="chip" />
                <T k="cup.note.nibsCacau" as="span" className="chip" />
              </div>
            </div>
          </div>

          <div className="cupping-radar">
            <div className="cupping-score-badge">
              <div className="num">84.75</div>
              <T k="cup.total" as="div" className="lbl" />
            </div>
            <svg id="radarSvg" viewBox="0 0 520 520" aria-label="Radar sensorial">
              <defs>
                <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.55" />
                  <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.30" />
                </linearGradient>
              </defs>
              <circle cx={CX} cy={CY} r={R} fill="url(#radarGlow)" />

              {/* aneis concentricos (40%, 60%, 80%, 100%) */}
              {[0.4, 0.6, 0.8, 1].map((p) => (
                <circle
                  key={`ring-${p}`}
                  cx={CX}
                  cy={CY}
                  r={R * p}
                  className={`radar-ring${p === 1 ? ' outer' : ''}`}
                />
              ))}

              {/* ticks de escala (6, 8, 10) */}
              {[6, 8, 10].map((v) => {
                const r = R * (v / MAX);
                return (
                  <text
                    key={`tick-${v}`}
                    x={CX + 4}
                    y={CY - r + 3}
                    className="radar-tick"
                  >
                    {v}
                  </text>
                );
              })}

              {/* eixos radiais */}
              {axes.map((a, i) => (
                <line
                  key={`axis-${i}`}
                  x1={CX}
                  y1={CY}
                  x2={a.x}
                  y2={a.y}
                  className="radar-axis"
                />
              ))}

              {/* poligono dos valores */}
              <polygon points={polyPoints} className="radar-poly" />

              {/* pontos */}
              {points.map((p, i) => (
                <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={4} className="radar-dot" />
              ))}

              {/* labels + valores */}
              {labels.map((l, i) => (
                <g key={`lbl-${i}`}>
                  <text
                    x={l.x}
                    y={l.y}
                    className="radar-label"
                    textAnchor={l.anchor}
                    dominantBaseline="middle"
                  >
                    {l.label}
                  </text>
                  <text
                    x={l.x}
                    y={l.y + 14}
                    className="radar-label v"
                    textAnchor={l.anchor}
                    dominantBaseline="middle"
                    fontFamily="var(--serif)"
                    fontSize="14px"
                    letterSpacing="0"
                  >
                    {l.value}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

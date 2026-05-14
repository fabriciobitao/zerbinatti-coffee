const NOTES = [
  "Caramelo",
  "Cacau",
  "Castanha",
  "Chocolate ao leite",
  "Frutas vermelhas maduras",
];

const CHIPS = [
  ["ALTITUDE", "1100m"],
  ["PROCESSO", "Natural"],
  ["VARIEDADE", "Catuaí Amarelo"],
];

export default function Notas() {
  return (
    <section className="cn-notas" aria-label="Perfil sensorial">
      <div className="cn-notas-inner">
        <div>
          <p className="cn-notas-score">84.75</p>
          <p className="cn-notas-score-label cn-mono">
            SCA score · Café Clássico
          </p>
        </div>

        <ul className="cn-notas-list">
          {NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <div className="cn-notas-chips">
          {CHIPS.map(([label, value]) => (
            <span key={label} className="cn-notas-chip cn-mono">
              <span style={{ color: "var(--cn-gold)", marginRight: "0.5rem" }}>
                {label}
              </span>
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

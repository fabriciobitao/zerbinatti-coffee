type Bar = { label: string; value: number };

type Props = {
  bars: Bar[];
  variant?: "light" | "dark";
};

/**
 * Barras horizontais 1-5 (decisao 3.4 da UI-SPEC-INTERNAS — em vez de radar).
 * 5 segmentos quadrados 16x16, gap 4px. Valor numerico mono a direita.
 * role="meter" por barra.
 */
export default function SensoryBars({ bars, variant = "light" }: Props) {
  const labelColor = variant === "dark" ? "text-bone" : "text-ink";
  const numColor =
    variant === "dark" ? "text-[var(--ink-mute-on-dark)]" : "text-ink-mute";
  const emptyBorder = variant === "dark" ? "border-line-dark" : "border-line";

  return (
    <ul
      className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2"
      role="list"
    >
      {bars.map((b) => (
        <li
          key={b.label}
          className="flex items-center justify-between gap-4"
        >
          <span
            className={`text-[13px] font-medium uppercase ${labelColor}`}
            style={{ letterSpacing: "0.04em" }}
          >
            {b.label}
          </span>
          <div className="flex items-center gap-3">
            <div
              role="meter"
              aria-valuenow={b.value}
              aria-valuemin={0}
              aria-valuemax={5}
              aria-label={`${b.label}, ${b.value} de 5`}
              className="flex gap-1"
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < b.value;
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`block h-4 w-4 ${
                      filled
                        ? "bg-olive"
                        : `border ${emptyBorder} bg-transparent`
                    }`}
                  />
                );
              })}
            </div>
            <span
              className={`font-mono text-[12px] font-medium ${numColor}`}
            >
              {b.value} / 5
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

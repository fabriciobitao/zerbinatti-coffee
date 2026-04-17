/**
 * Indica a frescura da torra em linguagem de café especial.
 * Janela ideal de descanso: 7-21 dias após a torra.
 * - <7 dias: em descanso (âmbar)
 * - 7-28 dias: no ponto (verde)
 * - 29+ dias: ainda bom, mas atenção (âmbar)
 */
export function FreshnessSignal({
  roastDate,
  variant = "default",
}: {
  roastDate: string;
  variant?: "default" | "compact";
}) {
  const roast = new Date(roastDate);
  const now = new Date();
  const days = Math.max(
    0,
    Math.floor((now.getTime() - roast.getTime()) / (1000 * 60 * 60 * 24))
  );

  let tone: "resting" | "peak" | "late";
  let label: string;
  let hint: string;

  if (days < 7) {
    tone = "resting";
    label = `Torrado há ${days === 0 ? "menos de 1 dia" : `${days} dia${days > 1 ? "s" : ""}`}`;
    hint = `Em descanso — o café abre toda a complexidade a partir do 7º dia.`;
  } else if (days <= 28) {
    tone = "peak";
    label = `Torrado há ${days} dias`;
    hint = `No ponto de consumo — janela ideal entre o 7º e o 28º dia.`;
  } else {
    tone = "late";
    label = `Torrado há ${days} dias`;
    hint = `Ainda bom, mas o frescor está em sua última fase. Armazene fechado e ao abrigo de luz.`;
  }

  const palette = {
    resting: {
      dot: "bg-amber-500",
      text: "text-amber-900",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    peak: {
      dot: "bg-green-600",
      text: "text-green-900",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    late: {
      dot: "bg-amber-600",
      text: "text-amber-900",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
  }[tone];

  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border ${palette.border} ${palette.bg} ${palette.text} px-2.5 py-0.5 text-xs font-semibold`}
        title={hint}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${palette.dot}`} />
        {label}
      </span>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border ${palette.border} ${palette.bg} px-4 py-3`}
    >
      <span
        className={`mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full ${palette.dot}`}
        aria-hidden
      />
      <div>
        <div className={`text-sm font-semibold ${palette.text}`}>{label}</div>
        <div className="mt-0.5 text-xs text-coffee-600">{hint}</div>
      </div>
    </div>
  );
}

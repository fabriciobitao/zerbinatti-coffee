/**
 * Loading state global — monograma "Z" em Fraunces italic, fade in/out.
 * Sem texto, sem spinner, respeita prefers-reduced-motion.
 */
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bone"
      role="status"
      aria-label="Carregando"
    >
      <span
        className="loading-monogram font-display text-ink"
        style={{
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "120px",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        Z
      </span>
      <span className="sr-only">Carregando…</span>
      <style>{`
        @keyframes z-pulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 1.0; }
        }
        .loading-monogram {
          animation: z-pulse 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-monogram { animation: none; opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}

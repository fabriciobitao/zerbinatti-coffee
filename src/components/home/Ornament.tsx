// Ornamento divisor verbatim do <svg class="ornament"> de
// public/novo-layout/index.html — duas linhas finas + ponto central.
// Server Component puro (sem state). Recebe className opcional para alinhar
// (ex.: a secao .section-intro ja aplica .ornament margin centrado via CSS).

type OrnamentProps = {
  className?: string;
};

export function Ornament({ className }: OrnamentProps) {
  return (
    <svg
      className={className ? `ornament ${className}` : 'ornament'}
      viewBox="0 0 120 24"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth=".5" />
      <circle cx="60" cy="12" r="3" fill="currentColor" />
      <line x1="72" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth=".5" />
    </svg>
  );
}

export default Ornament;

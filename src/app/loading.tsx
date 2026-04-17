export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-coffee-50">
      <div className="flex flex-col items-center gap-4">
        <svg
          className="h-10 w-10 animate-spin text-gold-600"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-label="Carregando"
        >
          <circle cx="32" cy="32" r="28" opacity="0.2" />
          <path d="M32 4 a28 28 0 0 1 28 28" strokeLinecap="round" />
        </svg>
        <span className="text-xs font-semibold tracking-[0.3em] text-coffee-600 uppercase">
          Zerbinatti · Carregando
        </span>
      </div>
    </div>
  );
}

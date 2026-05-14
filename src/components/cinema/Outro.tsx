import Link from "next/link";

export default function Outro() {
  return (
    <section className="cn-outro" aria-label="Convite final">
      <h2 className="cn-outro-title cn-fade-in">Prove a história.</h2>
      <p className="cn-outro-sub cn-fade-in">
        Edição limitada. Direto do produtor.
      </p>
      <Link href="/cafes/classico" className="cn-outro-cta cn-fade-in">
        Experimente
      </Link>
      <div className="cn-outro-footer cn-mono">
        ZERBINATTI · ZERBINATTI.COFFEE · @ZERBINATTICOFFEE
      </div>
    </section>
  );
}

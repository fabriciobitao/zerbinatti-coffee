import Link from "next/link";
import { ReactNode } from "react";

interface StaticPageProps {
  eyebrow: string;
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function StaticPage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: StaticPageProps) {
  return (
    <main className="bg-coffee-50 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-coffee-600 transition-colors hover:text-coffee-900"
        >
          <span aria-hidden>←</span> Voltar para a loja
        </Link>

        <div className="mt-8">
          <span className="text-xs font-medium tracking-[0.3em] text-gold-600 uppercase">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold text-coffee-900 sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <div className="mt-4 h-px w-16 bg-gold-500" />
          {lastUpdated && (
            <p className="mt-4 text-sm text-coffee-600">
              Última atualização: {lastUpdated}
            </p>
          )}
        </div>

        <article className="prose-coffee mt-10 space-y-6 text-base leading-relaxed text-coffee-700">
          {children}
        </article>
      </div>
    </main>
  );
}

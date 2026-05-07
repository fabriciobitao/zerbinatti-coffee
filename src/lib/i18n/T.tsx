'use client';

// Componente de conveniencia: <T k="key" /> ou <T k="key" html as="h1" />.
import { createElement, type ElementType } from 'react';
import { useT } from './useT';

type TProps = {
  k: string;
  html?: boolean;
  as?: ElementType;
  fallback?: string;
  className?: string;
};

export function T({ k, html = false, as = 'span', fallback, className }: TProps) {
  const t = useT();
  if (html) {
    return createElement(as, {
      className,
      dangerouslySetInnerHTML: t.html(k, fallback),
    });
  }
  return createElement(as, { className }, t(k, fallback));
}

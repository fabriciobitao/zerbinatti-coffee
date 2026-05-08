'use client';

import { useT } from '@/lib/i18n/useT';

export function VideoCtaButton() {
  const t = useT();
  const labelHtml = t.html('video.cta');

  return (
    <a
      href="#cafes"
      className="btn btn-gold"
      onClick={(e) => {
        const target = document.querySelector(
          '[data-feature="classico-250g"] .feature-buy',
        );
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
      dangerouslySetInnerHTML={labelHtml}
    />
  );
}

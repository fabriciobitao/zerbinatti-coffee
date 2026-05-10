'use client';

import { usePathname } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';
import { anchorsForPath } from '@/lib/i18n/anchors';

export function VideoCtaButton() {
  const t = useT();
  const labelHtml = t.html('video.cta');
  const pathname = usePathname() ?? '/';
  const anchors = anchorsForPath(pathname);

  return (
    <a
      href={`#${anchors.cafes}`}
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

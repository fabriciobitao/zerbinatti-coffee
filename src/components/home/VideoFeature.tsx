// VideoFeature — Server Component. Reproduz verbatim a <section
// class="video-feature" id="video"> de public/novo-layout/index.html:
// header (eyebrow + titulo + desc), stage com glow + 4 cantos ornamentais,
// iframe Vimeo 16:9, e foot com label + CTA dourado.
//
// Vimeo URL: https://player.vimeo.com/video/1171854594 — mesmos query params
// do HTML original (autoplay=0, sem branding). loading=lazy para nao
// disparar request ate aproximar do viewport.

import { T } from '@/lib/i18n';
import { VideoCtaButton } from './VideoCtaButton';

export default function VideoFeature() {
  return (
    <section className="video-feature" id="video">
      <div className="video-feature-inner">
        <div className="video-feature-head reveal">
          <T k="video.eyebrow" as="span" className="eyebrow" />
          <T k="video.title" html as="h2" className="display" />
          <T k="video.desc" as="p" />
        </div>

        <div className="video-stage reveal">
          <div className="video-stage-glow" />
          <span className="video-corner tl" />
          <span className="video-corner tr" />
          <span className="video-corner bl" />
          <span className="video-corner br" />
          <div className="video-frame">
            <div className="ratio">
              <iframe
                src="https://player.vimeo.com/video/1171854594?autoplay=0&loop=0&muted=0&title=0&byline=0&portrait=0"
                title="Zerbinatti Coffee — Da Fazenda para o Mundo"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="video-feature-foot reveal">
          <span className="label" style={{ color: 'var(--ink-2)' }}>
            <T k="video.label" />
          </span>
          <VideoCtaButton />
        </div>
      </div>
    </section>
  );
}

// Historia — Server Component. Reproduz verbatim a <section class="story"
// id="historia"> de public/novo-layout/index.html: imagem com carimbo
// "1897 · Famiglia Dal" e bloco editorial a direita com eyebrow + titulo +
// 3 paragrafos + grid de stats em 3 colunas (100% Arabica, III Geracoes,
// 128 Anos). O HTML original usa inline style para o grid de stats; preser-
// vamos isso para nao divergir do CSS atual (.story-stats nao existe em
// novo-layout.css). O primeiro paragrafo recebe a classe .dropcap caso
// uma futura regra ::first-letter seja adicionada (no-op com o CSS atual).

import { T } from '@/lib/i18n';

const statNumberStyle: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontSize: 32,
  color: 'var(--gold)',
};

const statLabelStyle: React.CSSProperties = { marginTop: 6 };

export default function Historia({ id = 'historia' }: { id?: string } = {}) {
  return (
    <section className="story" id={id}>
      <div className="story-inner">
        <div className="story-image reveal">
          <div className="overlay-stamp">
            <div className="y">1897</div>
            <T k="story.stamp" as="div" className="l" />
          </div>
        </div>

        <div className="story-text reveal">
          <T k="story.eyebrow" as="span" className="eyebrow" />
          <T k="story.title" html as="h2" className="display" />
          <T k="story.p1" as="p" className="body-lg dropcap" />
          <T k="story.p2" as="p" className="body" />
          <T k="story.p3" as="p" className="body" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 24,
              marginTop: 40,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
            }}
          >
            <div>
              <div style={statNumberStyle}>100%</div>
              <div className="label" style={statLabelStyle}>
                Arábica
              </div>
            </div>
            <div>
              <div style={statNumberStyle}>III</div>
              <div className="label" style={statLabelStyle}>
                <T k="hero.stats.gen" />
              </div>
            </div>
            <div>
              <div style={statNumberStyle}>128</div>
              <div className="label" style={statLabelStyle}>
                <T k="story.years" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

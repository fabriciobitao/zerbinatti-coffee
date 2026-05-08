// Processo — Server Component. Reproduz verbatim a <section class="processo">
// de public/novo-layout/index.html: 4 etapas (Cultivo, Colheita, Secagem,
// Torra) cada uma com numero romanico em italico, descricao e duas linhas
// .meta-row, mais a citacao final atribuida a Wilson Luiz Valim Zerbinatti.
// Toda copy via <T />; nao traduzir as siglas/numeros constantes (640-760m,
// 11%, 48h, ≤ 12kg) — sao fatos universais.

import { T } from '@/lib/i18n';

export default function Processo() {
  return (
    <section className="processo" id="processo">
      <div className="processo-bg" />
      <div className="processo-inner">
        <div className="processo-head reveal">
          <T k="proc.eyebrow" as="span" className="eyebrow" />
          <T k="proc.title" html as="h2" className="display" />
        </div>

        <div className="processo-grid reveal">
          <div className="step">
            <div className="num">01</div>
            <T k="proc.cultivo" as="h3" className="title" />
            <T k="proc.cultivo.desc" as="p" className="desc" />
            <div className="meta">
              <div className="meta-row">
                <T k="meta.alt" as="span" className="k" />
                <span className="v">640&ndash;760m</span>
              </div>
              <div className="meta-row">
                <T k="proc.solo" as="span" className="k" />
                <T k="proc.solo.v" as="span" className="v" />
              </div>
            </div>
          </div>

          <div className="step">
            <div className="num">02</div>
            <T k="proc.colheita" as="h3" className="title" />
            <T k="proc.colheita.desc" as="p" className="desc" />
            <div className="meta">
              <div className="meta-row">
                <T k="proc.janela" as="span" className="k" />
                <T k="proc.janela.v" as="span" className="v" />
              </div>
              <div className="meta-row">
                <T k="proc.metodo" as="span" className="k" />
                <T k="proc.metodo.v" as="span" className="v" />
              </div>
            </div>
          </div>

          <div className="step">
            <div className="num">03</div>
            <T k="proc.secagem" as="h3" className="title" />
            <T k="proc.secagem.desc" as="p" className="desc" />
            <div className="meta">
              <div className="meta-row">
                <T k="proc.tempo" as="span" className="k" />
                <T k="proc.tempo.v" as="span" className="v" />
              </div>
              <div className="meta-row">
                <T k="proc.umidade" as="span" className="k" />
                <span className="v">11%</span>
              </div>
            </div>
          </div>

          <div className="step">
            <div className="num">04</div>
            <T k="proc.torra" as="h3" className="title" />
            <T k="proc.torra.desc" as="p" className="desc" />
            <div className="meta">
              <div className="meta-row">
                <T k="proc.lote" as="span" className="k" />
                <span className="v">&le; 12kg</span>
              </div>
              <div className="meta-row">
                <T k="proc.frescor" as="span" className="k" />
                <span className="v">48h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="processo-quote reveal">
          <T k="proc.quote" as="blockquote" />
          <T k="proc.who" as="div" className="who" />
        </div>
      </div>
    </section>
  );
}

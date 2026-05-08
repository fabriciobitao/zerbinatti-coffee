// HomeFooter — Server Component. Reproduz o <footer class="footer"> do
// public/novo-layout/index.html: 4 colunas (brand, loja, sobre, newsletter)
// + linha inferior com copyright, links legais e badge da Gruta.
// O newsletter e uma ilha cliente (<NewsletterForm />).

import { T } from '@/lib/i18n';
import NewsletterForm from './NewsletterForm';

export default function HomeFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Coluna 1 — Brand */}
          <div className="footer-brand">
            <div className="word">
              Zerbinatti<em>.</em>
            </div>
            <div className="label" style={{ color: 'var(--gold)' }}>
              Caffè · Dal 1897
            </div>
            <T k="footer.brandDesc" as="p" />
          </div>

          {/* Coluna 2 — Loja */}
          <div>
            <T k="footer.shop" as="h4" />
            <ul>
              <li>
                <a href="/cafes">
                  <T k="footer.allCoffees" as="span" />
                </a>
              </li>
              <li>
                <a href="#assinatura">
                  <T k="footer.subs" as="span" />
                </a>
              </li>
              <li>
                <a href="#shop">
                  <T k="footer.quickBuy" as="span" />
                </a>
              </li>
              <li>
                <a href="/para-empresas">
                  <T k="nav.empresas" as="span" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Sobre */}
          <div>
            <T k="footer.about" as="h4" />
            <ul>
              <li>
                <a href="#historia">
                  <T k="footer.story" as="span" />
                </a>
              </li>
              <li>
                <a href="#processo">
                  <T k="nav.processo" as="span" />
                </a>
              </li>
              <li>
                <a href="/fazenda">
                  <T k="footer.farm" as="span" />
                </a>
              </li>
              <li>
                <a href="/entregas">
                  <T k="footer.delivery" as="span" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Newsletter (client island) */}
          <div>
            <T k="footer.newsletter" as="h4" />
            <T
              k="footer.newsDesc"
              as="p"
              className="footer-news-desc"
            />
            <NewsletterForm />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Zerbinatti Coffee · Dal 1897</span>
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a href="/termos">
              <T k="footer.terms" as="span" />
            </a>
            <a href="/privacidade">
              <T k="footer.privacy" as="span" />
            </a>
            <a href="/entregas">
              <T k="footer.delivery" as="span" />
            </a>
            <span
              className="gruta-badge"
              data-theme="dark"
              aria-label="Made by Gruta — clica pra contato"
              role="button"
              tabIndex={0}
              suppressHydrationWarning
            >
              <canvas className="gruta-mark" width={16} height={16} />
              <span className="gruta-text" suppressHydrationWarning />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

// NewsletterForm — Client island. Submit POST -> /api/newsletter/subscribe
// que persiste o email no Firestore (collection: newsletter_optin).
// Otimismo: troca o botao pra "Inscrito ✓" assim que a request resolve OK.
// Honeypot anti-bot via input hidden text.

import { useContext, useState, type FormEvent } from 'react';
import { useT, LocaleContext } from '@/lib/i18n';
import { pushLead } from '@/lib/analytics/dataLayer';

export default function NewsletterForm() {
  const t = useT();
  const { locale } = useContext(LocaleContext);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          locale,
          source: 'footer',
          honeypot,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          json?.error === 'invalid_email'
            ? t('footer.errInvalidEmail')
            : t('footer.errGeneric'),
        );
        setLoading(false);
        return;
      }
      pushLead('sign_up', {
        method: 'newsletter',
        form_name: 'footer_newsletter',
      });
      setSubmitted(true);
    } catch {
      setError(t('footer.errGeneric'));
      setLoading(false);
    }
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('footer.emailPlaceholder')}
        aria-label={t('footer.newsletter')}
        disabled={submitted || loading}
        aria-invalid={error ? true : undefined}
      />
      {/* honeypot anti-bot — nao mostrar no UI */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <button type="submit" disabled={submitted || loading}>
        {submitted
          ? t('footer.subscribed')
          : loading
            ? '…'
            : t('footer.subscribe')}
      </button>
      {error ? (
        <div
          role="alert"
          style={{
            marginTop: 8,
            fontSize: 12,
            color: '#E47A6A',
            fontFamily: 'var(--mono, monospace)',
            letterSpacing: '0.06em',
          }}
        >
          {error}
        </div>
      ) : null}
    </form>
  );
}

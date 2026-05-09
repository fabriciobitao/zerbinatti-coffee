'use client';

// NewsletterForm — Client island. Submit POST -> /api/newsletter/subscribe
// que persiste o email no Firestore (collection: newsletter_optin).
// Double opt-in: status=pending -> email Resend com link HMAC -> /api/newsletter/confirm -> status=active.
// Anti-bot: honeypot + Cloudflare Turnstile invisible.

import { useContext, useEffect, useState, type FormEvent } from 'react';
import { useT, LocaleContext } from '@/lib/i18n';
import { pushLead } from '@/lib/analytics/dataLayer';
import TurnstileWidget from '@/components/security/TurnstileWidget';

export default function NewsletterForm() {
  const t = useT();
  const { locale } = useContext(LocaleContext);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const flag = params.get('subscribed');
    if (flag === 'ok' || flag === 'already') {
      setSubmitted(true);
    }
  }, []);

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
          turnstileToken,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const code = json?.error;
        setError(
          code === 'invalid_email'
            ? t('footer.errInvalidEmail')
            : code === 'turnstile_failed'
              ? t('footer.errCaptcha')
              : t('footer.errGeneric'),
        );
        setLoading(false);
        return;
      }
      pushLead('sign_up', {
        method: 'newsletter',
        form_name: 'footer_newsletter',
      });
      if (json?.pending) {
        setPending(true);
      } else {
        setSubmitted(true);
      }
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
        disabled={submitted || pending || loading}
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
      <TurnstileWidget onToken={setTurnstileToken} />
      <button type="submit" disabled={submitted || pending || loading}>
        {submitted
          ? t('footer.subscribed')
          : pending
            ? t('footer.pendingConfirm')
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

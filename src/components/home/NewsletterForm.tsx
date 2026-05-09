'use client';

// NewsletterForm — Client island. Reproduz o comportamento do <form class="newsletter">
// estatico em public/novo-layout/index.html: ao submeter, troca o texto do botao para
// "Inscrito ✓" otimisticamente. Nada e persistido.
//
// TODO: plugar backend de newsletter. Opcoes consideradas: Resend audiences
// (RESEND_AUDIENCE_ID ja em .env.example) ou Klaviyo via API. Implementar route
// handler em /api/newsletter/subscribe que valida email + dispara double opt-in
// (NEWSLETTER_SECRET ja em .env.example) antes de inserir na audience.

import { useState, type FormEvent } from 'react';
import { useT } from '@/lib/i18n';
import { pushLead } from '@/lib/analytics/dataLayer';

export default function NewsletterForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // TODO: POST para /api/newsletter/subscribe (Resend audiences) +
    // dispara email com link do PDF /downloads/guia-brewing-zerbinatti.pdf.
    pushLead('sign_up', {
      method: 'newsletter',
      form_name: 'footer_newsletter',
    });
    setSubmitted(true);
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
        disabled={submitted}
      />
      <button type="submit" disabled={submitted}>
        {submitted ? t('footer.subscribed') : t('footer.subscribe')}
      </button>
    </form>
  );
}

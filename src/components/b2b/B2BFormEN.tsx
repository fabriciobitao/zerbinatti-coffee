'use client';

/**
 * B2BFormEN — formulario de inquiry B2B em ingles, posta /api/b2b-form
 * com locale=en (a API relaxa validacao de telefone e ignora CNPJ).
 *
 * Reusa o TurnstileWidget invisible (mesmo que /api/newsletter/subscribe
 * e a versao PT). Validacao client-side: nome+empresa+email+phone+segment
 * obrigatorios; phone aceita 7-15 digitos (internacional).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import TurnstileWidget from '@/components/security/TurnstileWidget';
import { pushLead } from '@/lib/analytics/dataLayer';

type FormState = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  pais: string;
  segmento: string;
  volume: string;
  mensagem: string;
};

const INITIAL: FormState = {
  nome: '',
  empresa: '',
  email: '',
  whatsapp: '',
  pais: '',
  segmento: '',
  volume: '',
  mensagem: '',
};

const SEGMENTS = [
  { value: '', label: 'Select your segment' },
  { value: 'coffee_shop', label: 'Café / coffee shop' },
  { value: 'restaurant_hotel', label: 'Restaurant / hotel' },
  { value: 'roastery', label: 'Roastery' },
  { value: 'office', label: 'Office / coworking' },
  { value: 'retail', label: 'Retail / market' },
  { value: 'other', label: 'Other' },
];

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function digitsOnly(v: string): string {
  return v.replace(/\D/g, '');
}

export default function B2BFormEN() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const turnstileTokenRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.nome.trim().length < 2) e.nome = 'Please enter your full name.';
    if (form.empresa.trim().length < 2) e.empresa = 'Please enter your company name.';
    if (!isValidEmail(form.email)) e.email = 'Invalid email address.';
    const phoneDigits = digitsOnly(form.whatsapp);
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      e.whatsapp = 'Phone must include 7–15 digits (country code optional).';
    }
    if (!form.segmento) e.segmento = 'Please select a segment.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  // Aguarda token do Turnstile aparecer (timeout 8s).
  const waitForToken = useCallback(async (timeoutMs = 8000): Promise<string | null> => {
    const start = Date.now();
    return new Promise((resolve) => {
      const tick = () => {
        if (turnstileTokenRef.current) return resolve(turnstileTokenRef.current);
        if (Date.now() - start > timeoutMs) return resolve(null);
        setTimeout(tick, 100);
      };
      tick();
    });
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMsg(null);
      if (!validate()) {
        const firstErr = formRef.current?.querySelector<HTMLElement>('.invalid');
        firstErr?.focus();
        return;
      }
      setSubmitting(true);
      try {
        const turnstileToken = await waitForToken();
        const res = await fetch('/api/b2b-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, locale: 'en', turnstileToken }),
        });
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          fields?: Record<string, string>;
        };
        if (res.ok && json.ok) {
          pushLead('generate_lead', {
            method: 'b2b_form_en',
            form_name: 'b2b_for_business_en',
            segment: form.segmento,
            estimated_volume_kg: form.volume || '',
          });
          setForm(INITIAL);
          setErrors({});
          turnstileTokenRef.current = null;
          setMsg({
            kind: 'success',
            text: 'Got it. Our commercial team will reply within one business day.',
          });
          return;
        }
        if (json.error === 'turnstile_failed') {
          setMsg({
            kind: 'error',
            text: 'Anti-bot check failed. Reload the page and try again.',
          });
          return;
        }
        if (json.error === 'validation_failed' && json.fields) {
          setErrors(json.fields as Partial<Record<keyof FormState, string>>);
          setMsg({ kind: 'error', text: 'Some fields are invalid. Please review them.' });
          return;
        }
        throw new Error(json.error || 'request_failed');
      } catch (err) {
        console.error('[b2b-en]', err);
        setMsg({
          kind: 'error',
          text: 'Could not send right now. Please try again in a few seconds.',
        });
      } finally {
        setSubmitting(false);
      }
    },
    [form, validate, waitForToken],
  );

  // Limpa msg apos sucesso quando o user comeca a digitar de novo.
  useEffect(() => {
    if (msg?.kind === 'success' && (form.nome || form.empresa || form.email)) {
      setMsg(null);
    }
  }, [form, msg]);

  return (
    <form ref={formRef} className="b2b-form-grid" onSubmit={onSubmit} noValidate>
      <div className="b2b-form-row">
        <label htmlFor="b2b-en-nome">Your name</label>
        <input
          id="b2b-en-nome"
          name="nome"
          type="text"
          required
          minLength={2}
          maxLength={200}
          placeholder="Full name"
          value={form.nome}
          className={errors.nome ? 'invalid' : ''}
          onChange={(e) => update('nome', e.target.value)}
        />
        {errors.nome && <span className="b2b-field-error show">{errors.nome}</span>}
      </div>
      <div className="b2b-form-row">
        <label htmlFor="b2b-en-empresa">Company</label>
        <input
          id="b2b-en-empresa"
          name="empresa"
          type="text"
          required
          minLength={2}
          maxLength={300}
          placeholder="Legal company name"
          value={form.empresa}
          className={errors.empresa ? 'invalid' : ''}
          onChange={(e) => update('empresa', e.target.value)}
        />
        {errors.empresa && <span className="b2b-field-error show">{errors.empresa}</span>}
      </div>
      <div className="b2b-form-row">
        <label htmlFor="b2b-en-pais">Country</label>
        <input
          id="b2b-en-pais"
          name="pais"
          type="text"
          maxLength={100}
          placeholder="USA, UK, Germany, ..."
          value={form.pais}
          onChange={(e) => update('pais', e.target.value)}
        />
      </div>
      <div className="b2b-form-row">
        <label htmlFor="b2b-en-email">Email</label>
        <input
          id="b2b-en-email"
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder="contact@company.com"
          value={form.email}
          className={errors.email ? 'invalid' : ''}
          onChange={(e) => update('email', e.target.value)}
        />
        {errors.email && <span className="b2b-field-error show">{errors.email}</span>}
      </div>
      <div className="b2b-form-row full">
        <label htmlFor="b2b-en-phone">Phone / WhatsApp (with country code)</label>
        <input
          id="b2b-en-phone"
          name="whatsapp"
          type="tel"
          required
          inputMode="tel"
          maxLength={24}
          placeholder="+1 (555) 123-4567"
          autoComplete="tel"
          value={form.whatsapp}
          className={errors.whatsapp ? 'invalid' : ''}
          onChange={(e) => update('whatsapp', e.target.value)}
        />
        {errors.whatsapp && <span className="b2b-field-error show">{errors.whatsapp}</span>}
      </div>
      <div className="b2b-form-row full">
        <label htmlFor="b2b-en-segment">Segment</label>
        <select
          id="b2b-en-segment"
          name="segmento"
          required
          value={form.segmento}
          className={errors.segmento ? 'invalid' : ''}
          onChange={(e) => update('segmento', e.target.value)}
        >
          {SEGMENTS.map((s) => (
            <option key={s.value} value={s.value} disabled={s.value === ''}>
              {s.label}
            </option>
          ))}
        </select>
        {errors.segmento && <span className="b2b-field-error show">{errors.segmento}</span>}
      </div>
      <div className="b2b-form-row full">
        <label htmlFor="b2b-en-volume">Estimated monthly volume</label>
        <input
          id="b2b-en-volume"
          name="volume"
          type="text"
          maxLength={200}
          placeholder="e.g. 50kg roasted per month, or 200kg green annually"
          value={form.volume}
          onChange={(e) => update('volume', e.target.value)}
        />
      </div>
      <div className="b2b-form-row full">
        <label htmlFor="b2b-en-mensagem">
          Message <span style={{ opacity: 0.6, textTransform: 'none', letterSpacing: 'normal' }}>(optional)</span>
        </label>
        <textarea
          id="b2b-en-mensagem"
          name="mensagem"
          maxLength={4000}
          placeholder="Tell us what you're looking for — sensory profile, timeline, budget, particularities."
          value={form.mensagem}
          onChange={(e) => update('mensagem', e.target.value)}
        />
      </div>

      {/* Honeypot (bot trap) — invisible to users, no autocomplete. */}
      <input
        type="text"
        name="honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      {/* Cloudflare Turnstile invisible — token preenchido em ref. */}
      <TurnstileWidget onToken={(token) => { turnstileTokenRef.current = token; }} />

      <div className="b2b-form-row full b2b-form-actions">
        <button type="submit" className="btn btn-gold" disabled={submitting}>
          {submitting ? 'Sending…' : (
            <>
              Send inquiry <span className="arrow">→</span>
            </>
          )}
        </button>
      </div>

      {msg && (
        <div className={`b2b-form-row full b2b-form-msg ${msg.kind}`}>{msg.text}</div>
      )}
    </form>
  );
}

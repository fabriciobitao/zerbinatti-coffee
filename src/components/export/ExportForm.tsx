'use client';

/**
 * ExportForm — formulario de lead de exportacao, locale-aware via useT.
 *
 * Posta /api/export-form com locale=pt|en|es. A API relaxa validacao de
 * telefone pra padrao internacional (7-15 digitos) e nao exige CNPJ.
 * Reusa o TurnstileWidget invisible (mesmo /api/b2b-form / newsletter).
 *
 * Campos especificos export:
 *   - tipoCafe (green|roasted|both) — obrigatorio
 *   - volume (texto livre)
 *   - timeline (asap|q1..q4|flexible)
 *   - porto (texto livre opcional)
 */

import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import TurnstileWidget from '@/components/security/TurnstileWidget';
import { pushLead } from '@/lib/analytics/dataLayer';
import { useT } from '@/lib/i18n/useT';
import { LocaleContext } from '@/lib/i18n/LocaleProvider';

type FormState = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  pais: string;
  tipoCafe: '' | 'green' | 'roasted' | 'both';
  volume: string;
  timeline: '' | 'asap' | 'q1' | 'q2' | 'q3' | 'q4' | 'flexible';
  porto: string;
  mensagem: string;
};

const INITIAL: FormState = {
  nome: '',
  empresa: '',
  email: '',
  whatsapp: '',
  pais: '',
  tipoCafe: '',
  volume: '',
  timeline: '',
  porto: '',
  mensagem: '',
};

const TIPO_OPTIONS = [
  { value: '', labelKey: 'export.form.option.tipo.placeholder' },
  { value: 'green', labelKey: 'export.form.option.tipo.green' },
  { value: 'roasted', labelKey: 'export.form.option.tipo.roasted' },
  { value: 'both', labelKey: 'export.form.option.tipo.both' },
] as const;

const TIMELINE_OPTIONS = [
  { value: '', labelKey: 'export.form.option.timeline.placeholder' },
  { value: 'asap', labelKey: 'export.form.option.timeline.asap' },
  { value: 'q1', labelKey: 'export.form.option.timeline.q1' },
  { value: 'q2', labelKey: 'export.form.option.timeline.q2' },
  { value: 'q3', labelKey: 'export.form.option.timeline.q3' },
  { value: 'q4', labelKey: 'export.form.option.timeline.q4' },
  { value: 'flexible', labelKey: 'export.form.option.timeline.flexible' },
] as const;

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

function digitsOnly(v: string): string {
  return v.replace(/\D/g, '');
}

export default function ExportForm() {
  const t = useT();
  const { locale } = useContext(LocaleContext);
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
    if (form.nome.trim().length < 2) e.nome = t('export.form.error.nome');
    if (form.empresa.trim().length < 2) e.empresa = t('export.form.error.empresa');
    if (!isValidEmail(form.email)) e.email = t('export.form.error.email');
    const phoneDigits = digitsOnly(form.whatsapp);
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      e.whatsapp = t('export.form.error.whatsapp');
    }
    if (form.pais.trim().length < 2) e.pais = t('export.form.error.pais');
    if (!form.tipoCafe) e.tipoCafe = t('export.form.error.tipoCafe');
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, t]);

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
        const res = await fetch('/api/export-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, locale, turnstileToken }),
        });
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          fields?: Record<string, string>;
        };
        if (res.ok && json.ok) {
          pushLead('generate_lead', {
            method: 'export_form',
            form_name: `export_${locale}`,
            tipo_cafe: form.tipoCafe,
            timeline: form.timeline,
            country: form.pais,
            estimated_volume: form.volume,
          });
          setForm(INITIAL);
          setErrors({});
          turnstileTokenRef.current = null;
          setMsg({ kind: 'success', text: t('export.form.success') });
          return;
        }
        if (json.error === 'turnstile_failed') {
          setMsg({ kind: 'error', text: t('export.form.error.turnstile') });
          return;
        }
        if (json.error === 'validation_failed' && json.fields) {
          // API devolve chaves do dicionario por campo (ex: "required" / "invalid")
          // — mapeamos pra mensagens i18n correspondentes.
          const localized: Partial<Record<keyof FormState, string>> = {};
          (Object.keys(json.fields) as (keyof FormState)[]).forEach((k) => {
            const errorKey = `export.form.error.${k}`;
            localized[k] = t(errorKey);
          });
          setErrors(localized);
          setMsg({ kind: 'error', text: t('export.form.error.validation') });
          return;
        }
        throw new Error(json.error || 'request_failed');
      } catch (err) {
        console.error('[export-form]', err);
        setMsg({ kind: 'error', text: t('export.form.error.generic') });
      } finally {
        setSubmitting(false);
      }
    },
    [form, locale, validate, waitForToken, t],
  );

  // Limpa msg de sucesso quando o user comeca a digitar de novo.
  useEffect(() => {
    if (msg?.kind === 'success' && (form.nome || form.empresa || form.email)) {
      setMsg(null);
    }
  }, [form, msg]);

  return (
    <form ref={formRef} className="form-grid" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="exp-nome">{t('export.form.label.nome')}</label>
        <input
          id="exp-nome"
          name="nome"
          type="text"
          required
          minLength={2}
          maxLength={200}
          placeholder={t('export.form.placeholder.nome')}
          value={form.nome}
          className={errors.nome ? 'invalid' : ''}
          onChange={(e) => update('nome', e.target.value)}
        />
        {errors.nome && <span className="x-field-error show">{errors.nome}</span>}
      </div>

      <div className="field">
        <label htmlFor="exp-empresa">{t('export.form.label.empresa')}</label>
        <input
          id="exp-empresa"
          name="empresa"
          type="text"
          required
          minLength={2}
          maxLength={300}
          placeholder={t('export.form.placeholder.empresa')}
          value={form.empresa}
          className={errors.empresa ? 'invalid' : ''}
          onChange={(e) => update('empresa', e.target.value)}
        />
        {errors.empresa && <span className="x-field-error show">{errors.empresa}</span>}
      </div>

      <div className="field">
        <label htmlFor="exp-email">{t('export.form.label.email')}</label>
        <input
          id="exp-email"
          name="email"
          type="email"
          required
          maxLength={200}
          placeholder={t('export.form.placeholder.email')}
          value={form.email}
          className={errors.email ? 'invalid' : ''}
          onChange={(e) => update('email', e.target.value)}
        />
        {errors.email && <span className="x-field-error show">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="exp-pais">{t('export.form.label.pais')}</label>
        <input
          id="exp-pais"
          name="pais"
          type="text"
          required
          maxLength={100}
          placeholder={t('export.form.placeholder.pais')}
          value={form.pais}
          className={errors.pais ? 'invalid' : ''}
          onChange={(e) => update('pais', e.target.value)}
        />
        {errors.pais && <span className="x-field-error show">{errors.pais}</span>}
      </div>

      <div className="field full">
        <label htmlFor="exp-phone">{t('export.form.label.whatsapp')}</label>
        <input
          id="exp-phone"
          name="whatsapp"
          type="tel"
          required
          inputMode="tel"
          maxLength={24}
          placeholder={t('export.form.placeholder.whatsapp')}
          autoComplete="tel"
          value={form.whatsapp}
          className={errors.whatsapp ? 'invalid' : ''}
          onChange={(e) => update('whatsapp', e.target.value)}
        />
        {errors.whatsapp && <span className="x-field-error show">{errors.whatsapp}</span>}
      </div>

      <div className="field">
        <label htmlFor="exp-tipo">{t('export.form.label.tipoCafe')}</label>
        <select
          id="exp-tipo"
          name="tipoCafe"
          required
          value={form.tipoCafe}
          className={errors.tipoCafe ? 'invalid' : ''}
          onChange={(e) => update('tipoCafe', e.target.value as FormState['tipoCafe'])}
        >
          {TIPO_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
        {errors.tipoCafe && <span className="x-field-error show">{errors.tipoCafe}</span>}
      </div>

      <div className="field">
        <label htmlFor="exp-timeline">{t('export.form.label.timeline')}</label>
        <select
          id="exp-timeline"
          name="timeline"
          value={form.timeline}
          onChange={(e) => update('timeline', e.target.value as FormState['timeline'])}
        >
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="exp-volume">{t('export.form.label.volume')}</label>
        <input
          id="exp-volume"
          name="volume"
          type="text"
          maxLength={200}
          placeholder={t('export.form.placeholder.volume')}
          value={form.volume}
          onChange={(e) => update('volume', e.target.value)}
        />
      </div>

      <div className="field full">
        <label htmlFor="exp-porto">
          {t('export.form.label.porto')}{' '}
          <span style={{ opacity: 0.55, textTransform: 'none', letterSpacing: 'normal' }}>
            {t('export.form.optional')}
          </span>
        </label>
        <input
          id="exp-porto"
          name="porto"
          type="text"
          maxLength={200}
          placeholder={t('export.form.placeholder.porto')}
          value={form.porto}
          onChange={(e) => update('porto', e.target.value)}
        />
      </div>

      <div className="field full">
        <label htmlFor="exp-mensagem">
          {t('export.form.label.mensagem')}{' '}
          <span style={{ opacity: 0.55, textTransform: 'none', letterSpacing: 'normal' }}>
            {t('export.form.optional')}
          </span>
        </label>
        <textarea
          id="exp-mensagem"
          name="mensagem"
          maxLength={4000}
          placeholder={t('export.form.placeholder.mensagem')}
          value={form.mensagem}
          onChange={(e) => update('mensagem', e.target.value)}
        />
      </div>

      {/* Honeypot anti-bot — invisivel pro user, sem autocomplete. */}
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

      <div className="field full">
        <div className="form-actions">
          <div
            style={{
              fontFamily: 'var(--x-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--x-ink-2)',
            }}
          >
            {t('export.form.note')}
          </div>
          <button type="submit" className="x-btn x-btn-gold" disabled={submitting}>
            {submitting ? (
              t('export.form.submitting')
            ) : (
              <span dangerouslySetInnerHTML={t.html('export.form.submit')} />
            )}
          </button>
        </div>
      </div>

      {msg && (
        <div className={`form-msg ${msg.kind}`}>{msg.text}</div>
      )}
    </form>
  );
}

import { Resend } from "resend";

/**
 * Wrapper Resend — newsletter audience + emails transacionais.
 *
 * Operacoes:
 * - addContactPending(email): cria contato como 'unsubscribed' ate o double opt-in
 * - confirmContact(email): atualiza contato para 'subscribed' (pos confirmacao)
 * - removeContact(email): remove da audience (unsubscribe)
 * - sendEmail(...): wrapper generico
 */

let cachedClient: Resend | null = null;

function getClient(): Resend {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY ausente");
  }
  cachedClient = new Resend(apiKey);
  return cachedClient;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
}

export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    "Zerbinatti <newsletter@zerbinatticoffee.com>"
  );
}

export function getAudienceId(): string {
  const id = process.env.RESEND_AUDIENCE_ID;
  if (!id) throw new Error("RESEND_AUDIENCE_ID ausente");
  return id;
}

/**
 * Adiciona contato pendente. Resend retorna 'already exists' como erro nao-fatal —
 * tratamos como sucesso (idempotente).
 */
export async function addContactPending(email: string): Promise<void> {
  const client = getClient();
  const audienceId = getAudienceId();
  await client.contacts.create({
    audienceId,
    email,
    unsubscribed: true, // pendente ate confirmar
  });
}

export async function confirmContact(email: string): Promise<void> {
  const client = getClient();
  const audienceId = getAudienceId();
  await client.contacts.update({
    audienceId,
    email,
    unsubscribed: false,
  });
}

export async function removeContact(email: string): Promise<void> {
  const client = getClient();
  const audienceId = getAudienceId();
  await client.contacts.remove({ audienceId, email });
}

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const client = getClient();
  await client.emails.send({
    from: getFromEmail(),
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
  });
}

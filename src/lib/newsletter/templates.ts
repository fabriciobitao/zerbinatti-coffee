/**
 * Templates HTML inline para emails da newsletter.
 *
 * Tom editorial Zerbinatti: cabeçalho minimal com monograma Z,
 * corpo curto, CTA olive, footer com unsubscribe.
 *
 * Estilo inline (compat email clients) — sem CSS externo.
 */

const COLORS = {
  bone: "#F4EFE6",
  ink: "#1B1714",
  inkSoft: "#3A322C",
  inkMute: "#736961",
  olive: "#4A5237",
  oliveDeep: "#363D26",
  line: "#D9D0BE",
};

function shell(opts: {
  preheader: string;
  bodyHtml: string;
  unsubscribeUrl?: string;
}): string {
  const { preheader, bodyHtml, unsubscribeUrl } = opts;
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Zerbinatti</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.bone};font-family:Georgia,'Times New Roman',serif;color:${COLORS.ink};">
    <span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;max-height:0;max-width:0;overflow:hidden;">
      ${preheader}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.bone};">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLORS.bone};">
            <tr>
              <td align="left" style="padding:0 0 32px 0;border-bottom:1px solid ${COLORS.line};">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:36px;color:${COLORS.olive};line-height:1;">Z</span>
                <div style="margin-top:12px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.inkMute};">
                  Zerbinatti Coffee · Dal 1897
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 0 24px 0;font-family:Georgia,'Times New Roman',serif;color:${COLORS.ink};">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:40px 0 0 0;border-top:1px solid ${COLORS.line};font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.06em;color:${COLORS.inkMute};">
                <p style="margin:0 0 12px 0;">
                  Zerbinatti Coffee — Casa familiar de café, em ofício contínuo desde 1897.
                </p>
                ${
                  unsubscribeUrl
                    ? `<p style="margin:0;"><a href="${unsubscribeUrl}" style="color:${COLORS.inkMute};text-decoration:underline;">Cancelar assinatura desta newsletter</a></p>`
                    : ""
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function confirmationEmail(opts: {
  confirmUrl: string;
}): { subject: string; html: string } {
  const subject = "Confirme sua inscrição na Revista Zerbinatti";
  const body = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:32px;line-height:1.15;margin:0 0 24px 0;color:${COLORS.ink};">
      Quase lá. <em style="font-style:italic;">Confirme</em> abaixo.
    </h1>
    <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:${COLORS.inkSoft};margin:0 0 16px 0;">
      Recebemos sua inscrição. Antes de incluir você na nossa lista, precisamos confirmar que este endereço é seu — exigência da LGPD e bom costume da casa.
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:${COLORS.inkSoft};margin:0 0 32px 0;">
      Clique no botão abaixo para confirmar. O link vale por 24 horas.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
      <tr>
        <td style="background:${COLORS.olive};">
          <a href="${opts.confirmUrl}" style="display:inline-block;padding:16px 32px;font-family:Arial,sans-serif;font-size:14px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:${COLORS.bone};text-decoration:none;">
            Confirmar inscrição
          </a>
        </td>
      </tr>
    </table>
    <p style="font-family:'Courier New',monospace;font-size:12px;line-height:1.5;color:${COLORS.inkMute};margin:0 0 8px 0;letter-spacing:0.05em;">
      Se o botão não funcionar, copie e cole no navegador:
    </p>
    <p style="font-family:'Courier New',monospace;font-size:12px;line-height:1.5;color:${COLORS.olive};margin:0 0 32px 0;word-break:break-all;">
      ${opts.confirmUrl}
    </p>
    <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:${COLORS.inkMute};margin:0;">
      Não foi você quem se inscreveu? Ignore este email — sem confirmação, nenhum endereço entra na lista.
    </p>
  `;
  return {
    subject,
    html: shell({
      preheader: "Confirme sua inscrição na Revista Zerbinatti.",
      bodyHtml: body,
    }),
  };
}

export function welcomeEmail(opts: {
  unsubscribeUrl: string;
}): { subject: string; html: string } {
  const subject = "Bem-vindo à mesa da Zerbinatti";
  const body = `
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:32px;line-height:1.15;margin:0 0 24px 0;color:${COLORS.ink};">
      Você está <em style="font-style:italic;">na lista</em>.
    </h1>
    <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:${COLORS.inkSoft};margin:0 0 16px 0;">
      Uma vez por mês: notas de safra, novidades da torrefação, rituais. Sem ruído. Sem promoção forçada.
    </p>
    <p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;color:${COLORS.inkSoft};margin:0 0 32px 0;">
      A primeira edição chega na próxima janela editorial.
    </p>
  `;
  return {
    subject,
    html: shell({
      preheader: "Você está na lista.",
      bodyHtml: body,
      unsubscribeUrl: opts.unsubscribeUrl,
    }),
  };
}

export function b2bNotificationEmail(opts: {
  type: string;
  name?: string;
  company?: string;
  cnpj?: string;
  email: string;
  phone?: string;
  message?: string;
}): { subject: string; html: string } {
  const subject = `[Zerbinatti B2B] Novo pedido — ${opts.company ?? opts.name ?? "sem identificacao"}`;
  const lines: string[] = [];
  if (opts.name) lines.push(`<strong>Nome:</strong> ${escapeHtml(opts.name)}`);
  if (opts.company)
    lines.push(`<strong>Empresa:</strong> ${escapeHtml(opts.company)}`);
  if (opts.cnpj) lines.push(`<strong>CNPJ:</strong> ${escapeHtml(opts.cnpj)}`);
  lines.push(`<strong>E-mail:</strong> ${escapeHtml(opts.email)}`);
  if (opts.phone)
    lines.push(`<strong>Telefone:</strong> ${escapeHtml(opts.phone)}`);

  const body = `
    <p style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.olive};margin:0 0 16px 0;">
      Tipo · ${escapeHtml(opts.type.toUpperCase())}
    </p>
    <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 24px 0;color:${COLORS.ink};">
      Novo pedido <em style="font-style:italic;">B2B</em>.
    </h1>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid ${COLORS.line};margin:24px 0 0 0;">
      ${lines
        .map(
          (l) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${COLORS.line};font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:${COLORS.inkSoft};">
            ${l}
          </td>
        </tr>`,
        )
        .join("")}
    </table>
    ${
      opts.message
        ? `
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:18px;font-style:italic;margin:32px 0 12px 0;color:${COLORS.ink};">Mensagem</h2>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.65;color:${COLORS.inkSoft};white-space:pre-wrap;margin:0;">${escapeHtml(opts.message)}</p>`
        : ""
    }
    <p style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.inkMute};margin:32px 0 0 0;">
      Retorno até 24h úteis · sem automação comercial
    </p>
  `;
  return {
    subject,
    html: shell({
      preheader: `Novo pedido B2B — ${opts.company ?? opts.email}`,
      bodyHtml: body,
    }),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

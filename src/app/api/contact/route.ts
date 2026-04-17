import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Aceita captura de email (Quiz, newsletter, formulário B2B).
 *
 * Se RESEND_API_KEY estiver configurada, envia notificação para CONTACT_INBOX.
 * Caso contrário, retorna 200 ok (log-only) — o front continua funcional e
 * o WhatsApp serve de canal primário. Plug-and-play quando o Resend for ligado.
 */

type ContactPayload = {
  type: "quiz" | "newsletter" | "b2b";
  email?: string;
  name?: string;
  company?: string;
  phone?: string;
  message?: string;
  metadata?: Record<string, string>;
};

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!payload.email && !payload.phone) {
    return NextResponse.json(
      { error: "email_or_phone_required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX || "contato@zerbinatticoffee.com";
  const from = process.env.CONTACT_FROM || "site@zerbinatticoffee.com";

  if (!apiKey) {
    // Sem Resend configurado — apenas aceita (log-only).
    console.log("[contact] received (resend not configured):", {
      type: payload.type,
      email: payload.email,
      name: payload.name,
    });
    return NextResponse.json({ ok: true, queued: false });
  }

  const subject = `[Zerbinatti] Novo contato — ${payload.type.toUpperCase()}`;
  const lines = [
    `Tipo: ${payload.type}`,
    payload.name && `Nome: ${payload.name}`,
    payload.company && `Empresa: ${payload.company}`,
    payload.email && `E-mail: ${payload.email}`,
    payload.phone && `Telefone: ${payload.phone}`,
    payload.message && `\nMensagem:\n${payload.message}`,
    payload.metadata &&
      `\nMetadata:\n${Object.entries(payload.metadata)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join("\n")}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: inbox,
        subject,
        text: lines,
        reply_to: payload.email,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] resend error:", err);
      return NextResponse.json(
        { error: "send_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, queued: true });
  } catch (err) {
    console.error("[contact] exception:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

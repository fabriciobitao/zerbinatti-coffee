import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";
import { Resend } from "resend";

export const runtime = "nodejs";

const NOTIFY_TO = ["fabricio.fazer@gmail.com", "fabiomenezes@gmail.com"];
const FROM = "Zerbinatti B2B <noreply@zerbinatti.coffee>";

let _firestore: Firestore | null = null;
function getFirestore(): Firestore {
  if (!_firestore) {
    _firestore = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || "zerbinatti-cafe",
      preferRest: true,
    });
  }
  return _firestore;
}

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY not configured");
    _resend = new Resend(key);
  }
  return _resend;
}

type Body = {
  nome?: string;
  empresa?: string;
  email?: string;
  whatsapp?: string;
  segmento?: string;
  volume?: string;
  mensagem?: string;
  honeypot?: string;
};

function sanitize(s: unknown, max = 2000): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (sanitize(body.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    nome: sanitize(body.nome, 200),
    empresa: sanitize(body.empresa, 300),
    email: sanitize(body.email, 200),
    whatsapp: sanitize(body.whatsapp, 50),
    segmento: sanitize(body.segmento, 100),
    volume: sanitize(body.volume, 200),
    mensagem: sanitize(body.mensagem, 4000),
  };

  if (!data.nome || !data.empresa || !data.email || !data.whatsapp || !data.segmento) {
    return NextResponse.json({ error: "missing_required_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  const record = {
    ...data,
    ip,
    userAgent,
    createdAt: new Date(),
  };

  let docId = "";
  try {
    const doc = await getFirestore().collection("b2b_submissions").add(record);
    docId = doc.id;
  } catch (err) {
    console.error(
      "[b2b-form] firestore error",
      err instanceof Error ? `${err.name}: ${err.message}\n${err.stack}` : err,
    );
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  try {
    const subject = `[B2B Zerbinatti] Pedido de ${data.nome} (${data.empresa})`;
    const rows: [string, string][] = [
      ["Nome", data.nome],
      ["Empresa / CNPJ", data.empresa],
      ["E-mail", data.email],
      ["WhatsApp", data.whatsapp],
      ["Segmento", data.segmento],
      ["Volume estimado", data.volume || "—"],
      ["Mensagem", data.mensagem || "—"],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1a1a1a">
        <h2 style="margin:0 0 8px;font-weight:600">Novo pedido B2B — Zerbinatti</h2>
        <p style="margin:0 0 16px;color:#666;font-size:13px">Recebido em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows.map(([k, v]) => `<tr><td style="padding:10px 12px;background:#f5f5f5;border:1px solid #e5e5e5;font-weight:600;width:40%">${escapeHtml(k)}</td><td style="padding:10px 12px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join("")}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#888">Firestore doc: ${docId} · IP: ${escapeHtml(ip)}</p>
      </div>
    `;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nFirestore doc: ${docId}\nIP: ${ip}`;

    await getResend().emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: data.email,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error("[b2b-form] resend error", err);
    return NextResponse.json({ ok: true, warning: "email_failed", id: docId });
  }

  return NextResponse.json({ ok: true, id: docId });
}

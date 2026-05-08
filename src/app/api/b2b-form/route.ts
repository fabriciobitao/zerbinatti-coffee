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
  cnpj?: string;
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

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function validateCNPJ(raw: string): boolean {
  const c = digitsOnly(raw);
  if (c.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(c)) return false;
  const calc = (slice: string, weights: number[]): number => {
    const sum = slice
      .split("")
      .reduce((acc, n, i) => acc + Number(n) * weights[i], 0);
    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  };
  const d1 = calc(c.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(c.slice(0, 13), [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === Number(c[12]) && d2 === Number(c[13]);
}

function formatCNPJ(c: string): string {
  return c.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5",
  );
}

function formatPhone(p: string): string {
  if (p.length === 11) {
    return p.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }
  if (p.length === 10) {
    return p.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }
  return p;
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

  const cnpjDigits = digitsOnly(sanitize(body.cnpj, 30));
  const phoneDigits = digitsOnly(sanitize(body.whatsapp, 30));
  const data = {
    nome: sanitize(body.nome, 200),
    empresa: sanitize(body.empresa, 300),
    cnpj: cnpjDigits ? formatCNPJ(cnpjDigits) : "",
    email: sanitize(body.email, 200).toLowerCase(),
    whatsapp: phoneDigits ? formatPhone(phoneDigits) : "",
    segmento: sanitize(body.segmento, 100),
    volume: sanitize(body.volume, 200),
    mensagem: sanitize(body.mensagem, 4000),
  };

  const fieldErrors: Record<string, string> = {};
  if (!data.nome || data.nome.length < 2) fieldErrors.nome = "required";
  if (!data.empresa || data.empresa.length < 2) fieldErrors.empresa = "required";
  if (cnpjDigits && !validateCNPJ(cnpjDigits)) fieldErrors.cnpj = "invalid";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fieldErrors.email = "invalid";
  if (phoneDigits.length !== 10 && phoneDigits.length !== 11) fieldErrors.whatsapp = "invalid";
  if (!data.segmento) fieldErrors.segmento = "required";

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { error: "validation_failed", fields: fieldErrors },
      { status: 400 },
    );
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
      ["Empresa", data.empresa],
      ...(data.cnpj ? ([["CNPJ", data.cnpj]] as [string, string][]) : []),
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

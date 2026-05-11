import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";
import { Resend } from "resend";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

// Email destinatarios — mesmos do B2B por enquanto (decisao do user).
// Subject prefix `[EXPORT Zerbinatti · LOCALE]` permite filtrar/encaminhar.
// Se quiser inbox dedicada no futuro, basta setar EXPORT_NOTIFY_EMAILS no env.
const DEFAULT_NOTIFY_TO = ["fabricio.fazer@gmail.com", "fabiomenezes@gmail.com"];
const FROM = "Zerbinatti Export <noreply@zerbinatti.coffee>";

function getNotifyTo(): string[] {
  const env = process.env.EXPORT_NOTIFY_EMAILS || process.env.B2B_NOTIFY_EMAILS;
  if (!env) return DEFAULT_NOTIFY_TO;
  const list = env
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s));
  return list.length ? list : DEFAULT_NOTIFY_TO;
}

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
  pais?: string;
  tipoCafe?: string;
  volume?: string;
  timeline?: string;
  porto?: string;
  mensagem?: string;
  locale?: string;
  honeypot?: string;
  turnstileToken?: string;
};

const VALID_TIPOS = new Set(["green", "roasted", "both"]);
const VALID_TIMELINES = new Set(["asap", "q1", "q2", "q3", "q4", "flexible"]);
const VALID_LOCALES = new Set(["pt", "en", "es"]);

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

const TIPO_LABEL: Record<string, string> = {
  green: "Verde / Green",
  roasted: "Torrado / Roasted",
  both: "Verde e torrado / Green and roasted",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "O quanto antes / ASAP",
  q1: "Q1",
  q2: "Q2",
  q3: "Q3",
  q4: "Q4",
  flexible: "Flexivel / Flexible",
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bot preencheu campo invisivel — finge sucesso, descarta.
  if (sanitize(body.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const ipForVerify =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const turnstile = await verifyTurnstile(body.turnstileToken, ipForVerify);
  if (!turnstile.ok) {
    return NextResponse.json(
      { error: "turnstile_failed", reason: turnstile.reason },
      { status: 403 },
    );
  }

  const localeRaw = sanitize(body.locale, 8).toLowerCase();
  const locale = VALID_LOCALES.has(localeRaw) ? localeRaw : "pt";
  const phoneDigits = digitsOnly(sanitize(body.whatsapp, 30));
  const tipoCafeRaw = sanitize(body.tipoCafe, 20).toLowerCase();
  const timelineRaw = sanitize(body.timeline, 20).toLowerCase();

  const data = {
    nome: sanitize(body.nome, 200),
    empresa: sanitize(body.empresa, 300),
    email: sanitize(body.email, 200).toLowerCase(),
    whatsapp: phoneDigits ? `+${phoneDigits}` : "",
    pais: sanitize(body.pais, 100),
    tipoCafe: VALID_TIPOS.has(tipoCafeRaw) ? tipoCafeRaw : "",
    volume: sanitize(body.volume, 200),
    timeline: VALID_TIMELINES.has(timelineRaw) ? timelineRaw : "",
    porto: sanitize(body.porto, 200),
    mensagem: sanitize(body.mensagem, 4000),
    locale,
  };

  const fieldErrors: Record<string, string> = {};
  if (!data.nome || data.nome.length < 2) fieldErrors.nome = "required";
  if (!data.empresa || data.empresa.length < 2) fieldErrors.empresa = "required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fieldErrors.email = "invalid";
  if (phoneDigits.length < 7 || phoneDigits.length > 15) fieldErrors.whatsapp = "invalid";
  if (!data.pais || data.pais.length < 2) fieldErrors.pais = "required";
  if (!data.tipoCafe) fieldErrors.tipoCafe = "required";

  if (Object.keys(fieldErrors).length) {
    return NextResponse.json(
      { error: "validation_failed", fields: fieldErrors },
      { status: 400 },
    );
  }

  const ip = ipForVerify || "";
  const userAgent = req.headers.get("user-agent") || "";

  const record = {
    ...data,
    tipoCafeLabel: TIPO_LABEL[data.tipoCafe] || data.tipoCafe,
    timelineLabel: data.timeline ? TIMELINE_LABEL[data.timeline] || data.timeline : "",
    ip,
    userAgent,
    createdAt: new Date(),
  };

  const errorId = crypto.randomUUID();
  let docId = "";
  try {
    const doc = await getFirestore().collection("export_submissions").add(record);
    docId = doc.id;
  } catch (err) {
    console.error(
      "[export-form] firestore error",
      JSON.stringify({
        errorId,
        message: err instanceof Error ? err.message : String(err),
      }),
    );
    return NextResponse.json(
      { error: "storage_failed", errorId },
      { status: 500 },
    );
  }

  try {
    const subject = `[EXPORT Zerbinatti · ${locale.toUpperCase()}] ${data.nome} (${data.empresa}) — ${data.pais}`;
    const rows: [string, string][] = [
      ["Nome / Name", data.nome],
      ["Empresa / Company", data.empresa],
      ["País / Country", data.pais],
      ["E-mail", data.email],
      ["Phone / WhatsApp", data.whatsapp],
      ["Tipo de café / Coffee type", record.tipoCafeLabel],
      ["Volume estimado / Estimated volume", data.volume || "—"],
      ["Janela / Timeline", record.timelineLabel || "—"],
      ["Porto destino / Destination port", data.porto || "—"],
      ["Mensagem / Message", data.mensagem || "—"],
      [
        "Idioma do form / Form locale",
        locale === "en"
          ? "English (/export)"
          : locale === "es"
            ? "Español (/es/exportacion)"
            : "Português (/exportacao)",
      ],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;color:#1a1a1a">
        <h2 style="margin:0 0 8px;font-weight:600">Novo lead de EXPORTAÇÃO — Zerbinatti</h2>
        <p style="margin:0 0 16px;color:#666;font-size:13px">Recebido em ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows.map(([k, v]) => `<tr><td style="padding:10px 12px;background:#f5f5f5;border:1px solid #e5e5e5;font-weight:600;width:42%">${escapeHtml(k)}</td><td style="padding:10px 12px;border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join("")}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#888">Firestore doc: ${docId} · IP: ${escapeHtml(ip)}</p>
      </div>
    `;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nFirestore doc: ${docId}\nIP: ${ip}`;

    await getResend().emails.send({
      from: FROM,
      to: getNotifyTo(),
      replyTo: data.email,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error(
      "[export-form] resend error",
      JSON.stringify({
        errorId,
        message: err instanceof Error ? err.message : String(err),
      }),
    );
    return NextResponse.json({
      ok: true,
      warning: "email_failed",
      id: docId,
      errorId,
    });
  }

  return NextResponse.json({ ok: true, id: docId });
}

import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";
import { Resend } from "resend";
import crypto from "node:crypto";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

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
function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

type Body = {
  email?: string;
  locale?: string;
  source?: string;
  honeypot?: string;
  turnstileToken?: string;
};

function sanitize(s: unknown, max = 200): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FROM =
  process.env.RESEND_FROM_EMAIL ||
  "Zerbinatti <newsletter@zerbinatti.coffee>";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://zerbinatticoffee.com"
  );
}

export function buildOptinToken(email: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(`optin:${email.toLowerCase()}`)
    .digest("hex");
}

function confirmEmailHtml(confirmUrl: string, locale: string): string {
  const isEN = locale.startsWith("en");
  const isES = locale.startsWith("es");
  const lines = isEN
    ? {
        title: "Confirm your subscription",
        body: "Click below to confirm your subscription to Zerbinatti's newsletter and receive the brewing guide PDF.",
        cta: "Confirm subscription",
        ignore: "If you did not request this, just ignore this email.",
      }
    : isES
      ? {
          title: "Confirma tu suscripción",
          body: "Haz clic abajo para confirmar tu suscripción al boletín de Zerbinatti y recibir la guía de preparación en PDF.",
          cta: "Confirmar suscripción",
          ignore: "Si no solicitaste esto, simplemente ignora este correo.",
        }
      : {
          title: "Confirme sua inscrição",
          body: "Clique no botão abaixo para confirmar sua inscrição na newsletter da Zerbinatti e receber o guia de preparo em PDF.",
          cta: "Confirmar inscrição",
          ignore: "Se você não solicitou esta inscrição, ignore este email.",
        };
  return `
<!doctype html>
<html lang="${isEN ? "en" : isES ? "es" : "pt-BR"}">
<body style="margin:0;padding:0;background:#1F1611;font-family:Georgia,'Cormorant Garamond',serif;color:#F4ECD8">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px">
    <h1 style="color:#C9A961;font-weight:400;font-style:italic;font-size:32px;margin:0 0 24px">${lines.title}</h1>
    <p style="font-size:16px;line-height:1.6;color:#E8D9C0;margin:0 0 32px">${lines.body}</p>
    <p style="margin:0 0 32px">
      <a href="${confirmUrl}" style="display:inline-block;background:#C9A961;color:#1F1611;padding:14px 28px;text-decoration:none;font-family:Arial,sans-serif;font-size:14px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;border-radius:2px">${lines.cta}</a>
    </p>
    <p style="font-size:12px;color:#9C8C72;margin:32px 0 0;line-height:1.5">${lines.ignore}</p>
    <hr style="border:none;border-top:1px solid #3A2E25;margin:32px 0">
    <p style="font-size:11px;color:#7A6B55;font-family:Arial,sans-serif;letter-spacing:0.04em;margin:0">Zerbinatti Caffè · Desde 1897 · Serra do Cabral, MG</p>
  </div>
</body>
</html>`;
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

  const email = sanitize(body.email, 200).toLowerCase();
  const locale = sanitize(body.locale, 8) || "pt";
  const source = sanitize(body.source, 100) || "footer";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip = ipForVerify || "";
  const userAgent = req.headers.get("user-agent") || "";

  const docId = email.replace(/[^a-z0-9._@-]/gi, "_");
  const errorId = crypto.randomUUID();

  const newsletterSecret = process.env.NEWSLETTER_SECRET;
  const doubleOptin = !!newsletterSecret;

  const record: Record<string, unknown> = {
    email,
    locale,
    source,
    ip,
    userAgent,
    updatedAt: new Date(),
  };

  let confirmUrl = "";
  if (doubleOptin && newsletterSecret) {
    const token = buildOptinToken(email, newsletterSecret);
    record.status = "pending";
    record.confirmToken = token;
    record.pendingAt = new Date();
    confirmUrl = `${siteUrl()}/api/newsletter/confirm?email=${encodeURIComponent(
      email,
    )}&token=${token}`;
  } else {
    record.status = "active";
    record.activatedAt = new Date();
  }

  try {
    const ref = getFirestore().collection("newsletter_optin").doc(docId);
    const existing = await ref.get();
    const existingStatus = (existing.exists
      ? (existing.data()?.status as string | undefined)
      : undefined);
    if (existingStatus === "active") {
      return NextResponse.json({ ok: true, alreadyActive: true });
    }
    if (!existing.exists) {
      record.createdAt = new Date();
    }
    await ref.set(record, { merge: true });
  } catch (err) {
    console.error(
      "[newsletter] firestore error",
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

  if (doubleOptin) {
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject:
            locale.startsWith("en")
              ? "Confirm your Zerbinatti newsletter subscription"
              : locale.startsWith("es")
                ? "Confirma tu suscripción a Zerbinatti"
                : "Confirme sua inscrição na newsletter Zerbinatti",
          html: confirmEmailHtml(confirmUrl, locale),
        });
      } catch (err) {
        console.error(
          "[newsletter] resend error",
          JSON.stringify({
            errorId,
            message: err instanceof Error ? err.message : String(err),
          }),
        );
        return NextResponse.json({
          ok: true,
          pending: true,
          warning: "email_failed",
          errorId,
        });
      }
    }
    return NextResponse.json({ ok: true, pending: true });
  }

  return NextResponse.json({ ok: true });
}

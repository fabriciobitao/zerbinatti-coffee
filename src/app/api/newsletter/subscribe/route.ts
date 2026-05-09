import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";

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

type Body = {
  email?: string;
  locale?: string;
  source?: string;
  honeypot?: string;
};

function sanitize(s: unknown, max = 200): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const email = sanitize(body.email, 200).toLowerCase();
  const locale = sanitize(body.locale, 8) || "pt";
  const source = sanitize(body.source, 100) || "footer";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "";
  const userAgent = req.headers.get("user-agent") || "";

  const docId = email.replace(/[^a-z0-9._@-]/gi, "_");
  const record = {
    email,
    locale,
    source,
    ip,
    userAgent,
    createdAt: new Date(),
    status: "active",
  };

  try {
    await getFirestore()
      .collection("newsletter_optin")
      .doc(docId)
      .set(record, { merge: true });
  } catch (err) {
    console.error(
      "[newsletter] firestore error",
      err instanceof Error ? `${err.name}: ${err.message}` : err,
    );
    return NextResponse.json({ error: "storage_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { Firestore } from "@google-cloud/firestore";
import crypto from "node:crypto";
import { buildOptinToken } from "@/app/api/newsletter/subscribe/route";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://zerbinatticoffee.com"
  );
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();
  const token = (url.searchParams.get("token") || "").trim();

  if (!EMAIL_RE.test(email) || !/^[a-f0-9]{64}$/i.test(token)) {
    return NextResponse.redirect(`${siteUrl()}/?subscribed=invalid`, 302);
  }

  const secret = process.env.NEWSLETTER_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "server_misconfigured" },
      { status: 500 },
    );
  }

  const expected = buildOptinToken(email, secret);
  if (!timingSafeEqualHex(expected, token)) {
    return NextResponse.redirect(`${siteUrl()}/?subscribed=invalid`, 302);
  }

  const docId = email.replace(/[^a-z0-9._@-]/gi, "_");
  const errorId = crypto.randomUUID();

  try {
    const ref = getFirestore().collection("newsletter_optin").doc(docId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.redirect(`${siteUrl()}/?subscribed=invalid`, 302);
    }
    const current = snap.data() as { status?: string } | undefined;
    if (current?.status === "active") {
      return NextResponse.redirect(`${siteUrl()}/?subscribed=already`, 302);
    }
    await ref.set(
      {
        status: "active",
        activatedAt: new Date(),
        confirmToken: null,
      },
      { merge: true },
    );
  } catch (err) {
    console.error(
      "[newsletter/confirm] firestore error",
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

  return NextResponse.redirect(`${siteUrl()}/?subscribed=ok`, 302);
}

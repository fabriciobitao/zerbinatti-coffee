import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

function verifyShopifyHmac(rawBody: string, headerHmac: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !headerHmac) return false;
  const computed = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  const a = Buffer.from(computed);
  const b = Buffer.from(headerHmac);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

type ShopifyProductPayload = {
  id?: number | string;
  handle?: string;
  title?: string;
};

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hmac = req.headers.get("x-shopify-hmac-sha256");
  const topic = req.headers.get("x-shopify-topic") ?? "unknown";

  if (!verifyShopifyHmac(rawBody, hmac)) {
    return NextResponse.json({ ok: false, error: "invalid hmac" }, { status: 401 });
  }

  let payload: ShopifyProductPayload = {};
  try {
    payload = JSON.parse(rawBody) as ShopifyProductPayload;
  } catch {
    payload = {};
  }

  revalidateTag("shopify-products", "default");
  if (payload.handle) {
    revalidateTag(`shopify-product:${payload.handle}`, "default");
  }

  return NextResponse.json({
    ok: true,
    topic,
    handle: payload.handle ?? null,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    info: "Shopify webhook endpoint. POST only; rejects without valid HMAC.",
  });
}

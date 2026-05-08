import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

  const res = await fetch(
    `https://${domain}/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token ?? "",
      },
      body: JSON.stringify({
        query: `{ products(first:2){ edges{ node{ handle variants(first:5){ edges{ node{ id title price{ amount } } } } } } } }`,
      }),
      cache: "no-store",
    }
  );

  const text = await res.text();
  return new NextResponse(text, {
    headers: { "Content-Type": "application/json" },
  });
}

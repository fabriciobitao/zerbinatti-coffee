import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Migracao de dominio primario: zerbinatticoffee.com -> zerbinatti.coffee.
// 308 = redirect permanente preservando method + body. Search engines tratam 308
// como 301 pra fins de link equity.
//
// Lemos `x-forwarded-host` antes de `host` porque Fastly (CDN na frente do Cloud
// Run) reescreve o Host header pro hostname do origin; o dominio original chega
// preservado em `x-forwarded-host`.
//
// /api/* e excluido do matcher pra preservar webhooks legados (ex: Shopify ->
// /api/revalidate) que apontam pro dominio antigo e nao seguem 308 em POST.
const REDIRECT_HOSTS = new Set([
  "zerbinatticoffee.com",
  "www.zerbinatticoffee.com",
  "www.zerbinatti.coffee",
]);

const CANONICAL_HOST = "zerbinatti.coffee";

function getRequestHost(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded ?? request.headers.get("host") ?? "").toLowerCase();
  return raw.split(",")[0].trim().split(":")[0];
}

// Apos Step 11/13 a home e suas secoes (#cafes, #processo, #assinatura,
// #historia) sao servidas por `src/app/(home)/page.tsx` (rota Next.js real
// + redirects 308 em next.config.ts). O unico rewrite remanescente cobre
// /para-empresas (Step 12 migra essa pagina).
export function proxy(request: NextRequest) {
  const host = getRequestHost(request);
  if (REDIRECT_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/para-empresas" || pathname === "/para-empresas/") {
    return NextResponse.rewrite(
      new URL("/novo-layout/para-empresas.html", request.url),
    );
  }

  if (pathname === "/para-empresas.html") {
    return NextResponse.rewrite(
      new URL("/novo-layout/para-empresas.html", request.url),
    );
  }
}

export const config = {
  // Cobre tudo menos assets internos e /api (ver comentario do bloco de
  // redirect no topo). Inclui /para-empresas implicitamente via /:path*.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|api).*)"],
};

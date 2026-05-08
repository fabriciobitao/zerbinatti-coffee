import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Apos Step 11/13 a home e suas secoes (#cafes, #processo, #assinatura,
// #historia) sao servidas por `src/app/(home)/page.tsx` (rota Next.js real
// + redirects 308 em next.config.ts). O unico rewrite remanescente cobre
// /para-empresas (Step 12 migra essa pagina).
export function proxy(request: NextRequest) {
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
  matcher: [
    "/para-empresas",
    "/para-empresas/",
    "/para-empresas.html",
  ],
};

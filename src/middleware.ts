import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Secoes da home acessiveis via pathname limpa (URL sem #)
// O JS dentro de index.html detecta location.pathname e rola pra ancora correspondente.
const HOME_SECTION_PATHS = new Set([
  "/cafes",
  "/cafes/",
  "/processo",
  "/processo/",
  "/assinatura",
  "/assinatura/",
  "/historia",
  "/historia/",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "" || HOME_SECTION_PATHS.has(pathname)) {
    return NextResponse.rewrite(
      new URL("/novo-layout/index.html", request.url),
    );
  }

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

  if (pathname.startsWith("/assets/")) {
    return NextResponse.rewrite(
      new URL(`/novo-layout${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/cafes",
    "/cafes/",
    "/processo",
    "/processo/",
    "/assinatura",
    "/assinatura/",
    "/historia",
    "/historia/",
    "/para-empresas",
    "/para-empresas/",
    "/para-empresas.html",
    "/assets/:path*",
  ],
};

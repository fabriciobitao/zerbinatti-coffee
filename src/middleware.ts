import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
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
    "/para-empresas",
    "/para-empresas/",
    "/para-empresas.html",
    "/assets/:path*",
  ],
};

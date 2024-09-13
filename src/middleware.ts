import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "./07.shared/config";
import { createDynamicMiddleware } from "@reduxjs/toolkit";

const blacklist = [];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let locale = null;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = !locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const nextLocale = request.cookies.get("NEXT_LOCALE");
    if (nextLocale) {
      if (nextLocale.value === "ua") {
        locale = defaultLocale;
      } else {
        locale = nextLocale.value;
      }
    }

    if (!locale) {
      locale = defaultLocale;
    }

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url
      )
    );

    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  }

  if (blacklist.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/data|favicon.ico|images|documents|models|scripts|videos|audio|assets|fonts).*)",
  ],
};

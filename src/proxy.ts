import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token") || 
                       request.cookies.get("__Secure-authjs.session-token");

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isCalculatorPage = request.nextUrl.pathname.startsWith("/calculator");

  if (!sessionToken && !isLoginPage && !isCalculatorPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (sessionToken && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

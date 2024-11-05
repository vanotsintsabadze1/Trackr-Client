import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function redirect(request: NextRequest, url: string) {
  return NextResponse.redirect(new URL(url, request.nextUrl));
}

async function checkAuth() {
  const cookieStore = cookies();
  const auth = cookieStore.get("session");

  if (auth?.value) {
    return true;
  }

  return false;
}

const allowedPathsIfNotAuth = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAuth = await checkAuth();

  if (!isAuth && !allowedPathsIfNotAuth.includes(pathname)) {
    return redirect(request, "/auth/login");
  }

  if (isAuth && allowedPathsIfNotAuth.includes(pathname)) {
    return redirect(request, "/");
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

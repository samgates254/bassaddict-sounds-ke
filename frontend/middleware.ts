import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getApiUrl } from "@/lib/config";
import { ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions } from "@/lib/auth/cookies";

function tokenExpired(token: string) {
  const part = token.split(".")[1];
  if (!part) return true;
  try {
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const json = JSON.parse(atob(padded + pad)) as { exp?: number };
    if (typeof json.exp !== "number") return false;
    return json.exp * 1000 < Date.now() + 15_000;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refresh || (access && !tokenExpired(access))) return NextResponse.next();

  try {
    const refreshed = await fetch(`${getApiUrl()}/auth/refresh/`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!refreshed.ok) {
      const cleared = NextResponse.next();
      cleared.cookies.delete(ACCESS_COOKIE);
      cleared.cookies.delete(REFRESH_COOKIE);
      return cleared;
    }
    const data = (await refreshed.json()) as { access?: string };
    if (!data.access) return NextResponse.next();
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-bass-access", data.access);
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.set(ACCESS_COOKIE, data.access, accessCookieOptions);
    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};

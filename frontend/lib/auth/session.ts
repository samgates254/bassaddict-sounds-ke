import { cookies, headers } from "next/headers";

import { ACCESS_COOKIE } from "@/lib/auth/cookies";

export async function readAccessToken() {
  const fromMiddleware = (await headers()).get("x-bass-access");
  if (fromMiddleware) return fromMiddleware;
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

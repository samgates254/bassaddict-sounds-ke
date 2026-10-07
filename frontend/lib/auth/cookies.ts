export const ACCESS_COOKIE = "bass_access";
export const REFRESH_COOKIE = "bass_refresh";

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60,
};

export const refreshCookieOptions = {
  ...accessCookieOptions,
  maxAge: 60 * 60 * 24 * 7,
};

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiPost } from "@/lib/api/client";
import { detailFromApi, fieldErrorsFromApi } from "@/lib/api/errors";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieOptions,
  refreshCookieOptions,
} from "@/lib/auth/cookies";
import { safeNextPath, validateLogin, validateRegister } from "@/lib/validation";

export type AuthState = {
  error: string;
  fieldErrors: Record<string, string>;
};

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const nextPath = safeNextPath(String(formData.get("next") || "/account"));
  const fieldErrors = validateLogin(email, password);
  if (Object.keys(fieldErrors).length) return { error: "", fieldErrors };

  const result = await apiPost("/auth/login/", { email, password });
  if (!result.ok || !result.data || typeof result.data !== "object") {
    return {
      error:
        result.status === 0
          ? "The sign-in service is unavailable. Please try again shortly."
          : detailFromApi(result.data, "Unable to sign in right now."),
      fieldErrors: fieldErrorsFromApi(result.data),
    };
  }
  const tokens = result.data as { access?: string; refresh?: string };
  if (!tokens.access || !tokens.refresh) {
    return { error: "The server did not return a session.", fieldErrors: {} };
  }
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, tokens.access, accessCookieOptions);
  jar.set(REFRESH_COOKIE, tokens.refresh, refreshCookieOptions);
  redirect(nextPath);
}

export async function registerAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const input = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    passwordConfirm: String(formData.get("password_confirm") || ""),
    firstName: String(formData.get("first_name") || ""),
    lastName: String(formData.get("last_name") || ""),
    phone: String(formData.get("phone") || ""),
  };
  const fieldErrors = validateRegister(input);
  if (Object.keys(fieldErrors).length) return { error: "", fieldErrors };

  const result = await apiPost("/auth/register/", {
    email: input.email,
    password: input.password,
    password_confirm: input.passwordConfirm,
    first_name: input.firstName,
    last_name: input.lastName,
    phone: input.phone,
  });
  if (!result.ok) {
    return {
      error:
        result.status === 0
          ? "The account service is unavailable. Please try again shortly."
          : detailFromApi(result.data, "Unable to create the account."),
      fieldErrors: fieldErrorsFromApi(result.data),
    };
  }

  redirect("/login?registered=1");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ACCESS_COOKIE);
  jar.delete(REFRESH_COOKIE);
  redirect("/");
}

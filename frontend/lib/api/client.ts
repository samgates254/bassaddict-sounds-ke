import { getApiUrl } from "@/lib/config";
import { readAccessToken } from "@/lib/auth/session";

const API_REQUEST_TIMEOUT_MS = 5_000;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

async function readMessage(response: Response) {
  try {
    const body = await response.json();
    if (body && typeof body === "object" && typeof body.detail === "string") {
      return body.detail;
    }
  } catch {
    /* not JSON */
  }
  if (response.status === 404) return "That page is not available.";
  return "Please check your connection and try again.";
}

export async function apiGet<T>(path: string, auth = false): Promise<ApiResult<T>> {
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (auth) {
      const token = await readAccessToken();
      if (!token) return { ok: false, status: 401, message: "Sign in to continue." };
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${getApiUrl()}${path}`, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      return { ok: false, status: response.status, message: await readMessage(response) };
    }
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return { ok: false, status: 0, message: "Please check your connection and try again." };
  }
}

export async function apiPost(path: string, body: unknown, token?: string | null) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const response = await fetch(`${getApiUrl()}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(API_REQUEST_TIMEOUT_MS),
    });
    const data = await response.json().catch(() => null);
    return { ok: response.ok, status: response.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

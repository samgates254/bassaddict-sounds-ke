export function getApiUrl() {
  const value = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
  return value.replace(/\/$/, "");
}

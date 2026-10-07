export function fieldErrorsFromApi(data: unknown) {
  const errors: Record<string, string> = {};
  if (!data || typeof data !== "object") return errors;
  for (const [key, value] of Object.entries(data)) {
    if (key === "detail") continue;
    if (Array.isArray(value) && value.length > 0) errors[key] = String(value[0]);
    else if (typeof value === "string") errors[key] = value;
  }
  return errors;
}

export function detailFromApi(data: unknown, fallback: string) {
  if (
    data &&
    typeof data === "object" &&
    "detail" in data &&
    typeof data.detail === "string" &&
    data.detail.trim()
  ) {
    if (data.detail.toLowerCase().includes("no active account")) {
      return "Email or password is incorrect.";
    }
    return data.detail;
  }
  return fallback;
}

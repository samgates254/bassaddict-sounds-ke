const STOCK: Record<string, string> = {
  IN_STOCK: "In stock",
  LOW_STOCK: "Low stock",
  OUT_OF_STOCK: "Out of stock",
  ON_ORDER: "On order",
};

const ENQUIRY_TYPE: Record<string, string> = {
  PRODUCT: "Product",
  INSTALLATION: "Installation",
  DELIVERY: "Delivery",
  CUSTOM_BUILD: "Custom build",
  GENERAL: "General",
};

const STATUS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function formatKes(value: string | null | undefined) {
  if (value == null || value === "") return null;
  const amount = Number(value);
  if (!Number.isFinite(amount)) return null;
  const formatted = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `KSh ${formatted}`;
}

export function publicPriceLabel(product: {
  public_price: string | null;
  price_type: string;
}) {
  if (product.public_price) return formatKes(product.public_price) ?? "Ask for price";
  if (product.price_type === "ON_REQUEST") return "Price on request";
  if (product.price_type === "CONTACT") return "Contact for price";
  return "Ask for price";
}

export function stockLabel(status: string) {
  return STOCK[status] ?? status;
}

export function enquiryTypeLabel(value: string) {
  return ENQUIRY_TYPE[value] ?? value;
}

export function statusLabel(value: string) {
  return STATUS[value] ?? value;
}

export function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function displayName(user: { first_name: string; last_name: string; email: string }) {
  const name = `${user.first_name} ${user.last_name}`.trim();
  return name || user.email;
}

export function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

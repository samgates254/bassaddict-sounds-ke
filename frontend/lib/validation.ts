const ENQUIRY_TYPES = new Set([
  "PRODUCT",
  "INSTALLATION",
  "DELIVERY",
  "CUSTOM_BUILD",
  "GENERAL",
]);

export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {};
  if (!email.trim() || !email.includes("@")) errors.email = "Enter a valid email.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateRegister(input: {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}) {
  const errors: Record<string, string> = {};
  if (!input.email.trim() || !input.email.includes("@")) {
    errors.email = "Enter a valid email.";
  }
  if (input.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  }
  if (input.password !== input.passwordConfirm) {
    errors.password_confirm = "Passwords do not match.";
  }
  if (input.phone.length > 20) errors.phone = "Phone is too long.";
  return errors;
}

export function validateEnquiry(input: {
  enquiryType: string;
  message: string;
  quantity: number;
}) {
  const errors: Record<string, string> = {};
  if (!ENQUIRY_TYPES.has(input.enquiryType)) {
    errors.enquiry_type = "Choose an enquiry type.";
  }
  if (!input.message.trim()) errors.message = "Tell the workshop what you need.";
  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    errors.quantity = "Quantity must be at least 1.";
  }
  return errors;
}

export function validateBuild(input: { goal: string; make: string; location: string }) {
  const errors: Record<string, string> = {};
  if (!input.goal.trim()) errors.goal = "Choose what you are looking for.";
  if (!input.make.trim()) errors.make = "Enter the vehicle make.";
  if (!input.location.trim()) errors.location = "Enter your location.";
  return errors;
}

function hasControlCharacter(value: string) {
  for (const char of value) {
    if (char.charCodeAt(0) < 32) return true;
  }
  return false;
}

export function safeNextPath(value: string | null | undefined) {
  if (!value) return "/account";
  let path = value.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    return "/account";
  }
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\") ||
    path.includes("://") ||
    hasControlCharacter(path)
  ) {
    return "/account";
  }
  return path;
}

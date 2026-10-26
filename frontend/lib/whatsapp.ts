export function whatsappDigits(number: string) {
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  return digits;
}

export function whatsappHref(number: string, text: string) {
  return `https://wa.me/${whatsappDigits(number)}?text=${encodeURIComponent(text)}`;
}

export function productEnquiryMessage(productName: string) {
  return [
    "Hello Bassaddict Sounds KE,",
    `I'm interested in the ${productName}.`,
    "Please confirm availability, price and installation options.",
    "Thank you.",
  ].join("\n");
}

export function installationEnquiryMessage(input: {
  service?: string;
  vehicle?: string;
  location?: string;
  message?: string;
}) {
  return [
    "Hello Bassaddict Sounds KE,",
    input.service
      ? `I'd like to enquire about installation: ${input.service}.`
      : "I'd like to enquire about installation.",
    input.vehicle ? `Vehicle: ${input.vehicle}` : "",
    input.location ? `Location: ${input.location}` : "",
    input.message || "",
    "Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function deliveryEnquiryMessage(input: {
  vehicle?: string;
  location?: string;
  message?: string;
}) {
  return [
    "Hello Bassaddict Sounds KE,",
    "I'd like to enquire about delivery.",
    input.vehicle ? `Vehicle: ${input.vehicle}` : "",
    input.location ? `Location: ${input.location}` : "",
    input.message || "",
    "Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function serviceEnquiryMessage(serviceName: string) {
  return [
    "Hello Bassaddict Sounds KE,",
    `I'd like to enquire about ${serviceName}.`,
    "Thank you.",
  ].join("\n");
}

export function enquiryFollowUp(input: {
  enquiryType: string;
  productName?: string;
  vehicle?: string;
  location?: string;
  message?: string;
}) {
  const vehicle = input.vehicle?.trim() || "";
  const location = input.location?.trim() || "";
  const message = input.message?.trim() || "";

  if (input.enquiryType === "PRODUCT") {
    const name = input.productName?.trim() || "this product";
    return [
      "Hello Bassaddict Sounds KE,",
      `I'm interested in the ${name}.`,
      "Please confirm availability, price and installation options.",
      vehicle ? `Vehicle: ${vehicle}` : "",
      location ? `Location: ${location}` : "",
      message,
      "Thank you.",
    ]
      .filter(Boolean)
      .join("\n");
  }
  if (input.enquiryType === "INSTALLATION") {
    return installationEnquiryMessage({ vehicle, location, message });
  }
  if (input.enquiryType === "DELIVERY") {
    return deliveryEnquiryMessage({ vehicle, location, message });
  }
  if (input.enquiryType === "CUSTOM_BUILD") {
    return buildEnquiryMessage({
      vehicle,
      budget: "",
      requirements: message,
      location,
    });
  }
  return [
    "Hello Bassaddict Sounds KE,",
    "I'd like to enquire about your car audio services.",
    message,
    vehicle ? `Vehicle: ${vehicle}` : "",
    location ? `Location: ${location}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildEnquiryMessage(input: {
  vehicle: string;
  budget: string;
  requirements: string;
  location: string;
}) {
  return [
    "Hello Bassaddict Sounds KE,",
    `I'd like to discuss a custom sound system for my ${input.vehicle || "vehicle"}.`,
    `Budget: ${input.budget || "Not specified"}`,
    "What I want:",
    input.requirements || "A custom sound system",
    "Location:",
    input.location || "Not specified",
    "Thank you.",
  ].join("\n");
}

export function generalEnquiryMessage() {
  return [
    "Hello Bassaddict Sounds KE,",
    "I'd like to enquire about your car audio services.",
  ].join("\n");
}


export function cartEnquiryMessage(
  items: { name: string; quantity: number; price?: string | null; slug?: string }[],
  origin = ""
) {
  // Defensively filter valid items with positive quantity
  const validItems = (items || []).filter(
    (item) => item && typeof item.name === "string" && Number(item.quantity) > 0
  );

  if (validItems.length === 0) {
    return generalEnquiryMessage();
  }

  let total = 0;
  let hasPrice = false;

  const lines = [
    "Hello Bassaddict Sounds KE,",
    "I would like to request an equipment quote and check showroom availability for:",
    "",
  ];

  validItems.forEach((item, idx) => {
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const priceNum = item.price ? Number(item.price) : NaN;
    let priceText = "Price on request";
    if (!Number.isNaN(priceNum) && priceNum > 0) {
      priceText = `KSh ${new Intl.NumberFormat("en-KE").format(priceNum)}`;
      total += priceNum * qty;
      hasPrice = true;
    }
    const itemLink = item.slug && origin ? ` (${origin}/products/${item.slug})` : "";
    lines.push(`${idx + 1}. ${qty}x ${item.name} — ${priceText}${itemLink}`);
  });

  lines.push("");
  if (hasPrice) {
    lines.push(`Estimated Total: KSh ${new Intl.NumberFormat("en-KE").format(total)}`);
  }
  lines.push("Please confirm availability, installation options, and collection/delivery in Nairobi.");
  lines.push("(Showroom consultation & quote request; not a prepaid online order).");
  lines.push("Thank you.");

  return lines.join("\n");
}

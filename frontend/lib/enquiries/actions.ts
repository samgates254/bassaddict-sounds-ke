"use server";

import { apiPost } from "@/lib/api/client";
import { detailFromApi, fieldErrorsFromApi } from "@/lib/api/errors";
import type { EnquiryType } from "@/lib/api/types";
import { readAccessToken } from "@/lib/auth/session";
import { buildEnquiryMessage, enquiryFollowUp, whatsappHref } from "@/lib/whatsapp";
import { validateBuild, validateEnquiry } from "@/lib/validation";

export type EnquiryState = {
  error: string;
  fieldErrors: Record<string, string>;
  ok: boolean;
  whatsappUrl: string;
};

const empty: EnquiryState = { error: "", fieldErrors: {}, ok: false, whatsappUrl: "" };

export async function createEnquiryAction(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const token = await readAccessToken();
  if (!token) {
    return {
      ...empty,
      error: "Sign in with your customer account before sending an enquiry.",
    };
  }

  const enquiryType = String(formData.get("enquiry_type") || "") as EnquiryType;
  const product = String(formData.get("product") || "").trim();
  const productName = String(formData.get("product_name") || "").trim();
  const quantity = Number(formData.get("quantity") || 1);
  const vehicle = String(formData.get("vehicle") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const whatsappNumber = String(formData.get("whatsapp_number") || "");

  const fieldErrors = validateEnquiry({
    enquiryType,
    message,
    quantity: Number.isFinite(quantity) ? quantity : 0,
  });
  if (Object.keys(fieldErrors).length) return { ...empty, fieldErrors };

  const payload: Record<string, unknown> = {
    enquiry_type: enquiryType,
    quantity,
    vehicle,
    location,
    message,
  };
  if (product) payload.product = product;

  const result = await apiPost("/enquiries/", payload, token);
  if (!result.ok) {
    return {
      ...empty,
      error: detailFromApi(result.data, "Unable to send the enquiry right now."),
      fieldErrors: fieldErrorsFromApi(result.data),
    };
  }

  const followUp = enquiryFollowUp({
    enquiryType,
    productName: productName || product,
    vehicle,
    location,
    message,
  });

  return {
    error: "",
    fieldErrors: {},
    ok: true,
    whatsappUrl: whatsappNumber ? whatsappHref(whatsappNumber, followUp) : "",
  };
}

export async function createBuildEnquiryAction(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const token = await readAccessToken();
  const whatsappNumber = String(formData.get("whatsapp_number") || "");
  const goal = String(formData.get("goal") || "").trim();
  const make = String(formData.get("make") || "").trim();
  const model = String(formData.get("model") || "").trim();
  const year = String(formData.get("year") || "").trim();
  const budget = String(formData.get("budget") || "").trim();
  const radio = String(formData.get("radio") || "").trim();
  const speakers = String(formData.get("speakers") || "").trim();
  const amplifier = String(formData.get("amplifier") || "").trim();
  const subwoofer = String(formData.get("subwoofer") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const notes = String(formData.get("message") || "").trim();

  const fieldErrors = validateBuild({ goal, make, location });
  if (Object.keys(fieldErrors).length) return { ...empty, fieldErrors };
  if (!token) {
    return {
      ...empty,
      error: "Sign in with your customer account to send this to the workshop.",
    };
  }

  const vehicle = [year, make, model].filter(Boolean).join(" ");
  const requirements = [
    goal,
    radio ? `Radio now: ${radio}` : "",
    speakers ? `Speakers now: ${speakers}` : "",
    amplifier ? `Amplifier now: ${amplifier}` : "",
    subwoofer ? `Subwoofer now: ${subwoofer}` : "",
    notes,
  ]
    .filter(Boolean)
    .join("\n");

  const message = [
    `Looking for: ${goal}`,
    budget ? `Budget: ${budget}` : "Budget: not specified",
    "Current system:",
    `Radio: ${radio || "not specified"}`,
    `Speakers: ${speakers || "not specified"}`,
    `Amplifier: ${amplifier || "not specified"}`,
    `Subwoofer: ${subwoofer || "not specified"}`,
    notes ? `Notes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const result = await apiPost(
    "/enquiries/",
    {
      enquiry_type: "CUSTOM_BUILD",
      quantity: 1,
      vehicle,
      location,
      message,
    },
    token,
  );
  if (!result.ok) {
    return {
      ...empty,
      error: detailFromApi(result.data, "Unable to send the build request right now."),
      fieldErrors: fieldErrorsFromApi(result.data),
    };
  }

  return {
    error: "",
    fieldErrors: {},
    ok: true,
    whatsappUrl: whatsappNumber
      ? whatsappHref(
          whatsappNumber,
          buildEnquiryMessage({ vehicle, budget, requirements, location }),
        )
      : "",
  };
}

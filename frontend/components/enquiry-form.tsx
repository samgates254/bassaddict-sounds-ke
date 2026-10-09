"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { createEnquiryAction, type EnquiryState } from "@/lib/enquiries/actions";
import type { EnquiryType } from "@/lib/api/types";

const initial: EnquiryState = { error: "", fieldErrors: {}, ok: false, whatsappUrl: "" };

const TYPES: { value: EnquiryType; label: string }[] = [
  { value: "PRODUCT", label: "Product" },
  { value: "INSTALLATION", label: "Installation" },
  { value: "DELIVERY", label: "Delivery" },
  { value: "CUSTOM_BUILD", label: "Custom build" },
  { value: "GENERAL", label: "General" },
];

export function EnquiryForm({
  signedIn,
  whatsappNumber,
  productSlug,
  productName,
  lockType,
  nextPath,
}: {
  signedIn: boolean;
  whatsappNumber: string;
  productSlug?: string;
  productName?: string;
  lockType?: EnquiryType;
  nextPath: string;
}) {
  const [state, action, pending] = useActionState(createEnquiryAction, initial);

  if (!signedIn) {
    return (
      <div className="glass-panel p-6 sm:p-9">
        <h2 className="poster font-display text-4xl sm:text-5xl">Request this from the shop</h2>
        <p className="mt-3 text-mute">
          Sign in to send an enquiry. Bassaddict confirms price and installation directly.
          There is no online payment.
        </p>
        <Button className="mt-5" href={`/login?next=${encodeURIComponent(nextPath)}`}>
          Sign in to enquire
        </Button>
      </div>
    );
  }

  if (state.ok) {
    return (
      <div className="glass-panel p-6 sm:p-9">
        <h2 className="poster font-display text-4xl sm:text-5xl">Enquiry sent</h2>
        <p className="mt-3 text-mute">
          The workshop has it as a new enquiry. You can also continue the conversation on
          WhatsApp.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {state.whatsappUrl ? (
            <Button variant="wa" href={state.whatsappUrl}>
              Continue on WhatsApp
            </Button>
          ) : null}
          <Button variant="line" href="/account/enquiries">
            View my enquiries
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="glass-panel grid gap-5 p-6 sm:p-9">
      <h2 className="poster font-display text-4xl sm:text-5xl">
        {productName ? `Request ${productName}` : "New enquiry"}
      </h2>
      {state.error ? (
        <p className="text-sm text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      <input type="hidden" name="whatsapp_number" value={whatsappNumber} />
      {productSlug ? <input type="hidden" name="product" value={productSlug} /> : null}
      {productName ? <input type="hidden" name="product_name" value={productName} /> : null}
      {lockType ? <input type="hidden" name="enquiry_type" value={lockType} /> : null}
      {lockType ? null : (
        <FormField label="Type" error={state.fieldErrors.enquiry_type}>
          <select name="enquiry_type" defaultValue="GENERAL">
            {TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </FormField>
      )}
      {!productSlug && !lockType ? (
        <FormField label="Product slug, if you have one">
          <input name="product" placeholder="optional" />
        </FormField>
      ) : null}
      <FormField label="Quantity" error={state.fieldErrors.quantity}>
        <input
          name="quantity"
          type="number"
          min={1}
          defaultValue={1}
          aria-invalid={state.fieldErrors.quantity ? true : undefined}
        />
      </FormField>
      <FormField label="Vehicle">
        <input name="vehicle" placeholder="Make, model, year" />
      </FormField>
      <FormField label="Location">
        <input name="location" />
      </FormField>
      <FormField label="Message" error={state.fieldErrors.message}>
        <textarea
          name="message"
          required
          aria-invalid={state.fieldErrors.message ? true : undefined}
        />
      </FormField>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending" : "Send enquiry"}
      </Button>
    </form>
  );
}

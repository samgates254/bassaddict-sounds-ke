"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { createBuildEnquiryAction, type EnquiryState } from "@/lib/enquiries/actions";

const initial: EnquiryState = { error: "", fieldErrors: {}, ok: false, whatsappUrl: "" };

const GOALS = [
  "Deep Bass",
  "Loud & Powerful",
  "Clean & Balanced",
  "Full Upgrade",
  "Competition Setup",
];

export function BuildForm({
  signedIn,
  whatsappNumber,
}: {
  signedIn: boolean;
  whatsappNumber: string;
}) {
  const [state, action, pending] = useActionState(createBuildEnquiryAction, initial);

  if (state.ok) {
    return (
      <div>
        <h2 className="poster font-display text-5xl">Request received</h2>
        <p className="mt-3 max-w-xl text-mute">
          This is with Bassaddict as a custom-build enquiry. The shop will follow up.
          You can continue on WhatsApp with the same details.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
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
    <form action={action} className="grid gap-5">
      {!signedIn ? (
        <div className="border-l border-ember pl-4 text-sm">
          <p>
            Sign in before sending. The workshop account is a customer account, and the
            enquiry is stored against you so the reply stays yours.
          </p>
          <Button className="mt-4" href="/login?next=/build">
            Sign in to continue
          </Button>
        </div>
      ) : null}
      {state.error ? (
        <p className="text-sm text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      <input type="hidden" name="whatsapp_number" value={whatsappNumber} />
      <fieldset className="grid gap-3">
        <legend className="label">What are you looking for?</legend>
        {GOALS.map((goal) => (
          <label key={goal} className="flex min-h-12 cursor-pointer items-center gap-3 border-b border-white/10 py-3">
            <input type="radio" name="goal" value={goal} />
            <span>{goal}</span>
          </label>
        ))}
        {state.fieldErrors.goal ? (
          <p className="text-sm text-ember" role="alert">
            {state.fieldErrors.goal}
          </p>
        ) : null}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Make" error={state.fieldErrors.make}>
          <input name="make" required aria-invalid={state.fieldErrors.make ? true : undefined} />
        </FormField>
        <FormField label="Model">
          <input name="model" />
        </FormField>
        <FormField label="Year">
          <input name="year" inputMode="numeric" />
        </FormField>
      </div>
      <FormField label="Budget">
        <input name="budget" placeholder="KSh" />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Radio now">
          <input name="radio" />
        </FormField>
        <FormField label="Speakers now">
          <input name="speakers" />
        </FormField>
        <FormField label="Amplifier now">
          <input name="amplifier" />
        </FormField>
        <FormField label="Subwoofer now">
          <input name="subwoofer" />
        </FormField>
      </div>
      <FormField label="Location" error={state.fieldErrors.location}>
        <input
          name="location"
          required
          aria-invalid={state.fieldErrors.location ? true : undefined}
        />
      </FormField>
      <FormField label="Message">
        <textarea name="message" placeholder="Anything the installer should know." />
      </FormField>
      <Button type="submit" disabled={pending || !signedIn}>
        {pending ? "Sending" : "Send to Bassaddict"}
      </Button>
    </form>
  );
}

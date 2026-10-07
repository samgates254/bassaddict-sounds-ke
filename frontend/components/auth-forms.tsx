"use client";

import { useActionState } from "react";

import { Button } from "@/components/button";
import { FormField } from "@/components/form-field";
import { loginAction, registerAction, type AuthState } from "@/lib/auth/actions";

const initial: AuthState = { error: "", fieldErrors: {} };

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="grid gap-4" noValidate>
      <input type="hidden" name="next" value={nextPath} />
      {state.error ? (
        <p className="text-sm text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      <FormField label="Email" error={state.fieldErrors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={state.fieldErrors.email ? true : undefined}
        />
      </FormField>
      <FormField label="Password" error={state.fieldErrors.password}>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={state.fieldErrors.password ? true : undefined}
        />
      </FormField>
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in" : "Sign in"}
      </Button>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initial);

  return (
    <form action={action} className="grid gap-4" noValidate>
      {state.error ? (
        <p className="text-sm text-ember" role="alert">
          {state.error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="First name">
          <input name="first_name" autoComplete="given-name" />
        </FormField>
        <FormField label="Last name">
          <input name="last_name" autoComplete="family-name" />
        </FormField>
      </div>
      <FormField label="Email" error={state.fieldErrors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={state.fieldErrors.email ? true : undefined}
        />
      </FormField>
      <FormField label="Phone" error={state.fieldErrors.phone}>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={state.fieldErrors.phone ? true : undefined}
        />
      </FormField>
      <FormField label="Password" error={state.fieldErrors.password}>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={state.fieldErrors.password ? true : undefined}
        />
      </FormField>
      <FormField label="Confirm password" error={state.fieldErrors.password_confirm}>
        <input
          name="password_confirm"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={state.fieldErrors.password_confirm ? true : undefined}
        />
      </FormField>
      <p className="text-sm text-mute">
        This creates a customer account. Owner and developer access is not available here.
      </p>
      <Button type="submit" disabled={pending}>
        {pending ? "Creating account" : "Create account"}
      </Button>
    </form>
  );
}

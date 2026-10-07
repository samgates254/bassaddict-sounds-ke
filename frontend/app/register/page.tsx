import Link from "next/link";

import { RegisterForm } from "@/components/auth-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Register",
  path: "/register",
  description: "Create a Bassaddict Sounds KE customer account. Owner access is not available here.",
  index: false,
});

export default function RegisterPage() {
  return (
    <div className="site max-w-lg py-12">
      <div className="border border-line bg-panel p-6 sm:p-8">
        <p className="label">Customer account</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide">Register</h1>
        <p className="mt-3 text-mute">
          Create a customer login so private prices and enquiries stay on your account.
        </p>
        <div className="mt-8">
          <RegisterForm />
        </div>
        <p className="mt-6 text-sm text-mute">
          Already registered?{" "}
          <Link className="text-paper underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

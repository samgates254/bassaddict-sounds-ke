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
    <div className="site grid items-end gap-14 py-16 md:grid-cols-12 md:py-28">
      <div className="md:col-span-5">
        <p className="label">Customer account</p>
        <h1 className="poster mt-4 font-display text-6xl sm:text-8xl">Register.</h1>
        <p className="mt-6 max-w-sm text-mute">
          A customer login. Private prices and enquiries stay on your account. Owner access is not created here.
        </p>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <RegisterForm />
        <p className="mt-8 text-sm text-mute">
          Already registered?{" "}
          <Link className="text-paper underline decoration-white/30 underline-offset-4" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

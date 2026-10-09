import Link from "next/link";

import { LoginForm } from "@/components/auth-forms";
import { pageMetadata } from "@/lib/seo";
import { safeNextPath } from "@/lib/validation";

export const metadata = pageMetadata({
  title: "Sign in",
  path: "/login",
  description: "Sign in to your Bassaddict Sounds KE customer account.",
  index: false,
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const nextValue = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath = safeNextPath(nextValue);
  const registeredValue = Array.isArray(params.registered) ? params.registered[0] : params.registered;

  return (
    <div className="site grid items-end gap-14 py-16 md:grid-cols-12 md:py-28">
      <div className="md:col-span-5">
        <p className="label">Customer account</p>
        <h1 className="poster mt-4 font-display text-6xl sm:text-8xl">Sign in.</h1>
        <p className="mt-6 max-w-xs text-mute">Use the email and password for your Bassaddict account.</p>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <LoginForm nextPath={nextPath} registered={registeredValue === "1"} />
        <p className="mt-8 text-sm text-mute">
          No account yet?{" "}
          <Link className="text-paper underline decoration-white/30 underline-offset-4" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

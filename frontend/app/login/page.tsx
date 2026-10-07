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

  return (
    <div className="site max-w-md py-12">
      <div className="border border-line bg-panel p-6 sm:p-8">
        <p className="label">Customer account</p>
        <h1 className="mt-2 font-display text-5xl tracking-wide">Sign in</h1>
        <p className="mt-3 text-mute">Use the email and password for your Bassaddict account.</p>
        <div className="mt-8">
          <LoginForm nextPath={nextPath} />
        </div>
        <p className="mt-6 text-sm text-mute">
          No account yet?{" "}
          <Link className="text-paper underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

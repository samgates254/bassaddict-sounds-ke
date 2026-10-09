import { redirect } from "next/navigation";

import { AccountNav } from "@/components/account-nav";
import { getMe } from "@/lib/api/auth";
import { logoutAction } from "@/lib/auth/actions";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me.ok) redirect("/login?next=/account");

  return (
    <div className="site py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 max-w-full">
          <p className="label">Account</p>
          <p className="mt-3 break-words font-display text-3xl font-medium tracking-tight sm:text-4xl">{me.data.email}</p>
        </div>
        <form action={logoutAction}>
          <button className="btn btn-line min-h-10 px-5 py-2 text-[0.62rem]" type="submit">
            Log out
          </button>
        </form>
      </div>
      <AccountNav />
      <div className="glass-panel mt-8 p-5 sm:mt-10 sm:p-8 lg:p-10">{children}</div>
    </div>
  );
}

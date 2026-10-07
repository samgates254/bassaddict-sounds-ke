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
          <button className="text-[0.68rem] uppercase tracking-[0.18em] text-steel hover:text-paper" type="submit">
            Log out
          </button>
        </form>
      </div>
      <AccountNav />
      <div className="mt-12">{children}</div>
    </div>
  );
}

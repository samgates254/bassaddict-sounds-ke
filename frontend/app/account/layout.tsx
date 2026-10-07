import Link from "next/link";
import { redirect } from "next/navigation";

import { getMe } from "@/lib/api/auth";
import { logoutAction } from "@/lib/auth/actions";

export const metadata = {
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/prices", label: "My prices" },
  { href: "/account/enquiries", label: "My enquiries" },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const me = await getMe();
  if (!me.ok) redirect("/login?next=/account");

  return (
    <div className="site py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Account</p>
          <p className="mt-1 text-mute">{me.data.email}</p>
        </div>
        <form action={logoutAction}>
          <button className="btn btn-line" type="submit">
            Log out
          </button>
        </form>
      </div>
      <nav className="mt-6 flex gap-2 overflow-x-auto border-b border-line pb-3" aria-label="Account">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="btn btn-line shrink-0">
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}

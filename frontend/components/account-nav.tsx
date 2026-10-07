"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/prices", label: "My prices" },
  { href: "/account/enquiries", label: "My enquiries" },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-10 flex gap-7 overflow-x-auto border-b border-white/10" aria-label="Account">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 border-b-2 pb-3 text-sm ${
              active ? "border-ember text-paper" : "border-transparent text-mute hover:text-paper"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

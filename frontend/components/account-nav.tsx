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
    <nav className="mt-10 flex gap-2 overflow-x-auto rounded-full border border-[#A8FF00]/15 bg-black/40 p-1.5 backdrop-blur-xl" aria-label="Account">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm transition ${
              active ? "bg-white/10 text-paper shadow-inner shadow-white/5" : "text-mute hover:bg-white/[0.05] hover:text-paper"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

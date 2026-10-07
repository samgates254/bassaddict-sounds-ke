import Link from "next/link";
import type { ReactNode } from "react";

import { NAV } from "@/lib/brand";

export function Navigation({
  ariaLabel = "Primary",
  className = "",
  linkClassName = "",
  children,
}: {
  ariaLabel?: string;
  className?: string;
  linkClassName?: string;
  children?: ReactNode;
}) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {NAV.map((item) => (
        <Link key={item.href} href={item.href} className={linkClassName}>
          {item.label}
        </Link>
      ))}
      {children}
    </nav>
  );
}

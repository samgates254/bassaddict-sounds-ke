"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { NAV } from "@/lib/brand";

export function Navigation({
  ariaLabel = "Primary",
  className = "",
  linkClassName = "",
  activeClassName = "text-paper",
  children,
}: {
  ariaLabel?: string;
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  children?: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label={ariaLabel}>
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={active ? `${linkClassName} ${activeClassName}` : linkClassName}
          >
            {item.label}
          </Link>
        );
      })}
      {children}
    </nav>
  );
}

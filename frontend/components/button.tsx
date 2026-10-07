import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  ember: "btn btn-ember",
  line: "btn btn-line",
  wa: "btn btn-wa",
} as const;

export function Button({
  variant = "ember",
  href,
  className = "",
  children,
  type = "button",
  disabled,
  onClick,
}: {
  variant?: keyof typeof variants;
  href?: string;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classNames = className ? `${variants[variant]} ${className}` : variants[variant];
  if (href) {
    if (/^https?:\/\//.test(href)) {
      return (
        <a className={classNames} href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link className={classNames} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classNames} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

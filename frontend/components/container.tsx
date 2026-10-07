import type { ReactNode } from "react";

const tags = {
  div: "div",
  section: "section",
  header: "header",
  footer: "footer",
} as const;

export function Container({
  as = "div",
  className = "",
  children,
}: {
  as?: keyof typeof tags;
  className?: string;
  children: ReactNode;
}) {
  const Tag = tags[as];
  return <Tag className={className ? `site ${className}` : "site"}>{children}</Tag>;
}

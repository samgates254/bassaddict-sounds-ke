import type { ReactNode } from "react";

export function EmptyState({
  title,
  children,
  heading = "h2",
}: {
  title: string;
  children?: ReactNode;
  heading?: "h1" | "h2";
}) {
  const Heading = heading;
  return (
    <div className="max-w-xl border-l border-white/15 pl-6 py-2">
      <Heading className="font-display text-3xl font-medium tracking-tight">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl text-mute">{children}</div> : null}
    </div>
  );
}

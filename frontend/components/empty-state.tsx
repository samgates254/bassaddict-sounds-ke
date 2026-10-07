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
    <div className="border border-line bg-panel px-5 py-8">
      <Heading className="font-display text-3xl tracking-wide">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl text-mute">{children}</div> : null}
    </div>
  );
}

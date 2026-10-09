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
    <div className="glass-panel max-w-2xl px-7 py-8 sm:px-9 sm:py-10">
      <span aria-hidden="true" className="mb-6 block h-px w-12 bg-gradient-to-r from-[#8CFF00] to-[#d5ff8f]" />
      <Heading className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl leading-7 text-mute">{children}</div> : null}
    </div>
  );
}

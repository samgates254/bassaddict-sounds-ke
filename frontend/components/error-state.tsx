import type { ReactNode } from "react";

import { Button } from "@/components/button";

export function ErrorState({
  title,
  children,
  onRetry,
  heading = "h2",
}: {
  title: string;
  children?: ReactNode;
  onRetry?: () => void;
  heading?: "h1" | "h2";
}) {
  const Heading = heading;
  return (
    <div className="max-w-2xl rounded-[24px] border border-[#A8FF00]/15 bg-black/40 px-7 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl" role="alert">
      <span aria-hidden="true" className="mb-6 block h-px w-12 bg-gradient-to-r from-[#8CFF00] to-[#d5ff8f]" />
      <Heading className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl leading-7 text-mute">{children}</div> : null}
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

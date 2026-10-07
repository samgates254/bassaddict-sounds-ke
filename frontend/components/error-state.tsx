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
    <div className="max-w-xl border-l border-ember pl-6 py-2" role="alert">
      <Heading className="font-display text-3xl font-medium tracking-tight">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl text-mute">{children}</div> : null}
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

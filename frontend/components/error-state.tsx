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
    <div className="border border-line bg-panel px-5 py-8" role="alert">
      <Heading className="font-display text-3xl tracking-wide">{title}</Heading>
      {children ? <div className="mt-3 max-w-xl text-mute">{children}</div> : null}
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}

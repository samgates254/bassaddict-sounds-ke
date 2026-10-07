"use client";

import { Container } from "@/components/container";
import { ErrorState } from "@/components/error-state";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-16">
      <ErrorState title="Unable to open this page." heading="h1" onRetry={reset}>
        <p>Please check your connection and try again.</p>
      </ErrorState>
    </Container>
  );
}

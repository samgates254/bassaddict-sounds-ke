import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <Container className="py-16">
      <EmptyState title="That page is not on the floor." heading="h1">
        <p>The link may be old, or the product is no longer listed.</p>
        <Button className="mt-6" href="/products">
          Browse products
        </Button>
      </EmptyState>
    </Container>
  );
}

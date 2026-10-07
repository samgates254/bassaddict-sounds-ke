import { Container } from "@/components/container";
import { LoadingState } from "@/components/loading-state";

export default function Loading() {
  return (
    <Container className="py-16">
      <LoadingState />
    </Container>
  );
}

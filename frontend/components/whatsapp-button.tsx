import type { ReactNode } from "react";

import { Button } from "@/components/button";
import { whatsappHref } from "@/lib/whatsapp";

export function WhatsAppButton({
  number,
  message,
  children,
  className,
}: {
  number: string;
  message: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button variant="wa" href={whatsappHref(number, message)} className={className}>
      {children}
    </Button>
  );
}

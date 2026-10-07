import Link from "next/link";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Mark } from "@/components/mark";
import { Navigation } from "@/components/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { BusinessSettings } from "@/lib/api/types";
import { telHref } from "@/lib/format";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function Header({ business }: { business: BusinessSettings }) {
  return (
    <header className="border-b border-line bg-ink">
      <div className="border-b border-line/80">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs text-mute">
          <p className="min-w-0">Ground floor workshop · Luthuli Avenue, Nairobi</p>
          <a className="hover:text-paper" href={telHref(business.phone)}>
            {business.phone}
          </a>
        </Container>
      </div>
      <Container className="flex items-center justify-between gap-3 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Mark />
          <span className="min-w-0 font-display text-base leading-none tracking-[0.08em] sm:text-lg sm:tracking-[0.12em]">
            BASSADDICT
            <span className="mt-1 block text-[0.65rem] tracking-[0.18em] text-steel sm:tracking-[0.22em]">
              SOUNDS KE
            </span>
          </span>
        </Link>
        <Navigation
          ariaLabel="Primary"
          className="hidden items-center gap-5 text-sm text-mute lg:flex"
          linkClassName="hover:text-paper"
        />
        <div className="flex items-center gap-2">
          <Button href="/account" variant="line" className="hidden sm:inline-flex">
            Account
          </Button>
          <WhatsAppButton number={business.whatsapp_number} message={generalEnquiryMessage()}>
            WhatsApp
          </WhatsAppButton>
        </div>
      </Container>
      <details className="border-t border-line lg:hidden">
        <summary className="site cursor-pointer list-none py-3 text-sm uppercase tracking-[0.14em] text-steel">
          Menu
        </summary>
        <Navigation
          ariaLabel="Mobile"
          className="site grid gap-1 pb-4"
          linkClassName="py-2 text-paper"
        >
          <Link href="/account" className="py-2 text-paper">
            Account
          </Link>
          <Link href="/login" className="py-2 text-paper">
            Sign in
          </Link>
        </Navigation>
      </details>
    </header>
  );
}

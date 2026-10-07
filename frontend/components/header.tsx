import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

import { Mark } from "@/components/mark";
import { Navigation } from "@/components/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { BusinessSettings } from "@/lib/api/types";
import { telHref } from "@/lib/format";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function Header({ business }: { business: BusinessSettings }) {
  return (
    <header className="sticky top-0 z-40 bg-ink/88 backdrop-blur-md">
      <div className="site flex items-center justify-between gap-6 py-3.5">
        <Link href="/" className="shrink-0 py-0.5">
          <Mark className="h-10 w-auto sm:h-12" priority />
        </Link>
        <Navigation
          ariaLabel="Primary"
          className="hidden items-center gap-5 text-[0.66rem] font-medium uppercase tracking-[0.14em] text-steel xl:gap-6 lg:flex"
          linkClassName="border-b border-transparent pb-1 transition-colors hover:text-paper"
          activeClassName="border-ember text-paper"
        />
        <div className="flex shrink-0 items-center gap-4">
          <Link href="/account" className="hidden text-[0.66rem] uppercase tracking-[0.16em] text-steel hover:text-paper sm:inline">
            Account
          </Link>
          <WhatsAppButton
            className="!min-h-10 !px-3"
            number={business.whatsapp_number}
            message={generalEnquiryMessage()}
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
          </WhatsAppButton>
        </div>
      </div>
      <details className="border-t border-white/5 lg:hidden">
        <summary className="site flex min-h-12 cursor-pointer items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">
          Menu
          <Menu aria-hidden="true" className="size-5" />
        </summary>
        <Navigation
          ariaLabel="Mobile"
          className="site grid gap-1 pb-8 pt-3"
          linkClassName="block py-2 font-display text-4xl font-medium tracking-tight text-paper"
          activeClassName="text-ember"
        >
          <Link href="/account" className="block py-2 font-display text-4xl font-medium tracking-tight text-paper">
            Account
          </Link>
          <a className="block py-2 text-sm tracking-[0.14em] text-steel" href={telHref(business.phone)}>
            {business.phone}
          </a>
        </Navigation>
      </details>
    </header>
  );
}

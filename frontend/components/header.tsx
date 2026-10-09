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
    <header className="sticky top-0 z-40 border-b border-[#A8FF00]/15 bg-[#070A07]/80 shadow-[0_10px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
      <div className="site flex min-h-20 items-center justify-between gap-6 py-3">
        <Link href="/" className="shrink-0 py-0.5">
          <Mark className="h-10 w-auto sm:h-12" priority />
        </Link>
        <Navigation
          ariaLabel="Primary"
          className="hidden items-center gap-2 text-[0.68rem] font-medium text-steel xl:gap-3 lg:flex"
          linkClassName="relative rounded-full px-4 py-2.5 transition-colors hover:bg-[#A8FF00]/10 hover:text-[#c2ff52]"
          activeClassName="bg-[#A8FF00]/10 text-[#c2ff52]"
        />
        <div className="flex shrink-0 items-center gap-4">
          <Link href="/account" className="hidden rounded-full px-3 py-2 text-[0.64rem] uppercase tracking-[0.16em] text-steel transition hover:bg-[#A8FF00]/10 hover:text-[#c2ff52] sm:inline">
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
      <details className="border-t border-[#A8FF00]/15 lg:hidden">
        <summary className="site flex min-h-12 cursor-pointer items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-steel">
          Menu
          <Menu aria-hidden="true" className="size-5" />
        </summary>
        <Navigation
          ariaLabel="Mobile"
          className="site grid gap-1 rounded-b-[24px] border-x border-b border-[#A8FF00]/15 bg-black/40 px-6 pb-8 pt-3 backdrop-blur-2xl"
          linkClassName="block rounded-2xl px-4 py-2 font-display text-3xl font-medium tracking-tight text-paper transition hover:bg-[#A8FF00]/10 hover:text-[#c2ff52]"
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

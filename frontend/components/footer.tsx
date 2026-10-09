import { Container } from "@/components/container";
import { DeveloperCredit } from "@/components/developer-credit";
import { Mark } from "@/components/mark";
import { Navigation } from "@/components/navigation";
import type { BusinessSettings } from "@/lib/api/types";
import { telHref } from "@/lib/format";
import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";

export function Footer({ business }: { business: BusinessSettings }) {
  const whatsapp = whatsappHref(business.whatsapp_number, generalEnquiryMessage());

  return (
    <footer className="relative z-0 mt-8 overflow-hidden border-t border-[#A8FF00]/15 bg-[#070A07]/80 backdrop-blur-xl">
      <div aria-hidden="true" className="absolute -bottom-64 right-[-12rem] size-[34rem] rounded-full bg-[#A8FF00]/[0.05] blur-[120px]" />
      <Container className="grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-6">
          <Mark className="h-16 w-auto sm:h-20" />
          <p className="mt-4 max-w-xs text-xs font-medium uppercase tracking-[0.22em] text-ember">{business.tagline}</p>
          <p className="mt-8 max-w-sm text-sm leading-7 text-mute">{business.address}</p>
        </div>
        <div className="md:col-span-3">
          <p className="label">Visit</p>
          <Navigation
            ariaLabel="Footer"
            className="mt-5 grid gap-2 text-sm text-mute"
            linkClassName="hover:text-paper"
            activeClassName="text-paper"
          />
        </div>
        <div className="md:col-span-3">
          <p className="label">Talk</p>
          <ul className="mt-5 grid gap-2 text-sm">
            <li>
              <a className="hover:text-ember" href={telHref(business.phone)}>
                {business.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-ember" href={whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a className="break-all hover:text-ember" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="relative border-t border-[#A8FF00]/15">
        <Container className="py-5 text-xs text-mute">
          <DeveloperCredit />
        </Container>
      </div>
    </footer>
  );
}

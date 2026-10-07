import { Container } from "@/components/container";
import { DeveloperCredit } from "@/components/developer-credit";
import { Navigation } from "@/components/navigation";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { BusinessSettings } from "@/lib/api/types";
import { telHref } from "@/lib/format";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export function Footer({ business }: { business: BusinessSettings }) {
  return (
    <footer className="mt-20 border-t border-line bg-panel">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl tracking-[0.12em]">BASSADDICT SOUNDS KE</p>
          <p className="mt-2 text-sm tracking-[0.16em] text-steel">{business.tagline}</p>
          <p className="mt-4 max-w-sm break-words text-sm text-mute">{business.address}</p>
        </div>
        <div>
          <p className="label">Visit</p>
          <Navigation
            ariaLabel="Footer"
            className="mt-3 grid gap-2 text-sm"
            linkClassName="text-mute hover:text-paper"
          />
        </div>
        <div>
          <p className="label">Shop</p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <a className="hover:text-ember" href={telHref(business.phone)}>
                {business.phone}
              </a>
            </li>
            <li>
              <WhatsAppButton
                number={business.whatsapp_number}
                message={generalEnquiryMessage()}
              >
                WhatsApp
              </WhatsAppButton>
            </li>
            <li>
              <a className="break-all hover:text-ember" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="py-4 text-xs text-mute">
          <DeveloperCredit />
        </Container>
      </div>
    </footer>
  );
}

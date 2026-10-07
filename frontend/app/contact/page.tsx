import { ArrowUpRight } from "lucide-react";

import { getBusiness } from "@/lib/api/business";
import { telHref } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Call, WhatsApp, or email Bassaddict Sounds KE. Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi.",
});

export default async function ContactPage() {
  const { business } = await getBusiness();
  const whatsapp = whatsappHref(business.whatsapp_number, generalEnquiryMessage());
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

  const actions = [
    { kicker: "Call", title: business.phone, href: telHref(business.phone), external: false },
    { kicker: "WhatsApp", title: business.whatsapp_number, href: whatsapp, external: true },
    { kicker: "Email", title: business.email, href: `mailto:${business.email}`, external: false },
    { kicker: "Directions", title: "Luthuli Avenue", href: maps, external: true },
  ];

  return (
    <div className="site grid gap-16 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-5">
        <p className="label">Nairobi</p>
        <h1 className="poster mt-4 font-display text-6xl sm:text-7xl">Come in. Or call.</h1>
        <address className="mt-10 not-italic">
          <p className="font-display text-2xl font-medium tracking-tight">Ground Floor, New Loitoktok House</p>
          <p className="mt-2 text-mute">Luthuli Avenue</p>
          <p className="text-mute">Nairobi, Kenya</p>
          <p className="mt-6 max-w-xs text-sm leading-6 text-steel">{business.address}</p>
        </address>
        <p className="mt-8 max-w-xs text-sm text-mute">
          Ask about a product, an install, or a custom system. There is no checkout on this site. Opening hours are not listed here.
        </p>
      </div>
      <ul className="md:col-span-7">
        {actions.map((action) => (
          <li key={action.kicker} className="border-t border-white/10">
            <a
              className="group grid grid-cols-[1fr_auto] items-end gap-4 py-7"
              href={action.href}
              {...(action.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="min-w-0">
                <span className="label">{action.kicker}</span>
                <span className="mt-2 block break-all font-display text-3xl font-medium leading-none tracking-tight sm:text-4xl">
                  {action.title}
                </span>
              </span>
              <ArrowUpRight aria-hidden="true" className="mb-2 size-6 text-steel transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

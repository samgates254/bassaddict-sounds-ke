import { WhatsAppButton } from "@/components/whatsapp-button";
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

  return (
    <div className="site py-10">
      <p className="label">Nairobi</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">{business.business_name}</h1>
      <p className="mt-3 max-w-xl text-mute">
        Ask about a product, an install, or a custom system. There is no checkout on
        this site.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <address className="border border-line bg-panel p-6 not-italic">
          <p className="font-display text-3xl leading-tight tracking-wide">
            Ground Floor, New Loitoktok House
          </p>
          <p className="mt-2 text-mute">Luthuli Avenue</p>
          <p className="text-mute">Nairobi, Kenya</p>
          <dl className="mt-6 grid gap-3 text-sm">
            <div>
              <dt className="label">Phone</dt>
              <dd className="mt-1">
                <a className="hover:text-ember" href={telHref(business.phone)}>
                  {business.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">WhatsApp</dt>
              <dd className="mt-1">
                <a className="hover:text-ember" href={whatsapp} target="_blank" rel="noreferrer">
                  {business.whatsapp_number}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label">Email</dt>
              <dd className="mt-1 break-all">
                <a className="hover:text-ember" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-steel">{business.address}</p>
        </address>
        <div className="grid content-start gap-3">
          <a className="btn btn-line justify-start" href={telHref(business.phone)}>
            Call {business.phone}
          </a>
          <WhatsAppButton
            className="justify-start"
            number={business.whatsapp_number}
            message={generalEnquiryMessage()}
          >
            WhatsApp
          </WhatsAppButton>
          <a className="btn btn-line justify-start break-all" href={`mailto:${business.email}`}>
            {business.email}
          </a>
          <a className="btn btn-line justify-start" href={maps} target="_blank" rel="noreferrer">
            Directions
          </a>
          <p className="text-sm text-mute">
            Directions open a map search for the published address. Opening hours are
            not listed here.
          </p>
        </div>
      </div>
    </div>
  );
}

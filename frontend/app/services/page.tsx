import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getServices } from "@/lib/api/services";
import { pageMetadata } from "@/lib/seo";
import { serviceEnquiryMessage } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Services",
  path: "/services",
  description:
    "Car audio installation and workshop services published by Bassaddict Sounds KE. Enquire before booking a car in.",
});

export default async function ServicesPage() {
  const [services, businessResult] = await Promise.all([getServices(), getBusiness()]);
  const ordered = services.ok
    ? [...services.data].sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.sort_order - b.sort_order,
      )
    : [];

  return (
    <div className="site py-10">
      <p className="label">Workshop</p>
      <h1 className="mt-2 font-display text-5xl tracking-wide">Services</h1>
      <p className="mt-3 max-w-2xl text-mute">
        Work the shop is offering now. This is an enquiry, not a booking checkout.
        Ask before you bring the car in.
      </p>
      <div className="mt-8">
        {!services.ok ? (
          <ErrorState title="Unable to load services right now.">
            <p>Please check your connection and try again.</p>
          </ErrorState>
        ) : ordered.length === 0 ? (
          <EmptyState title="No services are published yet.">
            <p>
              The owner adds them in Django Admin. Until then, this page does not invent
              a price list or a booking menu. You can still ask the workshop directly.
            </p>
          </EmptyState>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {ordered.map((service) => (
              <li key={service.slug} className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="font-display text-3xl tracking-wide">{service.name}</h2>
                    {service.featured ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.14em]">Featured</p>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-2xl break-words text-mute">
                    {service.description || "Ask the workshop what this includes."}
                  </p>
                </div>
                <WhatsAppButton
                  className="shrink-0"
                  number={businessResult.business.whatsapp_number}
                  message={serviceEnquiryMessage(service.name)}
                >
                  Ask on WhatsApp
                </WhatsAppButton>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/build">Build my sound system</Button>
        <Button variant="line" href="/contact">
          Contact
        </Button>
      </div>
    </div>
  );
}

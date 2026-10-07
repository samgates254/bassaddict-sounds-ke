import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { getBusiness } from "@/lib/api/business";
import { getServices } from "@/lib/api/services";
import { pageMetadata } from "@/lib/seo";
import { serviceEnquiryMessage, whatsappHref } from "@/lib/whatsapp";

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
    <div>
      <div className="site grid items-end gap-8 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-8">
          <p className="label">Craft</p>
          <h1 className="poster mt-4 font-display text-6xl sm:text-8xl">Services</h1>
        </div>
        <p className="max-w-sm text-lg text-mute md:col-span-4">
          Work the shop is offering now. An enquiry, not a booking. Ask before the car comes in.
        </p>
      </div>
      <div className="relative h-[46vw] min-h-[16rem] max-h-[28rem]">
        <Image
          src="/images/gallery/kuerl-panel.jpg"
          alt="Panel reads REMOTE, LOW LEVEL, HIGH LEVEL, POWER, and FUSE."
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
      </div>
      <div className="site py-16 md:py-24">
        {!services.ok ? (
          <ErrorState title="Unable to load services right now.">
            <p>Please check your connection and try again.</p>
          </ErrorState>
        ) : ordered.length === 0 ? (
          <EmptyState title="No services are published yet.">
            <p>
              The owner adds them in Django Admin. Until then, this page does not invent a menu. You can still ask the workshop directly.
            </p>
          </EmptyState>
        ) : (
          <ol>
            {ordered.map((service, index) => (
              <li key={service.slug} className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:items-start">
                <p className="font-display text-sm text-ember md:col-span-2">{String(index + 1).padStart(2, "0")}</p>
                <div className="min-w-0 md:col-span-7">
                  <h2 className="font-display text-3xl font-medium tracking-tight sm:text-5xl">{service.name}</h2>
                  {service.featured ? <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-paper">Featured</p> : null}
                  <p className="mt-4 max-w-xl text-mute">{service.description || "Ask the workshop what this includes."}</p>
                </div>
                <a
                  className="group inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-paper md:col-span-3 md:justify-end"
                  href={whatsappHref(businessResult.business.whatsapp_number, serviceEnquiryMessage(service.name))}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask on WhatsApp
                  <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-14 flex flex-wrap gap-3">
          <Button href="/build">Build my sound system</Button>
          <Button variant="line" href="/contact">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}

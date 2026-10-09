import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { TiltCard } from "@/components/tilt-card";
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
      <div className="relative mx-auto h-[46vw] min-h-[16rem] max-h-[28rem] w-[calc(100%-1.5rem)] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:w-[calc(100%-2rem)]">
        <Image
          src="/images/gallery/kuerl-panel.jpg"
          alt="Panel reads REMOTE, LOW LEVEL, HIGH LEVEL, POWER, and FUSE."
          fill
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#070A07]/65 via-transparent to-[#A8FF00]/10" />
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
          <ol className="grid gap-3">
            {ordered.map((service, index) => (
              <TiltCard as="li" key={service.slug} className="glass-panel glass-panel-hover grid gap-5 p-6 md:grid-cols-12 md:items-start md:p-8">
                <p className="font-display text-sm text-[#A8FF00] md:col-span-1">{String(index + 1).padStart(2, "0")}</p>
                <div className="min-w-0 md:col-span-7">
                  <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{service.name}</h2>
                  {service.featured ? <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-[#A8FF00]">Featured</p> : null}
                  <p className="mt-4 max-w-xl leading-7 text-mute">{service.description || "Ask the workshop what this includes."}</p>
                </div>
                <a
                  className="group inline-flex items-center gap-2 self-end text-[0.68rem] uppercase tracking-[0.16em] text-white/80 transition hover:text-white md:col-span-4 md:justify-end"
                  href={whatsappHref(businessResult.business.whatsapp_number, serviceEnquiryMessage(service.name))}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask on WhatsApp
                  <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
                </a>
              </TiltCard>
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

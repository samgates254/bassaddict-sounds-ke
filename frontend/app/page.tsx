import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";
import { pageMetadata } from "@/lib/seo";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Bassaddict Sounds KE | Premium Car Audio & Professional Installations",
  absoluteTitle: true,
  path: "/",
  description:
    "Premium car audio systems and professional installations. Speakers, amplifiers, subwoofers, and installs from Bassaddict Sounds KE on Luthuli Avenue, Nairobi.",
});

export default async function HomePage() {
  const [products, services, businessResult] = await Promise.all([
    getProducts(),
    getServices(),
    getBusiness(),
  ]);
  const business = businessResult.business;
  const featured = products.ok ? products.data.filter((item) => item.featured).slice(0, 3) : [];
  const shown = featured.length ? featured : products.ok ? products.data.slice(0, 3) : [];

  return (
    <div>
      <section className="grid lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-12">
        <div className="relative order-1 min-h-[78vw] sm:min-h-[32rem] lg:order-2 lg:col-span-7 lg:min-h-0">
          <Image
            src="/images/gallery/pioneer-champion-pro.jpg"
            alt="Pioneer Champion series PRO subwoofer. The dust cap reads Pioneer Champion series PRO."
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-[50%_38%] lg:object-[50%_46%]"
          />
        </div>
        <div className="order-2 flex flex-col justify-end px-5 py-14 sm:px-8 lg:order-1 lg:col-span-5 lg:py-20 lg:pl-[max(1rem,calc((100vw-1240px)/2))] lg:pr-12">
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-steel">BASSADDICT SOUNDS KE</p>
          <h1 className="poster mt-6 font-display text-[clamp(3.4rem,7.6vw,6.6rem)]">
            ADDICTED
            <br />
            TO BASS.
            <span className="mt-3 block text-ember">
              DRIVEN
              <br />
              BY SOUND.
            </span>
          </h1>
          <p className="mt-8 max-w-xs text-lg leading-8 text-paper">
            Premium car audio systems & professional installations.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/products">
              Explore products
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
            <Button variant="line" href="/build">
              Build my sound system
            </Button>
          </div>
          <p className="mt-12 text-[0.68rem] uppercase tracking-[0.2em] text-steel">
            Luthuli Avenue · Nairobi
          </p>
        </div>
      </section>

      <section className="site grid gap-16 py-24 md:grid-cols-12 md:py-32">
        <p className="label md:col-span-3">The work</p>
        <div className="md:col-span-8 md:col-start-5">
          <ol className="grid gap-12">
            <li>
              <p className="font-display text-sm text-ember">01</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-5xl">
                Equipment chosen for the system, not the shelf.
              </h2>
            </li>
            <li>
              <p className="font-display text-sm text-ember">02</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-5xl">
                Tell us the car. We plan the install with you.
              </h2>
            </li>
            <li>
              <p className="font-display text-sm text-ember">03</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl font-medium tracking-tight sm:text-5xl">
                A public price. An enquiry. No checkout.
              </h2>
            </li>
          </ol>
        </div>
      </section>

      <section className="site pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="label">Selected equipment</p>
            <h2 className="poster mt-4 font-display text-5xl sm:text-7xl">The showroom</h2>
          </div>
          <Link href="/products" className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-steel hover:text-paper sm:flex">
            All products
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="mt-14">
          {!products.ok ? (
            <ErrorState title="Unable to load products right now.">
              <p>Please check your connection and try again.</p>
            </ErrorState>
          ) : shown.length === 0 ? (
            <EmptyState title="Nothing is on the floor yet.">
              <p>Active products appear here once the shop publishes them. Prices are never invented on this page.</p>
            </EmptyState>
          ) : (
            <div className="grid items-start gap-x-10 gap-y-16 lg:grid-cols-12">
              {shown.map((product, index) => (
                <div key={product.slug} className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
                  <ProductCard product={product} large={index === 0} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="relative h-[70vw] min-h-[22rem] max-h-[46rem]">
          <Image
            src="/images/gallery/pioneer-ts-w30040d4.jpg"
            alt="Magnet label reads TS-W30040D4, Champion series PRO, 2400W MAX, 800W NOM, 4.0 DVC."
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="site flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Shop photographs. Not a priced catalog.
          </p>
          <Button variant="line" href="/gallery">
            Open the gallery
          </Button>
        </div>
      </section>

      <section className="site py-24 md:py-32">
        <p className="label">Workshop</p>
        <h2 className="poster mt-4 max-w-3xl font-display text-5xl sm:text-7xl">What the shop is offering.</h2>
        {!services.ok ? (
          <div className="mt-12">
            <ErrorState title="Unable to load services right now.">
              <p>Please check your connection and try again.</p>
            </ErrorState>
          </div>
        ) : services.data.length === 0 ? (
          <p className="mt-8 max-w-lg text-lg text-mute">No services are published yet. Ask the workshop directly.</p>
        ) : (
          <ul className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {services.data.slice(0, 6).map((service, index) => (
              <li key={service.slug}>
                <Link href="/services" className="group grid items-baseline gap-4 py-7 sm:grid-cols-[4rem_1fr_auto]">
                  <span className="font-display text-sm text-ember">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl font-medium tracking-tight sm:text-4xl">{service.name}</span>
                  <ArrowRight aria-hidden="true" className="size-5 text-steel transition group-hover:translate-x-1 group-hover:text-ember" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-y border-white/10">
        <div className="site grid items-end gap-12 py-24 md:grid-cols-12 md:py-32">
          <div className="md:col-span-8">
            <p className="label">Custom work</p>
            <h2 className="poster mt-5 font-display text-[clamp(3rem,6vw,6rem)]">
              Tell us what
              <br />
              you're driving.
            </h2>
            <p className="mt-8 max-w-md font-display text-2xl font-medium tracking-tight text-paper sm:text-3xl">
              We'll help you build the sound.
            </p>
          </div>
          <div className="md:col-span-4 md:pb-3">
            <p className="max-w-xs text-mute">
              The car, the budget, and what you want from the system. Bassaddict plans the conversation. Nothing is charged here.
            </p>
            <Button className="mt-8" href="/build">
              Start the brief
            </Button>
          </div>
        </div>
      </section>

      <section className="site grid gap-10 py-24 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <p className="label">Luthuli Avenue</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Talk to Bassaddict.</h2>
          <p className="mt-5 max-w-sm text-mute">{business.address}</p>
          <WhatsAppButton className="mt-8" number={business.whatsapp_number} message={generalEnquiryMessage()}>
            WhatsApp {business.phone}
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}

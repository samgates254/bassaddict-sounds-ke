import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  AudioLines,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Wrench,
  Volume2,
  Sparkles,
  Radio,
  Sliders,
} from "lucide-react";

import { BrandWall } from "@/components/brand-wall";
import { Button } from "@/components/button";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { HeroVideo } from "@/components/hero-video";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getCategories, getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";
import { generalEnquiryMessage } from "@/lib/whatsapp";

type WaveStyle = CSSProperties & {
  "--bar-height": string;
  "--bar-delay": string;
};

const waveBars = Array.from({ length: 48 }, (_, i) => i);

export default async function HomePage() {
  const [productsResult, servicesResult, categoriesResult, businessResult] = await Promise.all([
    getProducts({ featured: "true" }),
    getServices(),
    getCategories(),
    getBusiness(),
  ]);

  const business = businessResult.business;
  const whatsappNumber = business.whatsapp_number || "0794069405";
  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const products = productsResult.ok ? productsResult.data : [];
  const services = servicesResult.ok ? servicesResult.data : [];

  return (
    <div className="flex flex-col">
      {/* A. Cinematic Video Hero */}
      <HeroVideo whatsappNumber={whatsappNumber} />

      {/* Visualizer Frequency Bar */}
      <section className="border-b border-[#A8FF00]/15 bg-black/60 backdrop-blur-xl">
        <div className="site flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#A8FF00]/25 bg-[#070A07] text-[#c2ff52] shadow-[0_0_25px_rgba(168,255,0,0.2)]">
              <AudioLines aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Feel Every Frequency</p>
              <p className="text-xs text-stone-400">
                Acoustic cabinet design, clean high-efficiency speakers, and ground-shaking bass.
              </p>
            </div>
          </div>
          <div
            className="sound-wave group inline-flex h-8 w-fit items-center gap-[3px] text-[#A8FF00]"
            aria-label="Soundwave visualizer"
            role="img"
          >
            {waveBars.map((bar) => (
              <span
                key={bar}
                className="h-[var(--bar-height)] w-[3px] min-h-1 rounded-full bg-current transition-transform group-hover:animate-wave-bars"
                style={
                  {
                    "--bar-height": `${18 + ((bar * 37 + 13) % 78)}%`,
                    "--bar-delay": `${(bar % 9) * 45}ms`,
                  } as WaveStyle
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Wall */}
      <BrandWall />

      {/* B. Shop by Category */}
      <section className="site py-20 sm:py-28">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="label">Sound Architecture</p>
            <h2 className="poster mt-3 font-display text-4xl sm:text-6xl text-white">
              Shop by Audio Category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A8FF00] hover:underline sm:flex"
          >
            All Categories
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="lime-rule mt-6" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Category 1: Speakers */}
          <Link
            href="/products?category=speakers"
            className="group glass-panel glass-panel-hover relative overflow-hidden p-6 flex flex-col justify-between min-h-[260px]"
          >
            <div className="relative z-10">
              <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-[#070A07] transition duration-300">
                <Volume2 className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white group-hover:text-[#A8FF00] transition">
                Speakers &amp; Coaxials
              </h3>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                2-way &amp; 3-way high efficiency coaxial drivers, component tweeters, and mid-range speakers.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-[#A8FF00]">
              <span>Explore Speakers</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Category 2: Subwoofers */}
          <Link
            href="/products?category=subwoofers"
            className="group glass-panel glass-panel-hover relative overflow-hidden p-6 flex flex-col justify-between min-h-[260px]"
          >
            <div className="relative z-10">
              <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-[#070A07] transition duration-300">
                <Radio className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white group-hover:text-[#A8FF00] transition">
                Subwoofers &amp; Bass
              </h3>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                Active underseat enclosures, competition 12&quot; subs, Champion series, and custom ported boxes.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-[#A8FF00]">
              <span>Explore Bass Gear</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Category 3: Amplifiers */}
          <Link
            href="/products?category=amplifiers"
            className="group glass-panel glass-panel-hover relative overflow-hidden p-6 flex flex-col justify-between min-h-[260px]"
          >
            <div className="relative z-10">
              <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-[#070A07] transition duration-300">
                <Sliders className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white group-hover:text-[#A8FF00] transition">
                Power Amplifiers
              </h3>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                Class-D monoblock sub amps, 4-channel surround power, DSP processors, and wiring kits.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-[#A8FF00]">
              <span>Explore Amplifiers</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>

          {/* Category 4: Displays & Head Units */}
          <Link
            href="/products?category=monitors"
            className="group glass-panel glass-panel-hover relative overflow-hidden p-6 flex flex-col justify-between min-h-[260px]"
          >
            <div className="relative z-10">
              <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00] group-hover:bg-[#A8FF00] group-hover:text-[#070A07] transition duration-300">
                <Sparkles className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-bold text-white group-hover:text-[#A8FF00] transition">
                Displays &amp; In-Dash
              </h3>
              <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                7-inch &amp; 9-inch HD TFT/LED monitors, Android touchscreens, reverse camera integrations.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-[#A8FF00]">
              <span>Explore Displays</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </section>

      {/* C. The Showroom (Featured Products) */}
      <section id="showroom" className="site scroll-mt-24 py-16 sm:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">Luthuli Avenue Stock</p>
            <h2 className="poster mt-3 font-display text-4xl sm:text-6xl text-white">
              Featured Showroom Equipment
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-xl">
              Audition and purchase top-tier car audio equipment in stock today at our Nairobi showroom.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A8FF00] hover:underline"
          >
            View Complete Collection ({products.length})
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="lime-rule mt-6" />

        <div className="mt-10">
          {products.length === 0 ? (
            <EmptyState title="Nothing is on the showroom floor right now.">
              <p>Active products appear here once published. Prices are never invented on this page.</p>
            </EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, idx) => (
                <div key={product.slug} className={idx === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                  <ProductCard
                    product={product}
                    large={idx === 0}
                    whatsappNumber={whatsappNumber}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* E. Brand / Equipment Spotlight */}
      <section className="relative overflow-hidden border-y border-[#A8FF00]/15 bg-[#0a0e0a] py-20 sm:py-28">
        <div className="site grid items-center gap-12 lg:grid-cols-12">
          <div className="relative aspect-video overflow-hidden rounded-[28px] border border-[#A8FF00]/25 shadow-2xl lg:col-span-6">
            <Image
              src="/images/gallery/pioneer-champion-pro.jpg"
              alt="Pioneer Champion Series PRO Audio Equipment"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 rounded-full border border-[#A8FF00]/30 bg-black/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#A8FF00] backdrop-blur-xl">
              Equipment Spotlight
            </span>
          </div>

          <div className="lg:col-span-6">
            <p className="label">Flagship Audio Benchmark</p>
            <h2 className="poster mt-3 font-display text-4xl sm:text-5xl text-white">
              Pioneer Champion Series PRO
            </h2>
            <p className="mt-5 text-base leading-relaxed text-stone-300">
              Engineered for maximum acoustic output without thermal distortion. Dual voice coils, reinforced Twaron cones, and massive ferrite magnets built to deliver unrelenting low frequencies in saloon cars and SUVs alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/products" variant="ember">
                Shop Pioneer Gear
              </Button>
              <WhatsAppButton
                number={whatsappNumber}
                message="Hello Bassaddict, I would like to enquire about Pioneer Champion Series subwoofers and amplifiers available at your showroom."
              >
                Inquire on WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* F. Why Shop With Bassaddict Sounds KE */}
      <section className="site py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <p className="label">The Bassaddict Difference</p>
          <h2 className="poster mt-3 font-display text-4xl sm:text-6xl text-white">
            Why Audio Enthusiasts Trust Us
          </h2>
          <p className="mt-4 text-sm text-stone-400">
            Real workshop advantages on Luthuli Avenue, Nairobi. No counterfeits, no shortcuts.
          </p>
        </div>

        <div className="lime-rule mt-8" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-panel p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00]">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Luthuli Avenue Showroom</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              Convenient central Nairobi location at Ground Floor, New Loitoktok House. Walk in, audition equipment on our test bench, and pick up orders in person.
            </p>
          </div>

          <div className="glass-panel p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00]">
              <Volume2 className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Audition Before Install</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              Never buy sound blind. Test frequency balance, punch, and clarity in our demonstration area before any installation into your car boot or doors.
            </p>
          </div>

          <div className="glass-panel p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00]">
              <Wrench className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">Master Fitment &amp; Wiring</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              Certified auto-electricians using pure copper power cables, inline ANL fuse protection, and acoustic sound dampening to eliminate rattles.
            </p>
          </div>

          <div className="glass-panel p-6">
            <span className="grid size-12 place-items-center rounded-2xl border border-[#A8FF00]/25 bg-[#070A07] text-[#A8FF00]">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">100% Genuine Audio</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-400">
              Authorized brand hardware from Pioneer, KUERL, JBL, Hertz, and Skar Audio. Authentic serials and genuine manufacturer performance specs.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Services Section */}
      <section className="relative border-y border-[#A8FF00]/15 bg-black/40 py-20 sm:py-28">
        <div className="site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label">Workshop Expertise</p>
              <h2 className="poster mt-3 font-display text-4xl sm:text-6xl text-white">
                Professional Audio Services
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#A8FF00] hover:underline"
            >
              All Workshop Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, idx) => (
              <div key={service.slug} className="glass-panel p-6 flex flex-col justify-between">
                <div>
                  <span className="font-display text-xs font-semibold text-[#A8FF00]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-400">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-[#A8FF00]"
                  >
                    Service Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Build Banner */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label">Custom Vehicle Fabrication</p>
            <h2 className="poster mt-4 font-display text-5xl sm:text-7xl text-white">
              Tell us what
              <br />
              you&apos;re driving.
            </h2>
            <p className="mt-6 max-w-xl font-display text-2xl text-stone-300">
              We&apos;ll help you design and build the ultimate custom sound system tailored for your car&apos;s cabin acoustics and your budget.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button href="/build" variant="ember" className="gap-2.5 px-8 text-sm">
              Start Your Build Brief
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* G & H. Final Consultation & Showroom Visit */}
      <section className="border-t border-[#A8FF00]/15 bg-[#0a0e0a] py-20 sm:py-28">
        <div className="site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label">Visit the Workshop</p>
            <h2 className="poster mt-3 font-display text-4xl sm:text-5xl text-white">
              Talk to Bassaddict Sounds KE
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-300 max-w-md">
              Need assistance selecting the right speaker size, amplifier impedance, or underseat active bass enclosure? Connect directly with our team.
            </p>
            <p className="mt-6 text-sm font-medium text-white">
              {business.address}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton
                number={whatsappNumber}
                message={generalEnquiryMessage()}
              >
                Chat on WhatsApp {business.phone}
              </WhatsAppButton>
              <Button href="/contact" variant="line">
                View Contact Info
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="glass-panel p-8">
              <h3 className="font-display text-2xl font-bold text-white">Showroom Hours &amp; Inquiries</h3>
              <p className="mt-2 text-xs text-stone-400">
                Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi.
              </p>
              <div className="mt-6 space-y-3 text-xs text-stone-300 border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>Monday — Saturday:</span>
                  <span className="font-semibold text-white">8:30 AM — 6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday &amp; Public Holidays:</span>
                  <span className="text-stone-400">By WhatsApp Appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Phone / WhatsApp:</span>
                  <span className="font-semibold text-[#A8FF00]">{business.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, AudioLines, Headphones, MapPin } from "lucide-react";

import { Button } from "@/components/button";
import { BrandWall } from "@/components/brand-wall";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { HeroPhotoBackground } from "@/components/hero-photo-background";
import { ProductCard } from "@/components/product-card";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getBusiness } from "@/lib/api/business";
import { getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";
import { pageMetadata } from "@/lib/seo";
import { generalEnquiryMessage } from "@/lib/whatsapp";

type WaveStyle = CSSProperties & {
  "--bar-height": string;
  "--bar-delay": string;
};

type ParticleStyle = CSSProperties & {
  "--particle-x": string;
  "--particle-y": string;
  "--particle-size": string;
};

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
  const waveBars = Array.from({ length: 48 }, (_, index) => index);
  const particles = Array.from({ length: 56 }, (_, index) => index);

  return (
    <div>
      <section className="relative isolate flex min-h-[calc(100svh-4.25rem)] items-center overflow-hidden border-b border-[#A8FF00]/15 bg-[#070A07]">
        <HeroPhotoBackground />
        <div aria-hidden="true" className="absolute -left-32 -top-40 size-[32rem] rounded-full bg-[#A8FF00]/15 blur-[120px]" />
        <div aria-hidden="true" className="absolute -right-32 bottom-[-12rem] size-[36rem] rounded-full bg-[#A8FF00]/10 blur-[150px]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgba(168,255,0,0.12),transparent_34%),radial-gradient(circle_at_78%_85%,rgba(140,255,0,0.08),transparent_42%)]" />
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_82%,transparent)]">
          {particles.map((particle) => (
            <span
              key={particle}
              className="absolute left-[var(--particle-x)] top-[var(--particle-y)] size-[var(--particle-size)] animate-hero-particle rounded-full bg-[#c2ff52] opacity-0 shadow-[0_0_12px_rgba(168,255,0,0.85)]"
              style={{
                "--particle-x": `${(particle * 47 + 9) % 100}%`,
                "--particle-y": `${(particle * 71 + 17) % 100}%`,
                "--particle-size": `${1 + (particle % 3)}px`,
                animationDelay: `${(particle % 13) * -0.42}s`,
                animationDuration: `${5 + (particle % 7)}s`,
              } as ParticleStyle}
            />
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 [perspective:1000px] [transform-style:preserve-3d]">
          <div className="absolute right-[5%] top-1/2 aspect-square w-[min(48vw,34rem)] -translate-y-1/2 rotate-[-22deg] rounded-full border border-[#A8FF00]/15 bg-[radial-gradient(circle,transparent_0_35%,rgba(168,255,0,0.06)_35.2%_35.6%,transparent_35.8%_49%,rgba(168,255,0,0.08)_49.2%_49.5%,transparent_49.8%),radial-gradient(circle,rgba(168,255,0,0.14),rgba(7,10,7,0.03)_58%,transparent_70%)] shadow-[inset_0_0_90px_rgba(168,255,0,0.12),0_0_100px_rgba(168,255,0,0.1)] [transform:translateY(-50%)_rotateX(68deg)_rotateZ(-22deg)] max-md:right-[-25%] max-md:w-[88vw]" />
          <div className="absolute right-[19%] top-[17%] grid aspect-square w-[clamp(9rem,19vw,16rem)] animate-hero-float place-items-center rounded-[2rem] border border-[#A8FF00]/15 bg-black/40 text-[#c2ff52]/85 shadow-[inset_0_1px_rgba(255,255,255,0.14),0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl [transform:rotateY(-18deg)_rotateX(10deg)_rotateZ(8deg)] max-md:right-[18%] max-md:top-[20%]">
            <Headphones className="size-24 sm:size-32 lg:size-40" strokeWidth={1} />
          </div>
          <div className="absolute right-[4%] top-[57%] grid aspect-square w-[clamp(6.5rem,13vw,10rem)] animate-hero-float-delayed place-items-center rounded-full border border-[#A8FF00]/30 bg-[radial-gradient(circle,rgba(168,255,0,0.19),rgba(168,255,0,0.025)_72%)] text-[#c2ff52] drop-shadow-[0_0_28px_rgba(168,255,0,0.3)] max-md:right-[2%] max-md:top-[61%]">
            <AudioLines className="size-20 sm:size-28" strokeWidth={1} />
          </div>
          <div className="absolute right-[5%] top-[27%] flex h-32 animate-hero-float-delayed items-center gap-2 rounded-2xl border border-[#A8FF00]/15 bg-black/40 px-5 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl [transform:rotateY(-18deg)_rotateZ(7deg)] max-md:right-[-4%] max-md:scale-[.78]">
            {[38, 70, 48, 94, 62, 82, 44].map((height, bar) => (
              <span key={bar} className="w-2 origin-center animate-hero-pulse rounded-full bg-gradient-to-t from-[#8CFF00] to-[#d5ff8f] shadow-[0_0_16px_rgba(168,255,0,0.35)]" style={{ height: `${height}%`, animationDelay: `${bar * -0.18}s` }} />
            ))}
          </div>
          <span className="absolute right-[17%] top-1/2 aspect-square w-[min(43vw,30rem)] -translate-y-1/2 rotate-[34deg] rounded-full border border-[#A8FF00]/15 [transform:translateY(-50%)_rotateX(68deg)_rotateZ(34deg)] max-md:right-[-8%] max-md:w-[72vw]" />
          <span className="absolute right-[14%] top-1/2 aspect-square w-[min(38vw,26rem)] -translate-y-1/2 rotate-[-28deg] rounded-full border border-[#A8FF00]/15 [transform:translateY(-50%)_rotateX(68deg)_rotateZ(-28deg)] max-md:right-[-2%] max-md:w-[64vw]" />
        </div>
        <div className="site relative z-10 grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/15 bg-black/40 px-4 py-2 text-[0.66rem] font-semibold tracking-[0.22em] text-white/80 backdrop-blur-xl">
              <span className="size-2 rounded-full bg-[#A8FF00] shadow-[0_0_12px_#A8FF00]" />
              NAIROBI · CAR AUDIO · BUILT FOR THE ROAD
            </p>
            <h1 className="poster mt-7 grid gap-[0.08em] font-display text-[clamp(3.4rem,8vw,7.6rem)] leading-[.92] tracking-[-.065em] [text-wrap:balance]">
              <span>Feel The Bass.</span>
              <span className="w-fit bg-gradient-to-r from-white via-[#c2ff52] to-[#A8FF00] bg-clip-text text-transparent">Own The Sound.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white/70 sm:text-lg">
              Premium car audio systems & professional installations. Turn every drive into your own frequency.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="/products">
                Explore products
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button variant="line" href="/build">
                Build my sound system
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.16em] text-white/55">
              <MapPin aria-hidden="true" className="size-4 text-[#A8FF00]" />
              Luthuli Avenue · Nairobi
              <span aria-hidden="true" className="h-px w-10 bg-[#A8FF00]/40" />
              <span>Est. for your drive</span>
            </div>
          </div>
          <a href="#showroom" className="group hidden items-center gap-3 justify-self-end self-end pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:text-white lg:flex">
            <span className="grid size-11 place-items-center rounded-full border border-white/30 transition group-hover:border-ember group-hover:bg-ember">
              <ArrowDown aria-hidden="true" className="size-4 transition group-hover:translate-y-0.5" />
            </span>
            Explore the sound
          </a>
        </div>
      </section>

      <section className="border-b border-[#A8FF00]/15 bg-black/40 backdrop-blur-xl">
        <div className="site flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#A8FF00]/15 bg-black/40 text-[#c2ff52] shadow-[0_0_30px_rgba(168,255,0,0.15)] backdrop-blur-xl">
              <AudioLines aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-paper">Feel every frequency</p>
              <p className="mt-1 text-xs text-mute">Thoughtfully chosen gear. Clean, professional installs.</p>
            </div>
          </div>
          <div className="sound-wave group inline-flex h-8 w-fit items-center gap-[3px] text-[#A8FF00]" aria-label="Soundwave visualizer" role="img">
            {waveBars.map((bar) => (
              <span
                key={bar}
                className="h-[var(--bar-height)] w-[3px] min-h-1 rounded-full bg-current transition-transform group-hover:animate-wave-bars"
                style={{
                  "--bar-height": `${18 + ((bar * 37 + 13) % 78)}%`,
                  "--bar-delay": `${(bar % 9) * 45}ms`,
                } as WaveStyle}
              />
            ))}
          </div>
        </div>
      </section>

      <BrandWall />

      <section id="showroom" className="site scroll-mt-24 py-24 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="label">Find your frequency</p>
            <h2 className="poster mt-4 font-display text-5xl sm:text-7xl">The showroom</h2>
          </div>
          <Link href="/products" className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-steel hover:text-paper sm:flex">
            All products
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div aria-hidden="true" className="lime-rule mt-8" />
        <div className="mt-12">
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
        <div className="relative h-[70vw] min-h-[22rem] max-h-[46rem] overflow-hidden border-y border-[#A8FF00]/15">
          <Image
            src="/images/gallery/pioneer-ts-w30040d4.jpg"
            alt="Magnet label reads TS-W30040D4, Champion series PRO, 2400W MAX, 800W NOM, 4.0 DVC."
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#070A07]/35 via-transparent to-[#070A07]/20" />
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
          <ul className="mt-14 divide-y divide-[#A8FF00]/15 border-y border-[#A8FF00]/15">
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

      <section className="relative overflow-hidden border-y border-[#A8FF00]/15 bg-black/30">
        <div aria-hidden="true" className="absolute -left-56 top-1/2 size-[30rem] -translate-y-1/2 rounded-full bg-[#A8FF00]/[0.06] blur-[120px]" />
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

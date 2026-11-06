import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Wrench,
  Volume2,
  Sliders,
  Sparkles,
  Layers,
  ShieldCheck,
  Disc,
} from "lucide-react";

import { TiltedCard } from "@/components/ui/tilted-card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FocusCards, FocusCardItem } from "@/components/ui/focus-cards";
import { Marquee } from "@/components/ui/marquee";
import { TextEffect } from "@/components/motion-primitives/text-effect";

export const metadata: Metadata = {
  title: "Component Laboratory | Bassaddict Sounds KE Design System",
  description: "Working demonstrations of TiltedCard, BentoGrid, FocusCards, Marquee, and TextEffect.",
};

const brandPartners = [
  "PIONEER",
  "KENWOOD",
  "SONY",
  "NAKAMICHI",
  "AUDIOBANK",
  "HIFONICS",
  "KUERL",
  "NRD AUDIO",
  "BOSCHMANN",
  "JBL",
];

const focusCardItems: FocusCardItem[] = [
  {
    title: "Pioneer TS-W3254 Subwoofer",
    category: "Subwoofers",
    src: "/images/hero/candidate-1-hero-bg.webp",
    href: "/products",
    spec: "1500W MAX · 400W RMS · 12 Inch",
  },
  {
    title: "Pioneer TS-6900PRO 6x9s",
    category: "Coaxials",
    src: "/images/hero/candidate-1-hero-mobile.webp",
    href: "/products",
    spec: "600W MAX · 100W RMS · 92dB SPL",
  },
  {
    title: "Pioneer GM-E7004 4-Channel",
    category: "Amplifiers",
    src: "/images/hero/authentic-bassaddict-tuning.webp",
    href: "/products",
    spec: "1000W Bridgeable · Class AB",
  },
  {
    title: "NRD NRD-T350 Bullet Tweeters",
    category: "Bullet Tweeters",
    src: "/images/hero/authentic-bassaddict-workshop.webp",
    href: "/products",
    spec: "250W MAX · Titanium Diaphragm",
  },
];

export default function ComponentLabPage() {
  return (
    <div className="min-h-screen bg-[#070A07] text-[#F4F7EF]" data-preview-isolated="true">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#A8FF00]/30 bg-[#0A0E0A]/95 px-6 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/preview/direction-a2"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              <ArrowLeft className="size-3.5" />
              Integrated A2 Preview
            </Link>
            <span className="h-4 w-px bg-white/20" />
            <h1 className="text-sm font-extrabold uppercase tracking-widest text-[#A8FF00]">
              BASSADICT COMPONENT LABORATORY
            </h1>
          </div>
          <span className="rounded bg-[#A8FF00]/15 px-3 py-1 text-xs font-mono font-bold text-[#A8FF00]">
            5 Real Components Tested
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 flex flex-col gap-16">
        {/* Intro */}
        <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8FF00]">
            Proof of Technology &amp; Micro-Interactions
          </span>
          <h2 className="text-3xl font-black uppercase text-white font-display">
            Researched Components Tailored for BASSADICT
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-[#899384]">
            Every component below has been adapted to the BASSADICT dark carbon foundation (`#070A07`), electric-lime
            accent system (`#A8FF00`), and typography scale. They are real React components responding dynamically to
            cursor, scroll, and keyboard events with zero layout shift.
          </p>
        </div>

        {/* 1. Motion Primitives: TextEffect */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0A0E0A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#A8FF00]">01. MOTION PRIMITIVES</span>
              <h3 className="text-xl font-bold text-white">TextEffect — Kinetic Word Reveal</h3>
            </div>
            <span className="text-xs text-[#899384]">Library: motion-primitives.com/docs/text-effect</span>
          </div>

          <p className="text-xs text-[#899384]">
            Renders the official BASSADICT brand motto with a staggered, blur-in word reveal that respects
            reduced-motion and avoids layout reflow:
          </p>

          <div className="rounded-xl border border-[#A8FF00]/25 bg-black/60 p-8 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A8FF00]">Official Motto</span>
            <div className="mt-2 text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-display">
              <TextEffect per="word" preset="fade-in-blur" delay={0.1}>
                ADDICTED TO BASS. DRIVEN BY SOUND.
              </TextEffect>
            </div>
          </div>
        </section>

        {/* 2. React Bits: TiltedCard */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0A0E0A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#A8FF00]">02. REACT BITS</span>
              <h3 className="text-xl font-bold text-white">TiltedCard — 3D Perspective &amp; Specular Glare</h3>
            </div>
            <span className="text-xs text-[#899384]">Library: reactbits.dev/components/tilted-card</span>
          </div>

          <p className="text-xs text-[#899384]">
            Hover over the hardware cards below. The card tilts in 3D space tracking cursor coordinates with physics
            damping, rendering a real-time metallic glare highlight across the speaker surface:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TiltedCard
              imageSrc="/images/hero/candidate-1-hero-bg.webp"
              captionText="Pioneer TS-W3254 12-Inch Subwoofer"
              categoryText="1500W MAX · 400W RMS"
              specs="Dual Voice Coil · Injection Cone"
              containerHeight="380px"
            />
            <TiltedCard
              imageSrc="/images/hero/authentic-bassaddict-tuning.webp"
              captionText="Pioneer GM-E7004 4-Channel Amplifier"
              categoryText="1000W Bridgeable Power"
              specs="Class-AB · High-Output Heatsink"
              containerHeight="380px"
            />
          </div>
        </section>

        {/* 3. Magic UI: BentoGrid */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0A0E0A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#A8FF00]">03. MAGIC UI</span>
              <h3 className="text-xl font-bold text-white">BentoGrid &amp; BentoCard — Craftsmanship Matrix</h3>
            </div>
            <span className="text-xs text-[#899384]">Library: magicui.design/docs/components/bento-grid</span>
          </div>

          <p className="text-xs text-[#899384]">
            Asymmetrical content collage combining live workshop tuning video, custom enclosure fabrication, and
            certified wiring standards:
          </p>

          <BentoGrid>
            {/* Card 1: 2-Col Span Video Showcase */}
            <BentoCard
              name="DSP Audio Tuning & Equalization"
              description="Live demonstration of in-dash Sony head unit paired with a 7-band Boschmann parametric equalizer, calibrating low-pass filter and subwoofer phase alignment."
              Icon={Sliders}
              badge="Live Video Audition"
              href="/preview/direction-a2"
              cta="Watch Audition"
              className="md:col-span-2"
              background={
                <video
                  src="/videos/bassaddict-tuning-preview.mp4"
                  poster="/images/hero/tuning-video-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover opacity-60 brightness-90"
                />
              }
            />

            {/* Card 2: 1-Col Span Fabrication */}
            <BentoCard
              name="Custom Subwoofer Enclosures"
              description="Custom MDF and fiberglass ported or sealed boxes calculated specifically for your boot volume and subwoofer Thiele/Small parameters."
              Icon={Wrench}
              badge="Custom Woodcraft"
              href="/services"
              className="md:col-span-1"
              background={
                <Image
                  src="/images/hero/candidate-1-hero-bg.webp"
                  alt="Custom enclosure build"
                  fill
                  className="object-cover opacity-50"
                />
              }
            />

            {/* Card 3: 1-Col Span OEM Wiring */}
            <BentoCard
              name="OEM Clean Standard Wiring"
              description="Heavy-gauge power cables, fused high-current distribution blocks, and gold-plated terminals protecting vehicle electronics."
              Icon={ShieldCheck}
              badge="Factory Safe"
              href="/services"
              className="md:col-span-1"
              background={
                <Image
                  src="/images/hero/authentic-bassaddict-tuning.webp"
                  alt="Clean wiring installation"
                  fill
                  className="object-cover opacity-50"
                />
              }
            />

            {/* Card 4: 2-Col Span Workshop Rig */}
            <BentoCard
              name="Luthuli Avenue Showroom & Sound Bay"
              description="Ground Floor, New Loitoktok House, Luthuli Avenue. Audition speaker drivers, coaxial 6x9s, and underseat subwoofers in person before installation."
              Icon={Volume2}
              badge="Nairobi Flagship"
              href="/contact"
              cta="Visit Workshop"
              className="md:col-span-2"
              background={
                <Image
                  src="/images/hero/authentic-bassaddict-workshop.webp"
                  alt="Bassaddict workshop neon rig"
                  fill
                  className="object-cover opacity-60"
                />
              }
            />
          </BentoGrid>
        </section>

        {/* 4. Aceternity UI: Focus Cards */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0A0E0A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#A8FF00]">04. ACETERNITY UI</span>
              <h3 className="text-xl font-bold text-white">Focus Cards — Interactive Category Exploration</h3>
            </div>
            <span className="text-xs text-[#899384]">Library: ui.aceternity.com/components/focus-cards</span>
          </div>

          <p className="text-xs text-[#899384]">
            Hover over any category card. The active card stays fully illuminated and scaled, while sibling cards
            softly desaturate and blur to guide focused product discovery:
          </p>

          <FocusCards cards={focusCardItems} />
        </section>

        {/* 5. Magic UI: Marquee */}
        <section className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0A0E0A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#A8FF00]">05. MAGIC UI</span>
              <h3 className="text-xl font-bold text-white">Marquee — Verified Audio Brand Partners</h3>
            </div>
            <span className="text-xs text-[#899384]">Library: magicui.design/docs/components/marquee</span>
          </div>

          <p className="text-xs text-[#899384]">
            Hardware-accelerated continuous ticker across the bottom of the hero displaying verified audio hardware
            brands with pause-on-hover:
          </p>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 py-4">
            <Marquee pauseOnHover className="[--duration:25s]">
              {brandPartners.map((brand) => (
                <div key={brand} className="flex items-center gap-3 px-6">
                  <span className="size-1.5 rounded-full bg-[#A8FF00]" />
                  <span className="text-sm font-black tracking-widest text-white/80 hover:text-[#A8FF00] transition-colors">
                    {brand}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </section>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Volume2,
  Wrench,
  Car,
  Layers,
  MapPin,
  Play,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Menu,
  MessageCircle,
  Headphones,
  Sliders,
  Disc,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Tilt } from "@/components/motion-primitives/tilt";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Marquee } from "@/components/ui/marquee";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FocusCards, FocusCardItem } from "@/components/ui/focus-cards";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/cart-context";

interface DirectionA2HeroProps {
  whatsappNumber?: string;
}

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

const categoryCards: FocusCardItem[] = [
  {
    title: "Pioneer TS-W3254 Subwoofer",
    category: "Subwoofers",
    src: "/images/hero/candidate-1-hero-bg.webp",
    href: "/products",
    spec: "1500W MAX · 400W RMS · 12-Inch",
  },
  {
    title: "Pioneer TS-6900PRO 6x9s",
    category: "Coaxials",
    src: "/images/hero/candidate-1-hero-mobile.webp",
    href: "/products",
    spec: "600W MAX · 100W RMS · 92dB High Sensitivity",
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

export function DirectionA2Hero({ whatsappNumber = CANONICAL_WHATSAPP_NUMBER }: DirectionA2HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [workshopModalOpen, setWorkshopModalOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const { itemCount, openCart } = useCart();

  const whatsappLink = whatsappHref(whatsappNumber, generalEnquiryMessage());

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoModalOpen(false);
        setWorkshopModalOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full bg-[#070A07] text-[#F4F7EF] overflow-x-hidden font-sans">
      {/* 1. TOP MINIMALIST E-COMMERCE NAVIGATION (Restored Full-Width Ergonomics) */}
      <nav
        aria-label="Storefront Header"
        className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#A8FF00]/15 bg-[#080808]/95 px-4 sm:px-8 backdrop-blur-2xl"
      >
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#A8FF00] text-[#070A07] shadow-[0_0_20px_rgba(168,255,0,0.25)] transition-transform duration-300 group-hover:scale-105">
              <span className="h-5 w-1 rounded-full bg-[#070A07] mr-0.5" />
              <span className="text-xl font-black tracking-tighter">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white font-display">BASSADICT</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#A8FF00]">Sounds KE</span>
            </div>
          </Link>

          <span className="hidden md:inline h-4 w-px bg-white/20 ml-2" />
          <span className="hidden md:inline text-[11px] font-medium text-[#899384]">
            Ground Floor, New Loitoktok House, Luthuli Ave
          </span>
        </div>

        {/* Center Desktop Links */}
        <div className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-stone-300">
          <Link href="/products" className="hover:text-[#A8FF00] transition-colors">
            Catalogue
          </Link>
          <Link href="/services" className="hover:text-[#A8FF00] transition-colors">
            Installation &amp; Fitting
          </Link>
          <Link href="/build" className="hover:text-[#A8FF00] transition-colors">
            Custom System Brief
          </Link>
          <Link href="/gallery" className="hover:text-[#A8FF00] transition-colors">
            Build Gallery
          </Link>
          <Link href="/contact" className="hover:text-[#A8FF00] transition-colors">
            Workshop &amp; Auditions
          </Link>
        </div>

        {/* Right Action Icons: Cart, WhatsApp, Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Component Lab Link */}
          <Link
            href="/preview/components"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-bold text-stone-300 hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
          >
            <Sparkles className="size-3 text-[#A8FF00]" />
            Component Lab
          </Link>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex size-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingBag className="size-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-[10px] font-black text-black">
                {itemCount}
              </span>
            )}
          </button>

          {/* Canonical WhatsApp Action */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl bg-[#A8FF00] px-4 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_20px_rgba(168,255,0,0.25)] transition hover:bg-[#c2ff52]"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex size-10 items-center justify-center rounded-xl border border-white/15 text-white"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 z-30 border-b border-[#A8FF00]/20 bg-[#080808]/98 p-6 backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-white">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                Product Catalogue (67 Items)
              </Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                Custom Enclosure Fabrication
              </Link>
              <Link href="/build" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                Custom System Brief
              </Link>
              <Link href="/preview/components" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                Component Laboratory (5 Primitives)
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                Luthuli Avenue Audition Room
              </Link>
              <div className="pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8FF00] py-3 text-xs font-black uppercase tracking-wider text-[#070A07]"
                >
                  <MessageCircle className="size-4" />
                  Chat on WhatsApp ({whatsappNumber})
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO — APPROVED DIRECTION A2: EDITORIAL SPLIT-SCREEN HARDWARE SHOWCASE */}
      <section className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-center border-b border-[#A8FF00]/15 overflow-hidden">
        {/* Ambient Dark Overlays */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/5 bg-[radial-gradient(ellipse_at_65%_45%,rgba(168,255,0,0.14),transparent_65%)]" />
          <div className="absolute -left-32 top-1/4 size-[550px] rounded-full bg-[#A8FF00]/5 blur-[180px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-transparent to-[#070A07]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A07] via-[#070A07]/70 to-transparent lg:w-3/5" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Brand Messaging & Commercial CTAs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8FF00]/30 bg-black/60 px-4 py-1.5 backdrop-blur-xl w-fit shadow-[0_0_24px_rgba(168,255,0,0.15)]">
                <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#A8FF00] uppercase">
                  LUTHULI AVENUE SOUND ENGINEERING
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[11px] tracking-wider text-stone-300">NAIROBI</span>
              </div>

              {/* Official Tagline Headline (Condensed Heavy Display with TextEffect) */}
              <h1 className="mt-6 text-[clamp(2.75rem,5.5vw,5.25rem)] font-black uppercase leading-[0.92] tracking-tight text-white font-display">
                <TextEffect per="word" preset="fade-in-blur" delay={0.1}>
                  ADDICTED TO BASS.
                </TextEffect>
                <span className="inline-flex items-baseline mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A8FF00]">
                  DRIVEN BY SOUND
                  <span className="ml-1 inline-block size-3 sm:size-4 bg-[#A8FF00] shadow-[0_0_14px_#A8FF00]" />
                </span>
              </h1>

              {/* Lime Rule */}
              <div className="mt-5 h-[2px] w-16 bg-[#A8FF00]" />

              {/* Subtitle */}
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#899384]">
                Nairobi&apos;s premier destination for high-efficiency speakers, deep underseat subwoofers, custom MDF
                enclosure fabrication and precision DSP tuning. Audition gear before fitment on Luthuli Avenue.
              </p>

              {/* Commercial CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="group relative inline-flex h-13 items-center justify-center gap-2.5 bg-[#A8FF00] px-8 text-xs font-black uppercase tracking-widest text-[#070A07] shadow-[0_8px_32px_rgba(168,255,0,0.28)] transition-all duration-300 hover:bg-[#c2ff52] hover:shadow-[0_12px_44px_rgba(168,255,0,0.4)] active:scale-[0.98]"
                >
                  <span>EXPLORE CATALOGUE</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/build"
                  className="group inline-flex h-13 items-center justify-center gap-2.5 border border-white/25 bg-black/40 px-7 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-[#A8FF00] hover:text-[#A8FF00] hover:bg-black/70 active:scale-[0.98]"
                >
                  <span>CUSTOM SYSTEM BRIEF</span>
                  <ArrowUpRight className="size-4 text-[#899384] transition-colors duration-300 group-hover:text-[#A8FF00]" />
                </Link>
              </div>

              {/* Interactive Video Audition Trigger */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:border-[#A8FF00] hover:bg-[#A8FF00]/10"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-black">
                    <Play className="size-2.5 fill-current ml-0.5" />
                  </span>
                  <span>Watch Live Sound Tuning (Video)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWorkshopModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-xs font-semibold text-stone-300 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
                >
                  <SlidersHorizontal className="size-3.5 text-[#A8FF00]" />
                  <span>Workshop Neon Rig</span>
                </button>
              </div>

              {/* Trust & Provenance Bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Live Auditions</p>
                    <p className="text-[11px] text-[#899384]">Audition before fitment</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Custom Enclosures</p>
                    <p className="text-[11px] text-[#899384]">MDF &amp; fiberglass builds</p>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-white">Verified Hardware</p>
                    <p className="text-[11px] text-[#899384]">Tested Kenyan stock</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dramatic Automotive Audio Installation Showcase (5 Cols) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <Tilt
                rotationFactor={reducedMotion ? 0 : 6}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#A8FF00]/25 bg-black/60 shadow-[0_32px_120px_rgba(0,0,0,0.85),0_0_60px_rgba(168,255,0,0.12)] group"
              >
                {/* High-Resolution Boot Audio Installation Plate */}
                <Image
                  src="/images/hero/candidate-1-hero-bg.webp"
                  alt="Dramatic automotive boot audio installation with Pioneer subwoofer and high-current amplifier"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient Edge Vignettes */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070A07]/50 via-transparent to-transparent" />

                {/* Status Tag */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-black/40 bg-black/80 px-3.5 py-1.5 backdrop-blur-xl shadow-lg">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-ping" />
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                    Custom Fitment Bay
                  </span>
                </div>

                {/* Frequency Visualizer Footnote */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/85 px-4 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-end gap-1 h-5">
                      {[18, 26, 14, 30, 22, 16, 28, 20, 24].map((height, i) => (
                        <span
                          key={i}
                          className="w-1 rounded-full bg-[#A8FF00]"
                          style={{
                            height: `${height}px`,
                            animation: reducedMotion ? "none" : `wave-bars 900ms ease-in-out infinite alternate ${i * 110}ms`,
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-wider text-white">ACOUSTIC STAGING</p>
                      <p className="text-[9px] text-[#899384]">High-efficiency 3-way stage balance</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="flex size-8 items-center justify-center rounded-full bg-[#A8FF00] text-black hover:scale-105 transition-transform"
                    title="Play Sound Tuning Demonstration"
                  >
                    <Play className="size-3.5 fill-current ml-0.5" />
                  </button>
                </div>
              </Tilt>
            </div>
          </div>
        </div>

        {/* 3. MAGIC UI MARQUEE BRAND STRIP */}
        <div className="border-t border-b border-[#A8FF00]/15 bg-black/50 py-3.5 backdrop-blur-md">
          <Marquee pauseOnHover className="[--duration:28s]">
            {brandPartners.map((brand) => (
              <div key={brand} className="flex items-center gap-3 px-6">
                <span className="size-1.5 rounded-full bg-[#A8FF00]" />
                <span className="text-xs font-black tracking-widest text-white/70 hover:text-[#A8FF00] transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4. CRAFTSMANSHIP & FABRICATION EXPERIENCE (APPROVED A3 SECTION) */}
      <section className="relative w-full py-20 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8FF00]">
            Bespoke Audio Fabrication &amp; Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display tracking-tight">
            Built for Nairobi Roads. Tailored for Sound Enthusiasts.
          </h2>
          <p className="text-sm leading-relaxed text-[#899384]">
            Every vehicle installation is engineered with acoustic mathematics: volume-matched MDF enclosures,
            factory-safe fused power wiring, sound deadening damping, and digital parametric equalization.
          </p>
        </div>

        {/* BentoGrid Matrix of Authentic Services */}
        <BentoGrid>
          {/* Card 1: Live Video Demo (2 cols) */}
          <BentoCard
            name="DSP Audio Tuning & Equalization"
            description="Live tuning demonstration of in-dash Sony head unit paired with a 7-band Boschmann parametric equalizer, setting low-pass filter cutoff and subwoofer phase alignment."
            Icon={Sliders}
            badge="Live Workshop Video"
            href="/preview/direction-a2"
            cta="Watch Video Audition"
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

          {/* Card 2: Custom Enclosures (1 col) */}
          <BentoCard
            name="Custom Subwoofer Enclosures"
            description="High-density MDF and fiberglass ported or sealed boxes calculated specifically for your car boot dimensions and subwoofer Thiele/Small specs."
            Icon={Wrench}
            badge="MDF Woodcraft"
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

          {/* Card 3: OEM Standard Wiring (1 col) */}
          <BentoCard
            name="OEM-Standard Clean Wiring"
            description="Heavy-gauge power cabling, fused high-current distribution blocks, and isolated grounds to protect vehicle electronics and eliminate alternator whine."
            Icon={ShieldCheck}
            badge="Clean Wiring"
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

          {/* Card 4: Luthuli Avenue Showroom (2 cols) */}
          <BentoCard
            name="Luthuli Avenue Showroom & Audition Room"
            description="Ground Floor, New Loitoktok House, Luthuli Avenue. Audition coaxial 6x9s, bullet tweeters, and active underseat subwoofers in person before installation."
            Icon={Volume2}
            badge="Showroom & Workshop"
            href="/contact"
            cta="Visit Showroom"
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

      {/* 5. INTERACTIVE HARDWARE DISCOVERY (ACETERNITY FOCUS CARDS) */}
      <section className="relative w-full py-16 px-6 sm:px-8 max-w-7xl mx-auto flex flex-col gap-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8FF00]">Hardware Showcase</span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">
              Explore Verified Audio Categories
            </h3>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A8FF00] hover:underline"
          >
            <span>View All 67 Products</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <FocusCards cards={categoryCards} />
      </section>

      {/* 6. MODAL: AUTHENTIC LIVE SOUND TUNING VIDEO */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#A8FF00]/30 bg-[#0A0E0A] p-5 shadow-[0_0_80px_rgba(168,255,0,0.2)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Equalizer &amp; Sub Tuning
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#A8FF00] hover:text-black transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative mt-4 aspect-[9/16] max-h-[65vh] w-full mx-auto overflow-hidden rounded-xl border border-white/10 bg-black">
                <video
                  src="/videos/bassaddict-tuning-preview.mp4"
                  poster="/images/hero/tuning-video-poster.jpg"
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#899384]">
                <span>Boschmann 7-Band EQ + Sony In-Dash Demo</span>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A8FF00] hover:underline font-semibold"
                >
                  Enquire on WhatsApp ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. MODAL: AUTHENTIC NEON WORKSHOP SHOWCASE */}
      <AnimatePresence>
        {workshopModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl"
            onClick={() => setWorkshopModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#A8FF00]/30 bg-[#0A0E0A] p-5 shadow-[0_0_80px_rgba(168,255,0,0.2)]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Bassaddict Sounds KE Workshop Sign
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWorkshopModalOpen(false)}
                  className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#A8FF00] hover:text-black transition"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Photo Showcase */}
              <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                <Image
                  src="/images/hero/authentic-bassaddict-workshop.webp"
                  alt="Authentic illuminated BASSADDICT neon workshop display rack"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-[#899384]">
                <span>Ground Floor, New Loitoktok House, Luthuli Ave</span>
                <Link href="/contact" className="text-[#A8FF00] hover:underline font-semibold">
                  Visit Showroom ↗
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

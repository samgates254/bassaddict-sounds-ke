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
  Activity,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Tilt } from "@/components/motion-primitives/tilt";
import { Marquee } from "@/components/ui/marquee";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { FocusCards, FocusCardItem } from "@/components/ui/focus-cards";
import { DspParametricConsole } from "@/components/redesign-v2/dsp-console";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/cart-context";

interface RedesignV2HeroProps {
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

const hardwareFocusItems: FocusCardItem[] = [
  {
    title: "Pioneer TS-W3254 Subwoofer",
    category: "Subwoofers",
    src: "/images/hero/candidate-1-hero-bg.webp",
    href: "/products",
    spec: "1500W MAX · 400W RMS · 12-Inch DVC",
  },
  {
    title: "Pioneer TS-6975 V3 Champion 6x9",
    category: "Coaxials",
    src: "/images/redesign-v2/pioneer-champion-6x9.webp",
    href: "/products",
    spec: "550W MAX · 3-Way High Sensitivity",
  },
  {
    title: "Pioneer GM-E7004 4-Channel",
    category: "Amplifiers",
    src: "/images/redesign-v2/pioneer-amplifier-mount.webp",
    href: "/products",
    spec: "1000W Bridgeable · Class-AB Heatsink",
  },
  {
    title: "NRD NRD-T350 Bullet Tweeters",
    category: "Bullet Tweeters",
    src: "/images/redesign-v2/bullet-tweeters-nrd.webp",
    href: "/products",
    spec: "250W MAX · Titanium High-Output Horn",
  },
];

type AcousticPreset = "sub_bass" | "mid_punch" | "vocal_clarity";

export function RedesignV2Hero({ whatsappNumber = CANONICAL_WHATSAPP_NUMBER }: RedesignV2HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<AcousticPreset>("sub_bass");
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
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full bg-[#050705] text-[#F4F7EF] overflow-x-hidden font-sans selection:bg-[#A8FF00] selection:text-black">
      {/* 1. TOP TELEMETRY HUD NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-[#252E25] bg-[#070A07]/95 backdrop-blur-2xl">
        {/* Top Status Ticker Rail */}
        <div className="hidden md:flex h-8 w-full items-center justify-between border-b border-white/5 px-6 sm:px-8 text-[11px] font-mono text-[#899384] bg-[#040604]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className="size-1.5 rounded-full bg-[#A8FF00] animate-pulse" />
              LUTHULI AVE AUDITION ROOM: <strong className="text-white">OPEN FOR LIVE TUNING</strong>
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span>GROUND FLOOR, NEW LOITOKTOK HOUSE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#A8FF00]">CALIBRATION: 20Hz - 20kHz DSP LAB</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-white">KENYA DIRECT STOCK: 67 PRODUCTS</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <nav
          aria-label="Storefront Header"
          className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto"
        >
          {/* Brand Monogram & Name */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#A8FF00] to-[#7ACC00] text-[#070A07] shadow-[0_0_25px_rgba(168,255,0,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Zap className="size-6 fill-black text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white font-impact leading-none">
                BASSADICT
              </span>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#A8FF00]">
                SOUNDS KE · NAIROBI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold tracking-wider text-stone-300">
            <Link href="/products" className="hover:text-[#A8FF00] transition-colors flex items-center gap-1">
              <span className="text-[#A8FF00]/60">[01]</span> CATALOGUE
            </Link>
            <Link href="/services" className="hover:text-[#A8FF00] transition-colors flex items-center gap-1">
              <span className="text-[#A8FF00]/60">[02]</span> FABRICATION
            </Link>
            <Link href="/build" className="hover:text-[#A8FF00] transition-colors flex items-center gap-1">
              <span className="text-[#A8FF00]/60">[03]</span> SYSTEM BRIEF
            </Link>
            <Link href="#dsp-console" className="hover:text-[#A8FF00] transition-colors flex items-center gap-1">
              <span className="text-[#A8FF00]/60">[04]</span> DSP LAB
            </Link>
            <Link href="/contact" className="hover:text-[#A8FF00] transition-colors flex items-center gap-1">
              <span className="text-[#A8FF00]/60">[05]</span> WORKSHOP
            </Link>
          </div>

          {/* Right Action Icons: Cart, WhatsApp, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Live SPL Telemetry Pill */}
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-xs font-mono">
              <Activity className="size-3.5 text-[#A8FF00]" />
              <span className="text-stone-400">SPL PEAK:</span>
              <span className="font-bold text-[#A8FF00]">142.4 dB</span>
            </div>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex size-11 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
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
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#A8FF00] to-[#91E600] px-5 text-xs font-mono font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_24px_rgba(168,255,0,0.3)] transition hover:brightness-110 active:scale-[0.98]"
            >
              <MessageCircle className="size-4" />
              <span>CONSULT (0794069405)</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex size-11 items-center justify-center rounded-xl border border-white/15 text-white"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-[#252E25] bg-[#070A07] px-6 py-6"
            >
              <div className="flex flex-col gap-4 font-mono text-sm font-bold">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#A8FF00]">
                  [01] PRODUCT CATALOGUE (67 ITEMS)
                </Link>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#A8FF00]">
                  [02] CUSTOM MDF ENCLOSURE FABRICATION
                </Link>
                <Link href="/build" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#A8FF00]">
                  [03] CUSTOM SYSTEM BRIEF
                </Link>
                <Link href="#dsp-console" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#A8FF00]">
                  [04] 7-BAND PARAMETRIC DSP LAB
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-[#A8FF00]">
                  [05] LUTHULI AVENUE WORKSHOP &amp; AUDITIONS
                </Link>
                <div className="pt-2">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8FF00] py-3.5 font-mono text-xs font-black uppercase tracking-wider text-[#070A07]"
                  >
                    <MessageCircle className="size-4" />
                    CHAT ON WHATSAPP ({whatsappNumber})
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO: THE ACOUSTIC COCKPIT & SOUND STAGE */}
      <section className="relative w-full border-b border-[#252E25] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        {/* Ambient Dark Automotive Grid & Lighting */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute right-0 top-0 h-[600px] w-full lg:w-2/3 bg-[radial-gradient(ellipse_at_70%_30%,rgba(168,255,0,0.12),transparent_70%)]" />
          <div className="absolute -left-20 top-1/3 size-[450px] rounded-full bg-[#A8FF00]/5 blur-[160px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #A8FF00 1px, transparent 1px), linear-gradient(to bottom, #A8FF00 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Bold Typography & Engineering CTAs (7 Cols on Desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow Stamped Tag */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8FF00]/30 bg-black/70 px-4 py-1.5 backdrop-blur-xl w-fit shadow-[0_0_20px_rgba(168,255,0,0.12)]">
                <span className="size-2 rounded-full bg-[#A8FF00] animate-ping" />
                <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#A8FF00] uppercase">
                  NAIROBI CAR AUDIO SPECIALIST
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="font-mono text-[11px] tracking-wider text-stone-300">LUTHULI AVENUE</span>
              </div>

              {/* Official Tagline Headline (Harvested Anton Font for Heavy Visceral Impact) */}
              <div className="mt-6">
                <h1 className="text-[clamp(3.2rem,6.8vw,5.75rem)] font-normal uppercase leading-[0.9] tracking-tight text-white font-impact">
                  <TextEffect per="word" preset="fade-in-blur" delay={0.1}>
                    ADDICTED TO BASS.
                  </TextEffect>
                  <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F7EF] to-[#A8FF00]">
                    DRIVEN BY SOUND.
                  </span>
                </h1>
              </div>

              {/* High-Contrast Technical Subtitle */}
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#C5CEBD] font-sans">
                Nairobi&apos;s premier destination for high-efficiency speaker staging, deep boot subwoofers, custom MDF
                enclosure fabrication and precision DSP tuning. Audition gear before fitment on Luthuli Avenue.
              </p>

              {/* Commercial CTA Cluster */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="group relative inline-flex h-14 items-center justify-center gap-2.5 bg-[#A8FF00] px-8 font-mono text-xs font-black uppercase tracking-widest text-[#070A07] shadow-[0_8px_32px_rgba(168,255,0,0.32)] transition-all duration-300 hover:bg-[#b8ff26] hover:shadow-[0_12px_44px_rgba(168,255,0,0.45)] active:scale-[0.98]"
                >
                  <span>EXPLORE CATALOGUE (67)</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/build"
                  className="group inline-flex h-14 items-center justify-center gap-2.5 border border-white/20 bg-black/60 px-7 font-mono text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-[#A8FF00] hover:text-[#A8FF00] active:scale-[0.98]"
                >
                  <span>CUSTOM SYSTEM BRIEF</span>
                  <ArrowUpRight className="size-4 text-stone-400 group-hover:text-[#A8FF00]" />
                </Link>
              </div>

              {/* Video Audition Quick-Trigger */}
              <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#A8FF00]/40 bg-black/60 px-4 py-2 font-mono text-xs font-semibold text-white backdrop-blur-md transition-all hover:border-[#A8FF00] hover:bg-[#A8FF00]/10"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-black">
                    <Play className="size-2.5 fill-current ml-0.5" />
                  </span>
                  <span>WATCH SONY + BOSCHMANN LIVE SOUND AUDITION</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic BASSADICT Workshop Centerpiece (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Tilt
                rotationFactor={reducedMotion ? 0 : 5}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-[#A8FF00]/30 bg-black/80 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(168,255,0,0.15)] group"
              >
                {/* Authentic BASSADICT Glowing Neon Workshop Rig */}
                <Image
                  src="/images/redesign-v2/neon-sign-workshop.webp"
                  alt="Authentic Bassaddict Sounds KE workshop on Luthuli Avenue with illuminated neon brand sign"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Smoked Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050705] via-transparent to-transparent opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050705]/60 via-transparent to-transparent" />

                {/* Stamped Provenance Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-[#A8FF00]/40 bg-black/85 px-3.5 py-1.5 backdrop-blur-xl">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-white">
                    VERIFIED BASSADICT WORKSHOP
                  </span>
                </div>

                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="flex size-16 items-center justify-center rounded-full bg-[#A8FF00] text-black shadow-[0_0_40px_rgba(168,255,0,0.6)] transition-transform duration-300 group-hover:scale-110 active:scale-95"
                    aria-label="Play Live DSP Sound Audition Video"
                  >
                    <Play className="size-7 fill-current ml-1" />
                  </button>
                </div>

                {/* Bottom Frequency Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/90 px-4 py-3 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex items-end gap-1 h-5">
                      {[16, 28, 12, 32, 24, 18, 30, 22, 26].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 rounded-full bg-[#A8FF00]"
                          style={{
                            height: `${h}px`,
                            animation: reducedMotion ? "none" : `wave-bars 850ms ease-in-out infinite alternate ${i * 100}ms`,
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-bold tracking-wider text-white">LIVE SOUND TUNING</p>
                      <p className="text-[10px] text-stone-400">Sony In-Dash + 7-Band Parametric EQ</p>
                    </div>
                  </div>

                  <span className="rounded bg-[#A8FF00]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#A8FF00]">
                    0794069405
                  </span>
                </div>
              </Tilt>
            </div>
          </div>

          {/* 3. TACTILE ACOUSTIC PRESET SELECTOR DECK */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 pt-10 border-t border-white/10">
            {/* Preset 1: Sub-Bass */}
            <button
              type="button"
              onClick={() => setActivePreset("sub_bass")}
              className={`flex flex-col gap-2 rounded-xl border p-5 text-left transition-all ${
                activePreset === "sub_bass"
                  ? "border-[#A8FF00] bg-[#0E150E] shadow-[0_0_30px_rgba(168,255,0,0.15)]"
                  : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#A8FF00]">[01] SUB-BASS PRESSURE</span>
                <span className="font-mono text-[10px] text-stone-400">20Hz - 60Hz</span>
              </div>
              <p className="text-sm font-bold text-white font-display">Deep Boot &amp; Underseat Woofers</p>
              <p className="text-xs text-stone-400">
                Pioneer 12&quot; Champion Series &amp; Kuerl high-excursion active subwoofers tuned for cabin pressure.
              </p>
            </button>

            {/* Preset 2: Mid-Bass Punch */}
            <button
              type="button"
              onClick={() => setActivePreset("mid_punch")}
              className={`flex flex-col gap-2 rounded-xl border p-5 text-left transition-all ${
                activePreset === "mid_punch"
                  ? "border-[#A8FF00] bg-[#0E150E] shadow-[0_0_30px_rgba(168,255,0,0.15)]"
                  : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#A8FF00]">[02] MID-BASS PUNCH</span>
                <span className="font-mono text-[10px] text-stone-400">80Hz - 250Hz</span>
              </div>
              <p className="text-sm font-bold text-white font-display">Door Pods &amp; 6x9 Speaker Staging</p>
              <p className="text-xs text-stone-400">
                High-sensitivity Kenwood &amp; Pioneer 3-way coaxials reinforced with sound-deadening butyl sheets.
              </p>
            </button>

            {/* Preset 3: Vocal Clarity */}
            <button
              type="button"
              onClick={() => setActivePreset("vocal_clarity")}
              className={`flex flex-col gap-2 rounded-xl border p-5 text-left transition-all ${
                activePreset === "vocal_clarity"
                  ? "border-[#A8FF00] bg-[#0E150E] shadow-[0_0_30px_rgba(168,255,0,0.15)]"
                  : "border-white/10 bg-black/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#A8FF00]">[03] VOCAL CLARITY &amp; HIGHS</span>
                <span className="font-mono text-[10px] text-stone-400">1kHz - 20kHz</span>
              </div>
              <p className="text-sm font-bold text-white font-display">Titanium Bullet &amp; Silk Tweeters</p>
              <p className="text-xs text-stone-400">
                NRD Audio bullet tweeters with passive crossovers delivering crisp speech without ear-piercing fatigue.
              </p>
            </button>
          </div>
        </div>

        {/* 4. MAGIC UI CONTINUOUS MARQUEE BRAND STRIP */}
        <div className="mt-14 border-t border-b border-[#252E25] bg-black/60 py-4 backdrop-blur-md">
          <Marquee pauseOnHover className="[--duration:26s]">
            {brandPartners.map((brand) => (
              <div key={brand} className="flex items-center gap-3 px-6">
                <span className="size-1.5 rounded-full bg-[#A8FF00]" />
                <span className="font-mono text-xs font-bold tracking-widest text-white/70 hover:text-[#A8FF00] transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5. INTERACTIVE DSP PARAMETRIC EQUALIZER BAY */}
      <section id="dsp-console" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A8FF00]">
            ACOUSTIC ENGINEERING LAB
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal uppercase text-white font-impact tracking-tight">
            DSP AUDIO TUNING &amp; FREQUENCY CALIBRATION
          </h2>
          <p className="text-sm text-[#C5CEBD] leading-relaxed font-sans">
            Every vehicle has unique acoustic resonance. Adjust our 7-band parametric equalizer console below to audition
            how BASSADICT balances low-pass filters and cuts harmonic distortion.
          </p>
        </div>

        <DspParametricConsole />
      </section>

      {/* 6. SECTION A3: BESPOKE FABRICATION & WORKSHOP CRAFTSMANSHIP (MAGIC UI BENTO GRID) */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-12 border-t border-white/10">
        <div className="flex flex-col gap-2 max-w-3xl">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A8FF00]">
            BESPOKE WOODCRAFT &amp; FITMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal uppercase text-white font-impact tracking-tight">
            ENGINEERED FOR NAIROBI ROADS. BUILT TO MOVE YOU.
          </h2>
          <p className="text-sm leading-relaxed text-[#C5CEBD] font-sans">
            Every custom sound system is built with physical mathematics: volume-matched MDF ported boxes, factory-safe
            fused distribution wiring, acoustic damping, and in-person showroom testing.
          </p>
        </div>

        {/* Magic UI BentoGrid Matrix */}
        <BentoGrid>
          {/* Card 1: Live Video Demo (2 cols) */}
          <BentoCard
            name="DSP Audio Tuning & Parametric EQ"
            description="Live tuning demonstration of Sony in-dash receiver paired with 7-band Boschmann parametric equalizer, setting low-pass filter cutoff and subwoofer phase alignment."
            Icon={Sliders}
            badge="Live Video Audition"
            href="#dsp-console"
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
                className="h-full w-full object-cover opacity-65 brightness-90"
              />
            }
          />

          {/* Card 2: Custom Enclosures (1 col) */}
          <BentoCard
            name="Custom MDF Subwoofer Boxes"
            description="18mm high-density MDF and fiberglass ported enclosures calculated specifically for your car boot dimensions and subwoofer Thiele/Small parameters."
            Icon={Wrench}
            badge="Custom Woodcraft"
            href="/services"
            className="md:col-span-1"
            background={
              <Image
                src="/images/redesign-v2/subwoofer-tower-enclosure.webp"
                alt="Custom carpeted enclosure build"
                fill
                className="object-cover opacity-50"
              />
            }
          />

          {/* Card 3: OEM Standard Wiring (1 col) */}
          <BentoCard
            name="Clean High-Current Wiring"
            description="Heavy-gauge power cabling, fused distribution blocks with glass/ANL fuses, and isolated chassis grounds to eliminate alternator whine."
            Icon={ShieldCheck}
            badge="Factory Safe"
            href="/services"
            className="md:col-span-1"
            background={
              <Image
                src="/images/redesign-v2/fuse-distribution-block.webp"
                alt="Clean fused power distribution block"
                fill
                className="object-cover opacity-50"
              />
            }
          />

          {/* Card 4: Luthuli Avenue Showroom (2 cols) */}
          <BentoCard
            name="Luthuli Avenue Showroom & Workshop Bay"
            description="Ground Floor, New Loitoktok House, Luthuli Avenue. Audition coaxial 6x9s, bullet tweeters, and underseat subwoofers in person before fitting."
            Icon={Volume2}
            badge="Nairobi Flagship"
            href="/contact"
            cta="Visit Workshop"
            className="md:col-span-2"
            background={
              <Image
                src="/images/redesign-v2/neon-sign-bench.webp"
                alt="Bassaddict workshop neon sign and workbench"
                fill
                className="object-cover opacity-60"
              />
            }
          />
        </BentoGrid>
      </section>

      {/* 7. ACETERNITY UI FOCUS CARDS: VERIFIED HARDWARE DISCOVERY */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A8FF00]">
              AUTHENTIC HARDWARE STOCK
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal uppercase text-white font-impact">
              EXPLORE TESTED CAR AUDIO CATEGORIES
            </h3>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#A8FF00] hover:underline"
          >
            <span>VIEW ALL 67 PRODUCTS</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <FocusCards cards={hardwareFocusItems} />
      </section>

      {/* 8. VIDEO MODAL (AUTHENTIC SOUND TUNING DEMONSTRATION) */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Bassaddict Sound Tuning Video Modal"
          >
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#A8FF00]/40 bg-[#070A07] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0E0A] px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    LIVE SOUND DEMONSTRATION · LUTHULI AVENUE WORKSHOP
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-white/10 hover:text-white transition"
                  aria-label="Close video modal"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-black">
                <video
                  src="/videos/bassaddict-tuning-preview.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="border-t border-white/10 bg-[#0A0E0A] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
                <p>
                  Demonstrates hands-on tuning of in-dash Sony head unit and Boschmann 7-band parametric EQ in our
                  workshop bay.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-[#A8FF00] px-4 py-2 font-mono font-bold text-black hover:bg-[#b8ff26]"
                >
                  BOOK AN IN-PERSON AUDITION
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. MOBILE STICKY THUMB-ZONE BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[#252E25] bg-[#070A07]/98 px-4 py-3 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#A8FF00] font-mono text-xs font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_20px_rgba(168,255,0,0.3)]"
          >
            <MessageCircle className="size-4" />
            <span>WHATSAPP CONSULT</span>
          </a>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-xl border border-white/20 bg-black/60 px-5 font-mono text-xs font-bold text-white"
          >
            CATALOGUE
          </Link>
        </div>
      </div>
    </div>
  );
}

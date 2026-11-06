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
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Tilt } from "@/components/motion-primitives/tilt";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

interface CandidateOneHeroProps {
  whatsappNumber?: string;
  showDockNavigation?: boolean;
}

export function CandidateOneHero({
  whatsappNumber = CANONICAL_WHATSAPP_NUMBER,
  showDockNavigation = true,
}: CandidateOneHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [workshopModalOpen, setWorkshopModalOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const whatsappLink = whatsappHref(whatsappNumber, generalEnquiryMessage());

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  // Keyboard accessibility for modals
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

  const navItems = [
    { label: "HOME", href: "/", icon: Volume2, active: true },
    { label: "AUDIO", href: "/products", icon: Headphones },
    { label: "INSTALL", href: "/services", icon: Wrench },
    { label: "BUILDS", href: "/build", icon: Car },
    { label: "BRANDS", href: "/products", icon: Layers },
    { label: "VISIT US", href: "/contact", icon: MapPin },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#070A07] text-[#F4F7EF] overflow-x-hidden font-sans select-none">
      {/* 1. LEFT VERTICAL RAIL DOCK (Candidate 1 Approved Architecture) */}
      {showDockNavigation && (
        <aside
          aria-label="Sidebar Navigation"
          className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-[74px] flex-col justify-between border-r border-[#A8FF00]/15 bg-[#080808]/90 backdrop-blur-2xl"
        >
          {/* Top Brand Monogram Block */}
          <Link
            href="/"
            className="group flex h-[74px] w-full items-center justify-center bg-[#A8FF00] text-[#070A07] transition-all duration-300 hover:bg-[#c2ff52]"
            title="Bassaddict Sounds KE Home"
          >
            <div className="flex items-center gap-1">
              <span className="h-5 w-1 rounded-full bg-[#070A07] transition-transform duration-300 group-hover:scale-y-125" />
              <span className="h-6 w-1 rounded-full bg-[#070A07] transition-transform duration-300 group-hover:scale-y-90" />
              <span className="text-xl font-black tracking-tighter">B</span>
            </div>
          </Link>

          {/* Center Navigation Icons Stack */}
          <nav className="flex flex-col items-center gap-6 py-6" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative flex flex-col items-center gap-1.5 p-2 transition-colors ${
                    item.active ? "text-[#A8FF00]" : "text-[#899384] hover:text-[#F4F7EF]"
                  }`}
                >
                  <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span className="text-[9px] font-bold tracking-widest uppercase">{item.label}</span>
                  {item.active && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#A8FF00] shadow-[0_0_8px_#A8FF00]"
                    />
                  )}
                  {/* Floating Tooltip */}
                  <span className="pointer-events-none absolute left-full ml-3 hidden rounded border border-[#A8FF00]/25 bg-black/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white whitespace-nowrap shadow-xl group-hover:block z-50">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Action Pill Button */}
          <div className="flex flex-col items-center pb-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex size-11 items-center justify-center rounded-full bg-[#A8FF00] text-[#070A07] shadow-[0_0_20px_rgba(168,255,0,0.3)] transition-all duration-300 hover:scale-110 hover:bg-[#c2ff52]"
              title="Direct WhatsApp Consultation"
            >
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </aside>
      )}

      {/* 2. MOBILE TOP APP BAR (< 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#A8FF00]/15 bg-[#080808]/95 px-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[#A8FF00] text-[#070A07]">
            <span className="h-4 w-1 rounded-full bg-[#070A07] mr-0.5" />
            <span className="text-base font-black tracking-tighter">B</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-wider text-white">BASSADICT</span>
            <span className="text-[9px] tracking-widest uppercase text-[#A8FF00]">Luthuli Ave · Open</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1.5 rounded-full bg-[#A8FF00] px-3 text-[11px] font-bold text-[#070A07]"
          >
            <MessageCircle className="size-3.5" />
            Chat
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded border border-[#A8FF00]/25 text-[#F4F7EF] hover:border-[#A8FF00]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-14 z-30 border-b border-[#A8FF00]/20 bg-[#080808]/98 p-6 backdrop-blur-2xl"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/5 pb-3 text-sm font-semibold tracking-wider text-white hover:text-[#A8FF00]"
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="size-4 text-[#A8FF00]" />
                    {item.label}
                  </span>
                  <ArrowUpRight className="size-4 text-[#899384]" />
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A8FF00] py-3 text-xs font-bold uppercase tracking-widest text-[#070A07]"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp {whatsappNumber}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. HERO CANVAS STAGE */}
      <main
        className={`relative flex min-h-screen flex-col justify-center overflow-hidden ${
          showDockNavigation ? "lg:pl-[74px]" : ""
        }`}
      >
        {/* Subtle Interactive Grid Background */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-15" aria-hidden="true">
          <InteractiveGridPattern
            width={48}
            height={48}
            squares={[36, 24]}
            className="stroke-[#A8FF00]/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]"
          />
        </div>

        {/* Ambient Dark Automotive Lighting Overlays */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute right-0 top-0 h-full w-full lg:w-3/5 bg-[radial-gradient(circle_at_65%_45%,rgba(168,255,0,0.12),transparent_65%)]" />
          <div className="absolute -left-32 top-1/4 size-[500px] rounded-full bg-[#A8FF00]/5 blur-[160px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-transparent to-[#070A07]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A07] via-[#070A07]/60 to-transparent lg:w-3/5" />
        </div>

        {/* 2.5D Parallax Canvas with Subwoofer Installation Imagery */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1580px] flex-col lg:flex-row items-center justify-between px-6 py-12 lg:py-20 xl:px-16">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="w-full lg:max-w-[620px] xl:max-w-[680px] flex flex-col justify-center pt-4 lg:pt-0">
            {/* Studio Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#A8FF00]/30 bg-black/60 px-4 py-1.5 backdrop-blur-xl w-fit shadow-[0_0_24px_rgba(168,255,0,0.12)]"
            >
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#A8FF00] uppercase">
                BASSADICT SOUNDS KE
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-[11px] tracking-wider text-stone-300">Luthuli Avenue Showroom</span>
            </motion.div>

            {/* Main Headline (Condensed Bold Athletic Display) */}
            <h1 className="mt-6 text-[clamp(2.75rem,6.5vw,5.75rem)] font-black uppercase leading-[0.92] tracking-tight text-white font-display">
              <span className="block">PRO SOUND.</span>
              <span className="inline-flex items-baseline">
                BUILT TO MOVE YOU
                <span className="ml-1 inline-block size-3.5 sm:size-4.5 bg-[#A8FF00] shadow-[0_0_12px_#A8FF00]" />
              </span>
            </h1>

            {/* Editorial Rule */}
            <div className="mt-5 h-[1.5px] w-14 bg-[#A8FF00]/80" />

            {/* Subtitle */}
            <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-[#899384] font-normal">
              Premium car audio systems, high-efficiency speakers, deep active subwoofers and tailored vehicle sound
              engineering. Audition gear before install in Nairobi.
            </p>

            {/* CTA Group Matching Candidate 1 */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {/* Primary Action Button */}
              <Link
                href="/products"
                className="group relative inline-flex h-13 items-center justify-center gap-2.5 rounded-none bg-[#A8FF00] px-8 text-xs font-extrabold uppercase tracking-widest text-[#070A07] shadow-[0_8px_32px_rgba(168,255,0,0.25)] transition-all duration-300 hover:bg-[#c2ff52] hover:shadow-[0_12px_44px_rgba(168,255,0,0.4)] active:scale-[0.98]"
              >
                <span>EXPLORE SHOWROOM</span>
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Secondary Action Button */}
              <Link
                href="/build"
                className="group inline-flex h-13 items-center justify-center gap-2.5 border border-white/25 bg-black/40 px-7 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-xl transition-all duration-300 hover:border-[#A8FF00] hover:text-[#A8FF00] hover:bg-black/70 active:scale-[0.98]"
              >
                <span>CUSTOM SYSTEM BRIEF</span>
                <ArrowUpRight className="size-4 text-[#899384] transition-colors duration-300 group-hover:text-[#A8FF00]" />
              </Link>
            </div>

            {/* Interactive Audition Triggers */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-black/40 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md transition-colors hover:border-[#A8FF00] hover:bg-[#A8FF00]/10"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-[#070A07]">
                  <Play className="size-2.5 fill-current ml-0.5" />
                </span>
                <span>Watch Live Sound Tuning (Video)</span>
              </button>

              <button
                type="button"
                onClick={() => setWorkshopModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-[11px] font-semibold text-stone-300 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white"
              >
                <SlidersHorizontal className="size-3.5 text-[#A8FF00]" />
                <span>Bassaddict Neon Workshop Rig</span>
              </button>
            </div>

            {/* Trust Highlighting Bar */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">Live Audition</p>
                  <p className="text-[11px] text-[#899384]">Hear gear before fit</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">Master Fitters</p>
                  <p className="text-[11px] text-[#899384]">OEM clean wiring</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-[#A8FF00] shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">100% Genuine</p>
                  <p className="text-[11px] text-[#899384]">Verified hardware</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Installation Showcase (Interactive 2.5D Tilt) */}
          <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2 flex items-center justify-center">
            <Tilt
              rotationFactor={reducedMotion ? 0 : 6}
              className="relative w-full max-w-[680px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#A8FF00]/25 bg-black/60 shadow-[0_32px_120px_rgba(0,0,0,0.8),0_0_60px_rgba(168,255,0,0.12)] group"
            >
              {/* High-Resolution Vehicle Boot Installation Plate */}
              <Image
                src="/images/hero/candidate-1-hero-bg.webp"
                alt="Bespoke automotive boot audio installation with subwoofer and amplifier"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Edge Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070A07]/50 via-transparent to-transparent" />

              {/* Live Status Overlay Tag */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-black/40 bg-black/75 px-3 py-1.5 backdrop-blur-xl shadow-lg">
                <span className="size-2 rounded-full bg-[#A8FF00] animate-ping" />
                <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                  Custom Fitment Available
                </span>
              </div>

              {/* Bottom Acoustic Frequency Visualizer Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-end gap-1 h-5">
                    {[16, 24, 12, 28, 20, 14, 26, 18, 22].map((height, i) => (
                      <span
                        key={i}
                        className="w-1 rounded-full bg-[#A8FF00]"
                        style={{
                          height: `${height}px`,
                          animation: reducedMotion ? "none" : `wave-bars 900ms ease-in-out infinite alternate ${i * 120}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-white">BASSADICT TUNING</p>
                    <p className="text-[9px] text-[#899384]">High-efficiency 3-way stage balance</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="flex size-8 items-center justify-center rounded-full bg-[#A8FF00] text-[#070A07] hover:scale-105 transition-transform"
                  title="Play Sound Tuning Demonstration"
                >
                  <Play className="size-3.5 fill-current ml-0.5" />
                </button>
              </div>
            </Tilt>
          </div>
        </div>
      </main>

      {/* 4. MODAL: AUTHENTIC LIVE SOUND TUNING VIDEO */}
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
                <span>Boschmann 7-Band Parametric EQ + Sony In-Dash Demo</span>
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

      {/* 5. MODAL: AUTHENTIC NEON WORKSHOP SHOWCASE */}
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

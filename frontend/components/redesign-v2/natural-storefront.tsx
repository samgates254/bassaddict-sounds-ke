"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
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
  Phone,
  ShoppingBag,
  Clock,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Marquee } from "@/components/ui/marquee";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";
import { whatsappHref, generalEnquiryMessage, productEnquiryMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/cart-context";

interface NaturalStorefrontProps {
  whatsappNumber?: string;
}

const BRAND_LOGOS = [
  { name: "Pioneer", src: "/images/brands/pioneer-white.svg", width: 140, height: 35 },
  { name: "Kenwood", src: "/images/brands/kenwood-white.svg", width: 140, height: 35 },
  { name: "Sony", src: "/images/brands/sony.png", width: 110, height: 26, onDark: true },
  { name: "JBL", src: "/images/brands/jbl.png", width: 85, height: 45 },
  { name: "Alpine", src: "/images/brands/alpine.png", width: 130, height: 32 },
  { name: "Rockford Fosgate", src: "/images/brands/rockford-fosgate.png", width: 130, height: 40 },
  { name: "Kicker", src: "/images/brands/kicker.png", width: 120, height: 38 },
  { name: "Focal", src: "/images/brands/focal.png", width: 110, height: 36, onDark: true },
  { name: "Nakamichi", src: "/images/brands/nakamichi.png", width: 120, height: 38, onDark: true },
  { name: "Audiobank", src: "/images/brands/audiobank.png", width: 130, height: 40, onDark: true },
  { name: "Boschmann", src: "/images/brands/boschmann.png", width: 130, height: 36 },
  { name: "NRD Audio", src: "/images/brands/nrd-audio.png", width: 100, height: 36 },
  { name: "JL Audio", src: "/images/brands/jl-audio.png", width: 95, height: 45 },
];

const FEATURED_PRODUCTS = [
  {
    name: "Pioneer TS-W3254 12\" Subwoofer",
    category: "Subwoofers",
    price: "KSh 9,500",
    specs: "1500W Peak · 400W RMS · Dual Voice Coil",
    image: "/images/products/pioneer-ts-w3254.jpg",
    slug: "pioneer-ts-w3254",
  },
  {
    name: "Pioneer GM-E7004 4-Channel Amplifier",
    category: "Amplifiers",
    price: "KSh 14,500",
    specs: "1000W Bridgeable · Class-AB High Output",
    image: "/images/products/pioneer-gm-e7004.jpg",
    slug: "pioneer-gm-e7004",
  },
  {
    name: "Pioneer TS-R6951S 3-Way 6x9s",
    category: "Coaxial Speakers",
    price: "KSh 6,500",
    specs: "400W Max · 92dB Sensitivity · Multilayer Mica",
    image: "/images/products/pioneer-ts-r6951s.jpg",
    slug: "pioneer-ts-r6951s",
  },
  {
    name: "Kuerl Active Underseat Subwoofer",
    category: "Active Bass",
    price: "KSh 12,000",
    specs: "Built-in Amp · Compact Aluminum Die-Cast Enclosure",
    image: "/images/products/kuerl-subwoofer.jpg",
    slug: "kuerl-subwoofer",
  },
  {
    name: "Boschmann 1500W Monoblock Amp",
    category: "Monoblock Amplifiers",
    price: "KSh 13,800",
    specs: "1500W Class-D · Low-Pass Filter · Remote Bass Dial",
    image: "/images/products/boschmann-1500.jpg",
    slug: "boschmann-1500",
  },
];

export function NaturalStorefront({ whatsappNumber = CANONICAL_WHATSAPP_NUMBER }: NaturalStorefrontProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  const generalWhatsapp = whatsappHref(whatsappNumber, generalEnquiryMessage());

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
    <div className="relative w-full bg-[#080B08] text-[#F4F7EF] font-sans selection:bg-[#A8FF00] selection:text-black">
      {/* 1. TOP UTILITY BAR (NATURAL & PROFESSIONAL) */}
      <div className="border-b border-white/10 bg-[#050705] text-[11px] text-[#A6B0A2]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300">
              <MapPin className="size-3 text-[#A8FF00]" />
              Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/15" />
            <span className="hidden sm:flex items-center gap-1 text-stone-400">
              <Clock className="size-3 text-[#A8FF00]" />
              Mon — Sat: 8:30 AM — 6:30 PM
            </span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a
              href={`tel:${whatsappNumber}`}
              className="hidden md:inline-flex items-center gap-1 text-stone-300 hover:text-[#A8FF00] transition"
            >
              <Phone className="size-3 text-[#A8FF00]" />
              Direct Call: {whatsappNumber}
            </a>
            <span className="hidden md:inline h-3 w-px bg-white/15" />
            <a
              href={generalWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#A8FF00] hover:underline"
            >
              <MessageCircle className="size-3" />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN STOREFRONT NAVIGATION WITH REAL BASSADICT LOGO */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080B08]/95 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Real BASSADICT Brand Logo */}
          <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
            <Image
              src="/images/brand/bassaddict-logo.png"
              alt="Bassaddict Sounds KE"
              width={220}
              height={86}
              priority
              className="h-11 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Clean Navigation */}
          <nav
            aria-label="Storefront Categories"
            className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-stone-200"
          >
            <Link href="/products?category=speakers" className="hover:text-[#A8FF00] transition-colors">
              Speakers &amp; 6x9s
            </Link>
            <Link href="/products?category=subwoofers" className="hover:text-[#A8FF00] transition-colors">
              Subwoofers
            </Link>
            <Link href="/products?category=amplifiers" className="hover:text-[#A8FF00] transition-colors">
              Amplifiers
            </Link>
            <Link href="/services" className="hover:text-[#A8FF00] transition-colors">
              Custom Enclosures
            </Link>
            <Link href="/build" className="hover:text-[#A8FF00] transition-colors">
              System Brief
            </Link>
            <Link href="/contact" className="hover:text-[#A8FF00] transition-colors">
              Workshop Bay
            </Link>
          </nav>

          {/* Right Action Icons: Cart, WhatsApp, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex size-11 items-center justify-center rounded-xl border border-white/15 bg-black/50 text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="size-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#A8FF00] text-[10px] font-black text-black">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Consultation Button */}
            <a
              href={generalWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-11 items-center gap-2 rounded-xl bg-[#A8FF00] px-5 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_20px_rgba(168,255,0,0.25)] transition hover:bg-[#b8ff26]"
            >
              <MessageCircle className="size-4" />
              <span>WhatsApp Consult</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex size-11 items-center justify-center rounded-xl border border-white/15 text-white"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-white/10 bg-[#080B08] px-6 py-6"
            >
              <nav className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-white">
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Full Product Catalogue (67 Items)
                </Link>
                <Link href="/products?category=subwoofers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Subwoofers &amp; Underseat Bass
                </Link>
                <Link href="/products?category=speakers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Door Speakers &amp; 6x9s
                </Link>
                <Link href="/products?category=amplifiers" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  4-Channel &amp; Monoblock Amplifiers
                </Link>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Custom MDF Enclosure Fabrication
                </Link>
                <Link href="/build" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Custom Sound System Brief
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#A8FF00]">
                  Luthuli Avenue Showroom &amp; Auditions
                </Link>
                <div className="pt-2">
                  <a
                    href={generalWhatsapp}
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
      </header>

      {/* 3. HERO SECTION: NATURAL, CLEAR & AUTHORITATIVE */}
      <section className="relative w-full border-b border-white/10 overflow-hidden py-12 lg:py-20">
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 bg-[radial-gradient(ellipse_at_60%_40%,rgba(168,255,0,0.08),transparent_65%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B08] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Clear Value Proposition & Commercial CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Provenance Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-black/60 px-4 py-1.5 backdrop-blur-xl w-fit">
                <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
                  AUTHORIZED CAR AUDIO SPECIALIST · NAIROBI
                </span>
              </div>

              {/* Official Tagline Headline */}
              <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight text-white font-display">
                ADDICTED TO BASS.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-100 to-[#A8FF00]">
                  DRIVEN BY SOUND.
                </span>
              </h1>

              {/* Natural High-Contrast Body Copy */}
              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#CBD5C0]">
                Kenya&apos;s premier specialist for high-efficiency speakers, deep underseat subwoofers, custom MDF
                enclosure fabrication, and clean DSP sound tuning. Audition top international brands before installation
                on Luthuli Avenue.
              </p>

              {/* Commercial CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-xl bg-[#A8FF00] px-8 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-[0_4px_24px_rgba(168,255,0,0.3)] transition-all hover:bg-[#b8ff26] active:scale-[0.98]"
                >
                  <span>Shop Catalogue (67 Items)</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/build"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/40 px-6 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition hover:border-[#A8FF00] hover:text-[#A8FF00] active:scale-[0.98]"
                >
                  <span>Custom Enclosure Brief</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-white">In-Person Auditions</p>
                    <p className="text-stone-400">Listen before you install</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Wrench className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Custom Enclosures</p>
                    <p className="text-stone-400">Calculated MDF box builds</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="size-4 text-[#A8FF00] shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Authentic Stock</p>
                    <p className="text-stone-400">Warrantied brand hardware</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Installation Photography with Video Trigger */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_25px_80px_rgba(0,0,0,0.8)] group">
                {/* Authentic Installation Image */}
                <Image
                  src="/images/hero/candidate-1-hero-bg.webp"
                  alt="Automotive boot sound installation with Pioneer subwoofer and high-output amplifier"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Edge Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B08] via-transparent to-transparent opacity-80" />

                {/* Workshop Verification Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-black/40 bg-black/85 px-3.5 py-1.5 backdrop-blur-xl">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-white">
                    Luthuli Avenue Workshop
                  </span>
                </div>

                {/* Play Video Trigger Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="flex size-16 items-center justify-center rounded-full bg-[#A8FF00] text-black shadow-[0_0_35px_rgba(168,255,0,0.5)] transition-transform duration-300 group-hover:scale-110 active:scale-95"
                    aria-label="Play Live DSP Sound Audition Demonstration"
                  >
                    <Play className="size-7 fill-current ml-1" />
                  </button>
                </div>

                {/* Bottom Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl border border-white/10 bg-black/85 px-4 py-3 backdrop-blur-xl">
                  <div>
                    <p className="text-xs font-bold text-white">Live DSP Sound Audition</p>
                    <p className="text-[11px] text-stone-400">Sony In-Dash + Boschmann 7-Band Equalizer</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(true)}
                    className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                  >
                    Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL BRAND LOGO SHOWCASE ("CLEAR REAL LOGOS") */}
      <section className="border-b border-white/10 bg-[#060806] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
              Authorized Brand Hardware
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase text-white font-display">
              Tested International Audio Brands in Stock
            </h2>
          </div>
          <span className="text-xs text-stone-400">100% Genuine Kenyan Stock with Manufacturer Warranty</span>
        </div>

        {/* Real Logos Marquee Ticker */}
        <div className="py-4 overflow-hidden border-y border-white/5 bg-black/40">
          <Marquee pauseOnHover className="[--duration:30s]">
            {BRAND_LOGOS.map((brand) => (
              <div
                key={brand.name}
                className="mx-6 flex h-14 w-36 items-center justify-center opacity-85 transition hover:opacity-100 hover:scale-105"
                title={brand.name}
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  className={`max-h-9 w-auto object-contain ${brand.onDark ? "brightness-0 invert" : ""}`}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 5. FEATURED AUTHENTIC HARDWARE SHOWCASE */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
              Verified Nairobi Hardware
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display">
              Featured Sound Hardware
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A8FF00] hover:underline"
          >
            <span>View All 67 Products</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Real Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {FEATURED_PRODUCTS.map((prod) => {
            const prodOrderLink = whatsappHref(whatsappNumber, productEnquiryMessage(prod.name));
            return (
              <div
                key={prod.slug}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0C100C] p-4 transition-all duration-300 hover:border-[#A8FF00]/40 hover:bg-[#111711] shadow-lg"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 mb-4">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold uppercase text-[#A8FF00]">
                      {prod.category}
                    </span>
                  </div>

                  {/* Title & Specs */}
                  <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#A8FF00] transition-colors">
                    {prod.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {prod.specs}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400">Price</span>
                    <span className="text-base font-extrabold text-white">{prod.price}</span>
                  </div>

                  <a
                    href={prodOrderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#A8FF00] py-2.5 text-xs font-bold uppercase tracking-wider text-[#070A07] hover:bg-[#b8ff26] transition"
                  >
                    <MessageCircle className="size-3.5" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP & WORKSHOP FABRICATION (NATURAL EDITORIAL) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
            Bespoke Audio Fabrication &amp; Engineering
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black uppercase text-white font-display">
            Engineered for Nairobi Roads. Tailored for Sound Enthusiasts.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#CBD5C0]">
            Every vehicle installation is engineered with acoustic mathematics: volume-matched MDF ported boxes,
            factory-safe fused power wiring, sound deadening damping, and in-person DSP tuning on Luthuli Avenue.
          </p>
        </div>

        {/* 4 Clean Workshop Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1: Video Demo */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0C100C] overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/videos/bassaddict-tuning-preview.mp4"
                poster="/images/hero/tuning-video-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover opacity-75"
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-[#A8FF00]">
                Live Workshop Demonstration
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">DSP Audio Tuning &amp; Equalization</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Live hands-on demonstration of in-dash Sony head unit paired with a 7-band Boschmann parametric
                  equalizer, calibrating low-pass filter cutoff, phase alignment, and eliminating harmonic distortion.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#A8FF00]">Audition Bench</span>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  <Play className="size-3.5 fill-current" />
                  Watch Full Clip
                </button>
              </div>
            </div>
          </div>

          {/* Feature 2: Custom Enclosures */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0C100C] overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              <Image
                src="/images/hero/candidate-1-hero-bg.webp"
                alt="Custom MDF subwoofer enclosure"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-[#A8FF00]">
                MDF &amp; Fiberglass Woodcraft
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">Custom Subwoofer Enclosures</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  High-density 18mm MDF ported or sealed boxes calculated specifically for your car boot dimensions and
                  subwoofer Thiele/Small parameters for maximum acoustic pressure without box port huffing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#A8FF00]">Custom Build</span>
                <Link
                  href="/build"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Start Build Brief &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 3: Safe Wiring */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0C100C] overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              <Image
                src="/images/redesign-v2/fuse-distribution-block.webp"
                alt="Clean fused power distribution block"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-[#A8FF00]">
                Clean Electrical Safety
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">OEM-Standard Clean Wiring</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Heavy-gauge power cabling, multi-way fused distribution blocks with glass and ANL fuses, and isolated
                  chassis grounds protecting vehicle electronics and eliminating alternator whine.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#A8FF00]">Factory Safe</span>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Wiring Specs &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Feature 4: Luthuli Avenue Flagship */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0C100C] overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              <Image
                src="/images/redesign-v2/neon-sign-bench.webp"
                alt="Bassaddict workshop neon sign and workbench"
                fill
                className="object-cover opacity-65"
              />
              <div className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-[#A8FF00]">
                Nairobi Flagship Workshop
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">Luthuli Avenue Showroom &amp; Fitting Bay</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Ground Floor, New Loitoktok House, Luthuli Avenue. Audition coaxial 6x9s, bullet tweeters, and active
                  underseat subwoofers in person on our test rig before committing to vehicle installation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#A8FF00]">Luthuli Ave</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Visit Showroom &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTHENTIC WORKSHOP LOCATION & HOURS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#0C100C] p-8 sm:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
              Visit Us in Nairobi
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-black uppercase text-white font-display">
              Ready to Upgrade Your Vehicle&apos;s Sound?
            </h3>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              Drop by our workshop on Luthuli Avenue or send us a WhatsApp message with your vehicle make and budget.
              We&apos;ll recommend the exact speaker sizes, amp impedance, and enclosure design for your car.
            </p>
            <p className="mt-4 text-xs font-mono text-[#A8FF00]">
              Ground Floor, New Loitoktok House, Luthuli Avenue, Nairobi
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <a
              href={generalWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#A8FF00] px-8 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-lg hover:bg-[#b8ff26] transition"
            >
              <MessageCircle className="size-4" />
              <span>Chat on WhatsApp ({whatsappNumber})</span>
            </a>

            <Link
              href="/contact"
              className="flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-white/20 bg-black/40 px-6 text-xs font-bold uppercase tracking-wider text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              Workshop Map &amp; Directions
            </Link>
          </div>
        </div>
      </section>

      {/* 8. VIDEO AUDITION MODAL */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Sound Audition Video"
          >
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-[#080B08] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#0C100C] px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Sound Demonstration · Luthuli Avenue Workshop
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="rounded-lg p-1.5 text-stone-400 hover:bg-white/10 hover:text-white transition"
                  aria-label="Close video"
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

              <div className="border-t border-white/10 bg-[#0C100C] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
                <p>
                  Demonstrates hands-on tuning of in-dash Sony head unit and Boschmann 7-band parametric EQ in our
                  Luthuli workshop bay.
                </p>
                <a
                  href={generalWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-[#A8FF00] px-4 py-2 font-bold text-black hover:bg-[#b8ff26]"
                >
                  Book In-Person Audition
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. MOBILE STICKY THUMB-ZONE BAR */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/15 bg-[#080B08]/98 px-4 py-3 backdrop-blur-2xl shadow-2xl">
        <div className="flex items-center gap-3">
          <a
            href={generalWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-[#A8FF00] text-xs font-black uppercase tracking-wider text-[#070A07] shadow-lg"
          >
            <MessageCircle className="size-4" />
            <span>WhatsApp Consult</span>
          </a>
          <Link
            href="/products"
            className="flex h-12 items-center justify-center rounded-xl border border-white/20 bg-black/60 px-5 text-xs font-bold text-white"
          >
            Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}

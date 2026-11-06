"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurText } from "@/components/ui/blur-text";
import { Marquee } from "@/components/ui/marquee";
import { WorkshopPictureTiles } from "./workshop-picture-tiles";
import {
  ArrowRight,
  MessageCircle,
  Building2,
  ShieldCheck,
  PhoneCall,
  Volume2,
  Zap,
  Radio,
  Sliders,
  Sparkles,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

// Verified BASSADICT WhatsApp URL with canonical phone 0794069405
const BASSADICT_PHONE = "254794069405";
const createWhatsAppHref = (message: string) =>
  `https://wa.me/${BASSADICT_PHONE}?text=${encodeURIComponent(message)}`;

export interface SpecimenItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  price: number;
  specs: { label: string; value: string }[];
  description: string;
  status: string;
}

export const SPECIMENS: Record<string, SpecimenItem> = {
  subwoofers: {
    id: "prod-sub-001",
    slug: "pioneer-ts-w3254-subwoofer",
    name: "Pioneer TS-W3254 12\" Subwoofer",
    category: "Subwoofers & Bass Drivers",
    brand: "Pioneer",
    image: "/products/pioneer-ts-w3254.jpg",
    price: 9500,
    specs: [
      { label: "Diameter", value: "12\" / 30cm Cone" },
      { label: "Max Power", value: "1500 Watts Peak" },
      { label: "Continuous", value: "400 Watts RMS" },
      { label: "Impedance", value: "Dual 4-Ohm Voice Coil" },
    ],
    description: "Champion Series high-excursion driver engineered for authoritative low-frequency impact and deep acoustic pressure.",
    status: "In Stock · Luthuli Ave Bay",
  },
  coaxials: {
    id: "prod-coax-002",
    slug: "pioneer-ts-r6951s-coaxial",
    name: "Pioneer TS-R6951S 3-Way 6x9",
    category: "Coaxial Speaker Systems",
    brand: "Pioneer",
    image: "/products/pioneer-ts-r6951s.jpg",
    price: 6500,
    specs: [
      { label: "Configuration", value: "6\" x 9\" 3-Way Triaxial" },
      { label: "Max Power", value: "400 Watts Peak" },
      { label: "Sensitivity", value: "92 dB SPL" },
      { label: "Cone", value: "Multilayer Mica Matrix" },
    ],
    description: "High-sensitivity automotive 3-way stage delivering wide-dispersion midrange clarity and crisp highs for parcel shelf mounts.",
    status: "In Stock · Luthuli Ave Bay",
  },
  tweeters: {
    id: "prod-tweet-003",
    slug: "pioneer-ts-b350pro-bullet",
    name: "Pioneer TS-B350PRO Bullet Tweeters",
    category: "Compression Bullet Horns",
    brand: "Pioneer",
    image: "/products/pioneer-ts-b350pro.jpg",
    price: 4800,
    specs: [
      { label: "Diaphragm", value: "Titanium Compression" },
      { label: "Max Power", value: "300 Watts Max Pair" },
      { label: "Efficiency", value: "100 dB SPL (1W/1m)" },
      { label: "Enclosure", value: "Die-Cast Aluminium Chassis" },
    ],
    description: "High-SPL PRO series bullet compression tweeters engineered to cut through heavy sub-bass with surgical high-end clarity.",
    status: "In Stock · Ready to Mount",
  },
  amplifiers: {
    id: "prod-amp-004",
    slug: "pioneer-gm-a6704-amplifier",
    name: "Pioneer GM-A6704 4-Channel Amplifier",
    category: "Bridgeable Power Amplification",
    brand: "Pioneer",
    image: "/products/pioneer-gm-a6704.jpg",
    price: 14500,
    specs: [
      { label: "Topology", value: "4-Channel Class AB Stage" },
      { label: "Peak Output", value: "1000 Watts Bridgeable" },
      { label: "Protection", value: "Thermal & Current Limiting" },
      { label: "Crossover", value: "Variable LPF / HPF Filters" },
    ],
    description: "High-current multi-channel workhorse built to power high-SPL midrange coaxials and bridged subwoofers with low total harmonic distortion.",
    status: "In Stock · Bench-Tested",
  },
};

const SIGNAL_TABS = [
  { id: "subwoofers", label: "01. SUBWOOFERS", sublabel: "12\" Deep Bass Drivers", icon: Volume2 },
  { id: "coaxials", label: "02. 6x9 COAXIALS", sublabel: "3-Way High-SPL Systems", icon: Sliders },
  { id: "tweeters", label: "03. BULLET TWEETERS", sublabel: "Titanium Compression Horns", icon: Radio },
  { id: "amplifiers", label: "04. 4-CH AMPS", sublabel: "1000W Bridgeable Power", icon: Zap },
];

export const BRAND_MARQUEE_ITEMS = [
  { name: "PIONEER", models: "16+ Models", category: "Champion Subs & PRO Tweeters", logo: "/images/brands/pioneer-white.svg" },
  { name: "KENWOOD", models: "10+ Models", category: "4-Ch Amplifiers & Head Units", logo: "/images/brands/kenwood-white.svg" },
  { name: "SONY", models: "8+ Models", category: "High-Res Bluetooth Source Units", logo: "/images/brands/sony.png" },
  { name: "JBL", models: "9+ Models", category: "Club Series & Stadium Audio", logo: "/images/brands/jbl.png" },
  { name: "ALPINE", models: "6+ Models", category: "Precision Sound Processors", logo: "/images/brands/alpine.png" },
  { name: "ROCKFORD FOSGATE", models: "5+ Models", category: "Punch & Prime Amplifiers", logo: "/images/brands/rockford-fosgate.png" },
  { name: "KICKER", models: "7+ Models", category: "CompVR & CX Monoblocks", logo: "/images/brands/kicker.png" },
  { name: "FOCAL", models: "4+ Models", category: "Access & Auditor Component Sets", logo: "/images/brands/focal.png" },
  { name: "NAKAMICHI", models: "6+ Models", category: "DSP Sound Field Processors", logo: "/images/brands/nakamichi.png" },
  { name: "BOSCHMANN", models: "5+ Models", category: "BM Audio 7-Band Graphic EQs", logo: "/images/brands/boschmann.png" },
  { name: "AUDIOBANK", models: "4+ Models", category: "High-Current Sub Monoblocks", logo: "/images/brands/audiobank.png" },
  { name: "JL AUDIO", models: "3+ Models", category: "W0 & W3 Bass Enclosures", logo: "/images/brands/jl-audio.png" },
];

export function HeroBento({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState("subwoofers");
  const { addItem } = useCart();
  const [addedItem, setAddedItem] = useState(false);

  const specimen = SPECIMENS[activeTab] || SPECIMENS.subwoofers;

  const handleAddToCart = () => {
    addItem({
      slug: specimen.slug,
      name: specimen.name,
      price: String(specimen.price),
      image_url: specimen.image,
      brand: specimen.brand,
    });
    setAddedItem(true);
    setTimeout(() => setAddedItem(false), 2000);
  };

  const consultWhatsAppHref = createWhatsAppHref(
    `Hello BASSADICT SOUNDS KE, I am viewing the storefront hero and would like to inquire about ${specimen.name} (Ref: ${specimen.slug}, KSh ${specimen.price.toLocaleString()}) available at Ground Floor New Loitoktok House.`
  );

  return (
    <section
      aria-label="Bassaddict Storefront Hero Bento"
      className={`relative overflow-hidden bg-[#070A07] text-[#F4F7EF] ${className}`}
    >
      {/* Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 65% 15%, rgba(168, 255, 0, 0.22) 0%, transparent 60%), radial-gradient(circle at 15% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 55%)",
        }}
      />

      {/* Subtle Precision Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F4F7EF 1px, transparent 1px), linear-gradient(to bottom, #F4F7EF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
        {/* 1. TOP OPERATIONAL PILL */}
        <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0E130E]/90 px-3.5 py-1 backdrop-blur-md">
            <span className="flex size-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <AnimatedShinyText className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-neutral-300 uppercase">
              Specialist Automotive Audio & Fabrication · Nairobi CBD
            </AnimatedShinyText>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span>Ground Floor · New Loitoktok House · Luthuli Ave</span>
            <span className="size-1 rounded-full bg-neutral-600" />
            <span className="text-[#A8FF00]">Mon–Sat 8:00 AM – 7:00 PM</span>
          </div>
        </div>

        {/* 2. EDITORIAL COMMAND HEADER */}
        <div className="mb-6 sm:mb-8 max-w-4xl">
          <BlurText
            text="ADDICTED TO BASS. DRIVEN BY SOUND."
            highlightText="DRIVEN BY SOUND."
            highlightClassName="text-[#A8FF00]"
            className="font-impact text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            delay={25}
          />
          <p className="mt-2.5 sm:mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
            Direct from Ground Floor New Loitoktok House, Luthuli Ave in Nairobi CBD. Explore Kenya&apos;s verified
            automotive audio catalogue — high-SPL bullet tweeters, competition subwoofers, custom MDF enclosures, and heavy-duty
            4-channel amplifiers with physical bench testing and transparent WhatsApp quotations.
          </p>

          {/* Action CTAs */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#catalogue"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A8FF00] px-5 py-2.5 font-display text-sm sm:text-base font-bold tracking-tight text-[#070A07] uppercase transition-all hover:bg-[#BEFF33] hover:shadow-lg hover:shadow-[#A8FF00]/20 focus:outline-none focus:ring-2 focus:ring-[#A8FF00]"
            >
              <span>Explore 67 Catalogue Specimens</span>
              <ArrowRight className="size-4" />
            </a>

            <a
              href={consultWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#0E130E] px-5 py-2.5 font-display text-sm sm:text-base font-bold tracking-tight text-white uppercase transition-all hover:border-[#A8FF00]/50 hover:bg-[#141B14] focus:outline-none focus:ring-2 focus:ring-[#A8FF00]"
            >
              <MessageCircle className="size-4 text-[#A8FF00]" />
              <span>WhatsApp Consult (0794069405)</span>
            </a>
          </div>
        </div>

        {/* 3. THE 12-COLUMN HERO BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column (5 cols): Magic UI Acoustic Video Theater */}
          <div className="lg:col-span-5 flex flex-col">
            <HeroVideoDialog
              className="h-full"
              videoSrc="/videos/bassaddict-tuning-preview.mp4"
              previewVideoSrc="/videos/bassaddict-tuning-preview.mp4"
              thumbnailSrc="/images/hero/tuning-video-poster.jpg"
              thumbnailAlt="BASSADICT workshop bench audio tuning demonstration"
              badgeText="Authentic Tuning Session · Workshop Bay"
              title="Hands-On Bench & DSP Calibration"
              subtitle="Live tuning demonstration of Sony source unit & Boschmann parametric EQ at Ground Floor New Loitoktok House."
            />
          </div>

          {/* Right Column (7 cols): Tactile Tabs + Spotlight Specimen Plate */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Tactile Signal Tabs (Motion Primitives Animated Background) */}
            <div
              role="tablist"
              aria-label="Hardware specimen categories"
              className="inline-flex w-full items-center rounded-xl border border-white/10 bg-[#0A0E0A] p-1.5 shadow-inner"
            >
              <AnimatedBackground
                defaultValue={activeTab}
                className="rounded-lg border border-[#A8FF00]/40 bg-[#121812] shadow-md"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                onValueChange={(val) => {
                  if (val) setActiveTab(val);
                }}
              >
                {SIGNAL_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      data-id={tab.id}
                      type="button"
                      className={`flex-1 flex-col py-2 px-1.5 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8FF00] ${
                        isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <Icon className={`size-3.5 ${isActive ? "text-[#A8FF00]" : "text-neutral-500"}`} />
                        <span className="font-display text-xs sm:text-sm font-bold tracking-tight uppercase">
                          {tab.label}
                        </span>
                      </div>
                      <span className="hidden sm:block font-mono text-[9px] tracking-wider text-neutral-400">
                        {tab.sublabel}
                      </span>
                    </button>
                  );
                })}
              </AnimatedBackground>
            </div>

            {/* Spotlight Specimen Plate (React Bits SpotlightCard) */}
            <div className="flex-1">
              <SpotlightCard
                className="h-full border border-white/10 bg-[#0E130E] p-4 sm:p-5 text-neutral-100 relative flex flex-col justify-between"
                spotlightColor="rgba(168, 255, 0, 0.22)"
              >
                <BorderBeam size={80} duration={12} delay={0} colorFrom="#A8FF00" colorTo="#3B82F6" />

                <div>
                  {/* Top Specimen Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8FF00] font-semibold">
                          {specimen.category}
                        </span>
                        <span className="text-white/20">/</span>
                        <span className="font-mono text-[10px] text-neutral-400">
                          {specimen.brand}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-lg sm:text-2xl font-bold tracking-tight text-white uppercase">
                        {specimen.name}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-[#A8FF00]/30 bg-[#A8FF00]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#A8FF00]">
                        <CheckCircle2 className="size-3" />
                        <span>{specimen.status}</span>
                      </div>
                      <div className="mt-1 font-impact text-xl sm:text-2xl font-bold text-white tracking-tight">
                        KSh {specimen.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Body: Specimen Photography + Technical Telemetry */}
                  <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Authentic Product Image with Pedestal Glow */}
                    <div className="sm:col-span-5 relative aspect-square rounded-xl border border-white/15 bg-gradient-to-b from-[#0D120D] to-[#040604] overflow-hidden p-4 flex items-center justify-center group shadow-inner">
                      {/* Radial Acoustic Pedestal Underglow */}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                        style={{
                          background: "radial-gradient(circle at 50% 70%, rgba(168, 255, 0, 0.28) 0%, transparent 65%)",
                        }}
                      />
                      <Image
                        src={specimen.image}
                        alt={specimen.name}
                        width={360}
                        height={360}
                        priority
                        className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                        Authentic BASSADICT Specimen
                      </span>
                    </div>

                    {/* Spec Matrix */}
                    <div className="sm:col-span-7 flex flex-col justify-between">
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-2 mb-3">
                        {specimen.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        {specimen.specs.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-white/10 bg-[#090D09]/80 backdrop-blur-md p-2 hover:border-[#A8FF00]/40 transition-colors"
                          >
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                              {item.label}
                            </span>
                            <DecryptedText
                              text={item.value}
                              speed={25}
                              maxIterations={5}
                              className="font-bold text-neutral-100 text-[11px] sm:text-xs mt-0.5 truncate block"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Add to Cart + WhatsApp */}
                <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <ShieldCheck className="size-4 text-[#A8FF00]" />
                    <span>Tested on Workshop Bench Before Dispatch</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-xs sm:text-sm font-bold uppercase transition-all ${
                        addedItem
                          ? "bg-green-500 text-black"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      <ShoppingCart className="size-3.5" />
                      <span>{addedItem ? "Added!" : "Add to Cart"}</span>
                    </button>

                    <a
                      href={consultWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#A8FF00] hover:bg-[#BEFF33] px-4 py-2 font-display text-xs sm:text-sm font-bold uppercase text-[#070A07] transition-all"
                    >
                      <MessageCircle className="size-3.5" />
                      <span>Inquire (0794069405)</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* 4. VERIFIED BRAND LOGOS MARQUEE LOOP WITH LUXURY EDGE MASKS */}
        <div className="mt-6 sm:mt-8 relative overflow-hidden rounded-2xl border border-white/10 bg-[#080B08] py-4 px-3 sm:px-6 shadow-2xl">
          <div className="mb-2.5 flex items-center justify-between border-b border-white/5 pb-2.5 px-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                Verified Automotive Audio Brands in Stock
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
              <ShieldCheck className="size-3 text-[#A8FF00]" />
              <span>CBD Workshop Genuine Warranty</span>
            </div>
          </div>

          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee pauseOnHover className="[--duration:28s]">
              {BRAND_MARQUEE_ITEMS.map((brand, idx) => (
                <div
                  key={idx}
                  className="group relative flex w-56 sm:w-64 cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-[#0E130E] px-4 py-3 transition-all duration-300 hover:border-[#A8FF00]/50 hover:bg-[#141B14] hover:shadow-[0_4px_20px_rgba(168,255,0,0.1)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={28}
                        height={28}
                        className="max-h-full max-w-full object-contain filter brightness-100"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display text-sm font-bold tracking-tight text-white uppercase group-hover:text-[#A8FF00] transition-colors">
                          {brand.name}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] text-neutral-400 block truncate max-w-[140px]">
                        {brand.category}
                      </span>
                    </div>
                  </div>

                  <span className="rounded bg-black/80 border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-[#A8FF00] font-bold shrink-0">
                    {brand.models}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* 5. LOWER MERCHANT CREDIBILITY STRIP */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3.5 border-t border-white/10 pt-5">
          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#080B08] p-4 hover:border-[#A8FF00]/25 transition-colors">
            <Building2 className="size-5 text-[#A8FF00] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
                Physical CBD Workshop & Bay
              </span>
              <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed">
                Ground Floor New Loitoktok House, Luthuli Ave, Nairobi. Mon–Sat 8:00 AM – 7:00 PM.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#080B08] p-4 hover:border-[#3B82F6]/25 transition-colors">
            <Radio className="size-5 text-[#3B82F6] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
                67 Tested Hardware Specimens
              </span>
              <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed">
                Subwoofers, Coaxials, Bullet Tweeters, Amplifiers, Equalizers & Custom MDF Enclosures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#080B08] p-4 hover:border-[#A8FF00]/25 transition-colors">
            <PhoneCall className="size-5 text-[#A8FF00] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
                0794069405 Direct Consult
              </span>
              <p className="mt-0.5 text-xs text-neutral-400 leading-relaxed">
                Technical guidance, live audio demonstrations & verified nationwide parcel dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* 6. SWEETNESS TILES: AUTHENTIC WORKSHOP PICTURE BENTO */}
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-10 sm:pt-14">
          <WorkshopPictureTiles />
        </div>
      </div>
    </section>
  );
}

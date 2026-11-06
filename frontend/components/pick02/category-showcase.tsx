"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Volume2,
  Radio,
  Zap,
  Sliders,
  Tv,
  Cable,
  Flame,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "@/lib/fallback-catalog";

const BASSADICT_PHONE = "254794069405";
const createWhatsAppHref = (message: string) =>
  `https://wa.me/${BASSADICT_PHONE}?text=${encodeURIComponent(message)}`;

interface DepartmentConfig {
  slug: string;
  deptNum: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  span: string;
  minHeight: string;
  image: string;
  accentColor: string;
  keySpecs: string[];
  featuredProduct: string;
  priceNote: string;
}

export const DEPARTMENTS: DepartmentConfig[] = [
  {
    slug: "subwoofers",
    deptNum: "DEPT 01",
    badge: "12\" Champion & Underseat",
    title: "Subwoofers & Bass Drivers",
    subtitle: "High-excursion bass drivers engineered for authoritative SPL pressure, deep low-frequency extension, and vibration-damped boot performance.",
    icon: Volume2,
    span: "lg:col-span-7",
    minHeight: "min-h-[380px] sm:min-h-[420px]",
    image: "/products/pioneer-ts-w3254.jpg",
    accentColor: "#A8FF00",
    keySpecs: ["1500W Max Peak", "400W Continuous RMS", "Dual 4Ω Voice Coils", "Reinforced Mica Cone"],
    featuredProduct: "Pioneer TS-W3254 Champion Series",
    priceNote: "Bench-Tested · In Showroom",
  },
  {
    slug: "speakers",
    deptNum: "DEPT 02",
    badge: "High-SPL Coaxials & Horns",
    title: "Speakers & Bullet Tweeters",
    subtitle: "Precision titanium compression bullet tweeters, 3-way 6x9 triaxials, and component door stages delivering surgical high-frequency cut and warm midrange vocal clarity.",
    icon: Radio,
    span: "lg:col-span-5",
    minHeight: "min-h-[380px] sm:min-h-[420px]",
    image: "/products/pioneer-ts-b350pro.jpg",
    accentColor: "#A8FF00",
    keySpecs: ["Titanium Diaphragms", "100dB High Efficiency", "3-Way Coaxial Staging", "Die-Cast Frames"],
    featuredProduct: "Pioneer TS-B350PRO & TS-R6951S",
    priceNote: "Precision-Voiced · In Showroom",
  },
  {
    slug: "amplifiers",
    deptNum: "DEPT 03",
    badge: "Class AB & Monoblocks",
    title: "Power Amplification Stages",
    subtitle: "Heavy-duty multi-channel and bridgeable power stages equipped with extruded aluminum heat sinks, MOSFET switching power supplies, and thermal safeguards.",
    icon: Zap,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[340px] sm:min-h-[380px]",
    image: "/products/pioneer-gm-a6704.jpg",
    accentColor: "#3B82F6",
    keySpecs: ["1000W Bridgeable 4-Ch", "MOSFET Switching", "Active Low/High-Pass Filters"],
    featuredProduct: "Pioneer GM-A6704 & Kenwood KAC",
    priceNote: "High-Current Class AB & D",
  },
  {
    slug: "car-radios",
    deptNum: "DEPT 04",
    badge: "Bluetooth & DSP Source Units",
    title: "Car Radios & Receivers",
    subtitle: "Lossless in-dash source units featuring high-speed Bluetooth 5.0 streaming, front USB, FLAC decoding, and multi-band digital sound processing.",
    icon: Sliders,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[340px] sm:min-h-[380px]",
    image: "/products/pioneer-mvh-245bt.jpg",
    accentColor: "#A8FF00",
    keySpecs: ["Bluetooth Handsfree", "FLAC / MP3 / WMA", "Front USB + AUX", "RCA Pre-Outs"],
    featuredProduct: "Pioneer MVH-245BT Digital Receiver",
    priceNote: "Lossless BT 5.0 & DSP Ready",
  },
  {
    slug: "cables-connectors",
    deptNum: "DEPT 05",
    badge: "Zero-Gauge OFC & Signal",
    title: "Cables & Wiring Infrastructure",
    subtitle: "Oxygen-free high-current power cabling, shielded double-insulated RCA interconnects, gold-plated ring terminals, and ANL fuse distribution blocks.",
    icon: Cable,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[340px] sm:min-h-[380px]",
    image: "/products/speaker-cable-gauge.jpg",
    accentColor: "#3B82F6",
    keySpecs: ["4-Gauge & 0-Gauge OFC", "Shielded 2-by-1 RCAs", "High-Current Fuse Holders"],
    featuredProduct: "Heavy-Duty Installation Looms",
    priceNote: "0 & 4 Gauge OFC Copper",
  },
  {
    slug: "monitors",
    deptNum: "DEPT 06",
    badge: "In-Dash & Reverse Vision",
    title: "Displays & In-Dash Monitors",
    subtitle: "High-definition capacitive touchscreens, OEM dashboard replacement fascia panels, Android Auto integration, and night-vision rear camera kits.",
    icon: Tv,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[320px] sm:min-h-[360px]",
    image: "/products/monitor-9-inch.jpg",
    accentColor: "#A8FF00",
    keySpecs: ["9\" / 7\" IPS Touchscreens", "Android Auto & CarPlay", "AHD Night Vision Cameras"],
    featuredProduct: "9-Inch Universal Android In-Dash",
    priceNote: "IPS Touch & Camera Ready",
  },
  {
    slug: "lighting-accessories",
    deptNum: "DEPT 07",
    badge: "Smart LED & Matrix Panels",
    title: "Lighting & Cockpit Atmosphere",
    subtitle: "Programmable dynamic Devil's Eye LED matrix screens, sound-synced ambient neon strips, and video distribution splitters for complete cabin aesthetics.",
    icon: Sparkles,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[320px] sm:min-h-[360px]",
    image: "/products/devils-eye.jpg",
    accentColor: "#A8FF00",
    keySpecs: ["Devil's Eye Matrix", "16M Color Sound-Sync", "Bluetooth App Control"],
    featuredProduct: "Devil's Eye Matrix & Smart Neon Strips",
    priceNote: "Custom Fit & Consultation",
  },
  {
    slug: "electronics-power",
    deptNum: "DEPT 08",
    badge: "EQ Tuning & Bench PSUs",
    title: "Equalizers & Bench Power Supplies",
    subtitle: "Precision 7-band parametric and graphic equalizers with dedicated subwoofer level control, alongside 12V 30A bench power supplies for pre-install testing.",
    icon: Cpu,
    span: "sm:col-span-1 lg:col-span-4",
    minHeight: "min-h-[320px] sm:min-h-[360px]",
    image: "/products/boschmann-eqx75.jpg",
    accentColor: "#3B82F6",
    keySpecs: ["7-Band Parametric Control", "Subwoofer Gain & Freq Dial", "12V 30A Stabilized PSU"],
    featuredProduct: "Boschmann EQX-75 & Bench Units",
    priceNote: "7-Band Tuning & Regulated PSUs",
  },
];

export function CategoryShowcase({
  onSelectCategory,
  className = "",
}: {
  onSelectCategory?: (slug: string) => void;
  className?: string;
}) {
  const totalProducts = FALLBACK_PRODUCTS.length;

  const quickEnquiryHref = createWhatsAppHref(
    "Hello BASSADICT SOUNDS KE, I would like to consult with your Nairobi CBD workshop regarding the equipment departments in your catalogue."
  );

  return (
    <section
      id="category-showcase"
      aria-labelledby="category-showcase-title"
      className={`relative w-full border-b border-white/10 bg-[#070A07] py-16 sm:py-24 text-[#F4F7EF] ${className}`}
    >
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(168, 255, 0, 0.18) 0%, transparent 50%), radial-gradient(circle at 90% 75%, rgba(59, 130, 246, 0.14) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-[#0E130E] px-3.5 py-1 backdrop-blur-md mb-3">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
                CANONICAL AUDIO HARDWARE DEPARTMENTS
              </span>
            </div>
            <h2
              id="category-showcase-title"
              className="font-impact text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              ENGINEERED AUTOMOTIVE AUDIO DEPARTMENTS.
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Explore 8 specialized pro-audio categories verified on our Luthuli Avenue testing bench.
              From 1500W Champion subwoofers and titanium bullet compression horns to custom MDF enclosure tuning and heavy-duty 4-channel power stages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <div className="rounded-xl border border-white/10 bg-[#0E130E] p-3 text-left">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block">
                Total Catalogue
              </span>
              <span className="font-impact text-2xl font-bold text-white tracking-tight">
                {totalProducts} Published Specimens
              </span>
            </div>

            <a
              href={quickEnquiryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#A8FF00]/40 bg-[#0E130E] px-4 py-3 font-display text-xs sm:text-sm font-bold uppercase text-[#A8FF00] transition-all hover:bg-[#A8FF00] hover:text-[#070A07] hover:shadow-[0_0_25px_rgba(168,255,0,0.3)]"
            >
              <PhoneCall className="size-4" />
              <span>CBD Counter Line (0794069405)</span>
            </a>
          </div>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          {DEPARTMENTS.map((dept, idx) => {
            const Icon = dept.icon;
            const isHero = dept.slug === "subwoofers";
            const isSpeakers = dept.slug === "speakers";

            return (
              <div
                key={dept.slug}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0B0F0B] p-5 sm:p-6 shadow-2xl transition-all duration-500 hover:border-[#A8FF00]/60 hover:shadow-[0_20px_60px_rgba(168,255,0,0.15)] ${dept.span} ${dept.minHeight}`}
              >
                {/* Border Beam on Hero Subwoofer Tile */}
                {isHero && (
                  <BorderBeam size={100} duration={12} delay={0} colorFrom="#A8FF00" colorTo="#3B82F6" />
                )}

                {/* Background Artwork Layer with Subtle Gradient Overlay */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                  <div
                    className="absolute right-0 top-0 h-full w-2/3 sm:w-1/2 opacity-25 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-105 transform origin-top-right"
                    style={{
                      backgroundImage: `url(${dept.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center right",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B08] via-[#080B08]/85 to-[#080B08]/40" />
                </div>

                {/* Top Bar: Dept Number, Badge & Icon */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#A8FF00] tracking-wider">
                      {dept.deptNum}
                    </span>
                    <span className="text-white/20">/</span>
                    <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] text-neutral-300 uppercase tracking-wider backdrop-blur-md">
                      {dept.badge}
                    </span>
                    <span className="rounded-full border border-[#A8FF00]/30 bg-[#A8FF00]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[#A8FF00]">
                      {FALLBACK_PRODUCTS.filter((p) => p.category?.slug === dept.slug).length} Models
                    </span>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-black/60 text-[#A8FF00] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#A8FF00] group-hover:text-black">
                    <Icon className="size-5" />
                  </div>
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="relative z-10 my-4">
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-[#A8FF00]">
                    {dept.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-300 font-sans leading-relaxed max-w-md line-clamp-3">
                    {dept.subtitle}
                  </p>

                  {/* Key Tech Specs Matrix */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {dept.keySpecs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded border border-white/10 bg-black/50 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Action Trigger & Price Note */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      {dept.featuredProduct}
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {dept.priceNote}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`#catalogue`}
                      onClick={() => {
                        if (onSelectCategory) onSelectCategory(dept.slug);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#A8FF00] px-3.5 py-1.5 font-display text-xs font-bold uppercase text-[#070A07] transition-all hover:bg-[#BEFF33] hover:shadow-[0_0_15px_rgba(168,255,0,0.3)]"
                    >
                      <span>Filter Department</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

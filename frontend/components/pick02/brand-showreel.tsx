"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Zap,
  Radio,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  ShoppingCart,
  PhoneCall,
  Sliders,
  Check,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { formatKes } from "@/lib/format";
import { FALLBACK_PRODUCTS } from "@/lib/fallback-catalog";
import { useCart } from "@/context/cart-context";

const BASSADICT_PHONE = "254794069405";
const createWhatsAppHref = (message: string) =>
  `https://wa.me/${BASSADICT_PHONE}?text=${encodeURIComponent(message)}`;

interface BrandProfile {
  name: string;
  logo: string;
  role: string;
  description: string;
  pedigree: string;
  specsSummary: string[];
}

export const FEATURED_BRANDS: BrandProfile[] = [
  {
    name: "Pioneer",
    logo: "/images/brands/pioneer-white.svg",
    role: "Champion Series Subwoofers, PRO Bullet Tweeters & Coaxials",
    description: "Industry-standard automotive audio engineering. Renowned for heavy-duty dual 4-ohm voice coils, high-SPL titanium compression bullet horns, and bridgeable class AB power stages.",
    pedigree: "Tokyo, Japan · Global Car Audio Benchmark",
    specsSummary: ["1500W Champion Woofers", "100dB PRO Bullet Tweeters", "Mica Matrix Cones", "1000W Bridgeable Amps"],
  },
  {
    name: "Kenwood",
    logo: "/images/brands/kenwood-white.svg",
    role: "4-Channel High-Current Power & 12\" Subwoofers",
    description: "Enduring high-output car entertainment engineered for sustained high-volume listening. Class AB multi-channel power stages and polypropylene woofer cones built for thermal resilience.",
    pedigree: "Yokohama, Japan · Precision Automotive Amplification",
    specsSummary: ["KAC 4-Channel Stages", "Dual Cooling Fans", "12\" Polypropylene Subs", "Low THD Linearity"],
  },
  {
    name: "Sony",
    logo: "/images/brands/sony.png",
    role: "In-Dash Digital Media Receivers & 3-Way Coaxial Speakers",
    description: "Precision consumer audio with HOP aramid-carbon matrix woofers, high-fidelity signal-to-noise ratios, and high-voltage preamp outputs for clean DSP signal delivery.",
    pedigree: "Tokyo, Japan · High-Fidelity In-Dash Systems",
    specsSummary: ["450W 3-Way Triaxials", "Bluetooth 5.0 Lossless", "High-Voltage RCA Pre-Outs", "Mega Bass Audio DSP"],
  },
  {
    name: "Boschmann",
    logo: "/images/brands/boschmann.png",
    role: "High-Power Amplifiers & 7-Band Parametric Equalizers",
    description: "Renowned high-wattage power stages featuring extruded aluminum heat sinks, MOSFET switching power supplies, and parametric sub-bass frequency tuning controls.",
    pedigree: "High-Current BM Audio Power & Signal Processing",
    specsSummary: ["1500W MOSFET Stages", "7-Band Parametric EQs", "Subwoofer Gain Dial", "Gold-Plated RCAs"],
  },
  {
    name: "Audiobank",
    logo: "/images/brands/audiobank.png",
    role: "Competition Monoblock & Multi-Channel Amplification",
    description: "High-current car audio amplifiers capable of driving low-impedance subwoofer arrays with variable low-pass filters, sub-sonic filters, and remote bass level controls.",
    pedigree: "High-Current Monoblock Drive Stages",
    specsSummary: ["Monoblock Drive Stages", "Variable LPF & Subsonic", "High Current Rails", "Thermal Overload Safe"],
  },
  {
    name: "Nakamichi",
    logo: "/images/brands/nakamichi.png",
    role: "Acoustic Driver Components & In-Dash DSP Processing",
    description: "Legendary acoustic fidelity focusing on smooth frequency linearity, treated paper composite cones, neodymium high-frequency drivers, and transparent sound field staging.",
    pedigree: "Tokyo, Japan · Acoustic Engineering Heritage",
    specsSummary: ["Smooth Vocal Linearity", "Neodymium Tweeters", "Treated Paper Cones", "Compact In-Dash DSPs"],
  },
];

export function BrandShowreel({
  onFilterBrand,
  className = "",
}: {
  onFilterBrand?: (brand: string) => void;
  className?: string;
}) {
  const [activeBrandName, setActiveBrandName] = useState("Pioneer");
  const { addItem } = useCart();
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null);

  const activeBrand =
    FEATURED_BRANDS.find((b) => b.name === activeBrandName) || FEATURED_BRANDS[0];

  // Filter products by active brand from fallback catalog
  const brandProducts = FALLBACK_PRODUCTS.filter(
    (p) => p.brand && p.brand.toLowerCase() === activeBrand.name.toLowerCase()
  ).slice(0, 4);

  const handleAddToCart = (product: (typeof FALLBACK_PRODUCTS)[0]) => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.public_price ? String(product.public_price) : null,
      image_url: product.primary_image?.image_url || null,
      brand: product.brand || "Bassaddict",
    });
    setAddedItemSlug(product.slug);
    setTimeout(() => setAddedItemSlug(null), 2000);
  };

  const consultWhatsAppHref = createWhatsAppHref(
    `Hello BASSADICT SOUNDS KE, I am viewing the Brand Showreel and would like to ask about authentic ${activeBrand.name} audio hardware available at Ground Floor New Loitoktok House.`
  );

  return (
    <section
      id="brand-showreel"
      aria-labelledby="brand-showreel-title"
      className={`relative w-full border-b border-white/10 bg-[#090D09] py-16 sm:py-24 text-[#F4F7EF] ${className}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#A8FF00]/30 bg-[#0E130E] px-3.5 py-1 backdrop-blur-md mb-3">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
                PICK 02 · VERIFIED BRAND PEDIGREE & SHOWREEL
              </span>
            </div>
            <h2
              id="brand-showreel-title"
              className="font-impact text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[0.98]"
            >
              WORLD-CLASS CAR AUDIO MANUFACTURERS.
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Every unit in our Luthuli Avenue inventory is sourced from authenticated international manufacturers.
              Select any brand below to inspect engineering pedigrees, sound signatures, and stocked hardware specimens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={consultWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#A8FF00] px-5 py-3 font-display text-sm font-bold uppercase text-[#070A07] transition-all hover:bg-[#BEFF33] hover:shadow-[0_0_25px_rgba(168,255,0,0.3)]"
            >
              <MessageCircle className="size-4" />
              <span>Inquire {activeBrand.name} (0794069405)</span>
            </a>
          </div>
        </div>

        {/* Brand Selector Tabs (Motion Primitives Animated Background) */}
        <div
          role="tablist"
          aria-label="Verified audio brands"
          className="inline-flex w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0E130E] p-2 shadow-inner mb-8 scrollbar-none"
        >
          <AnimatedBackground
            defaultValue={activeBrandName}
            className="rounded-xl border border-[#A8FF00]/40 bg-[#141C14] shadow-md"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            onValueChange={(val) => {
              if (val) setActiveBrandName(val);
            }}
          >
            {FEATURED_BRANDS.map((brand) => {
              const isActive = activeBrandName === brand.name;
              return (
                <button
                  key={brand.name}
                  data-id={brand.name}
                  type="button"
                  className={`flex-1 min-w-[130px] sm:min-w-[160px] py-3 px-4 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8FF00] ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-display text-sm sm:text-base font-bold tracking-tight uppercase">
                      {brand.name}
                    </span>
                  </div>
                  <span className="block font-mono text-[9px] tracking-wider text-neutral-400 truncate mt-0.5">
                    {brand.role.split(",")[0]}
                  </span>
                </button>
              );
            })}
          </AnimatedBackground>
        </div>

        {/* Selected Brand Profile & Hardware Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (5 cols): Brand Pedigree Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0E130E] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <BorderBeam size={80} duration={14} colorFrom="#A8FF00" colorTo="#3B82F6" />

            <div>
              {/* Brand Logo & Origin Tag */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="h-10 w-36 relative flex items-center">
                  <Image
                    src={activeBrand.logo}
                    alt={`${activeBrand.name} official logo`}
                    width={130}
                    height={35}
                    className="max-h-full max-w-full object-contain filter brightness-100"
                  />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A8FF00]/30 bg-[#A8FF00]/10 px-3 py-1 font-mono text-[10px] text-[#A8FF00] font-bold">
                  <ShieldCheck className="size-3" />
                  <span>Authorized Hardware</span>
                </span>
              </div>

              {/* Pedigree & Description */}
              <div className="mt-5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#A8FF00] font-bold block">
                  {activeBrand.pedigree}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white mt-1">
                  {activeBrand.role}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {activeBrand.description}
                </p>

                {/* Technical Strengths */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider block mb-2">
                    Key Acoustic Strengths
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {activeBrand.specsSummary.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-lg border border-white/5 bg-[#090D09] p-2 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="size-3 text-[#A8FF00] shrink-0" />
                        <span className="font-mono text-[10px] text-neutral-200 truncate">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href="#catalogue"
                onClick={() => {
                  if (onFilterBrand) onFilterBrand(activeBrand.name);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#A8FF00] hover:underline"
              >
                <span>Filter Catalogue ({brandProducts.length} Models)</span>
                <ArrowUpRight className="size-3.5" />
              </a>

              <span className="text-[11px] font-mono text-neutral-400">
                Ground Floor New Loitoktok House
              </span>
            </div>
          </div>

          {/* Right Column (7 cols): Active Stocked Specimens Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#A8FF00]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                    Stocked {activeBrand.name} Specimens in Nairobi Bay
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-400">
                  Showing {brandProducts.length} Verified Units
                </span>
              </div>

              {/* 2x2 Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brandProducts.map((prod) => (
                  <SpotlightCard
                    key={prod.slug}
                    className="p-4 border border-white/10 bg-[#0E130E] rounded-xl flex flex-col justify-between"
                    spotlightColor="rgba(168, 255, 0, 0.2)"
                  >
                    <div>
                      {/* Product Thumbnail with Reflective Pedestal */}
                      <div className="relative aspect-video rounded-lg border border-white/10 bg-gradient-to-b from-[#111711] to-[#060806] p-3 flex items-center justify-center overflow-hidden mb-3">
                        <div
                          className="pointer-events-none absolute inset-0 opacity-40"
                          style={{
                            background: "radial-gradient(circle at 50% 70%, rgba(168, 255, 0, 0.2) 0%, transparent 60%)",
                          }}
                        />
                        {prod.primary_image?.image_url ? (
                          <Image
                            src={prod.primary_image.image_url}
                            alt={prod.name}
                            width={220}
                            height={140}
                            className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                          />
                        ) : (
                          <Volume2 className="size-10 text-neutral-600" />
                        )}
                        <span className="absolute top-2 left-2 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[9px] text-[#A8FF00] font-bold">
                          {prod.category?.name || "Pro Audio"}
                        </span>
                      </div>

                      {/* Title & Specs */}
                      <h4 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-tight line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="mt-1 text-[11px] text-neutral-400 font-sans line-clamp-2 leading-relaxed">
                        {prod.description || "Bench-tested automotive pro audio specimen with verified warranty."}
                      </p>
                    </div>

                    {/* Footer Controls: Price, Add to Cart, WhatsApp */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="font-impact text-base sm:text-lg font-bold text-white tracking-tight">
                        {formatKes(prod.public_price) ?? "Ask for price"}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(prod)}
                          className={`rounded-lg p-2 font-mono text-xs font-bold uppercase transition-all ${
                            addedItemSlug === prod.slug
                              ? "bg-green-500 text-black"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                          title="Add to System Build"
                        >
                          {addedItemSlug === prod.slug ? (
                            <Check className="size-3.5" />
                          ) : (
                            <ShoppingCart className="size-3.5" />
                          )}
                        </button>

                        <a
                          href={createWhatsAppHref(
                            `Hello BASSADICT SOUNDS KE, I would like to inquire about ${prod.name} (Ref: ${prod.slug}, KSh ${prod.public_price ? prod.public_price.toLocaleString() : "Ask Price"}) available at Ground Floor New Loitoktok House.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-[#A8FF00] hover:bg-[#BEFF33] px-2.5 py-1.5 font-display text-[11px] font-bold uppercase text-[#070A07] transition-all"
                        >
                          <MessageCircle className="size-3" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Bottom Lab Strip */}
            <div className="mt-4 p-3 rounded-xl border border-white/5 bg-[#080B08] flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#A8FF00]" />
                <span>Audition on Luthuli Avenue Soundboard Before Car Mount</span>
              </div>
              <span className="text-white font-bold">Mon–Sat 8AM–7PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

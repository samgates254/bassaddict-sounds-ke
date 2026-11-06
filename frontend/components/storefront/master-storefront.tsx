"use client";

import { useState, useMemo, useEffect } from "react";
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
  Search,
  Plus,
  Minus,
  Check,
  Filter,
  Sliders,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Marquee } from "@/components/ui/marquee";
import { HeroBento } from "./hero-bento";
import { CategoryShowcase } from "@/components/pick02/category-showcase";
import { BrandShowreel } from "@/components/pick02/brand-showreel";
import { useCart } from "@/context/cart-context";
import type { BusinessSettings, Category, ProductListItem, Service } from "@/lib/api/types";
import { formatKes, publicPriceLabel, stockLabel } from "@/lib/format";
import {
  whatsappHref,
  generalEnquiryMessage,
  productEnquiryMessage,
  buildEnquiryMessage,
} from "@/lib/whatsapp";

interface MasterStorefrontProps {
  business: BusinessSettings;
  categories: Category[];
  products: ProductListItem[];
  services: Service[];
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

export function MasterStorefront({
  business,
  categories,
  products,
  services,
}: MasterStorefrontProps) {
  const whatsappNumber = business.whatsapp_number || "0794069405";
  const { itemCount, openCart, addItem } = useCart();

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeBrand, setActiveBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals & Interactivity
  const [selectedProduct, setSelectedProduct] = useState<ProductListItem | null>(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Interactive System Configurator State
  const [vehicleMake, setVehicleMake] = useState<string>("Toyota Fielder");
  const [soundGoal, setSoundGoal] = useState<string>("Deep Ground-Shaking Bass (SPL)");
  const [enclosureType, setEnclosureType] = useState<string>("Custom Ported MDF Box (Boot)");
  const [budgetTier, setBudgetTier] = useState<string>("KSh 30,000 — 60,000");

  const generalWhatsapp = whatsappHref(whatsappNumber, generalEnquiryMessage());

  // Escape key listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProduct(null);
        setVideoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category check
      if (activeCategory !== "all") {
        const prodCatSlug = prod.category?.slug?.toLowerCase() || "";
        if (prodCatSlug !== activeCategory.toLowerCase()) return false;
      }
      // Brand check
      if (activeBrand !== "all") {
        const prodBrand = (prod.brand || "").toLowerCase();
        if (!prodBrand.includes(activeBrand.toLowerCase())) return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = prod.name.toLowerCase().includes(q);
        const modelMatch = (prod.model_number || "").toLowerCase().includes(q);
        const brandMatch = (prod.brand || "").toLowerCase().includes(q);
        if (!nameMatch && !modelMatch && !brandMatch) return false;
      }
      return true;
    });
  }, [products, activeCategory, activeBrand, searchQuery]);

  // Unique brands present in products
  const uniqueBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand.trim());
    });
    return Array.from(brandsSet).sort();
  }, [products]);

  const handleAddToCart = (product: ProductListItem, qty: number = 1) => {
    addItem(
      {
        slug: product.slug,
        name: product.name,
        brand: product.brand || "Bassaddict",
        price: product.public_price ? String(product.public_price) : null,
        image_url: product.primary_image?.image_url || "/images/products/pioneer-ts-w3254.jpg",
        model_number: product.model_number || undefined,
      },
      qty
    );
    setAddedToast(`Added ${product.name} to cart`);
    setTimeout(() => setAddedToast(null), 3000);
  };

  const submitBuildBrief = () => {
    const msg = buildEnquiryMessage({
      vehicle: vehicleMake,
      budget: budgetTier,
      requirements: `${soundGoal} with ${enclosureType}`,
      location: "Nairobi / Luthuli Avenue Workshop",
    });
    window.open(whatsappHref(whatsappNumber, msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full bg-[#080B08] text-[#F4F7EF] font-sans selection:bg-[#A8FF00] selection:text-black">
      {/* ADDED TO CART FLOATING TOAST NOTIFICATION */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-50 flex items-center gap-3 rounded-xl border border-[#A8FF00] bg-black/95 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(168,255,0,0.3)] backdrop-blur-xl"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-[#A8FF00] text-black">
              <Check className="size-3.5 stroke-[3]" />
            </span>
            <span>{addedToast}</span>
            <button
              type="button"
              onClick={openCart}
              className="ml-2 text-xs font-bold text-[#A8FF00] hover:underline"
            >
              View Cart &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO BENTO: NATURAL, HIGH-DENSITY, AUTHORITATIVE FIRST VIEW */}
      <HeroBento />

      {/* 2. PICK 02: CURATED EQUIPMENT DEPARTMENTS (ASYMMETRIC BENTO GRID) */}
      <CategoryShowcase
        onSelectCategory={(slug) => {
          setActiveCategory(slug);
          const el = document.getElementById("catalogue");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. PICK 02: VERIFIED BRAND SHOWREEL & HARDWARE SPECIMENS */}
      <BrandShowreel
        onFilterBrand={(brand) => {
          setActiveBrand(brand);
          const el = document.getElementById("catalogue");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 4. INTERACTIVE PRODUCT EXPLORER DIRECTLY ON THE PAGE (#products-section / #catalogue) */}
      <div id="catalogue" className="scroll-mt-20" />
      <section id="products-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
                Live Kenyan Storefront
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-display">
                Genuine Sound Hardware Catalogue
              </h2>
            </div>
            <p className="text-xs text-stone-400">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Search & Active Brand Pill Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-y border-white/10 py-4">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeCategory === "all"
                    ? "bg-[#A8FF00] text-[#070A07]"
                    : "border border-white/15 bg-black/40 text-stone-300 hover:text-white"
                }`}
              >
                All Products ({products.length})
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeCategory === cat.slug
                      ? "bg-[#A8FF00] text-[#070A07]"
                      : "border border-white/15 bg-black/40 text-stone-300 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search models, specs, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 pl-9 pr-4 py-2 text-xs text-white placeholder-stone-400 focus:border-[#A8FF00] focus:outline-none"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(activeBrand !== "all" || searchQuery.trim() !== "") && (
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <span>Active filters:</span>
              {activeBrand !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#A8FF00]/15 px-3 py-1 font-bold text-[#A8FF00]">
                  Brand: {activeBrand}
                  <button type="button" onClick={() => setActiveBrand("all")} className="hover:text-white">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {searchQuery.trim() !== "" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-white">
                  &ldquo;{searchQuery}&rdquo;
                  <button type="button" onClick={() => setSearchQuery("")} className="hover:text-stone-300">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setActiveBrand("all");
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-[11px] text-stone-400 hover:text-[#A8FF00] underline ml-2"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-12 text-center">
            <p className="text-base font-semibold text-white">No products found matching your filter.</p>
            <p className="mt-1 text-xs text-stone-400">Try selecting another category or clearing your search term.</p>
            <button
              type="button"
              onClick={() => {
                setActiveBrand("all");
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-[#A8FF00] px-6 py-2.5 text-xs font-bold text-black"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const prodOrderLink = whatsappHref(whatsappNumber, productEnquiryMessage(prod.name));
              return (
                <div
                  key={prod.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0C100C] p-4 transition-all duration-300 hover:border-[#A8FF00]/40 hover:bg-[#111711] shadow-lg"
                >
                  <div>
                    {/* Clickable Image -> Opens Quick View Modal */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setQuickViewQuantity(1);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedProduct(prod);
                          setQuickViewQuantity(1);
                        }
                      }}
                      className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 mb-4 cursor-pointer"
                    >
                      <Image
                        src={prod.primary_image?.image_url || "/images/products/pioneer-ts-w3254.jpg"}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold uppercase text-[#A8FF00]">
                        {prod.category?.name || "Audio Hardware"}
                      </span>
                      {prod.brand && (
                        <span className="absolute top-2 right-2 rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                          {prod.brand}
                        </span>
                      )}
                    </div>

                    {/* Title & Model */}
                    <h3
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setSelectedProduct(prod);
                        setQuickViewQuantity(1);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setSelectedProduct(prod);
                      }}
                      className="text-sm font-bold text-white line-clamp-2 cursor-pointer group-hover:text-[#A8FF00] transition-colors"
                    >
                      {prod.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-400 font-mono">
                      {prod.model_number ? `Model: ${prod.model_number}` : stockLabel(prod.stock_status)}
                    </p>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-400">Price</span>
                      <span className="text-base font-extrabold text-white">
                        {publicPriceLabel(prod)}
                      </span>
                    </div>

                    {/* Dual Action: Add to Cart + WhatsApp Order */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(prod, 1)}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-black/40 py-2.5 text-xs font-bold text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
                      >
                        <ShoppingBag className="size-3.5" />
                        <span>Add Cart</span>
                      </button>

                      <a
                        href={prodOrderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-lg bg-[#A8FF00] py-2.5 text-xs font-bold uppercase text-[#070A07] hover:bg-[#b8ff26] transition"
                      >
                        <MessageCircle className="size-3.5" />
                        <span>Order</span>
                      </a>
                    </div>

                    {/* Quick View Trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(prod);
                        setQuickViewQuantity(1);
                      }}
                      className="text-[11px] font-semibold text-stone-400 hover:text-white transition text-center pt-1"
                    >
                      Quick View &amp; Full Specs &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. INTERACTIVE CUSTOM SYSTEM CONFIGURATOR (#build-section) */}
      <section id="build-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0C120C] to-[#060806] p-8 sm:p-14 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
              Interactive Custom Sound Builder
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black uppercase text-white font-display">
              Tell Us What You Drive. We Design the Sound.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#CBD5C0]">
              Configure your vehicle sound goals below. Submit directly to our Luthuli Avenue workshop team for a tailored
              component quote, speaker sizing, and enclosure calculation.
            </p>
          </div>

          {/* 4 Interactive Selector Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Step 1: Vehicle Make & Model */}
            <div className="flex flex-col gap-2">
              <label htmlFor="vehicle-make" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                1. What Vehicle Do You Drive?
              </label>
              <input
                id="vehicle-make"
                type="text"
                value={vehicleMake}
                onChange={(e) => setVehicleMake(e.target.value)}
                placeholder="e.g. Toyota Fielder, Subaru Forester, Mark X, Prado"
                className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm text-white placeholder-stone-500 focus:border-[#A8FF00] focus:outline-none"
              />
              <span className="text-[11px] text-stone-400">We verify cabin acoustics and boot dimensions for your exact model.</span>
            </div>

            {/* Step 2: Primary Sound Goal */}
            <div className="flex flex-col gap-2">
              <label htmlFor="sound-goal" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                2. Your Primary Audio Goal
              </label>
              <select
                id="sound-goal"
                value={soundGoal}
                onChange={(e) => setSoundGoal(e.target.value)}
                className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm text-white focus:border-[#A8FF00] focus:outline-none"
              >
                <option value="Deep Ground-Shaking Bass (SPL)">Deep Ground-Shaking Bass (SPL Competition)</option>
                <option value="High-Fidelity Audiophile Clarity (SQ)">High-Fidelity Audiophile Sound (Crystal Clear Vocals)</option>
                <option value="Loud Street Sound & Public Address">Loud Street Sound &amp; Midrange Punch</option>
                <option value="Clean Balanced OEM Upgrade">Clean Balanced OEM Daily Driver Upgrade</option>
              </select>
            </div>

            {/* Step 3: Subwoofer / Enclosure Preference */}
            <div className="flex flex-col gap-2">
              <label htmlFor="enclosure-type" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                3. Subwoofer &amp; Enclosure Preference
              </label>
              <select
                id="enclosure-type"
                value={enclosureType}
                onChange={(e) => setEnclosureType(e.target.value)}
                className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm text-white focus:border-[#A8FF00] focus:outline-none"
              >
                <option value="Custom Ported MDF Box (Boot)">Custom Ported 18mm MDF Enclosure (Boot)</option>
                <option value="Compact Active Underseat Subwoofer">Compact Active Underseat Sub (Zero Boot Space Lost)</option>
                <option value="Dual 12-Inch High Excursion Box">Dual 12-Inch Subwoofer Enclosure</option>
                <option value="Fiberglass Custom Moulded Side Enclosure">Fiberglass Custom Moulded Side Box</option>
              </select>
            </div>

            {/* Step 4: Budget Tier */}
            <div className="flex flex-col gap-2">
              <label htmlFor="budget-tier" className="text-xs font-bold uppercase tracking-wider text-stone-300">
                4. Approximate Budget Bracket
              </label>
              <select
                id="budget-tier"
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm text-white focus:border-[#A8FF00] focus:outline-none"
              >
                <option value="KSh 15,000 — 30,000">Entry / Active Sub: KSh 15,000 — 30,000</option>
                <option value="KSh 30,000 — 60,000">Balanced Stage: KSh 30,000 — 60,000</option>
                <option value="KSh 60,000 — 120,000">High-Output Pro Build: KSh 60,000 — 120,000</option>
                <option value="KSh 120,000+">Competition Show Build: KSh 120,000+</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <CheckCircle2 className="size-4 text-[#A8FF00]" />
              <span>Quotes prepared by certified audio technicians on Luthuli Avenue.</span>
            </div>

            <button
              type="button"
              onClick={submitBuildBrief}
              className="flex w-full sm:w-auto h-13 items-center justify-center gap-2 rounded-xl bg-[#A8FF00] px-8 text-xs font-black uppercase tracking-wider text-[#070A07] shadow-lg hover:bg-[#b8ff26] transition active:scale-95"
            >
              <MessageCircle className="size-4" />
              <span>Submit Brief on WhatsApp ({whatsappNumber})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP & WORKSHOP FABRICATION (#services-section) */}
      <section id="services-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10">
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
                <a
                  href="#build-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Start Build Brief &rarr;
                </a>
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
                <a
                  href={generalWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Ask Wiring Tech &rarr;
                </a>
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
                <a
                  href="#workshop-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#A8FF00]"
                >
                  Visit Showroom &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WORKSHOP LOCATION & HOURS (#workshop-section) */}
      <section id="workshop-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-[#0C100C] p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8FF00]">
              Visit Us in Nairobi
            </span>
            <h3 className="mt-2 text-3xl sm:text-4xl font-black uppercase text-white font-display">
              Ready to Upgrade Your Vehicle&apos;s Sound?
            </h3>
            <p className="mt-3 text-sm text-stone-300 leading-relaxed">
              Drop by our workshop on Luthuli Avenue or send us a WhatsApp message with your vehicle make and budget.
              We&apos;ll recommend the exact speaker sizes, amp impedance, and enclosure design for your car.
            </p>
            <div className="mt-4 flex flex-col gap-1 text-xs font-mono text-stone-400">
              <p className="text-white font-bold">{business.address}</p>
              <p>Monday — Saturday: 8:30 AM — 6:30 PM · Sunday: By Appointment</p>
            </div>
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

            <a
              href={`tel:${whatsappNumber}`}
              className="flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-white/20 bg-black/40 px-6 text-xs font-bold uppercase tracking-wider text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              <Phone className="size-4 mr-1.5" />
              Call Workshop
            </a>
          </div>
        </div>
      </section>

      {/* 9. INTERACTIVE PRODUCT QUICK-VIEW MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
          >
            <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-[#0C100C] p-6 sm:p-8 shadow-2xl">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 z-20 rounded-full border border-white/20 bg-black/80 p-2 text-stone-400 hover:text-white transition"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/60 border border-white/10 p-4">
                  <Image
                    src={selectedProduct.primary_image?.image_url || "/images/products/pioneer-ts-w3254.jpg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain p-4"
                  />
                  <span className="absolute top-3 left-3 rounded bg-black/80 px-2.5 py-1 text-[11px] font-bold uppercase text-[#A8FF00]">
                    {selectedProduct.category?.name || "Audio Hardware"}
                  </span>
                </div>

                {/* Details & Direct Actions */}
                <div className="flex flex-col justify-between">
                  <div>
                    {selectedProduct.brand && (
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A8FF00]">
                        {selectedProduct.brand}
                      </span>
                    )}
                    <h3 className="mt-1 text-xl sm:text-2xl font-black text-white font-display">
                      {selectedProduct.name}
                    </h3>
                    <p className="mt-1 text-xs font-mono text-stone-400">
                      {selectedProduct.model_number ? `Model: ${selectedProduct.model_number}` : ""}
                    </p>

                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="text-2xl font-black text-white">
                        {publicPriceLabel(selectedProduct)}
                      </span>
                      <span className="rounded bg-[#A8FF00]/15 px-2.5 py-0.5 text-xs font-bold text-[#A8FF00]">
                        {stockLabel(selectedProduct.stock_status)}
                      </span>
                    </div>

                    <p className="mt-4 text-xs text-stone-300 leading-relaxed">
                      Authentic Kenyan stock backed by manufacturer warranty. Available for in-person audition and professional
                      fitting on Luthuli Avenue, Nairobi.
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-300">Quantity</span>
                      <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-black/40 px-3 py-1">
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity(Math.max(1, quickViewQuantity - 1))}
                          className="text-stone-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="font-mono text-sm font-bold text-white min-w-[20px] text-center">
                          {quickViewQuantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuickViewQuantity(quickViewQuantity + 1)}
                          className="text-stone-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleAddToCart(selectedProduct, quickViewQuantity);
                        setSelectedProduct(null);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#A8FF00] py-3 text-xs font-black uppercase tracking-wider text-[#070A07] hover:bg-[#b8ff26] transition"
                    >
                      <ShoppingBag className="size-4" />
                      <span>Add to Cart ({quickViewQuantity})</span>
                    </button>

                    <a
                      href={whatsappHref(whatsappNumber, productEnquiryMessage(selectedProduct.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/40 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
                    >
                      <MessageCircle className="size-4" />
                      <span>Order Directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 10. VIDEO AUDITION MODAL */}
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

      {/* 11. MOBILE STICKY THUMB-ZONE BAR */}
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
          <a
            href="#products-section"
            className="flex h-12 items-center justify-center rounded-xl border border-white/20 bg-black/60 px-5 text-xs font-bold text-white"
          >
            Catalogue ({products.length})
          </a>
        </div>
      </div>
    </div>
  );
}

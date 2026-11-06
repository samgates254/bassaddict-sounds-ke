import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
} from "lucide-react";

import { MasterStorefront } from "@/components/storefront/master-storefront";
import { getBusiness } from "@/lib/api/business";
import { getCategories, getProducts } from "@/lib/api/products";
import { getServices } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "Natural Commercial Redesign | Bassaddict Sounds KE",
  description:
    "Authentic, natural, clear commercial automotive audio storefront for Bassaddict Sounds KE featuring real brand logos and genuine products.",
};

export default async function RedesignV2PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const resolvedParams = await searchParams;
  const viewMode = resolvedParams.view || "native";

  const [productsResult, servicesResult, categoriesResult, businessResult] = await Promise.all([
    getProducts(),
    getServices(),
    getCategories(),
    getBusiness(),
  ]);

  const business = businessResult.business;
  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const products = productsResult.ok ? productsResult.data : [];
  const services = servicesResult.ok ? servicesResult.data : [];

  return (
    <div className="min-h-screen bg-[#080B08] text-[#F4F7EF]" data-preview-isolated="true">
      {/* 1. TOP AUDIT & VIEWPORT SIMULATION CONTROLS */}
      <section className="sticky top-0 z-50 border-b border-white/10 bg-[#050705]/98 px-4 py-2.5 backdrop-blur-2xl shadow-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left Title & Status */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80 hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              <ArrowLeft className="size-3" />
              Production Home (/)
            </Link>

            <span className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-extrabold uppercase tracking-wider text-[#A8FF00]">
                NATURAL COMMERCIAL STOREFRONT · REAL BRAND LOGOS
              </span>
            </div>

            <span className="rounded bg-[#A8FF00]/15 border border-[#A8FF00]/30 px-2 py-0.5 text-[10px] font-bold text-[#A8FF00]">
              LIVE DEMO
            </span>
          </div>

          {/* Center: Device Viewport Simulators */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/60 p-1 flex-wrap">
            <Link
              href="/preview/redesign-v2?view=native"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "native" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Monitor className="size-3.5" />
              Native (100%)
            </Link>

            <Link
              href="/preview/redesign-v2?view=desktop-1440"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "desktop-1440" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              1440×900
            </Link>

            <Link
              href="/preview/redesign-v2?view=ipad-landscape"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "ipad-landscape" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Tablet className="size-3.5" />
              iPad (1024L)
            </Link>

            <Link
              href="/preview/redesign-v2?view=ipad-portrait"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "ipad-portrait" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Tablet className="size-3.5" />
              iPad (768P)
            </Link>

            <Link
              href="/preview/redesign-v2?view=mobile-390"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "mobile-390" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Smartphone className="size-3.5" />
              390×844
            </Link>
          </div>

          {/* Right: Badges */}
          <div className="hidden xl:flex items-center gap-4 text-[11px] text-stone-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              Official Bassaddict + 13 Brand Logos
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              {products.length} Products In Stock
            </span>
          </div>
        </div>
      </section>

      {/* 2. VIEWPORT CONTAINER */}
      {viewMode === "mobile-390" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[390px] h-[844px] overflow-y-auto rounded-[48px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#080B08] scrollbar-thin">
            <MasterStorefront
              business={business}
              categories={categories}
              products={products}
              services={services}
            />
          </div>
        </div>
      ) : viewMode === "ipad-portrait" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[768px] h-[1024px] overflow-y-auto rounded-[36px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#080B08] scrollbar-thin">
            <MasterStorefront
              business={business}
              categories={categories}
              products={products}
              services={services}
            />
          </div>
        </div>
      ) : viewMode === "ipad-landscape" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[1024px] max-w-full h-[768px] overflow-y-auto rounded-[36px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#080B08] scrollbar-thin">
            <MasterStorefront
              business={business}
              categories={categories}
              products={products}
              services={services}
            />
          </div>
        </div>
      ) : viewMode === "desktop-1440" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[1440px] max-w-full h-[900px] overflow-y-auto rounded-2xl border-4 border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#080B08] scrollbar-thin">
            <MasterStorefront
              business={business}
              categories={categories}
              products={products}
              services={services}
            />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <MasterStorefront
            business={business}
            categories={categories}
            products={products}
            services={services}
          />
        </div>
      )}

      {/* 3. DESIGN SPECIFICATION FOOTNOTE */}
      <footer className="border-t border-white/10 bg-[#050705] px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex flex-col gap-1.5">
            <p className="font-bold text-white uppercase tracking-wider">
              Natural Commercial Storefront Architecture — Real Brands &amp; Genuine Hardware
            </p>
            <p>
              Identity: <span className="text-[#A8FF00]">Official Bassaddict Logo</span> · Real Brand Logos:{" "}
              <span className="text-white">Pioneer, Kenwood, Sony, JBL, Alpine, Rockford Fosgate, Focal, Kicker</span> · Tone:{" "}
              <span className="text-white">Authoritative, Clear, Natural Commercial Car Audio</span>
            </p>
            <p className="text-[11px] text-stone-500">
              Preserved: Authentic catalogue data, real KSh pricing, canonical WhatsApp (0794069405), and Luthuli Avenue address.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              Go to Homepage (/)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

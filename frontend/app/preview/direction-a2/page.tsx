import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  Layers,
  Sliders,
  ExternalLink,
} from "lucide-react";

import { DirectionA2Hero } from "@/components/hero/direction-a2-hero";
import { getBusiness } from "@/lib/api/business";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Direction A2: Editorial Split-Screen Hero & Craftsmanship Preview | Bassaddict Sounds KE",
  description:
    "Approved Direction A2 Hero with A1 cinematic lighting and A3 Craftsmanship BentoGrid for Bassaddict Sounds KE.",
};

export default async function DirectionA2PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const resolvedParams = await searchParams;
  const viewMode = resolvedParams.view || "native";
  const { business } = await getBusiness();
  const whatsappNumber = business.whatsapp_number || CANONICAL_WHATSAPP_NUMBER;

  return (
    <div className="min-h-screen bg-[#070A07] text-[#F4F7EF]" data-preview-isolated="true">
      {/* AUDIT & INSPECTION TOP BAR */}
      <section className="sticky top-0 z-50 border-b border-[#A8FF00]/30 bg-[#0A0E0A]/95 px-4 py-2.5 backdrop-blur-2xl shadow-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Navigation & Direction Indicator */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80 hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              <ArrowLeft className="size-3" />
              Production Home
            </Link>

            <Link
              href="/preview/components"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#A8FF00]/40 bg-[#A8FF00]/10 px-3 py-1 text-[11px] font-bold text-[#A8FF00] hover:bg-[#A8FF00]/20 transition"
            >
              <Sparkles className="size-3" />
              Component Lab (5)
            </Link>

            <span className="h-4 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-extrabold uppercase tracking-widest text-[#A8FF00]">
                DIRECTION A2: SPLIT-SCREEN + A3 CRAFTSMANSHIP
              </span>
            </div>

            <span className="rounded bg-black/60 border border-[#A8FF00]/30 px-2 py-0.5 text-[10px] font-mono text-[#A8FF00]">
              ISOLATED PREVIEW
            </span>
          </div>

          {/* Center: Responsive Viewport Simulators */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/50 p-1">
            <Link
              href="/preview/direction-a2?view=native"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "native" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Monitor className="size-3.5" />
              Native (100%)
            </Link>
            <Link
              href="/preview/direction-a2?view=desktop-frame"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "desktop-frame" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Monitor className="size-3.5" />
              Desktop (1440px)
            </Link>
            <Link
              href="/preview/direction-a2?view=tablet-frame"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "tablet-frame" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Tablet className="size-3.5" />
              Tablet (768px)
            </Link>
            <Link
              href="/preview/direction-a2?view=mobile-frame"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "mobile-frame" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Smartphone className="size-3.5" />
              Mobile (390px)
            </Link>
          </div>

          {/* Right: Technical Stats */}
          <div className="hidden xl:flex items-center gap-4 text-[11px] text-[#899384]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              54 BASSADICT Media Verified
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              0 MIKAKATI Leaks
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              17 Unit Tests Passing
            </span>
          </div>
        </div>
      </section>

      {/* VIEWPORT CONTAINER */}
      {viewMode === "mobile-frame" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[390px] h-[844px] overflow-y-auto rounded-[48px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#070A07] scrollbar-thin">
            <DirectionA2Hero whatsappNumber={whatsappNumber} />
          </div>
        </div>
      ) : viewMode === "tablet-frame" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[768px] h-[1024px] overflow-y-auto rounded-[36px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#070A07] scrollbar-thin">
            <DirectionA2Hero whatsappNumber={whatsappNumber} />
          </div>
        </div>
      ) : viewMode === "desktop-frame" ? (
        <div className="flex min-h-[calc(100vh-50px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[1440px] max-w-full h-[900px] overflow-y-auto rounded-2xl border-4 border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#070A07] scrollbar-thin">
            <DirectionA2Hero whatsappNumber={whatsappNumber} />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <DirectionA2Hero whatsappNumber={whatsappNumber} />
        </div>
      )}

      {/* DESIGN SPECIFICATIONS FOOTNOTE */}
      <footer className="border-t border-[#A8FF00]/15 bg-[#0A0E0A] px-6 py-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#899384]">
          <div className="flex flex-col gap-1.5">
            <p className="font-bold text-white uppercase tracking-wider">
              Direction A2 Integrated Architecture — Approved Composition
            </p>
            <p>
              Display: <span className="text-[#A8FF00]">Space Grotesk 700 / Inter</span> · Palette:{" "}
              <span className="text-[#A8FF00]">#A8FF00 (Electric Lime)</span> · Foundation:{" "}
              <span className="text-white">#070A07 &amp; #080808</span> · Video:{" "}
              <span className="text-[#A8FF00]">Live 7-Band DSP Equalizer Audition</span>
            </p>
            <p className="text-[11px] text-[#899384]">
              Components: React Bits TiltedCard · Motion Primitives TextEffect · Magic UI BentoGrid &amp; Marquee · Aceternity UI Focus Cards
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/preview/components"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#A8FF00]/40 bg-black/60 px-3 py-1.5 text-xs font-semibold text-[#A8FF00] hover:bg-[#A8FF00]/10 transition"
            >
              <Sparkles className="size-3.5" />
              Inspect Component Lab
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

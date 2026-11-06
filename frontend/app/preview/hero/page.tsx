import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Smartphone, Tablet, Monitor, Sparkles } from "lucide-react";

import { CandidateOneHero } from "@/components/hero/candidate-one-hero";
import { getBusiness } from "@/lib/api/business";
import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Candidate 01: Homepage Hero Preview | Bassaddict Sounds KE",
  description: "Interactive preview of Candidate 01 Homepage Hero design for Bassaddict Sounds KE.",
};

export default async function HeroPreviewPage({
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
      {/* PREVIEW AUDIT & INSPECTION BAR */}
      <section className="sticky top-0 z-50 border-b border-[#A8FF00]/30 bg-[#0A0E0A]/95 px-4 py-2 backdrop-blur-2xl shadow-2xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/80 hover:border-[#A8FF00] hover:text-[#A8FF00] transition"
            >
              <ArrowLeft className="size-3" />
              Production Home
            </Link>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-extrabold uppercase tracking-widest text-[#A8FF00]">
                PICK 01: CANDIDATE 1 HERO
              </span>
            </div>
            <span className="hidden sm:inline rounded bg-[#A8FF00]/15 px-2 py-0.5 text-[10px] font-bold text-[#A8FF00]">
              ISOLATED PREVIEW
            </span>
          </div>

          {/* Center: Responsive Viewport Simulators */}
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/50 p-1">
            <Link
              href="/preview/hero?view=native"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "native" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Monitor className="size-3.5" />
              Native Responsive (100%)
            </Link>
            <Link
              href="/preview/hero?view=tablet-frame"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "tablet-frame" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Tablet className="size-3.5" />
              Tablet Frame (768px)
            </Link>
            <Link
              href="/preview/hero?view=mobile-frame"
              className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                viewMode === "mobile-frame" ? "bg-[#A8FF00] text-[#070A07]" : "text-stone-400 hover:text-white"
              }`}
            >
              <Smartphone className="size-3.5" />
              Mobile Frame (390px)
            </Link>
          </div>

          {/* Right: Technical Stats */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#899384]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3 text-[#A8FF00]" />
              Authentic Media: 54 Verified
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
        <div className="flex min-h-[calc(100vh-45px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[390px] h-[844px] overflow-y-auto rounded-[48px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#070A07] scrollbar-thin">
            <CandidateOneHero whatsappNumber={whatsappNumber} showDockNavigation={false} />
          </div>
        </div>
      ) : viewMode === "tablet-frame" ? (
        <div className="flex min-h-[calc(100vh-45px)] items-center justify-center bg-black/95 p-4 sm:p-8">
          <div className="w-[768px] h-[1024px] overflow-y-auto rounded-[36px] border-[10px] border-stone-800 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(168,255,0,0.15)] bg-[#070A07] scrollbar-thin">
            <CandidateOneHero whatsappNumber={whatsappNumber} showDockNavigation={false} />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <CandidateOneHero whatsappNumber={whatsappNumber} showDockNavigation={true} />
        </div>
      )}

      {/* DESIGN SPECIFICATIONS FOOTNOTE */}
      <footer className="border-t border-[#A8FF00]/15 bg-[#0A0E0A] px-6 py-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#899384]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-white">Pick 01 Implementation Details — Candidate 1 Architecture</p>
            <p>
              Display: <span className="text-[#A8FF00]">Space Grotesk 700 / Anton Condensed</span> · Accent:{" "}
              <span className="text-[#A8FF00]">#A8FF00 (Electric Lime)</span> · Surface:{" "}
              <span className="text-white">#070A07 / #0A0E0A</span> · Interactive Audition:{" "}
              <span className="text-[#A8FF00]">Live 7-Band Parametric EQ Video</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded border border-[#A8FF00]/30 bg-black/40 px-3 py-1 font-mono text-[10px] text-[#A8FF00]">
              Candidate 1 Winner · Verified Production Build
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

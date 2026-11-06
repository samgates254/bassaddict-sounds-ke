"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layers, Sparkles, Building2, ShieldCheck, Home } from "lucide-react";
import { CategoryShowcase } from "@/components/pick02/category-showcase";
import { BrandShowreel } from "@/components/pick02/brand-showreel";

export default function Pick02PreviewPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#070A07] text-[#F4F7EF]">
      {/* Isolated Laboratory Navigation Rail */}
      <aside
        aria-label="Pick 02 Isolated Preview Laboratory"
        className="sticky top-0 z-50 border-b border-[#A8FF00]/30 bg-[#0A0E0A]/95 px-4 py-2.5 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded border border-[#A8FF00]/40 bg-[#A8FF00]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#A8FF00]">
              <Layers className="size-3.5" />
              Pick 02 Isolated Lab
            </span>
            <span className="hidden font-mono text-xs text-neutral-400 sm:inline">
              Curated Departments Bento + Brand Showreel
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <Home className="size-3.5" />
              <span>Live Root Storefront</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-[#A8FF00] font-bold">
              Ground Floor New Loitoktok House · Luthuli Ave
            </span>
          </div>
        </div>
      </aside>

      {/* Main Pick 02 Laboratory Content */}
      <main>
        {/* Component 1: Curated Departments Bento Grid */}
        <CategoryShowcase
          onSelectCategory={(slug) => {
            setSelectedFilter(`Category: ${slug}`);
          }}
        />

        {/* Component 2: Verified Brand Showreel & Sound Audition */}
        <BrandShowreel
          onFilterBrand={(brand) => {
            setSelectedFilter(`Brand: ${brand}`);
          }}
        />
      </main>

      {/* Laboratory Footer */}
      <footer className="border-t border-white/10 bg-[#050705] py-8 text-center text-xs font-mono text-neutral-400">
        <p>BASSADICT SOUNDS KE · Pick 02 Isolated Lab Verification · Canonical Phone: 0794069405</p>
      </footer>
    </div>
  );
}

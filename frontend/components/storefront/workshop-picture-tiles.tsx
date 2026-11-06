"use client";

import React from "react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  MapPin,
  MessageCircle,
  ShieldCheck,
  Building,
  Volume2,
  Sliders,
  Wrench,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const BASSADICT_PHONE = "254794069405";
const createWhatsAppHref = (message: string) =>
  `https://wa.me/${BASSADICT_PHONE}?text=${encodeURIComponent(message)}`;

export function WorkshopPictureTiles({ className = "" }: { className?: string }) {
  const consultWhatsAppHref = createWhatsAppHref(
    "Hello BASSADICT SOUNDS KE, I am inquiring about custom workshop installation and DSP sound tuning at Ground Floor New Loitoktok House."
  );

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#A8FF00] uppercase">
              Authentic Workshop Proof & Sound Laboratory
            </span>
          </div>
          <h3 className="font-impact text-xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-0.5">
            Physical Luthuli Avenue Craftsmanship & Staging
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <ShieldCheck className="size-4 text-[#A8FF00]" />
          <span>New Loitoktok House Verified Photography</span>
        </div>
      </div>

      {/* 4-Tile High-Impact Editorial Bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* Tile 1 (7 cols): Full Automotive Boot Sound Installation */}
        <div className="group relative md:col-span-7 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E0A] shadow-2xl transition-all duration-500 hover:border-[#A8FF00]/40">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/hero/candidate-1-hero-bg.webp"
              alt="BASSADICT boot sound installation with Pioneer subwoofer and high-output amplifier at Luthuli Ave bay"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark gradient wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/50 to-transparent opacity-90" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3 py-1 backdrop-blur-md">
              <Building className="size-3.5 text-[#A8FF00]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-200">
                Ground Floor · New Loitoktok House
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-[#A8FF00] backdrop-blur-md font-bold">
              Luthuli Ave Bay
            </div>

            {/* Bottom Content */}
            <div className="absolute right-4 bottom-4 left-4 z-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8FF00] font-bold">
                Automotive Boot Sound Staging
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight mt-0.5">
                Precision Subwoofer & Amp Mounting
              </h4>
              <p className="mt-1 text-xs text-neutral-300 max-w-lg leading-relaxed line-clamp-2">
                Calculated trunk acoustics, heavy-duty zero-gauge oxygen-free power wiring, and vibration-damped custom fabrication for clean, rattle-free bass.
              </p>
            </div>
          </div>

          {/* Magic UI Border Beam */}
          <BorderBeam size={90} duration={10} colorFrom="#A8FF00" colorTo="#3B82F6" />
        </div>

        {/* Tile 2 (5 cols): Live In-Dash & DSP Calibration Desk */}
        <div className="group relative md:col-span-5 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E0A] shadow-2xl transition-all duration-500 hover:border-[#A8FF00]/40">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/hero/authentic-bassaddict-tuning.webp"
              alt="BASSADICT technician tuning in-dash Sony head unit and Boschmann EQ"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/50 to-transparent opacity-90" />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-200">
                DSP & Parametric EQ Staging
              </span>
            </div>

            <div className="absolute right-4 bottom-4 left-4 z-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8FF00]">
                Acoustic Frequency Tuning
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-tight mt-0.5">
                In-Vehicle Sound Field Setup
              </h4>
              <p className="mt-1 text-xs text-neutral-300 line-clamp-2">
                Time alignment, active crossover slopes, and 7-band parametric equalization to bring soundstage imaging straight to your dashboard.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 border-t border-white/5 flex items-center justify-between bg-[#0E130E]">
            <div className="font-mono text-[11px] text-neutral-400">
              Direct: <span className="text-white font-bold">0794069405</span>
            </div>
            <a
              href={consultWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#A8FF00] px-3.5 py-1.5 text-xs font-bold uppercase text-[#070A07] transition-all hover:bg-[#BEFF33]"
            >
              <MessageCircle className="size-3.5 fill-current" />
              <span>Consult Tuner</span>
            </a>
          </div>
        </div>

        {/* Tile 3 (5 cols): Custom Enclosure & MDF Box Fabrication */}
        <div className="group relative md:col-span-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E0A] shadow-2xl transition-all duration-500 hover:border-[#A8FF00]/40">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/gallery/workshop-audio-01.jpg"
              alt="BASSADICT custom MDF subwoofer box fabrication"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/50 to-transparent opacity-90" />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 backdrop-blur-md">
              <Wrench className="size-3.5 text-[#A8FF00]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-200">
                Custom MDF Woodcraft
              </span>
            </div>

            <div className="absolute right-4 bottom-4 left-4 z-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8FF00]">
                Acoustic Pressure Tuning
              </span>
              <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-tight mt-0.5">
                Calculated Ported Enclosures
              </h4>
              <p className="mt-1 text-xs text-neutral-300 line-clamp-2">
                Built to exact Thiele/Small cubic foot specifications for Champion series and dual voice coil subwoofers.
              </p>
            </div>
          </div>

          {/* Equalizer Visualizer Spectrum */}
          <div className="p-3 border-t border-white/5 bg-[#080B08] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sliders className="size-3.5 text-[#A8FF00]" />
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                Bass Frequency Resonant Staging (32Hz–80Hz)
              </span>
            </div>
            <div className="flex items-end gap-1 h-3.5">
              {[50, 85, 65, 100, 75, 90, 60, 95, 80, 70, 88, 55].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-[#A8FF00]"
                  style={{
                    height: `${h}%`,
                    animation: `wave-bars 800ms ease-in-out infinite alternate`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tile 4 (7 cols): Bench Audition & Transducer Matching */}
        <div className="group relative md:col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E0A] shadow-2xl transition-all duration-500 hover:border-[#A8FF00]/40">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/images/hero/authentic-bassaddict-workshop.webp"
              alt="BASSADICT workshop sound testing and audition bench"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/50 to-transparent opacity-90" />

            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-2.5 py-1 backdrop-blur-md">
              <Volume2 className="size-3.5 text-[#A8FF00]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-200">
                Pre-Dispatch Bench Audition
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-neutral-300 backdrop-blur-md">
              Listen Before You Mount
            </div>

            <div className="absolute right-4 bottom-4 left-4 z-10">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8FF00]">
                Physical Laboratory Quality Assurance
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-white tracking-tight mt-0.5">
                Hardware Bench Testing Laboratory
              </h4>
              <p className="mt-1 text-xs text-neutral-300 max-w-lg leading-relaxed line-clamp-2">
                Audition bullet tweeters, 3-way coaxials, and bridgeable amplifiers side-by-side on our workshop soundboard before installation on your car.
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 bg-[#0E130E]">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <ShieldCheck className="size-4 text-[#A8FF00]" />
              <span>Full Kenya Warranty & Bench Verification</span>
            </div>
            <a
              href="#catalogue"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#A8FF00] hover:underline"
            >
              <span>Explore All 67 Tested Models</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

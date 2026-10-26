"use client";

import { CANONICAL_WHATSAPP_NUMBER } from "@/lib/brand";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Volume2, ShieldCheck, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/button";
import { whatsappHref, generalEnquiryMessage } from "@/lib/whatsapp";

export function HeroVideo({ whatsappNumber = CANONICAL_WHATSAPP_NUMBER }: { whatsappNumber?: string }) {
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const whatsappLink = whatsappHref(whatsappNumber, generalEnquiryMessage());

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden border-b border-[#A8FF00]/15 bg-[#070A07] flex items-center">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {!videoError && !reducedMotion ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero/hero-poster.jpg"
            onError={() => setVideoError(true)}
            className="h-full w-full object-cover object-center opacity-45 brightness-90 contrast-110 transition-opacity duration-1000"
          >
            <source src="/videos/hero-sound.webm" type="video/webm" />
            <source src="/videos/hero-sound.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url(/images/hero/hero-poster.jpg)" }}
          />
        )}

        {/* Ambient Dark Overlays for Extreme Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A07] via-[#070A07]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-transparent to-[#070A07]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(168,255,0,0.08),transparent_60%)]" />
      </div>

      {/* Hero Content */}
      <div className="site relative z-10 py-20 sm:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8FF00]/30 bg-black/60 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(168,255,0,0.1)]">
            <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c2ff52]">
              Luthuli Avenue · Nairobi
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[0.65rem] tracking-wider text-stone-300">
              Showroom Open &amp; Ready
            </span>
          </div>

          {/* Headline */}
          <h1 className="poster mt-6 font-display text-[clamp(2.75rem,7vw,6.5rem)] text-white">
            PRO SOUND.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A8FF00]">
              BUILT TO MOVE YOU.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
            Nairobi&apos;s premier destination for high-efficiency speakers, deep underseat subwoofers, and competition-grade amplifiers. Audition before install on Luthuli Avenue.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/products" variant="ember" className="gap-2.5 px-8">
              Explore Showroom
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>

            <Button href="/build" variant="line" className="px-6">
              Custom System Brief
            </Button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#A8FF00]/25 bg-black/40 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white hover:border-[#A8FF00] hover:text-[#A8FF00] transition backdrop-blur-xl"
            >
              <MessageCircle className="size-4 text-[#A8FF00]" aria-hidden="true" />
              WhatsApp {whatsappNumber}
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-[#A8FF00]/15 pt-8 sm:grid-cols-3 sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#A8FF00]/20 bg-black/40 text-[#A8FF00]">
                <Volume2 className="size-4" aria-hidden="true" />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-white">Live Audition</p>
                <p className="text-stone-400">Hear gear before install</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#A8FF00]/20 bg-black/40 text-[#A8FF00]">
                <Wrench className="size-4" aria-hidden="true" />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-white">Master Fitters</p>
                <p className="text-stone-400">OEM standard wiring</p>
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#A8FF00]/20 bg-black/40 text-[#A8FF00]">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-white">100% Genuine</p>
                <p className="text-stone-400">Pioneer, KUERL, JBL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

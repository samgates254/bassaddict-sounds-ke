"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play, X, Sliders, Volume2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade";

interface HeroVideoDialogProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
  previewVideoSrc?: string;
  badgeText?: string;
  title?: string;
  subtitle?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.85, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

/**
 * Magic UI — Hero Video Dialog Component
 * Elevated for BASSADICT pro audio & workshop tuning showcase with acoustic equalizer bars and sonar waves.
 */
export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Workshop tuning preview",
  className,
  previewVideoSrc,
  badgeText,
  title,
  subtitle,
}: HeroVideoDialogProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

  const isLocalVideo =
    videoSrc.endsWith(".mp4") ||
    videoSrc.endsWith(".webm") ||
    videoSrc.startsWith("/");

  return (
    <div className={cn("relative", className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label={title || "Play workshop tuning video"}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-[#080B08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#A8FF00]/60 hover:shadow-[0_20px_60px_rgba(168,255,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#A8FF00]/80 h-full flex flex-col justify-end"
        onClick={() => setIsVideoOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsVideoOpen(true);
          }
        }}
      >
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
          {previewVideoSrc ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={thumbnailSrc}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            >
              <source src={previewVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={1280}
              height={720}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
          )}

          {/* Ambient Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B08] via-[#080B08]/40 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-75" />

          {/* Top Left Meta Pill */}
          {badgeText && (
            <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-3 py-1 backdrop-blur-md shadow-lg">
              <span className="size-2 rounded-full bg-[#A8FF00] animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-200 uppercase">
                {badgeText}
              </span>
            </div>
          )}

          {/* Top Right Live EQ Visualizer */}
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/75 px-2.5 py-1 backdrop-blur-md">
            <Volume2 className="size-3 text-[#A8FF00]" />
            <div className="flex items-end gap-0.5 h-3">
              {[45, 90, 60, 100, 75, 40, 85, 50].map((h, i) => (
                <span
                  key={i}
                  className="w-0.5 rounded-full bg-[#A8FF00]"
                  style={{
                    height: `${h}%`,
                    animation: `wave-bars 850ms ease-in-out infinite alternate`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Center Play Button with Sonar Concentric Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-18 sm:size-20 items-center justify-center">
              {/* Outer Sonar Ring */}
              <div className="absolute -inset-4 rounded-full border border-[#A8FF00]/25 opacity-70 animate-ping [animation-duration:2.5s]" />
              {/* Mid Sonar Ring */}
              <div className="absolute -inset-2 rounded-full border border-[#A8FF00]/50 opacity-90 animate-ping [animation-duration:1.5s]" />
              {/* Frosted Glass Disc */}
              <div className="relative flex size-16 sm:size-18 items-center justify-center rounded-full bg-black/60 border border-white/25 backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-[#A8FF00]/80 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                {/* Core Glowing Button */}
                <div className="flex size-11 sm:size-12 items-center justify-center rounded-full bg-[#A8FF00] text-[#080B08] shadow-[0_0_25px_rgba(168,255,0,0.6)] transition-all duration-300 group-hover:bg-[#BEFF33] group-hover:scale-105">
                  <Play className="size-5 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Title & Subtitle with Audio Spec Bar */}
        {(title || subtitle) && (
          <div className="p-4 sm:p-5 bg-gradient-to-b from-[#0B0F0B] to-[#070A07] border-t border-white/10 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <div>
                {title && (
                  <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-[#A8FF00] transition-colors">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="mt-1 text-xs text-neutral-300 font-sans leading-relaxed line-clamp-2">
                    {subtitle}
                  </p>
                )}
              </div>
              <div className="hidden sm:flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-mono font-semibold text-[#A8FF00] group-hover:border-[#A8FF00]/40 transition-colors">
                <span>Audition</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal Dialog */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Workshop video player"
          >
            <motion.div
              {...selectedAnimation}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:bg-[#A8FF00] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#A8FF00]"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>

              <div className="relative size-full bg-black">
                {isLocalVideo ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="size-full object-contain"
                    src={videoSrc}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    src={videoSrc}
                    className="size-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

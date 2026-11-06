"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "motion/react";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  categoryText?: string;
  specs?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const springConfig = {
  damping: 24,
  stiffness: 220,
  mass: 0.8,
};

export function TiltedCard({
  imageSrc,
  altText = "Bassaddict Hardware Showcase",
  captionText = "Pioneer TS-W3254 12\" Subwoofer",
  categoryText = "1500W MAX · 400W RMS",
  specs = "High-Output Dual Voice Coil",
  containerHeight = "400px",
  containerWidth = "100%",
  scaleOnHover = 1.04,
  rotateAmplitude = 12,
  className = "",
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(useMotionValue(1), springConfig);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    // Calculate glare percentage
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY, opacity: 0.35 });
  }

  function handleMouseEnter() {
    if (reducedMotion) return;
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    if (reducedMotion) return;
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div
      ref={ref}
      className={`relative select-none ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-2xl border border-[#A8FF00]/25 bg-[#0A0E0A] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,255,0,0.08)]"
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Hardware Photography Layer */}
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-500"
          />

          {/* Dark Metallic Shadow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070A07]/70 via-transparent to-transparent" />
        </div>

        {/* Dynamic Glare Specular Highlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(168,255,0,0.25) 0%, rgba(255,255,255,0.15) 25%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        {/* Floating Hardware Specs Tag (Translates in 3D Space) */}
        <div
          className="absolute bottom-4 left-4 right-4 z-10 rounded-xl border border-white/10 bg-black/85 p-3.5 backdrop-blur-xl transition-all duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#A8FF00]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#A8FF00]">
              {categoryText}
            </span>
            <span className="text-[10px] font-mono text-stone-400">{specs}</span>
          </div>
          <h3 className="mt-1 text-sm font-bold tracking-tight text-white">{captionText}</h3>
        </div>
      </motion.div>
    </div>
  );
}

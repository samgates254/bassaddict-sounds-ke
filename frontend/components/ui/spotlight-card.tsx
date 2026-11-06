"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * React Bits — SpotlightCard
 * Source: reactbits.dev
 * Renders an elevated surface with a smooth cursor-following radial spotlight.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(168, 255, 0, 0.2)", // BASSADICT Electric Lime
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-[#0E130E] text-neutral-100 shadow-2xl transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Interactive Cursor-Tracking Spotlight Layer */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-px transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 md:opacity-0"
        )}
        style={{
          background: `radial-gradient(550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color, ${spotlightColor}), transparent 65%)`,
        }}
      />

      {/* Ambient Mobile / Passive Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 md:opacity-0 transition-opacity"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 size-full">{children}</div>
    </div>
  );
}

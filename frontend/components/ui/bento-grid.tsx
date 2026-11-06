"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div className={cn("grid w-full grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[22rem]", className)}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
  badge?: string;
}

export function BentoCard({
  name,
  className = "",
  background,
  Icon,
  description,
  href,
  cta = "Explore Service",
  badge,
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#A8FF00]/20 bg-[#0A0E0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[#A8FF00]/50 hover:shadow-[0_25px_60px_rgba(168,255,0,0.12)]",
        className
      )}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
        {background}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/75 to-transparent" />
      </div>

      {/* Top Header Tag & Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl border border-[#A8FF00]/30 bg-black/60 text-[#A8FF00] backdrop-blur-md transition-colors duration-300 group-hover:bg-[#A8FF00] group-hover:text-black">
          <Icon className="size-5" />
        </div>
        {badge && (
          <span className="rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-stone-300 backdrop-blur-md">
            {badge}
          </span>
        )}
      </div>

      {/* Content & Action */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#A8FF00]">
          {name}
        </h3>
        <p className="text-xs leading-relaxed text-[#899384] max-w-sm">{description}</p>

        {href && (
          <div className="pt-2">
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A8FF00] transition-colors hover:text-[#c2ff52]"
            >
              <span>{cta}</span>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

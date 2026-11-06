"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FocusCardItem {
  title: string;
  category: string;
  src: string;
  href: string;
  spec: string;
}

interface FocusCardsProps {
  cards: FocusCardItem[];
  className?: string;
}

export function FocusCards({ cards, className = "" }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full", className)}>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}

function Card({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCardItem;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const isInactive = hovered !== null && hovered !== index;

  return (
    <Link
      href={card.href}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "group relative h-80 w-full overflow-hidden rounded-2xl border border-[#A8FF00]/15 bg-[#0A0E0A] transition-all duration-500 ease-out",
        isInactive ? "blur-[2px] opacity-40 scale-[0.98]" : "hover:border-[#A8FF00]/60 hover:shadow-[0_20px_50px_rgba(168,255,0,0.15)]"
      )}
    >
      {/* Product Photograph */}
      <Image
        src={card.src}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, 25vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070A07] via-[#070A07]/50 to-transparent" />

      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="rounded-full border border-white/10 bg-black/75 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A8FF00] backdrop-blur-md">
          {card.category}
        </span>
      </div>

      {/* Content Footnote */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1">
        <p className="text-[10px] font-mono text-stone-400">{card.spec}</p>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold tracking-tight text-white group-hover:text-[#A8FF00] transition-colors">
            {card.title}
          </h4>
          <span className="flex size-7 items-center justify-center rounded-full bg-[#A8FF00] text-[#070A07] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

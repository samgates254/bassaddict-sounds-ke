"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, Transition } from "motion/react";

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
}

/**
 * Magic UI — Border Beam Component
 * Source: magicui.design/docs/components/border-beam
 */
export const BorderBeam = ({
  className,
  size = 70,
  duration = 14,
  delay = 0,
  colorFrom = "#A8FF00",
  colorTo = "#3B82F6",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": delay,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--initial-offset": initialOffset,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent opacity-60 [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#fff,#fff)]",
        className
      )}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "inset-0 bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
        )}
        style={{
          offsetPath: `rect(0 auto auto 0 round calc(var(--size) * 1px))`,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={
          transition ?? {
            repeat: Infinity,
            ease: "linear",
            duration,
            delay: -delay,
          }
        }
      />
    </div>
  );
};

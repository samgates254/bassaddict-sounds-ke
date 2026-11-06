"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, TargetAndTransition } from "motion/react";
import { cn } from "@/lib/utils";

export interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  className?: string;
  highlightText?: string;
  highlightClassName?: string;
}

/**
 * React Bits — BlurText
 * Source: reactbits.dev
 */
export function BlurText({
  text = "",
  delay = 35,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
  highlightText,
  highlightClassName = "text-[#A8FF00]",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        },
        { threshold, rootMargin }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        observer.disconnect();
      };
    }
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(6px)", opacity: 0, y: -12 }
      : { filter: "blur(6px)", opacity: 0, y: 12 };

  const defaultTo: TargetAndTransition = {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
  };

  return (
    <h1
      ref={ref}
      className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1.5", className)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="contents">
        {elements.map((element, index) => {
          const isHighlighted = highlightText && highlightText.includes(element);

          if (prefersReducedMotion) {
            return (
              <span
                key={index}
                className={cn(
                  "inline-block",
                  isHighlighted ? highlightClassName : undefined
                )}
              >
                {element}
              </span>
            );
          }

          const animateState = inView
            ? {
                ...defaultTo,
                transition: {
                  delay: (index * delay) / 1000,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1] as const,
                },
              }
            : defaultFrom;

          return (
            <motion.span
              key={index}
              initial={defaultFrom}
              animate={animateState}
              className={cn(
                "inline-block",
                isHighlighted ? highlightClassName : undefined
              )}
              style={{
                willChange: "transform, filter, opacity",
              }}
            >
              {element}
            </motion.span>
          );
        })}
      </span>
    </h1>
  );
}

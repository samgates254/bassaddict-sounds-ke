"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface DecryptedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  animateOn?: "view" | "hover";
}

/**
 * React Bits — DecryptedText
 * Source: reactbits.dev
 */
export function DecryptedText({
  text,
  speed = 35,
  maxIterations = 6,
  sequential = true,
  characters = "0123456789ABCDEFΩHzWdB",
  className,
  animateOn = "hover",
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const runDecryption = () => {
    if (isAnimating || prefersReducedMotion) return;
    setIsAnimating(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, idx) => {
            if (char === " " || char === "." || char === '"' || char === "%") {
              return char;
            }
            if (sequential && idx < iteration / 2) {
              return text[idx];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > maxIterations * 2) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view" && containerRef.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          runDecryption();
          observer.disconnect();
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => {
        if (animateOn === "hover") runDecryption();
      }}
      className={cn("font-mono cursor-default inline-block", className)}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

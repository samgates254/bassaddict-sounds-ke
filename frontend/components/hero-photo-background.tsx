"use client";

import { useEffect, useState } from "react";

import { SHOP_PHOTOS } from "@/lib/gallery";

const PHOTOS = SHOP_PHOTOS.filter((photo) => photo.src.includes("/workshop-audio-"));
const HOLD_DURATION_MS = 7_000;
const CROSSFADE_DURATION_MS = 1_500;

export function HeroPhotoBackground() {
  const [slide, setSlide] = useState({ current: 0, next: 1, fading: false });

  useEffect(() => {
    if (PHOTOS.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setSlide((current) => ({ ...current, fading: true }));
      fadeTimeout = setTimeout(() => {
        setSlide((current) => ({
          current: current.next,
          next: (current.next + 1) % PHOTOS.length,
          fading: false,
        }));
      }, CROSSFADE_DURATION_MS);
    }, HOLD_DURATION_MS);

    return () => {
      clearInterval(interval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);

  if (PHOTOS.length === 0) return null;

  const backgroundStyle = (index: number) => ({
    backgroundImage: `url("${PHOTOS[index].src}")`,
  });

  return (
    <div aria-hidden="true" className="hero-photo-background">
      <div className="hero-photo-background-image" style={backgroundStyle(slide.current)} />
      <div
        className={`hero-photo-background-image hero-photo-background-next${slide.fading ? " is-visible" : ""}`}
        style={backgroundStyle(slide.next)}
      />
      <div className="hero-photo-background-shade" />
    </div>
  );
}

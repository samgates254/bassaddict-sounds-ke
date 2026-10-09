"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

type TiltStyle = CSSProperties & {
  "--tilt-x": string;
  "--tilt-y": string;
};

export function TiltCard({
  as = "div",
  className = "",
  children,
}: {
  as?: "article" | "div" | "li" | "section";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;

  function tilt(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
  }

  function reset(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <Tag
      onPointerMove={tilt}
      onPointerLeave={reset}
      className={`[transform:perspective(1100px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] [transform-style:preserve-3d] will-change-transform ${className}`}
      style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as TiltStyle}
    >
      {children}
    </Tag>
  );
}

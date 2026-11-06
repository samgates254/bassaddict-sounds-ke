import React, { ComponentPropsWithoutRef, FC } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"p"> {
  shimmerWidth?: number;
}

/**
 * Magic UI — Animated Shiny Text
 * Source: magicui.design/docs/components/animated-shiny-text
 */
export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 140,
  ...props
}) => {
  return (
    <p
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "inline-flex items-center text-neutral-200",
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        "bg-gradient-to-r from-transparent via-[#A8FF00]/80 via-50% to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

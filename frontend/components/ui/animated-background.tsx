"use client";

import React, {
  Children,
  cloneElement,
  ReactElement,
  useState,
  useId,
} from "react";
import { AnimatePresence, motion, Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedBackgroundChildProps {
  "data-id"?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export interface AnimatedBackgroundProps {
  children: ReactElement<AnimatedBackgroundChildProps>[];
  defaultValue?: string;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
  onValueChange?: (newActiveId: string | null) => void;
}

/**
 * Motion Primitives — Animated Background
 * Source: motion-primitives.com
 * Renders a smooth sliding indicator behind active interactive elements.
 */
export function AnimatedBackground({
  children,
  defaultValue,
  className,
  transition,
  enableHover = false,
  onValueChange,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    if (onValueChange) {
      onValueChange(id);
    }
  };

  return (
    <>
      {Children.map(children, (child: ReactElement<AnimatedBackgroundChildProps>, index) => {
        const id = child.props["data-id"] ?? index.toString();
        const isActive = activeId === id;

        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onMouseLeave: () => handleSetActiveId(null),
            }
          : {
              onClick: () => {
                handleSetActiveId(id);
                child.props.onClick?.();
              },
            };

        return cloneElement(
          child,
          {
            key: index,
            className: cn("relative inline-flex", child.props.className),
            "aria-selected": isActive,
            ...interactionProps,
          },
          <>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  layoutId={`animated-bg-${uniqueId}`}
                  className={cn("absolute inset-0", className)}
                  transition={
                    transition ?? {
                      type: "spring",
                      stiffness: 350,
                      damping: 28,
                    }
                  }
                  initial={{ opacity: defaultValue ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10 w-full">{child.props.children}</span>
          </>
        );
      })}
    </>
  );
}

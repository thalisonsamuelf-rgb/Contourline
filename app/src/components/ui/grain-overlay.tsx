"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Full-bleed SVG noise texture overlay for film-grain effect. */
export interface GrainOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Noise intensity from 0 (invisible) to 1 (opaque). @default 0.04 */
  opacity?: number;
}

const GrainOverlay = React.forwardRef<HTMLDivElement, GrainOverlayProps>(
  ({ opacity = 0.04, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 pointer-events-none select-none z-50",
          className
        )}
        style={{ opacity }}
        aria-hidden="true"
        {...props}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#grain-filter)"
            fill="transparent"
          />
        </svg>
      </div>
    );
  }
);
GrainOverlay.displayName = "GrainOverlay";

export { GrainOverlay };

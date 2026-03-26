"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Supported device form factors for the mockup frame. */
export type DeviceMockupVariant = "laptop" | "phone" | "tablet";

/** Realistic device bezel frame that wraps arbitrary content as a screen. */
export interface DeviceMockupFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Device form factor. @default "laptop" */
  variant?: DeviceMockupVariant;
}

const variantStyles: Record<
  DeviceMockupVariant,
  { wrapper: string; bezel: string; screen: string; notch?: string }
> = {
  laptop: {
    wrapper: "w-full max-w-[640px]",
    bezel:
      "bg-bb-surface rounded-t-xl border border-bb-border border-b-0 p-[6px] pt-6 relative",
    screen:
      "w-full aspect-[16/10] rounded-md overflow-hidden bg-bb-surface-deep relative",
    notch: undefined,
  },
  phone: {
    wrapper: "w-full max-w-[280px]",
    bezel:
      "bg-bb-surface rounded-[28px] border border-bb-border p-3 pt-8 pb-8 relative",
    screen:
      "w-full aspect-[9/19] rounded-[18px] overflow-hidden bg-bb-surface-deep relative",
    notch: "phone",
  },
  tablet: {
    wrapper: "w-full max-w-[480px]",
    bezel:
      "bg-bb-surface rounded-2xl border border-bb-border p-3 pt-5 pb-5 relative",
    screen:
      "w-full aspect-[4/3] rounded-lg overflow-hidden bg-bb-surface-deep relative",
    notch: undefined,
  },
};

const DeviceMockupFrame = React.forwardRef<
  HTMLDivElement,
  DeviceMockupFrameProps
>(({ variant = "laptop", className, children, ...props }, ref) => {
  const styles = variantStyles[variant];

  return (
    <div ref={ref} className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.bezel}>
        {/* Camera dot */}
        {variant === "laptop" && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-bb-border" />
        )}
        {variant === "phone" && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-[5px] rounded-full bg-bb-border" />
        )}

        {/* Screen area */}
        <div className={styles.screen}>{children}</div>
      </div>

      {/* Laptop base/keyboard */}
      {variant === "laptop" && (
        <div className="bg-bb-surface border border-bb-border border-t-gray-charcoal rounded-b-lg h-3 flex items-center justify-center">
          <div className="w-16 h-[3px] rounded-full bg-bb-border" />
        </div>
      )}

      {/* Phone home indicator */}
      {variant === "phone" && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-bb-border" />
      )}
    </div>
  );
});
DeviceMockupFrame.displayName = "DeviceMockupFrame";

export { DeviceMockupFrame };

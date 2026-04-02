"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

/**
 * Stacked avatars overlap variants using CVA.
 * @size sm - 2px overlap between avatars
 * @size md - 3px overlap between avatars
 * @size lg - 4px overlap between avatars
 */
const stackedAvatarsVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "[&>div]:-ml-2 first:[&>div]:ml-0",
      md: "[&>div]:-ml-3 first:[&>div]:ml-0",
      lg: "[&>div]:-ml-4 first:[&>div]:ml-0",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const countBadgeSizeMap = {
  sm: "size-[30px] text-[10px] -ml-2",
  md: "size-[40px] text-xs -ml-3",
  lg: "size-[55px] text-sm -ml-4",
} as const;

/** Overlapping row of avatars with a "+N" overflow badge. */
export interface StackedAvatarsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackedAvatarsVariants> {
  /** Array of avatar data to display */
  avatars: { src?: string; alt: string }[];
  /** Maximum number of visible avatars before overflow. @default 4 */
  max?: number;
  /** Override the total count shown in the "+N" badge */
  count?: number;
}

const StackedAvatars = React.forwardRef<HTMLDivElement, StackedAvatarsProps>(
  ({ className, size = "md", avatars, max = 4, count, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    const visible = avatars.slice(0, max);
    const remaining = count != null ? count - visible.length : avatars.length - visible.length;

    return (
      <div
        ref={ref}
        className={cn(stackedAvatarsVariants({ size: resolvedSize, className }))}
        {...props}
      >
        {visible.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.alt}
            size={resolvedSize}
            className="ring-2 ring-background border border-border-subtle/30 shadow-lg"
          />
        ))}
        {remaining > 0 && (
          <div
            className={cn(
              "relative inline-flex items-center justify-center",
              "rounded-full",
              "border border-border-subtle/50",
              "bg-bg-overlay backdrop-blur-sm",
              "font-bold text-primary",
              "ring-2 ring-background",
              "shrink-0 select-none font-display",
              countBadgeSizeMap[resolvedSize]
            )}
          >
            +{remaining}
          </div>
        )}
      </div>
    );
  }
);
StackedAvatars.displayName = "StackedAvatars";

export { StackedAvatars, stackedAvatarsVariants };

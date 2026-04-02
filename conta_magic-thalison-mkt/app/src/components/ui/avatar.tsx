"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Avatar size variants using CVA.
 * @size sm - 30px, extra-small text
 * @size md - 40px, small text
 * @size lg - 55px, base text
 */
const avatarVariants = cva(
  [
    "relative inline-flex items-center justify-center",
    "rounded-full overflow-hidden",
    "border border-border-medium",
    "bg-bg-surface",
    "shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "size-[30px] text-xs",
        md: "size-[40px] text-sm",
        lg: "size-[55px] text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** Circular avatar with image and initials fallback. */
export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image URL for the avatar */
  src?: string;
  /** Accessible alt text for the image. @default "" */
  alt?: string;
  /** Full name used to generate initials when image is unavailable */
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt = "", fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const showFallback = !src || imageError;

    const initials = React.useMemo(() => {
      if (!fallback) return "?";
      return fallback
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }, [fallback]);

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, className }), "border-border-subtle/30 shadow-sm")}
        {...props}
      >
        {showFallback ? (
          <span className="font-bold text-primary select-none font-display uppercase tracking-tighter">
            {initials}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setImageError(true)}
            className="size-full object-cover"
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };

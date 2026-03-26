"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { PixelArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Button variant styles using CVA.
 * @variant primary - Neon-glow primary action button
 * @variant secondary - Outlined secondary action button
 * @variant ghost - Transparent background, text-only button
 * @variant link - Inline link styled as button
 * @size sm - 36px height, compact padding
 * @size md - 44px height, standard padding
 * @size lg - 52px height, spacious padding
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold whitespace-nowrap",
    "rounded-radius-lg",
    "transition-all duration-300 ease-luxury",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer active:scale-95",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:glow-neon hover:scale-[1.02]",
        secondary:
          "border border-border-medium bg-transparent text-foreground hover:bg-bg-surface hover:border-foreground/30 hover:scale-[1.02]",
        ghost:
          "bg-transparent text-foreground hover:bg-bg-surface",
        link: "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/** Animated button with spring physics and neon glow effects. */
export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  /** Merge props onto child element instead of rendering a button. @default false */
  asChild?: boolean;
  /** Button content */
  children?: React.ReactNode;
  /** Append a pixel arrow icon after the label. @default false */
  showArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, showArrow = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLElement>}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {showArrow && (
          <PixelArrowIcon className="size-4 ml-1" size={16} />
        )}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

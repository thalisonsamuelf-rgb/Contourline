"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  [
    "group",
    "inline-flex cursor-pointer items-center justify-center rounded-full border",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      tone: {
        glass:
          "border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md hover:border-primary/50 hover:bg-primary/20",
        signal:
          "border-primary bg-primary text-bb-dark shadow-[0_12px_28px_rgba(221, 209, 187,0.18)] hover:-translate-y-0.5 hover:brightness-110",
      },
      size: {
        md: "size-12",
        lg: "size-[72px]",
      },
    },
    defaultVariants: {
      tone: "glass",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, tone, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButtonVariants({ tone, size }), className)}
      {...props}
    />
  )
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };

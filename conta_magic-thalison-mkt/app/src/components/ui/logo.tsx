import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Logo size variants using CVA.
 * @size sm - Extra-large text (xl)
 * @size md - 3xl text
 * @size lg - 5xl text
 */
const logoVariants = cva(
  [
    "inline-block font-bold tracking-tight select-none",
    "text-gradient-neon",
  ],
  {
    variants: {
      size: {
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-5xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/** AIOX wordmark with neon gradient and display font. */
export interface LogoProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof logoVariants> {}

const Logo = React.forwardRef<HTMLSpanElement, LogoProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("font-display uppercase tracking-tighter", logoVariants({ size, className }))}
        {...props}
      >
        aiox
      </span>
    );
  }
);
Logo.displayName = "Logo";

export { Logo, logoVariants };

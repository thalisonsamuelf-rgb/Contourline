import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge variant styles using CVA.
 * @variant default - Solid primary background with neon glow
 * @variant outline - Bordered with glass-morphism backdrop
 * @variant muted - Subtle muted background for secondary info
 */
const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full",
    "px-3 py-1",
    "text-[10px] font-bold uppercase tracking-wider",
    "whitespace-nowrap",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:glow-neon",
        outline: "border border-border-medium bg-white/5 backdrop-blur-sm text-foreground hover:border-primary/50",
        muted: "bg-muted/50 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/** Small status label with pill shape and uppercase text. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

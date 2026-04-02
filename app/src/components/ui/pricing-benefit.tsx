"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons/check";

/** Pricing feature line item with check/cross icon and optional strikethrough. */
export interface PricingBenefitProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Feature description text */
  children: React.ReactNode;
  /** Whether this feature is included in the plan. @default true */
  included?: boolean;
}

const PricingBenefit = React.forwardRef<HTMLDivElement, PricingBenefitProps>(
  ({ className, children, included = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        {included ? (
          <CheckIcon className="shrink-0 text-primary" size={18} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted-foreground/50"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        )}
        <span
          className={cn(
            "text-sm leading-relaxed",
            included
              ? "text-foreground"
              : "text-muted-foreground line-through"
          )}
        >
          {children}
        </span>
      </div>
    );
  }
);
PricingBenefit.displayName = "PricingBenefit";

export { PricingBenefit };

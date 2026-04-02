"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Feature/benefit row with icon, title, and description. */
export interface PostBenefitProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon element rendered in a neon-glow container */
  icon: React.ReactNode;
  /** Benefit headline */
  title: string;
  /** Benefit supporting text */
  description: string;
}

const PostBenefit = React.forwardRef<HTMLDivElement, PostBenefitProps>(
  ({ className, icon, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-5", className)}
        {...props}
      >
        <div className="shrink-0 flex items-start pt-0.5">
          <div className="flex items-center justify-center size-12 rounded-radius-lg bg-primary text-primary-foreground shadow-lg glow-neon">
            {icon}
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <h4 className="text-base font-bold text-foreground font-display uppercase tracking-tight">
            {title}
          </h4>
          <p className="text-base text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }
);
PostBenefit.displayName = "PostBenefit";

export { PostBenefit };

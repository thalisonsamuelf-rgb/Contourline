"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Full-width marketing CTA used by older landing sections.
 * @deprecated Prefer `SiteCtaButton` or `SiteCtaLink` for new marketing actions.
 */
export interface CtaButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** CTA label text */
  children: React.ReactNode;
}

const CtaButton = React.forwardRef<HTMLAnchorElement, CtaButtonProps>(
  ({ children, className, href = "#", ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "group flex items-center justify-between",
          "border border-bb-border hover:border-primary/50",
          "bg-bg-elevated transition-colors duration-300",
          "rounded px-6 py-[18px] min-h-[50px] w-full sm:w-[320px]",
          "relative overflow-hidden box-border",
          className
        )}
        {...props}
      >
        <span className="text-bb-cream font-medium transition-colors group-hover:text-primary text-[15px]">
          {children}
        </span>
        <div className="flex items-center gap-1 z-10 transition-transform duration-300 group-hover:translate-x-1">
          <div className="w-1.5 h-1.5 bg-primary" />
          <div className="w-1.5 h-1.5 bg-primary" />
          <div className="w-1.5 h-1.5 bg-primary ml-1" />
        </div>
        {/* Accent underline slide-up on hover */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary glow-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </a>
    );
  }
);
CtaButton.displayName = "CtaButton";

export { CtaButton };

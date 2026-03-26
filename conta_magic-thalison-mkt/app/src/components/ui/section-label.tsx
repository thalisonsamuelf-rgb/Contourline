import * as React from "react";
import { cn } from "@/lib/utils";

/** Tiny uppercase primary-colored label used above section headings. */
export interface SectionLabelProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Label text */
  children: React.ReactNode;
}

const SectionLabel = React.forwardRef<HTMLSpanElement, SectionLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-block",
          "font-display text-[11px] font-bold uppercase tracking-[0.25em]",
          "text-primary",
          "select-none",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
SectionLabel.displayName = "SectionLabel";

export { SectionLabel };

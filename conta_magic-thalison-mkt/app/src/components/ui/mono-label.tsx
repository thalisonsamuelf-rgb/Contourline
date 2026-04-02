"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Monospaced label with optional bracketed index prefix and blinking cursor. */
export interface MonoLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Bracketed index prefix, e.g. "01" renders as [01] */
  index?: string;
  /** Label text */
  children: string;
}

const MonoLabel = React.forwardRef<HTMLDivElement, MonoLabelProps>(
  ({ index, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {index && (
          <span className="font-mono text-[11px] font-bold tracking-[-0.04em] leading-[1.2] text-primary uppercase">
            [{index}]
          </span>
        )}
        <span className="font-mono text-[11px] font-bold tracking-[-0.04em] leading-[1.2] text-gray-silver uppercase">
          {children}{" "}
          <span className="text-primary ml-1">_</span>
        </span>
      </div>
    );
  }
);
MonoLabel.displayName = "MonoLabel";

export { MonoLabel };

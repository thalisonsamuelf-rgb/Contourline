import * as React from "react";
import { cn } from "@/lib/utils";

/** Decorative vertical grid lines overlay for layout rhythm. */
export interface GridBordersProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns to render borders for. @default 4 */
  columns?: number;
}

const GridBorders = React.forwardRef<HTMLDivElement, GridBordersProps>(
  ({ className, columns = 4, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 flex h-full w-full",
          className
        )}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: columns + 1 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-border-subtle/30"
            style={{ left: `${(i / columns) * 100}%`, position: "absolute" }}
          />
        ))}
      </div>
    );
  }
);
GridBorders.displayName = "GridBorders";

export { GridBorders };

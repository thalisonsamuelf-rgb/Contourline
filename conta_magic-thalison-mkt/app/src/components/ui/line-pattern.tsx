import * as React from "react";
import { cn } from "@/lib/utils";

export type LinePatternProps = React.HTMLAttributes<HTMLDivElement>;

const LinePattern = React.forwardRef<HTMLDivElement, LinePatternProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full overflow-hidden",
          className
        )}
        aria-hidden="true"
        {...props}
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.05"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
            className="text-foreground"
          />
        </svg>
      </div>
    );
  }
);
LinePattern.displayName = "LinePattern";

export { LinePattern };

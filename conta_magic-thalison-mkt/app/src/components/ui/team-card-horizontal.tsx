"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Horizontal team member card with photo, name, role, and short bio. */
export interface TeamCardHorizontalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Team member full name */
  name: string;
  /** Job title or role */
  role: string;
  /** Short biography (clamped to 2 lines) */
  bio: string;
  /** Profile photo URL */
  imageSrc?: string;
}

const TeamCardHorizontal = React.forwardRef<
  HTMLDivElement,
  TeamCardHorizontalProps
>(({ className, name, role, bio, imageSrc, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "card-aiox flex items-center gap-6 p-6 rounded-[24px] bg-bg-surface/40 backdrop-blur-sm border-border-subtle/20",
        "overflow-hidden transition-all duration-500 hover:border-primary/30",
        className
      )}
      {...props}
    >
      <div className="shrink-0">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            loading="lazy"
            className="size-[90px] rounded-[16px] object-cover border border-border-subtle/30 shadow-md"
          />
        ) : (
          <div className="size-[90px] rounded-[16px] bg-bg-overlay border border-border-subtle/50 flex items-center justify-center shadow-inner">
            <span className="text-xl font-bold text-primary font-display uppercase select-none">
              {name
                .split(" ")
                .map((w) => w[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-lg font-bold text-foreground truncate font-display uppercase tracking-tight">
          {name}
        </h3>
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{role}</span>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mt-1">
          {bio}
        </p>
      </div>
    </div>
  );
});
TeamCardHorizontal.displayName = "TeamCardHorizontal";

export { TeamCardHorizontal };

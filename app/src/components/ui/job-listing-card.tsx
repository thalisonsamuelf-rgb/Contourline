"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Employment type for job listings. */
export type JobType = "full-time" | "part-time" | "contract";

/** Job position card with department, location tags, and apply CTA. */
export interface JobListingCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Job position title */
  title: string;
  /** Department or team name */
  department: string;
  /** Office location or "Remote" */
  location: string;
  /** Employment type */
  type: JobType;
  /** URL for the apply action. @default "#" */
  applyHref?: string;
  /** Whether the position is actively hiring (shows pulse dot). @default true */
  open?: boolean;
}

const typeLabels: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
};

const JobListingCard = React.forwardRef<HTMLDivElement, JobListingCardProps>(
  (
    {
      title,
      department,
      location,
      type,
      applyHref = "#",
      open = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group bg-bg-elevated border border-border rounded-lg p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors",
          className
        )}
        {...props}
      >
        {/* Header: title + open dot */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-[700] text-[18px] text-bb-cream leading-tight uppercase tracking-tight">
            {title}
          </h3>
          {open && (
            <span className="relative flex-shrink-0 mt-1">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
          )}
        </div>

        {/* Meta tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-muted bg-bg-surface px-2 py-1 rounded">
            {department}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-muted bg-bg-surface px-2 py-1 rounded">
            {location}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
            {typeLabels[type]}
          </span>
        </div>

        {/* Apply CTA */}
        <a
          href={applyHref}
          className="mt-auto inline-flex min-h-11 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gray-silver group-hover:text-primary transition-colors"
        >
          Apply now
          <span className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>
    );
  }
);
JobListingCard.displayName = "JobListingCard";

export { JobListingCard };

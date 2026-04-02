"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Office location card with map placeholder, contact info, and address. */
export interface OfficeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** City name shown as heading */
  city: string;
  /** Full street address */
  address: string;
  /** Contact phone number */
  phone?: string;
  /** Contact email address */
  email?: string;
  /** External map link URL */
  mapUrl?: string;
}

const OfficeCard = React.forwardRef<HTMLDivElement, OfficeCardProps>(
  ({ city, address, phone, email, mapUrl, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-bg-elevated border border-border rounded-lg overflow-hidden flex flex-col hover:border-primary/30 transition-colors",
          className
        )}
        {...props}
      >
        {/* Map placeholder */}
        <div className="w-full aspect-[16/9] bg-bg-surface relative flex items-center justify-center">
          {mapUrl ? (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-full bg-gradient-to-br from-bg-elevated to-bg-surface" />
              <span className="absolute font-mono text-[10px] text-gray-dim uppercase tracking-wider">
                View on map &rarr;
              </span>
            </a>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[10px] text-gray-dim uppercase tracking-wider">
                {city}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col gap-3">
          <h3 className="font-display font-[700] text-[16px] text-bb-cream uppercase tracking-tight">
            {city}
          </h3>
          <p className="font-mono text-[12px] text-gray-muted leading-relaxed">
            {address}
          </p>

          <div className="flex flex-col gap-1.5 mt-1">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="inline-flex min-h-11 items-center font-mono text-[11px] text-gray-silver hover:text-primary transition-colors"
              >
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center font-mono text-[11px] text-gray-silver hover:text-primary transition-colors"
              >
                {email}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
);
OfficeCard.displayName = "OfficeCard";

export { OfficeCard };

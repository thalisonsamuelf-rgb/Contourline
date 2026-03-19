"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

/** Compact author attribution with avatar, name, and role. */
export interface AuthorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Author full name */
  name: string;
  /** Author role or title */
  role: string;
  /** Avatar image URL */
  imageSrc?: string;
  /** Alt text for the avatar image. @default name */
  imageAlt?: string;
}

const AuthorCard = React.forwardRef<HTMLDivElement, AuthorCardProps>(
  ({ className, name, role, imageSrc, imageAlt, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        <Avatar
          src={imageSrc}
          alt={imageAlt ?? name}
          fallback={name}
          size="md"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-foreground truncate font-display uppercase tracking-tight">
            {name}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary truncate">
            {role}
          </span>
        </div>
      </div>
    );
  }
);
AuthorCard.displayName = "AuthorCard";

export { AuthorCard };

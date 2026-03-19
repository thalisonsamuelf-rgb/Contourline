"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/** Linked card for blog/article previews with image, category badge, and metadata. */
export interface ArticleCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Article headline */
  title: string;
  /** Category label shown as a badge */
  category: string;
  /** Publication date string */
  date: string;
  /** Estimated read time (e.g. "5 min read") */
  readTime: string;
  /** Optional cover image URL */
  imageSrc?: string;
  /** Destination URL */
  href: string;
}

const ArticleCard = React.forwardRef<HTMLAnchorElement, ArticleCardProps>(
  (
    { className, title, category, date, readTime, imageSrc, href, ...props },
    ref
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          "card-aiox group flex flex-col overflow-hidden rounded-[24px] bg-bg-surface/40 backdrop-blur-sm border border-border-subtle/20 transition-all duration-500 hover:border-primary/30 hover:bg-bg-surface/60",
          className
        )}
        {...props}
      >
        {imageSrc && (
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60" />
          </div>
        )}

        <div className="flex flex-col gap-4 p-6 md:p-8">
          <Badge variant="outline" className="w-fit bg-background/50 text-[10px] uppercase tracking-widest font-bold">
            {category}
          </Badge>

          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 font-display uppercase tracking-tight">
            {title}
          </h3>

          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-2">
            <time>{date}</time>
            <span aria-hidden="true" className="size-1 rounded-full bg-border-medium" />
            <span>{readTime}</span>
          </div>
        </div>
      </a>
    );
  }
);
ArticleCard.displayName = "ArticleCard";

export { ArticleCard };

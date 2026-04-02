"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

export interface BigQuoteProps {
  quote: string
  author: string
  role: string
  rating?: number
  ratingLabel?: string
  className?: string
}

export function BigQuote({
  quote,
  author,
  role,
  rating,
  ratingLabel = "satisfaction rate",
  className,
}: BigQuoteProps) {
  const safeRating = typeof rating === "number" ? Math.max(0, Math.min(5, rating)) : null

  return (
    <motion.figure
      className={cn("relative max-w-5xl mx-auto text-center px-4", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute -top-12 left-1/2 -translate-x-1/2 select-none font-display text-[10rem] md:text-[15rem] leading-none text-primary/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        aria-hidden="true"
      >
        &ldquo;
      </motion.span>

      <blockquote className="relative z-10">
        <motion.p
          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground font-display uppercase tracking-tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {quote}
        </motion.p>
      </blockquote>

      <motion.figcaption
        className="mt-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {safeRating !== null && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, index) => {
                const filled = index < Math.round(safeRating)
                return (
                  <Star
                    key={index}
                    className={cn(
                      "size-4",
                      filled ? "text-primary fill-primary" : "text-muted-foreground/50"
                    )}
                  />
                )
              })}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {safeRating.toFixed(1)} {ratingLabel}
            </span>
          </div>
        )}
        <span className="text-lg font-bold text-primary font-display uppercase tracking-wider">{author}</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{role}</span>
      </motion.figcaption>
    </motion.figure>
  )
}

/* --- QuoteSection wrapper --- */

export interface QuoteSectionProps extends React.HTMLAttributes<HTMLElement> {
  quote: string
  author: string
  role: string
  rating?: number
  ratingLabel?: string
  backgroundColor?: string
  containerWidth?: "sm" | "md" | "lg" | "xl"
}

const containerWidths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
}

const QuoteSection = React.forwardRef<HTMLElement, QuoteSectionProps>(
  (
    {
      className,
      quote,
      author,
      role,
      rating,
      ratingLabel,
      backgroundColor,
      containerWidth = "lg",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full py-24 md:py-32 px-4 md:px-8 overflow-hidden",
          !backgroundColor && "bg-background",
          className
        )}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className={cn("mx-auto", containerWidths[containerWidth])}>
          <BigQuote
            quote={quote}
            author={author}
            role={role}
            rating={rating}
            ratingLabel={ratingLabel}
          />
        </div>
      </section>
    )
  }
)
QuoteSection.displayName = "QuoteSection"

export { QuoteSection }

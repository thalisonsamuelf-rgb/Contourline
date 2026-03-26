import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import type { CSSProperties, ReactNode } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   SPREAD SECTION // Generic two-page book layout
   Server component. Displays children in a side-by-side book spread.
   Supports dark/light variants. Stacks vertically on mobile (<768px).
   ═══════════════════════════════════════════════════════════════════════════ */

interface SpreadSectionProps {
  children: ReactNode
  className?: string
  variant?: "light" | "dark"
}

export function SpreadSection({ children, className, variant = "light" }: SpreadSectionProps) {
  const isDark = variant === "dark"
  const styleVars = {
    "--bb-spread-bg": isDark ? "var(--bb-dark)" : "var(--bb-cream)",
    "--bb-spread-shadow": isDark
      ? "8px 8px 0 var(--bb-accent-12)"
      : "8px 8px 0 var(--bb-dark)",
    "--bb-spread-fg": isDark ? "var(--bb-cream)" : "var(--bb-dark)",
    "--bb-spread-divider": isDark ? "rgba(244, 244, 232, 0.1)" : "#e5e5e5",
    "--bb-spread-footer-border": isDark
      ? "rgba(244, 244, 232, 0.15)"
      : "var(--bb-dark)",
    "--bb-spread-footer-color": isDark ? "var(--bb-dim)" : "var(--bb-dark)",
    "--bb-spread-rule": isDark
      ? "rgba(244, 244, 232, 0.1)"
      : "rgba(5, 5, 5, 0.1)",
    "--bb-spread-meta-opacity": isDark ? "0.5" : "0.4",
  } as CSSProperties

  return (
    <section
      className={cn("bb-editorial-spread editorial-spread", className)}
      style={styleVars}
    >
      {children}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE // Single page within a spread (left or right)
   ═══════════════════════════════════════════════════════════════════════════ */

interface PageProps {
  children: ReactNode
  side: "left" | "right"
  className?: string
  pageNumber?: number
  sectionName?: string
  variant?: "light" | "dark"
}

export function Page({ children, side, className, pageNumber, sectionName, variant = "light" }: PageProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={cn(
        "bb-editorial-spread__page",
        side === "left" && "bb-editorial-spread__page--left",
        className
      )}
      style={
        {
          "--bb-spread-divider": isDark ? "rgba(244, 244, 232, 0.1)" : "#e5e5e5",
        } as CSSProperties
      }
    >
      {children}

      {pageNumber !== undefined && (
        <div
          className="bb-editorial-spread__page-footer"
          style={
            {
              "--bb-spread-footer-border": isDark
                ? "rgba(244, 244, 232, 0.15)"
                : "var(--bb-dark)",
              "--bb-spread-footer-color": isDark ? "var(--bb-dim)" : "var(--bb-dark)",
              "--bb-spread-rule": isDark
                ? "rgba(244, 244, 232, 0.1)"
                : "rgba(5, 5, 5, 0.1)",
              "--bb-spread-meta-opacity": isDark ? "0.5" : "0.4",
            } as CSSProperties
          }
        >
          {side === "left" ? (
            <>
              {sectionName && (
                <span className="bb-editorial-spread__page-meta" style={{ marginRight: "auto" }}>
                  {sectionName}
                </span>
              )}
              <span className="bb-editorial-spread__page-rule" style={{ flex: sectionName ? undefined : 1 }} />
              <span>{STARTER_BRAND_ASSETS.brandName}.</span>
              <span className="bb-editorial-spread__page-rule" />
              <span className="bb-editorial-spread__page-chip">
                {pageNumber}
              </span>
            </>
          ) : (
            <>
              <span className="bb-editorial-spread__page-chip">
                {pageNumber}
              </span>
              <span className="bb-editorial-spread__page-rule" />
              <span>{STARTER_BRAND_ASSETS.brandName}.</span>
              <span className="bb-editorial-spread__page-rule" />
              {sectionName && (
                <span className="bb-editorial-spread__page-meta" style={{ marginLeft: "auto" }}>
                  {sectionName}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL HELPERS // Reusable sub-components for editorial spreads
   ═══════════════════════════════════════════════════════════════════════════ */

interface SectionNumberProps {
  children: ReactNode
  className?: string
  variant?: "light" | "dark"
}

export function SectionNumber({ children, className, variant = "light" }: SectionNumberProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={cn("bb-editorial-section-number", className)}
      style={
        {
          "--bb-section-divider": isDark ? "var(--bb-accent)" : "var(--bb-dark)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface HugeNumberProps {
  children: ReactNode
  variant?: "light" | "dark"
}

export function HugeNumber({ children, variant = "light" }: HugeNumberProps) {
  const isDark = variant === "dark"

  return (
    <div
      className="bb-editorial-huge-number"
      style={
        {
          "--bb-huge-number": isDark
            ? "var(--bb-accent-10)"
            : "rgba(5, 5, 5, 0.06)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

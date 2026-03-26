import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"

export interface EditorialCanvasProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxWidth?: number
}

export function EditorialCanvas({
  children,
  maxWidth = 1400,
  className,
  style,
  ...props
}: EditorialCanvasProps) {
  return (
    <div
      className={cn("min-h-screen bg-[var(--bb-surface)]", className)}
      style={style}
      {...props}
    >
      <main className="relative mx-auto px-8 py-8" style={{ maxWidth }}>
        {children}
      </main>
    </div>
  )
}

export interface EditorialChapterHeaderProps extends HTMLAttributes<HTMLDivElement> {
  number: string
  title: string
  concept: string
  variant?: "dark" | "accent"
}

export function EditorialChapterHeader({
  number,
  title,
  concept,
  variant = "dark",
  className,
  ...props
}: EditorialChapterHeaderProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={cn(
        "relative my-2 flex min-h-[300px] items-center justify-between overflow-hidden px-12 py-8",
        isDark ? "bg-[var(--bb-dark)]" : "bg-[var(--bb-accent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_at_30%_50%,var(--bb-accent-05),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_70%_50%,rgba(5,5,5,0.05),transparent_70%)]"
        )}
      />

      <div
        className={cn(
          "relative z-[1] font-bb-display text-[clamp(4rem,18vw,14rem)] font-black leading-[0.85] tracking-[-4px]",
          isDark ? "text-[var(--bb-accent)]" : "text-[var(--bb-dark)]"
        )}
      >
        {number}
      </div>

      <div className="relative z-[1] text-right">
        <div
          className={cn(
            "mb-2 font-bb-display text-[2rem] font-extrabold uppercase tracking-[-0.5px]",
            isDark ? "text-[var(--bb-cream)]" : "text-[var(--bb-dark)]"
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "font-bb-mono text-[0.6rem] uppercase tracking-[0.1em]",
            isDark ? "text-[var(--bb-dim)]" : "text-black/50"
          )}
        >
          {concept}
        </div>
      </div>

      {["left-6 top-6", "right-6 top-6", "bottom-6 left-6", "bottom-6 right-6"].map((position) => (
        <div key={position} className={`absolute h-5 w-5 ${position}`}>
          <div
            className={cn(
              "absolute top-1/2 h-px w-full opacity-50",
              isDark ? "bg-[var(--bb-accent)]" : "bg-[var(--bb-dark)]"
            )}
          />
          <div
            className={cn(
              "absolute left-1/2 h-full w-px opacity-50",
              isDark ? "bg-[var(--bb-accent)]" : "bg-[var(--bb-dark)]"
            )}
          />
        </div>
      ))}
    </div>
  )
}

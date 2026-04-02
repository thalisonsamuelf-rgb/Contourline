import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "surface" | "error" | "blue" | "solid"
}

const variantClassNames: Record<NonNullable<BadgeProps["variant"]>, string> = {
  accent:
    "border border-[var(--bb-accent-20)] bg-[var(--bb-accent-10)] text-[var(--bb-accent)]",
  surface:
    "border border-[var(--bb-border)] bg-[var(--bb-surface)] text-[var(--bb-dim)]",
  error:
    "border border-[var(--bb-error-20)] bg-[var(--bb-error-10)] text-[var(--error)]",
  blue:
    "border border-[var(--bb-blue-20)] bg-[var(--bb-blue-10)] text-[var(--blue)]",
  solid: "border-transparent bg-[var(--bb-accent)] text-[var(--bb-dark)]",
}

export function Badge({
  variant = "accent",
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 font-bb-mono text-[0.5rem] font-medium uppercase tracking-[0.08em]",
        variantClassNames[variant],
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </span>
  )
}

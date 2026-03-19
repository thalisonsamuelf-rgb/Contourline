import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export type BentoGridProps = HTMLAttributes<HTMLDivElement>

export function BentoGrid({
  children,
  className,
  style,
  ...props
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-min gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

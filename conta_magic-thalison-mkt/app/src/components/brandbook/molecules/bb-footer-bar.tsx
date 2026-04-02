import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export type BbFooterBarProps = HTMLAttributes<HTMLElement>

export function BbFooterBar({ children, className, style, ...props }: BbFooterBarProps) {
  return (
    <footer
      className={cn(className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 0",
        borderTop: "1px solid var(--border)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.6rem",
        color: "var(--dim)",
        ...style,
      }}
      {...props}
    >
      {children}
    </footer>
  )
}

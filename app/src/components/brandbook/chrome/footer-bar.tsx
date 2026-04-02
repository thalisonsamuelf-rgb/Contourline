import { cn } from "@/lib/utils"

interface FooterBarProps {
  left: string
  center?: string
  right?: string
  className?: string
}

export function FooterBar({ left, center, right, className }: FooterBarProps) {
  return (
    <div
      className={cn("flex justify-between items-center border-t", className)}
      style={{
        padding: "0.5rem 1.5rem",
        borderColor: "var(--bb-border)",
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        fontWeight: 500,
        textTransform: "uppercase",
        color: "var(--bb-dim)",
        letterSpacing: "0.08em",
      }}
    >
      <span>{left}</span>
      {center && <span>{center}</span>}
      {right && <span>{right}</span>}
    </div>
  )
}

import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

export type BbSliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export function BbSlider({ className, style, ...props }: BbSliderProps) {
  return (
    <input
      type="range"
      className={cn(className)}
      style={{
        width: "100%",
        appearance: "none",
        minHeight: 44,
        padding: "19px 0",
        boxSizing: "border-box",
        height: 44,
        background: "transparent",
        border: "none",
        borderTop: "1px solid var(--border)",
        outline: "none",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    />
  )
}

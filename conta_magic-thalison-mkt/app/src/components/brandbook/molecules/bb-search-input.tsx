import { cn } from "@/lib/utils"
import { BbInput, type BbInputProps } from "../atoms/bb-input"

export type BbSearchInputProps = BbInputProps

export function BbSearchInput({ className, style, ...props }: BbSearchInputProps) {
  return (
    <div
      className={cn(className)}
      style={{ position: "relative", display: "flex", alignItems: "center", ...style }}
    >
      <span
        style={{
          position: "absolute",
          left: "0.75rem",
          color: "var(--dim)",
          fontSize: "0.75rem",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        ⌕
      </span>
      <BbInput
        {...props}
        style={{ paddingLeft: "2rem" }}
        placeholder={props.placeholder ?? "Search..."}
      />
    </div>
  )
}

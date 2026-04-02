import { cn } from "@/lib/utils"
import { BbLabel } from "../atoms/bb-label"
import { BbHint } from "../atoms/bb-hint"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbFormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: ReactNode
}

/** @deprecated Prefer `Field` + `FieldLabel` from `@/components/ui/field` for new site/product forms. */
export function BbFormField({ label, hint, error, required, htmlFor, children, className, style, ...props }: BbFormFieldProps) {
  return (
    <div
      className={cn(className)}
      style={{ display: "flex", flexDirection: "column", ...style }}
      {...props}
    >
      {label && (
        <BbLabel htmlFor={htmlFor} required={required}>
          {label}
        </BbLabel>
      )}
      {children}
      {error && <BbHint variant="error">{error}</BbHint>}
      {!error && hint && <BbHint>{hint}</BbHint>}
    </div>
  )
}

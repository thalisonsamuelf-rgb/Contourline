import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "../lib/cn"

export interface EditorialSpread {
  label: string
  concept: string
  content: ReactNode
}

export interface EditorialPageTemplateProps
  extends HTMLAttributes<HTMLDivElement> {
  spreads: EditorialSpread[]
  maxWidth?: number
}

export function EditorialPageTemplate({
  spreads,
  maxWidth = 1400,
  className,
  style,
  ...props
}: EditorialPageTemplateProps) {
  return (
    <div className={cn(className)} style={style} {...props}>
      <main
        className="relative mx-auto px-[clamp(1rem,3vw,2rem)] py-[clamp(1rem,3vw,2rem)]"
        style={{ maxWidth }}
      >
        {spreads.map((spread) => (
          <div key={`${spread.label}-${spread.concept}`}>
            <div className="flex items-center gap-4 py-8 font-bb-mono text-[0.6rem] uppercase tracking-[0.1em] text-[var(--bb-dim)]">
              <span className="h-px flex-1 bg-[var(--bb-border)]" />
              <span className="font-bold text-[var(--bb-cream)]">{spread.label}</span>
              <span className="text-[var(--bb-accent)]">{spread.concept}</span>
              <span className="h-px flex-1 bg-[var(--bb-border)]" />
            </div>
            {spread.content}
          </div>
        ))}
      </main>
    </div>
  )
}

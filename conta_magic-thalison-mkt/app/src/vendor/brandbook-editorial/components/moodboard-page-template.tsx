import type { HTMLAttributes, ReactNode } from "react"
import { SimplePageHeader } from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface MoodboardPageTemplateProps
  extends HTMLAttributes<HTMLDivElement> {
  header: {
    title: string
    subtitle?: string
    badge?: string
  }
  children: ReactNode
  columns?: number
}

export function MoodboardPageTemplate({
  header,
  children,
  columns = 3,
  className,
  style,
  ...props
}: MoodboardPageTemplateProps) {
  const minColumnWidth = Math.floor(840 / Math.max(columns, 1))

  return (
    <div className={cn(className)} style={style} {...props}>
      <SimplePageHeader
        title={header.title}
        subtitle={header.subtitle}
        badge={header.badge}
      />

      <main className="py-8">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}px), 1fr))`,
          }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}

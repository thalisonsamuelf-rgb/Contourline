import type { HTMLAttributes, ReactNode } from "react"
import { BentoGrid, SimplePageHeader } from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface BentoPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  header: {
    title: string
    subtitle?: string
    badge?: string
  }
  children: ReactNode
}

export function BentoPageTemplate({
  header,
  children,
  className,
  style,
  ...props
}: BentoPageTemplateProps) {
  return (
    <div className={cn(className)} style={style} {...props}>
      <SimplePageHeader
        title={header.title}
        subtitle={header.subtitle}
        badge={header.badge}
      />

      <main className="py-8">
        <BentoGrid>{children}</BentoGrid>
      </main>
    </div>
  )
}

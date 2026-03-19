import type { HTMLAttributes, ReactNode } from "react"
import {
  SimplePageHeader,
  SimpleSectionDivider,
} from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface FoundationsSection {
  id: string
  label: string
  content: ReactNode
}

export interface FoundationsPageTemplateProps
  extends HTMLAttributes<HTMLDivElement> {
  header: {
    title: string
    subtitle?: string
    badge?: string
  }
  sections: FoundationsSection[]
}

export function FoundationsPageTemplate({
  header,
  sections,
  className,
  style,
  ...props
}: FoundationsPageTemplateProps) {
  return (
    <div className={cn(className)} style={style} {...props}>
      <SimplePageHeader
        title={header.title}
        subtitle={header.subtitle}
        badge={header.badge}
      />

      <main>
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <SimpleSectionDivider label={section.label} />
            {section.content}
          </section>
        ))}
      </main>
    </div>
  )
}

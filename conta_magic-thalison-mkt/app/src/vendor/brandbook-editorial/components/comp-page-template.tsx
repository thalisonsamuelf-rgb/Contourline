import type { HTMLAttributes, ReactNode } from "react"
import { PageHeader, SectionDivider } from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface CompPageSection {
  label: string
  concept?: string
  num?: string
  content: ReactNode
}

export interface CompPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  header: {
    navLeft?: string
    navCenter?: string
    navRight?: string
    titlePrefix?: string
    titleHighlight?: string
    subtitle?: string
    footerLeft?: string
    footerCenter?: string
    footerRight?: string
    title?: string
    badge?: string
  }
  sections: CompPageSection[]
}

export function CompPageTemplate({
  header,
  sections,
  className,
  style,
  ...props
}: CompPageTemplateProps) {
  const titleNode =
    header.titlePrefix && header.titleHighlight ? (
      <>
        {header.titlePrefix}{" "}
        <span className="text-[var(--bb-accent)]">{header.titleHighlight}</span>
      </>
    ) : (
      header.title ?? ""
    )

  return (
    <div className={cn(className)} style={style} {...props}>
      <PageHeader
        navLeft={header.navLeft}
        navCenter={header.navCenter}
        navRight={header.navRight}
        title={titleNode}
        subtitle={header.subtitle}
        footerLeft={header.footerLeft}
        footerCenter={header.footerCenter}
        footerRight={header.footerRight}
      />

      <main className="min-w-0 w-full overflow-x-hidden">
        {sections.map((section, index) => (
          <div key={section.label} className="min-w-0 w-full">
            <SectionDivider
              label={section.label}
              concept={section.concept}
              num={section.num ?? String(index + 1).padStart(2, "0")}
            />
            <div className="w-full px-[var(--bb-gutter,1.5rem)]">{section.content}</div>
          </div>
        ))}
      </main>
    </div>
  )
}

import type { HTMLAttributes, ReactNode } from "react"
import {
  Badge,
  SimplePageHeader,
  SimpleSectionDivider,
} from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface ShowcaseItem {
  name: string
  status: "live" | "wip" | "planned"
  content: ReactNode
}

export interface ShowcaseGroup {
  label: string
  items: ShowcaseItem[]
}

export interface ShowcasePageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  header: {
    title: string
    subtitle?: string
    badge?: string
  }
  groups: ShowcaseGroup[]
}

const statusVariant: Record<ShowcaseItem["status"], "accent" | "blue" | "surface"> = {
  live: "accent",
  wip: "blue",
  planned: "surface",
}

export function ShowcasePageTemplate({
  header,
  groups,
  className,
  style,
  ...props
}: ShowcasePageTemplateProps) {
  return (
    <div className={cn(className)} style={style} {...props}>
      <SimplePageHeader
        title={header.title}
        subtitle={header.subtitle}
        badge={header.badge}
      />

      <main>
        {groups.map((group) => (
          <div key={group.label}>
            <SimpleSectionDivider label={group.label} />

            {group.items.map((item) => (
              <div
                key={item.name}
                className="mb-6 border border-[var(--bb-border)] bg-[var(--bb-surface)] p-6"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-bb-mono text-[0.65rem] tracking-[0.04em] text-[var(--bb-accent)]">
                    {item.name}
                  </span>
                  <Badge variant={statusVariant[item.status]}>
                    {item.status.toUpperCase()}
                  </Badge>
                </div>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        ))}
      </main>
    </div>
  )
}

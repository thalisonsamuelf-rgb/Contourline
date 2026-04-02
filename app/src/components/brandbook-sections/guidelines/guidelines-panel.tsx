import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import type { ReactNode } from "react"

interface GuidelinesPanelProps {
  colSpan?: 1 | 2 | 4
  rowSpan?: 1 | 2
  children: ReactNode
  className?: string
  header?: {
    label: string
    concept?: string
    num?: string
  }
}

export function GuidelinesPanel({
  colSpan = 1,
  rowSpan = 1,
  children,
  className,
  header,
}: GuidelinesPanelProps) {
  const colSpanClass =
    colSpan === 4 ? "col-span-1 md:col-span-2 xl:col-span-4" : colSpan === 2 ? "col-span-1 md:col-span-2" : "col-span-1"
  const rowSpanClass = rowSpan === 2 ? "row-span-1 xl:row-span-2" : "row-span-1"

  return (
    <div
      className={cn("guidelines-panel relative flex flex-col overflow-hidden", colSpanClass, rowSpanClass, className)}
      style={{
        background: "var(--bb-dark)",
      }}
    >
      {header && (
        <PanelHeader
          label={header.label}
          concept={header.concept}
          num={header.num}
        />
      )}
      {children}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"
import { BbAccordionItem } from "../molecules"

export interface BbAccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: {
    title: string
    content: ReactNode
    defaultOpen?: boolean
    icon?: ReactNode
  }[]
}

export function BbAccordion({ items, className, style, ...props }: BbAccordionProps) {
  return (
    <div
      className={cn(className)}
      style={{ borderTop: "1px solid var(--border)", ...style }}
      {...props}
    >
      {items.map((item, index) => (
        <BbAccordionItem
          key={index}
          title={item.title}
          defaultOpen={item.defaultOpen}
          icon={item.icon}
        >
          {item.content}
        </BbAccordionItem>
      ))}
    </div>
  )
}

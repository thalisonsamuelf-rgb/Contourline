"use client"

import type { HTMLAttributes, ReactNode } from "react"
import { AnchorSidebar } from "@brandbook-primitives"
import { cn } from "../lib/cn"

export interface SidebarPageTemplateProps extends HTMLAttributes<HTMLDivElement> {
  sidebarGroups: {
    title: string
    items: { label: string; href: string; active?: boolean }[]
  }[]
  children: ReactNode
}

export function SidebarPageTemplate({
  sidebarGroups,
  children,
  className,
  style,
  ...props
}: SidebarPageTemplateProps) {
  return (
    <div className={cn("flex min-h-screen", className)} style={style} {...props}>
      <div className="hidden md:block">
        <AnchorSidebar groups={sidebarGroups} />
      </div>
      <div className="flex-1 overflow-auto">
        <main className="p-[clamp(1rem,3vw,2rem)]">{children}</main>
      </div>
    </div>
  )
}

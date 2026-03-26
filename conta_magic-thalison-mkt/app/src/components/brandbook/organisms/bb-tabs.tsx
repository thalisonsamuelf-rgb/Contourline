"use client"

import { cn } from "@/lib/utils"
import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { BbTabTrigger } from "../molecules"

export interface BbTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: {
    label: string
    content: ReactNode
  }[]
  defaultTab?: number
  variant?: "default" | "smooth"
  syncWithUrl?: boolean
  urlParamName?: string
}

export function BbTabs({
  tabs,
  defaultTab,
  variant = "default",
  syncWithUrl = false,
  urlParamName = "tab",
  className,
  ...props
}: BbTabsProps) {
  const getInitialTab = () => {
    if (syncWithUrl && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const urlTab = params.get(urlParamName)
      if (urlTab !== null) {
        const index = parseInt(urlTab, 10)
        if (!isNaN(index) && index >= 0 && index < tabs.length) return index
      }
    }
    return defaultTab ?? 0
  }

  const [activeTab, setActiveTab] = useState(getInitialTab)
  const tabBarRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})

  useLayoutEffect(() => {
    if (variant !== "smooth" || !tabBarRef.current) return

    const bar = tabBarRef.current
    const buttons = bar.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    const activeButton = buttons[activeTab]

    if (activeButton) {
      const barRect = bar.getBoundingClientRect()
      const btnRect = activeButton.getBoundingClientRect()

      setIndicatorStyle({
        width: btnRect.width,
        transform: `translateX(${btnRect.left - barRect.left}px)`,
      })
    }
  }, [activeTab, variant, tabs.length])

  useEffect(() => {
    if (!syncWithUrl || typeof window === "undefined") return

    const params = new URLSearchParams(window.location.search)
    params.set(urlParamName, String(activeTab))
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, "", newUrl)
  }, [activeTab, syncWithUrl, urlParamName])

  return (
    <div className={cn(className)} {...props}>
      {/* Tab bar */}
      <div
        ref={tabBarRef}
        role="tablist"
        className="relative flex flex-wrap gap-0 border-b border-border"
      >
        {tabs.map((tab, index) => (
          <BbTabTrigger
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
            className={variant === "smooth" ? "!border-b-transparent" : ""}
          >
            {tab.label}
          </BbTabTrigger>
        ))}

        {variant === "smooth" && (
          <div
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={indicatorStyle}
          />
        )}
      </div>

      {/* Panel */}
      <div role="tabpanel" className="py-5">
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

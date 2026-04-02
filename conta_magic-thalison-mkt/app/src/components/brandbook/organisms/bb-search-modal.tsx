"use client"

import { cn } from "@/lib/utils"
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type HTMLAttributes,
} from "react"

export interface BbSearchItem {
  label: string
  description?: string
  category?: string
  icon?: React.ReactNode
  href?: string
  onSelect?: () => void
}

export interface BbSearchModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: BbSearchItem[]
  placeholder?: string
  emptyMessage?: string
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function useGlobalShortcut(onToggle: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onToggle])
}

export function BbSearchModal({
  open,
  onOpenChange,
  items,
  placeholder = "Search…",
  emptyMessage = "No results found",
  className,
  ...props
}: BbSearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const handleToggle = useCallback(() => {
    onOpenChange(!open)
  }, [open, onOpenChange])

  useGlobalShortcut(handleToggle)

  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    )
  }, [items, query])

  const grouped = useMemo(() => {
    const groups: Record<string, BbSearchItem[]> = {}
    for (const item of filtered) {
      const cat = item.category ?? "Results"
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(item)
    }
    return groups
  }, [filtered])

  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [filtered.length])

  const handleSelect = useCallback(
    (item: BbSearchItem) => {
      if (item.onSelect) item.onSelect()
      else if (item.href) window.location.href = item.href
      onOpenChange(false)
    },
    [onOpenChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filtered.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex])
      } else if (e.key === "Escape") {
        e.preventDefault()
        onOpenChange(false)
      }
    },
    [filtered, selectedIndex, handleSelect, onOpenChange]
  )

  useEffect(() => {
    if (!listRef.current) return
    const opts = listRef.current.querySelectorAll('[role="option"]')
    const el = opts[selectedIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onOpenChange(false)
    },
    [onOpenChange]
  )

  if (!open) return null

  let flatIndex = -1

  return (
    <div
      className="fixed inset-0 z-60 flex items-start justify-center pt-[15vh] backdrop-blur-md bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "w-full max-w-lg mx-4 overflow-hidden bg-background border border-border shadow-2xl",
          className
        )}
        role="dialog"
        aria-label="Search"
        {...props}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <span className="text-muted-foreground">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search"
            className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground/50"
          />
          <kbd className="shrink-0 px-1.5 py-0.5 text-[0.625rem] text-muted-foreground bg-white/5 border border-border font-mono">
            ⌘K
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} role="listbox" className="overflow-y-auto max-h-[360px] py-1">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground font-mono text-xs">
              {emptyMessage}
            </div>
          ) : (
            Object.entries(grouped).map(([category, categoryItems]) => (
              <div key={category}>
                <div className="px-4 py-1.5 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  {category}
                </div>

                {categoryItems.map((item) => {
                  flatIndex++
                  const isSelected = flatIndex === selectedIndex
                  return (
                    <button
                      key={`${item.label}-${flatIndex}`}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-2.5 text-left border-none cursor-pointer transition-colors duration-150",
                        isSelected ? "bg-accent" : "bg-transparent hover:bg-accent/50"
                      )}
                    >
                      {item.icon && (
                        <span className="shrink-0 size-6 flex items-center justify-center text-muted-foreground">
                          {item.icon}
                        </span>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="text-foreground font-mono text-xs font-semibold">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-muted-foreground font-mono text-[0.625rem] mt-0.5 truncate">
                            {item.description}
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <kbd className="shrink-0 px-1.5 py-0.5 text-[0.5625rem] text-muted-foreground bg-white/5 border border-border font-mono">
                          Enter
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle font-mono text-[0.5625rem] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 border border-border">↑↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 border border-border">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 bg-white/5 border border-border">esc</kbd>
              close
            </span>
          </div>
          <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  )
}

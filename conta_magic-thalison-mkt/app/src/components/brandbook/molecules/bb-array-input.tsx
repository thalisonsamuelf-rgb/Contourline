"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BbArrayInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  maxItems?: number
  addLabel?: string
  className?: string
}

export function BbArrayInput({
  value,
  onChange,
  placeholder = "Add item...",
  maxItems,
  addLabel = "Add",
  className,
}: BbArrayInputProps) {
  const [draft, setDraft] = React.useState("")

  const canAdd = draft.trim().length > 0 && (!maxItems || value.length < maxItems)

  const handleAdd = () => {
    if (!canAdd) return
    onChange([...value, draft.trim()])
    setDraft("")
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-2.5 py-1",
                "font-bb-mono text-[0.65rem] text-[var(--bb-cream)]",
              )}
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-[var(--bb-dim)] transition-colors hover:text-[var(--bb-error)]"
                aria-label={`Remove ${item}`}
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={maxItems && value.length >= maxItems ? `Max ${maxItems} items` : placeholder}
          disabled={!!maxItems && value.length >= maxItems}
          className={cn(
            "w-full rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2",
            "font-bb-mono text-xs text-[var(--bb-cream)] outline-none placeholder:text-[var(--bb-dim)]",
            "focus:border-[var(--bb-accent)] transition-colors",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className={cn(
            "shrink-0 rounded border border-[var(--bb-accent)] px-3 py-2",
            "font-bb-mono text-[0.65rem] font-medium uppercase tracking-wider",
            "text-[var(--bb-accent)] transition-all",
            "hover:bg-[var(--bb-accent)] hover:text-[var(--bb-dark)]",
            "disabled:opacity-30 disabled:pointer-events-none",
          )}
        >
          {addLabel}
        </button>
      </div>

      {maxItems && (
        <span className="font-bb-mono text-[0.55rem] text-[var(--bb-dim)]">
          {value.length}/{maxItems} items
        </span>
      )}
    </div>
  )
}

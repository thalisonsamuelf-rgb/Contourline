"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BbInlineEditProps {
  value: string
  onSave: (value: string) => void
  type?: "text" | "number"
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function BbInlineEdit({
  value,
  onSave,
  type = "text",
  placeholder = "Click to edit...",
  disabled = false,
  className,
}: BbInlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const [saving, setSaving] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setDraft(value)
  }, [value])

  React.useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const handleSave = () => {
    if (draft.trim() === value) {
      setEditing(false)
      return
    }
    setSaving(true)
    Promise.resolve(onSave(draft.trim())).finally(() => {
      setSaving(false)
      setEditing(false)
    })
  }

  const handleCancel = () => {
    setDraft(value)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  if (editing) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <input
          ref={inputRef}
          type={type}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          disabled={saving}
          className={cn(
            "w-full rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2",
            "font-bb-mono text-xs text-[var(--bb-cream)] outline-none",
            "focus:border-[var(--bb-accent)] transition-colors",
            saving && "opacity-50",
          )}
        />
        {saving && (
          <svg className="h-4 w-4 animate-spin text-[var(--bb-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4m-3.93 7.07l-2.83-2.83M7.76 7.76L4.93 4.93" />
          </svg>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center gap-2 rounded px-3 py-2 transition-colors",
        "hover:bg-[var(--bb-surface)]",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
      onClick={() => !disabled && setEditing(true)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && !disabled && setEditing(true)}
    >
      <span className={cn(
        "font-bb-mono text-xs",
        value ? "text-[var(--bb-cream)]" : "text-[var(--bb-dim)]",
      )}>
        {value || placeholder}
      </span>
      <svg
        className="h-3.5 w-3.5 text-[var(--bb-dim)] opacity-0 transition-opacity group-hover:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </div>
  )
}

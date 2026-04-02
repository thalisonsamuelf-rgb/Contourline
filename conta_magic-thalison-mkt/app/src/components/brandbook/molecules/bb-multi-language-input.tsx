"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BbLanguage {
  code: string
  label: string
  flag?: string
}

export interface BbMultiLanguageInputProps {
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  languages: BbLanguage[]
  inputType?: "input" | "textarea"
  placeholder?: string
  className?: string
}

export function BbMultiLanguageInput({
  value,
  onChange,
  languages,
  inputType = "input",
  placeholder = "Enter text...",
  className,
}: BbMultiLanguageInputProps) {
  const [activeTab, setActiveTab] = React.useState(languages[0]?.code ?? "")

  const handleChange = (text: string) => {
    onChange({ ...value, [activeTab]: text })
  }

  const filledCount = languages.filter((l) => (value[l.code] ?? "").trim().length > 0).length

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Language tabs */}
      <div className="flex border-b border-[var(--bb-border)]">
        {languages.map((lang) => {
          const filled = (value[lang.code] ?? "").trim().length > 0
          const active = activeTab === lang.code
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setActiveTab(lang.code)}
              className={cn(
                "relative flex items-center gap-1.5 px-3 py-2 font-bb-mono text-[0.6rem] uppercase tracking-wider transition-colors",
                active
                  ? "text-[var(--bb-accent)]"
                  : "text-[var(--bb-dim)] hover:text-[var(--bb-cream)]",
              )}
            >
              {lang.flag && <span className="text-sm">{lang.flag}</span>}
              {lang.label}
              {filled && (
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--bb-accent)]" />
              )}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--bb-accent)]" />
              )}
            </button>
          )
        })}
        <span className="ml-auto flex items-center px-2 font-bb-mono text-[0.5rem] text-[var(--bb-dim)]">
          {filledCount}/{languages.length}
        </span>
      </div>

      {/* Input area */}
      <div className="pt-2">
        {inputType === "textarea" ? (
          <textarea
            value={value[activeTab] ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={cn(
              "w-full resize-y rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2",
              "font-bb-mono text-xs text-[var(--bb-cream)] outline-none placeholder:text-[var(--bb-dim)]",
              "focus:border-[var(--bb-accent)] transition-colors",
            )}
          />
        ) : (
          <input
            type="text"
            value={value[activeTab] ?? ""}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2",
              "font-bb-mono text-xs text-[var(--bb-cream)] outline-none placeholder:text-[var(--bb-dim)]",
              "focus:border-[var(--bb-accent)] transition-colors",
            )}
          />
        )}
      </div>
    </div>
  )
}

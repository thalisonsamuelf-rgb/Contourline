"use client"

import { CATEGORIES, type SlideCategory } from "@/components/brandbook/slides/registry"
import {
  useBrandbookTheme,
} from "@/components/brandbook/theme/brandbook-theme-provider"
import { cn } from "@/lib/utils"

function ThemeToggle() {
  const { theme, meta, options, setTheme } = useBrandbookTheme()

  const getClasses = (isActive: boolean) =>
    cn(
      "inline-flex items-center justify-center rounded-full border px-3 py-1 font-bb-mono text-[0.5rem] uppercase tracking-[0.16em] transition-all",
      isActive ? "hover:opacity-100" : "hover:text-bb-cream",
    )

  const getButtonStyle = (isActive: boolean) =>
    isActive
      ? {
          background: "var(--bb-accent)",
          color: meta.accentTextColor,
          borderColor: "var(--bb-accent)",
          boxShadow: `0 0 0 1px var(--bb-accent), 0 0 18px ${meta.accentGlow}`,
        }
      : {
          background: "transparent",
          color: "var(--bb-dim)",
          borderColor: "var(--bb-border)",
        }

  return (
    <div className="flex items-center gap-2 rounded-full border border-bb-border bg-bb-surface px-3 py-1.5">
      <span className="font-bb-mono text-[0.5rem] uppercase tracking-[0.12em] text-bb-dim">Theme</span>
      {options.map((option) => {
        const isActive = theme === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={getClasses(isActive)}
            aria-pressed={isActive}
            style={getButtonStyle(isActive)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export function SlidesToolbar({
  filter,
  onFilterChange,
  onPresent,
}: {
  filter: SlideCategory
  onFilterChange: (value: SlideCategory) => void
  onPresent: () => void
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 border-b border-bb-border px-[var(--bb-gutter,1.5rem)] py-3"
      style={{ background: "var(--bb-surface)" }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPresent}
          className="inline-flex items-center gap-2 bg-bb-accent px-4 py-2 font-bb-mono text-[0.55rem] font-medium uppercase tracking-[0.08em] text-bb-dark transition-all hover:shadow-[0_0_20px_var(--bb-accent-25)]"
        >
          <span className="text-[0.7rem]">&#9654;</span> Apresentar
        </button>
        <div className="flex gap-1.5">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onFilterChange(category)}
              className={cn(
                "border px-3 py-1.5 font-bb-mono text-[0.5rem] uppercase tracking-[0.1em] transition-all",
                category === filter
                  ? "border-bb-accent bg-bb-accent/5 text-bb-accent"
                  : "border-bb-border text-bb-dim hover:border-bb-border-hover hover:text-bb-cream",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}

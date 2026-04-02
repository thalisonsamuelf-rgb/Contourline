"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { DayPicker, type DateRange } from "react-day-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface BbDateRangePreset {
  label: string
  range: () => DateRange
}

export interface BbDateRangePickerProps {
  value?: DateRange
  onChange: (range: DateRange | undefined) => void
  presets?: BbDateRangePreset[]
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  className?: string
}

const defaultPresets: BbDateRangePreset[] = [
  {
    label: "Last 7 days",
    range: () => ({ from: daysAgo(7), to: new Date() }),
  },
  {
    label: "Last 30 days",
    range: () => ({ from: daysAgo(30), to: new Date() }),
  },
  {
    label: "This month",
    range: () => ({
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(),
    }),
  },
  {
    label: "Last month",
    range: () => {
      const now = new Date()
      return {
        from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        to: new Date(now.getFullYear(), now.getMonth(), 0),
      }
    },
  },
]

function daysAgo(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d
}

export function BbDateRangePicker({
  value,
  onChange,
  presets = defaultPresets,
  minDate,
  maxDate,
  placeholder = "Select date range",
  className,
}: BbDateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handlePreset = (preset: BbDateRangePreset) => {
    onChange(preset.range())
    setOpen(false)
  }

  const label = value?.from
    ? value.to
      ? `${format(value.from, "MMM d, yyyy")} — ${format(value.to, "MMM d, yyyy")}`
      : format(value.from, "MMM d, yyyy")
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2 transition-colors",
            "font-bb-mono text-xs hover:border-[var(--bb-dim)]",
            value?.from ? "text-[var(--bb-cream)]" : "text-[var(--bb-dim)]",
            className,
          )}
        >
          <svg className="h-4 w-4 text-[var(--bb-dim)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {label}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "w-auto border-[var(--bb-border)] bg-[var(--bb-dark)] p-0",
          "shadow-[0_0_30px_rgba(221, 209, 187,0.05)]",
        )}
        align="start"
      >
        <div className="flex">
          {/* Presets sidebar */}
          {presets.length > 0 && (
            <div className="flex flex-col border-r border-[var(--bb-border)] p-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "rounded px-3 py-1.5 text-left font-bb-mono text-[0.6rem] transition-colors",
                    "text-[var(--bb-dim)] hover:bg-[var(--bb-surface)] hover:text-[var(--bb-cream)]",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          {/* Calendar */}
          <div className="p-3">
            <DayPicker
              mode="range"
              selected={value}
              onSelect={(range) => onChange(range)}
              numberOfMonths={2}
              disabled={[
                ...(minDate ? [{ before: minDate }] : []),
                ...(maxDate ? [{ after: maxDate }] : []),
              ]}
              classNames={{
                months: "flex gap-4",
                month_caption: "font-bb-mono text-[0.6rem] font-medium uppercase tracking-wider text-[var(--bb-cream)] mb-2 flex justify-center",
                weekdays: "flex",
                weekday: "font-bb-mono text-[0.5rem] text-[var(--bb-dim)] w-8 text-center",
                week: "flex",
                day_button: cn(
                  "h-8 w-8 rounded text-center font-bb-mono text-[0.6rem] transition-colors",
                  "text-[var(--bb-cream)] hover:bg-[var(--bb-surface)]",
                ),
                selected: "bg-[var(--bb-accent)] text-[var(--bb-dark)] hover:bg-[var(--bb-accent)]",
                range_middle: "bg-[var(--bb-accent)]/15 text-[var(--bb-cream)] rounded-none",
                range_start: "rounded-l bg-[var(--bb-accent)] text-[var(--bb-dark)]",
                range_end: "rounded-r bg-[var(--bb-accent)] text-[var(--bb-dark)]",
                today: "font-bold text-[var(--bb-accent)]",
                disabled: "text-[var(--bb-dim)] opacity-30 pointer-events-none",
                outside: "text-[var(--bb-dim)] opacity-30",
                nav: "flex items-center justify-between mb-2",
                button_previous: "h-6 w-6 rounded text-[var(--bb-dim)] hover:text-[var(--bb-cream)] hover:bg-[var(--bb-surface)] inline-flex items-center justify-center",
                button_next: "h-6 w-6 rounded text-[var(--bb-dim)] hover:text-[var(--bb-cream)] hover:bg-[var(--bb-surface)] inline-flex items-center justify-center",
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

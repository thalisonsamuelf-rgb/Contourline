"use client"

import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface BbLocaleOption {
  code: string
  label: string
  flag?: string
}

export interface BbLanguageSwitcherProps {
  currentLocale: string
  locales: BbLocaleOption[]
  onChange: (locale: string) => void
  className?: string
}

export function BbLanguageSwitcher({ currentLocale, locales, onChange, className }: BbLanguageSwitcherProps) {
  const current = locales.find((l) => l.code === currentLocale) ?? locales[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-colors",
          "text-white/60 hover:text-bb-accent hover:bg-white/5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-bb-accent/50",
          className,
        )}
      >
        {current?.flag && <span className="text-sm">{current.flag}</span>}
        <span>{current?.code}</span>
        <svg className="size-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] border-bb-border bg-bb-dark">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => onChange(locale.code)}
            className={cn(
              "gap-2 text-sm",
              locale.code === currentLocale
                ? "text-bb-accent font-bold"
                : "text-white/70 hover:text-bb-accent focus:text-bb-accent",
            )}
          >
            {locale.flag && <span>{locale.flag}</span>}
            <span>{locale.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

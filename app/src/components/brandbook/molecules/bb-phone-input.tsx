"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import PhoneInputLib, { type Country, type Value } from "react-phone-number-input"
import "react-phone-number-input/style.css"

export interface BbPhoneInputProps {
  value?: Value
  onChange?: (value?: Value) => void
  defaultCountry?: Country
  countries?: Country[]
  placeholder?: string
  disabled?: boolean
  error?: boolean
  className?: string
}

export function BbPhoneInput({
  value,
  onChange,
  defaultCountry = "BR",
  countries,
  placeholder = "+55 (11) 99999-0000",
  disabled = false,
  error = false,
  className,
}: BbPhoneInputProps) {
  return (
    <div
      className={cn(
        "bb-phone-input rounded border bg-[var(--bb-surface)] transition-colors",
        "[&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:font-bb-mono [&_.PhoneInputInput]:text-xs [&_.PhoneInputInput]:text-[var(--bb-cream)] [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:placeholder:text-[var(--bb-dim)]",
        "[&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountryIcon]:h-4 [&_.PhoneInputCountryIcon]:w-6",
        "[&_.PhoneInputCountrySelectArrow]:border-[var(--bb-dim)]",
        error
          ? "border-[var(--bb-error)]"
          : "border-[var(--bb-border)] focus-within:border-[var(--bb-accent)]",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      <PhoneInputLib
        international
        defaultCountry={defaultCountry}
        countries={countries}
        value={value}
        onChange={(v) => onChange?.(v)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex items-center py-2 pr-3"
      />
    </div>
  )
}

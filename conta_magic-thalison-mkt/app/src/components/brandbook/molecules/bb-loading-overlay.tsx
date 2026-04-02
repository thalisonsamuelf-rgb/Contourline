"use client"

import { cn } from "@/lib/utils"
import { BbSpinner } from "../atoms/bb-spinner"
import type { HTMLAttributes } from "react"

export interface BbLoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  loading: boolean
  fullScreen?: boolean
  message?: string
}

export function BbLoadingOverlay({
  loading,
  fullScreen = false,
  message,
  children,
  className,
  ...props
}: BbLoadingOverlayProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}

      {loading && (
        <div
          role="status"
          aria-label={message ?? "Carregando"}
          className={cn(
            "inset-0 flex flex-col items-center justify-center gap-4",
            "bg-bb-dark/85 backdrop-blur-sm border-t border-bb-accent/20",
            fullScreen ? "fixed z-[9999]" : "absolute z-10",
          )}
        >
          <div className="flex items-center justify-center size-14 rounded-full bg-[var(--bb-accent-08)] border border-bb-accent/20 shadow-[0_0_20px_var(--bb-accent-10)]">
            <BbSpinner size="lg" />
          </div>
          {message && (
            <span className="font-bb-mono text-[0.6rem] font-semibold uppercase tracking-widest text-white/50">
              {message}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

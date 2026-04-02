"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export type BbEmptyStateVariant = "default" | "search" | "error" | "permissions"

export interface BbEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  illustration?: ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  variant?: BbEmptyStateVariant
}

const SearchIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

const InboxIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const LockIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const variantConfig: Record<BbEmptyStateVariant, {
  icon: React.FC
  iconClass: string
  ringClass: string
  btnClass: string
  btnHoverClass: string
}> = {
  default: {
    icon: InboxIcon,
    iconClass: "text-bb-accent",
    ringClass: "border-bb-accent bg-[var(--bb-accent-15)] shadow-[0_0_24px_var(--bb-accent-15)]",
    btnClass: "border-bb-accent text-bb-accent hover:bg-bb-accent hover:text-bb-dark",
    btnHoverClass: "hover:shadow-[0_0_16px_var(--bb-accent-15)]",
  },
  search: {
    icon: SearchIcon,
    iconClass: "text-bb-accent",
    ringClass: "border-bb-accent bg-[var(--bb-accent-15)] shadow-[0_0_24px_var(--bb-accent-15)]",
    btnClass: "border-bb-accent text-bb-accent hover:bg-bb-accent hover:text-bb-dark",
    btnHoverClass: "hover:shadow-[0_0_16px_var(--bb-accent-15)]",
  },
  error: {
    icon: ErrorIcon,
    iconClass: "text-destructive",
    ringClass: "border-destructive bg-destructive/15 shadow-[0_0_24px_rgba(239,68,68,0.15)]",
    btnClass: "border-destructive text-destructive hover:bg-destructive hover:text-white",
    btnHoverClass: "hover:shadow-[0_0_16px_rgba(239,68,68,0.15)]",
  },
  permissions: {
    icon: LockIcon,
    iconClass: "text-bb-warning",
    ringClass: "border-bb-warning bg-bb-warning/15 shadow-[0_0_24px_rgba(245,158,11,0.15)]",
    btnClass: "border-bb-warning text-bb-warning hover:bg-bb-warning hover:text-bb-dark",
    btnHoverClass: "hover:shadow-[0_0_16px_rgba(245,158,11,0.15)]",
  },
}

export function BbEmptyState({
  icon,
  illustration,
  title,
  description,
  action,
  variant = "default",
  className,
  ...props
}: BbEmptyStateProps) {
  const config = variantConfig[variant]
  const IconComponent = config.icon

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-10 px-6",
        className
      )}
      {...props}
    >
      {/* Icon ring */}
      <div
        className={cn(
          "flex items-center justify-center size-[4.5rem] rounded-full border mb-5",
          config.ringClass,
          config.iconClass,
        )}
      >
        {illustration ?? icon ?? <IconComponent />}
      </div>

      {/* Title */}
      <h3 className="font-bb-mono text-xs font-semibold text-bb-cream uppercase tracking-widest m-0">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="font-bb-mono text-[0.65rem] text-white/50 mt-2 max-w-80 leading-relaxed">
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            "mt-5 px-5 py-2 bg-transparent border cursor-pointer",
            "font-bb-mono text-[0.575rem] font-semibold uppercase tracking-widest",
            "transition-all duration-200",
            config.btnClass,
            config.btnHoverClass,
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

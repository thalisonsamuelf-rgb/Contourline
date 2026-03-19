"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"
import { STARTER_REFERENCE_TIMESTAMP } from "@/components/brandbook/data/starter-brand-data"

export interface BbNotification {
  id: string
  title: string
  description?: string
  timestamp: number
  read: boolean
  type?: "info" | "success" | "warning" | "error"
}

export interface BbNotificationCenterProps extends HTMLAttributes<HTMLDivElement> {
  notifications: BbNotification[]
  onMarkRead?: (id: string) => void
  onDismiss?: (id: string) => void
  onMarkAllRead?: () => void
  settingsHref?: string
  referenceNow?: number
}

const typeConfig: Record<string, { color: string; label: string }> = {
  info: { color: "var(--bb-blue)", label: "INFO" },
  success: { color: "var(--bb-accent)", label: "OK" },
  warning: { color: "var(--bb-warning)", label: "AVISO" },
  error: { color: "var(--bb-error)", label: "ERRO" },
}

function timeAgo(timestamp: number, referenceNow: number): string {
  const diff = referenceNow - timestamp
  if (diff < 60_000) return "agora"
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h`
  return `${Math.floor(diff / 86_400_000)}d`
}

const BellIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export function BbNotificationCenter({
  notifications,
  onMarkRead,
  onDismiss,
  onMarkAllRead,
  settingsHref,
  referenceNow = STARTER_REFERENCE_TIMESTAMP,
  className,
  ...props
}: BbNotificationCenterProps) {
  const [open, setOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleToggle = useCallback(() => { setOpen((p) => !p) }, [])
  const handleClose = useCallback(() => { setOpen(false) }, [])

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Bell trigger */}
      <button
        onClick={handleToggle}
        aria-label={`Notificações${unreadCount > 0 ? ` (${unreadCount} não lidas)` : ""}`}
        aria-expanded={open}
        className={cn(
          "relative p-2.5 bg-transparent border border-white/10 cursor-pointer transition-all duration-200",
          unreadCount > 0 ? "text-bb-accent" : "text-white/40",
          "hover:text-bb-accent hover:border-bb-accent/30 hover:shadow-[0_0_12px_var(--bb-accent-15)]",
        )}
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-white text-[9px] font-bold font-bb-mono shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleClose} aria-hidden />
          <div
            role="region"
            aria-label="Notificações"
            className="absolute right-0 top-full mt-2 z-50 w-[340px] max-h-[440px] overflow-hidden border border-white/12 bg-[#0a0a0a] shadow-[0_8px_40px_rgba(0,0,0,0.8),0_0_2px_var(--bb-accent-20)]"
            style={{ borderTop: "2px solid var(--bb-accent)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[var(--bb-accent-02)]">
              <span className="font-bb-mono text-[0.6rem] font-bold uppercase tracking-widest text-bb-accent">
                Notificações
              </span>
              {unreadCount > 0 && onMarkAllRead && (
                <button
                  onClick={onMarkAllRead}
                  className="bg-transparent border-none cursor-pointer font-bb-mono text-[0.525rem] uppercase tracking-widest text-white/40 hover:text-bb-accent transition-colors"
                >
                  Marcar todas lidas
                </button>
              )}
            </div>

            {/* List */}
            <div className="overflow-y-auto max-h-[340px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-white/25">
                  <BellIcon size={28} />
                  <p className="font-bb-mono text-[0.575rem] mt-3 uppercase tracking-widest">
                    Nenhuma notificação
                  </p>
                </div>
              ) : (
                notifications.map((n) => (
                  <NotificationRow
                    key={n.id}
                    notification={n}
                    referenceNow={referenceNow}
                    onMarkRead={onMarkRead}
                    onDismiss={onDismiss}
                  />
                ))
              )}
            </div>

            {/* Footer */}
            {settingsHref && (
              <div className="border-t border-white/8 py-2.5 px-4 text-center">
                <a
                  href={settingsHref}
                  className="font-bb-mono text-[0.525rem] uppercase tracking-widest text-white/30 no-underline hover:text-bb-accent transition-colors"
                >
                  Configurações →
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function NotificationRow({
  notification: n,
  referenceNow,
  onMarkRead,
  onDismiss,
}: {
  notification: BbNotification
  referenceNow: number
  onMarkRead?: (id: string) => void
  onDismiss?: (id: string) => void
}) {
  const config = typeConfig[n.type ?? "info"]

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 border-b border-white/5 transition-colors hover:bg-white/[0.06]",
        n.read ? "bg-transparent" : "bg-white/[0.03]",
      )}
      style={{ borderLeft: n.read ? "2px solid transparent" : `2px solid ${config.color}` }}
    >
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-bb-mono text-[0.45rem] font-bold uppercase tracking-wider px-1.5 py-px"
            style={{
              color: config.color,
              background: `color-mix(in srgb, ${config.color} 15%, transparent)`,
              border: `1px solid ${config.color}`,
            }}
          >
            {config.label}
          </span>
          <span className="font-bb-mono text-[0.525rem] text-white/30 ml-auto shrink-0">
            {timeAgo(n.timestamp, referenceNow)}
          </span>
        </div>
        <p className={cn(
          "font-bb-mono text-[0.65rem] mt-1.5 truncate",
          n.read ? "font-normal text-white/50" : "font-semibold text-bb-cream",
        )}>
          {n.title}
        </p>
        {n.description && (
          <p className="font-bb-mono text-[0.575rem] text-white/35 mt-0.5 leading-snug line-clamp-2">
            {n.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 shrink-0 mt-1">
        {!n.read && onMarkRead && (
          <button
            onClick={() => onMarkRead(n.id)}
            aria-label="Marcar como lida"
            className="bg-transparent border border-white/10 cursor-pointer text-white/30 p-[3px] transition-all hover:text-bb-accent hover:border-bb-accent/30"
          >
            <CheckIcon />
          </button>
        )}
        {onDismiss && (
          <button
            onClick={() => onDismiss(n.id)}
            aria-label="Dispensar"
            className="bg-transparent border border-white/10 cursor-pointer text-white/30 p-[3px] transition-all hover:text-destructive hover:border-destructive/30"
          >
            <XIcon />
          </button>
        )}
      </div>
    </div>
  )
}

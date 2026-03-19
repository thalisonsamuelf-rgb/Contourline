"use client"

import { cn } from "@/lib/utils"
import { BbSpinner } from "../atoms/bb-spinner"
import type { ReactNode } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface BbConfirmSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: "default" | "destructive"
  loading?: boolean
  className?: string
  children?: ReactNode
}

export function BbConfirmSheet({
  title = "Confirmar ação",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  variant = "default",
  loading = false,
  open,
  onClose,
  className,
  children,
}: BbConfirmSheetProps) {
  const isDestructive = variant === "destructive"

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-[min(440px,calc(100vw-2rem))] max-h-[80vh] overflow-hidden p-0 gap-0 rounded-none",
          "bg-[#0a0a0a] border border-white/12",
          isDestructive
            ? "border-t-2 border-t-destructive shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_2px_rgba(239,68,68,0.3)]"
            : "border-t-2 border-t-bb-accent shadow-[0_0_40px_rgba(0,0,0,0.8),0_0_2px_var(--bb-accent-20)]",
          className,
        )}
      >
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between px-5 py-4 border-b border-white/8">
          {title ? (
            <DialogTitle className="font-bb-mono text-[0.7rem] font-bold uppercase tracking-widest text-bb-cream">
              {title}
            </DialogTitle>
          ) : (
            <span className="sr-only">Modal</span>
          )}
          <DialogClose
            className={cn(
              "ml-auto text-white/30 text-lg leading-none bg-transparent border-none cursor-pointer transition-colors",
              isDestructive ? "hover:text-destructive" : "hover:text-bb-accent",
            )}
            aria-label="Fechar"
          >
            &#x2715;
          </DialogClose>
        </DialogHeader>

        <DialogDescription className="sr-only">
          {title ? `${title} dialog` : "Confirmation dialog"}
        </DialogDescription>

        {/* Body */}
        <div className="px-6 py-5">
          {description && (
            <p className="font-bb-mono text-[0.7rem] text-white/60 leading-relaxed m-0">
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Footer */}
        <DialogFooter className="flex gap-2.5 justify-end px-6 py-3.5 border-t border-white/8 sm:justify-end">
          {/* Cancel */}
          <button
            onClick={onCancel}
            disabled={loading}
            className={cn(
              "px-5 py-2 bg-transparent border border-white/15 cursor-pointer",
              "font-bb-mono text-[0.6rem] font-semibold uppercase tracking-widest text-white/50",
              "transition-all duration-150",
              "hover:border-white/30 hover:text-white/80",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {cancelLabel}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "inline-flex items-center justify-center gap-2 px-6 py-2 border-none cursor-pointer",
              "font-bb-mono text-[0.6rem] font-bold uppercase tracking-widest",
              "transition-all duration-200",
              isDestructive
                ? "bg-destructive text-white shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:shadow-[0_0_24px_rgba(239,68,68,0.4)] hover:-translate-y-px"
                : "bg-bb-accent text-bb-dark shadow-[0_0_12px_var(--bb-accent-25)] hover:shadow-[0_0_24px_var(--bb-accent-40)] hover:-translate-y-px",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {loading && <BbSpinner size="sm" />}
            {confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

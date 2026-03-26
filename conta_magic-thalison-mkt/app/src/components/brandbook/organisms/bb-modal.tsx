"use client"

import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface BbModalProps
  extends Omit<ComponentPropsWithoutRef<typeof DialogContent>, "title"> {
  open: boolean
  onClose: () => void
  title?: string
  footer?: ReactNode
}

export function BbModal({
  open,
  onClose,
  title,
  footer,
  children,
  className,
  style,
  ...props
}: BbModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-[min(480px,calc(100vw-2rem))] max-h-[80vh] overflow-hidden p-0 gap-0 border-bb-border bg-bb-dark",
          className
        )}
        style={style}
        {...props}
      >
        <DialogHeader className="flex-row items-center justify-between border-b border-bb-border px-5 py-4">
          {title ? (
            <DialogTitle className="font-mono text-xs font-semibold uppercase text-bb-cream">
              {title}
            </DialogTitle>
          ) : (
            <span className="sr-only">Modal</span>
          )}

          <DialogClose
            className="ml-auto text-bb-dim hover:text-bb-cream transition-colors text-xl leading-none"
            aria-label="Close modal"
          >
            &#x2715;
          </DialogClose>
        </DialogHeader>

        <DialogDescription className="sr-only">
          {title ? `${title} dialog` : "Modal dialog"}
        </DialogDescription>

        <div className="flex-1 overflow-y-auto px-5 py-5 text-bb-dim">
          {children}
        </div>

        {footer && (
          <DialogFooter className="border-t border-bb-border px-5 py-3 sm:justify-end">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

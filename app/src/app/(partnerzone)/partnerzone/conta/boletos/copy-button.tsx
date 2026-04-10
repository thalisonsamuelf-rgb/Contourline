"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CopyButtonProps {
  value: string
  label: string
  successLabel?: string
}

export function CopyButton({ value, label, successLabel = "Copiado" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors ${
        copied
          ? "bg-[#10B981]/10 text-[#047857] border-[#10B981]/20"
          : "bg-black/[0.04] hover:bg-black/[0.08] text-black/70 border-black/[0.10]"
      }`}
      title={`Copiar ${label}`}
    >
      {copied ? (
        <>
          <Check className="size-3" />
          {successLabel}
        </>
      ) : (
        <>
          <Copy className="size-3" />
          {label}
        </>
      )}
    </button>
  )
}

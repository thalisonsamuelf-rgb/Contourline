"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type ExportFormat = "csv" | "json" | "xlsx"

export interface BbExportColumn {
  key: string
  label: string
}

export interface BbExportButtonProps {
  data: Record<string, unknown>[]
  columns: BbExportColumn[]
  filename?: string
  formats?: ExportFormat[]
  className?: string
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function exportCsv(data: Record<string, unknown>[], columns: BbExportColumn[], filename: string) {
  const header = columns.map((c) => c.label).join(",")
  const rows = data.map((row) =>
    columns
      .map((c) => {
        const val = String(row[c.key] ?? "")
        return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val
      })
      .join(","),
  )
  const csv = [header, ...rows].join("\n")
  downloadBlob(new Blob([csv], { type: "text/csv" }), `${filename}.csv`)
}

function exportJson(data: Record<string, unknown>[], columns: BbExportColumn[], filename: string) {
  const mapped = data.map((row) => {
    const obj: Record<string, unknown> = {}
    for (const c of columns) obj[c.key] = row[c.key]
    return obj
  })
  downloadBlob(new Blob([JSON.stringify(mapped, null, 2)], { type: "application/json" }), `${filename}.json`)
}

async function exportXlsx(data: Record<string, unknown>[], columns: BbExportColumn[], filename: string) {
  const XLSX = await import("xlsx")
  const ws = XLSX.utils.json_to_sheet(
    data.map((row) => {
      const obj: Record<string, unknown> = {}
      for (const c of columns) obj[c.label] = row[c.key]
      return obj
    }),
  )
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Data")
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

const FORMAT_LABELS: Record<ExportFormat, { label: string; icon: string }> = {
  csv: { label: "CSV", icon: "📄" },
  json: { label: "JSON", icon: "{ }" },
  xlsx: { label: "Excel (XLSX)", icon: "📊" },
}

export function BbExportButton({
  data,
  columns,
  filename = "export",
  formats = ["csv", "json", "xlsx"],
  className,
}: BbExportButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      setLoading(true)
      try {
        if (format === "csv") exportCsv(data, columns, filename)
        else if (format === "json") exportJson(data, columns, filename)
        else if (format === "xlsx") await exportXlsx(data, columns, filename)
      } finally {
        setLoading(false)
      }
    },
    [data, columns, filename],
  )

  if (formats.length === 1) {
    return (
      <button
        type="button"
        onClick={() => handleExport(formats[0])}
        disabled={loading || data.length === 0}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors",
          "text-white/60 hover:text-bb-accent hover:bg-white/5",
          "disabled:opacity-40 disabled:pointer-events-none",
          className,
        )}
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {loading ? "..." : FORMAT_LABELS[formats[0]].label}
      </button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={loading || data.length === 0}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors",
          "text-white/60 hover:text-bb-accent hover:bg-white/5",
          "disabled:opacity-40 disabled:pointer-events-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-bb-accent/50",
          className,
        )}
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {loading ? "Exporting..." : "Export"}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] border-bb-border bg-bb-dark">
        {formats.map((format) => (
          <DropdownMenuItem
            key={format}
            onClick={() => handleExport(format)}
            className="gap-2 text-white/70 hover:text-bb-accent focus:text-bb-accent"
          >
            <span>{FORMAT_LABELS[format].icon}</span>
            <span className="text-sm">{FORMAT_LABELS[format].label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

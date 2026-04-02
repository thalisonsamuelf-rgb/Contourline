import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"
import { BbPagination, type BbPaginationProps } from "../molecules/bb-pagination"
import { BbExportButton, type BbExportColumn } from "../molecules/bb-export-button"

export interface BbTableFilterConfig {
  key: string
  label: string
  type: "text" | "select" | "date" | "dateRange"
  options?: { value: string; label: string }[]
}

export interface BbTableProps extends HTMLAttributes<HTMLTableElement> {
  columns: {
    key: string
    label: string
    width?: string
  }[]
  rows: Record<string, ReactNode>[]
  exportable?: boolean
  exportFilename?: string
  exportFormats?: ("csv" | "json" | "xlsx")[]
  filters?: BbTableFilterConfig[]
  filterValues?: Record<string, string>
  onFilterChange?: (key: string, value: string) => void
  paginatable?: boolean
  paginationProps?: BbPaginationProps
  emptyState?: ReactNode
}

export function BbTable({
  columns,
  rows,
  className,
  exportable,
  exportFilename,
  exportFormats,
  filters,
  filterValues = {},
  onFilterChange,
  paginatable,
  paginationProps,
  emptyState,
  ...props
}: BbTableProps) {
  const hasToolbar = exportable || (filters && filters.length > 0)

  const exportColumns: BbExportColumn[] = columns.map((c) => ({ key: c.key, label: c.label }))
  const exportData = rows.map((row) => {
    const obj: Record<string, unknown> = {}
    for (const col of columns) {
      const val = row[col.key]
      obj[col.key] = typeof val === "string" || typeof val === "number" ? val : String(val ?? "")
    }
    return obj
  })

  return (
    <div className="space-y-3">
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-2">
          {filters?.map((filter) => (
            <div key={filter.key} className="flex items-center gap-1.5">
              <label className="font-mono text-[0.55rem] uppercase tracking-widest text-white/40">
                {filter.label}
              </label>
              {filter.type === "select" ? (
                <select
                  suppressHydrationWarning
                  value={filterValues[filter.key] ?? ""}
                  onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                  className="h-7 rounded border border-bb-border bg-bb-dark px-2 font-mono text-xs text-white/80 outline-none focus:border-bb-accent/50"
                >
                  <option value="">All</option>
                  {filter.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  suppressHydrationWarning
                  type={filter.type === "date" ? "date" : "text"}
                  value={filterValues[filter.key] ?? ""}
                  onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
                  placeholder={`Filter ${filter.label}...`}
                  className="h-7 rounded border border-bb-border bg-bb-dark px-2 font-mono text-xs text-white/80 placeholder:text-white/30 outline-none focus:border-bb-accent/50"
                />
              )}
            </div>
          ))}
          {exportable && (
            <div className="ml-auto">
              <BbExportButton
                data={exportData}
                columns={exportColumns}
                filename={exportFilename}
                formats={exportFormats}
              />
            </div>
          )}
        </div>
      )}

      {rows.length === 0 && emptyState ? (
        emptyState
      ) : (
        <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
          <table className={cn("w-full border-collapse", className)} {...props}>
            <thead>
              <tr className="border-b-2 border-bb-border bg-[var(--surface)]">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={col.width ? { width: col.width } : undefined}
                    className="px-4 py-3 text-left font-mono text-[0.55rem] font-medium uppercase tracking-widest text-white/40"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-bb-border transition-colors hover:bg-[var(--bb-accent-03)]"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 font-mono text-[0.65rem] text-[var(--cream)]"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {paginatable && paginationProps && (
        <div className="flex justify-center pt-2">
          <BbPagination {...paginationProps} />
        </div>
      )}
    </div>
  )
}

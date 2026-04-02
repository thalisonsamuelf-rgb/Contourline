"use client"

import * as React from "react"
import { BbCompPageTemplate } from "../templates"
import { BbTable, BbUserDropdown } from "../organisms"
import { BbBadge } from "../atoms"
import { BbCompGrid } from "../organisms"
import { BbCompCell, BbEmptyState, BbLanguageSwitcher, BbExportButton } from "../molecules"
import {
  STARTER_PAGE_CHROME,
  STARTER_RUNTIME_LABELS,
} from "@/components/brandbook/data/starter-brand-data"

const columns = [
  { key: "id", label: "ID", width: "60px" },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status", width: "100px" },
  { key: "score", label: "Score", width: "80px" },
]

const rows = [
  { id: "001", name: "Neo", role: "Developer", status: <BbBadge variant="accent">Active</BbBadge>, score: "98" },
  { id: "002", name: "Trinity", role: "QA Architect", status: <BbBadge variant="accent">Active</BbBadge>, score: "95" },
  { id: "003", name: "Morpheus", role: "Strategist", status: <BbBadge variant="blue">Review</BbBadge>, score: "91" },
  { id: "004", name: "Oracle", role: "Advisor", status: <BbBadge variant="surface">Idle</BbBadge>, score: "87" },
  { id: "005", name: "Smith", role: "Antagonist", status: <BbBadge variant="error">Blocked</BbBadge>, score: "42" },
]

const compactColumns = [
  { key: "metric", label: "Metric" },
  { key: "value", label: "Value" },
  { key: "change", label: "Change" },
]

const compactRows = [
  { metric: "Response Time", value: "120ms", change: "-15%" },
  { metric: "Throughput", value: "2.4K/s", change: "+8%" },
  { metric: "Error Rate", value: "0.3%", change: "-60%" },
  { metric: "Uptime", value: "99.97%", change: "+0.02%" },
]

function UserDropdownPreview() {
  return (
    <BbUserDropdown
      user={{ name: "Alan Nicolas", email: STARTER_RUNTIME_LABELS.sampleUserEmail }}
      menuItems={[
        { label: "Profile", onClick: () => {} },
        { label: "Settings", onClick: () => {} },
      ]}
      onLogout={() => {}}
    />
  )
}

function LanguageSwitcherPreview() {
  const [locale, setLocale] = React.useState("pt")
  return (
    <BbLanguageSwitcher
      currentLocale={locale}
      locales={[
        { code: "pt", label: "Português", flag: "🇧🇷" },
        { code: "en", label: "English", flag: "🇺🇸" },
      ]}
      onChange={setLocale}
    />
  )
}

function ExportButtonPreview() {
  return (
    <BbExportButton
      data={[
        { name: "Alice", role: "Admin", score: 95 },
        { name: "Bob", role: "Editor", score: 82 },
      ]}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "score", label: "Score" },
      ]}
      filename="demo"
      formats={["csv", "json"]}
    />
  )
}

function TableWithExportPreview() {
  return (
    <BbTable
      columns={compactColumns}
      rows={compactRows}
      exportable
      exportFilename="metrics"
      exportFormats={["csv", "json"]}
    />
  )
}

function TableWithFiltersPreview() {
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({})
  const filtered = compactRows.filter((row) => {
    const search = filterValues.search?.toLowerCase() ?? ""
    if (search && !row.metric.toLowerCase().includes(search)) return false
    return true
  })
  return (
    <BbTable
      columns={compactColumns}
      rows={filtered}
      filters={[{ key: "search", label: "Search", type: "text" }]}
      filterValues={filterValues}
      onFilterChange={(key, val) => setFilterValues((prev) => ({ ...prev, [key]: val }))}
    />
  )
}

function TableWithPaginationPreview() {
  const [page, setPage] = React.useState(1)
  const allRows = React.useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    metric: `Metric ${i + 1}`,
    value: `${((i * 7.3 + 12.1) % 100).toFixed(1)}`,
    change: `${i % 2 === 0 ? "+" : "-"}${((i * 3 + 2) % 20)}%`,
  })), [])
  const perPage = 4
  const paged = allRows.slice((page - 1) * perPage, page * perPage)
  return (
    <BbTable
      columns={compactColumns}
      rows={paged}
      paginatable
      paginationProps={{ page, totalPages: Math.ceil(allRows.length / perPage), onPageChange: setPage }}
    />
  )
}

function TableEmptyPreview() {
  return (
    <BbTable
      columns={compactColumns}
      rows={[]}
      emptyState={<BbEmptyState title="No data" description="No results match your filters." variant="search" />}
    />
  )
}

export function TablesPage() {
  const chrome = STARTER_PAGE_CHROME.tables

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Table &",
        titleHighlight: "Dashboard",
      }}
      sections={[
        {
          label: "Dashboard Shell Components",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="BbUserDropdown" status="stable" preview={<UserDropdownPreview />} />
              <BbCompCell name="BbLanguageSwitcher" status="stable" preview={<LanguageSwitcherPreview />} />
              <BbCompCell name="BbExportButton" status="stable" preview={<ExportButtonPreview />} />
            </BbCompGrid>
          ),
        },
        {
          label: "Standard Table",
          content: (
            <div className="overflow-x-auto p-6">
              <BbTable columns={columns} rows={rows} />
            </div>
          ),
        },
        {
          label: "Table with Export",
          content: (
            <div className="max-w-lg overflow-x-auto p-6">
              <TableWithExportPreview />
            </div>
          ),
        },
        {
          label: "Table with Filters",
          content: (
            <div className="max-w-lg overflow-x-auto p-6">
              <TableWithFiltersPreview />
            </div>
          ),
        },
        {
          label: "Table with Pagination",
          content: (
            <div className="max-w-lg overflow-x-auto p-6">
              <TableWithPaginationPreview />
            </div>
          ),
        },
        {
          label: "Table Empty State",
          content: (
            <div className="max-w-lg p-6">
              <TableEmptyPreview />
            </div>
          ),
        },
        {
          label: "Compact Metrics",
          content: (
            <div className="max-w-lg overflow-x-auto p-6">
              <BbTable columns={compactColumns} rows={compactRows} />
            </div>
          ),
        },
      ]}
    />
  )
}

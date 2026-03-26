"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { BbTable } from "./bb-table"
import { BbEmptyState } from "../molecules/bb-empty-state"

const meta = {
  title: "Brandbook/Organisms/BbTable",
  component: BbTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    columns: [
      { key: "token", label: "Token" },
      { key: "value", label: "Value" },
      { key: "usage", label: "Usage" },
    ],
    rows: [
      { token: "--lime", value: "#D1FF00", usage: "Primary accent" },
      { token: "--cream", value: "#F5F4E7", usage: "Text color" },
      { token: "--dark", value: "#0A0A0A", usage: "Background" },
    ],
  },
} satisfies Meta<typeof BbTable>

export default meta
type Story = StoryObj<typeof meta>

function FilterableTableStory() {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const allRows = [
    { token: "--lime", value: "#D1FF00", usage: "Primary accent" },
    { token: "--cream", value: "#F5F4E7", usage: "Text color" },
    { token: "--dark", value: "#0A0A0A", usage: "Background" },
    { token: "--border", value: "#1A1A1A", usage: "Borders" },
  ]
  const filtered = allRows.filter((row) => {
    const search = filterValues.search?.toLowerCase() ?? ""
    if (search && !String(row.token).toLowerCase().includes(search)) return false
    return true
  })

  return (
    <BbTable
      columns={[
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
        { key: "usage", label: "Usage" },
      ]}
      rows={filtered}
      filters={[{ key: "search", label: "Search", type: "text" }]}
      filterValues={filterValues}
      onFilterChange={(key, val) => setFilterValues((prev) => ({ ...prev, [key]: val }))}
      exportable
    />
  )
}

function PaginatedTableStory() {
  const [page, setPage] = useState(1)
  const allRows = Array.from({ length: 20 }, (_, i) => ({
    token: `--token-${i + 1}`,
    value: `#${String(i).padStart(6, "0")}`,
    usage: `Usage ${i + 1}`,
  }))
  const perPage = 5
  const paged = allRows.slice((page - 1) * perPage, page * perPage)

  return (
    <BbTable
      columns={[
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
        { key: "usage", label: "Usage" },
      ]}
      rows={paged}
      paginatable
      paginationProps={{ page, totalPages: Math.ceil(allRows.length / perPage), onPageChange: setPage }}
    />
  )
}

export const Default: Story = {}

export const WithExport: Story = {
  args: {
    exportable: true,
    exportFilename: "tokens",
    exportFormats: ["csv", "json"],
  },
}

export const WithFilters: Story = {
  render: () => <FilterableTableStory />,
}

export const WithPagination: Story = {
  render: () => <PaginatedTableStory />,
}

export const EmptyWithState: Story = {
  args: {
    rows: [],
    emptyState: <BbEmptyState title="No data" description="No results match your filters." variant="search" />,
  },
}

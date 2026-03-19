"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { BbExportButton } from "./bb-export-button"

const SAMPLE_DATA = [
  { name: "Alice", role: "Admin", score: 95 },
  { name: "Bob", role: "Editor", score: 82 },
  { name: "Charlie", role: "Viewer", score: 71 },
]

const SAMPLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "score", label: "Score" },
]

const meta = {
  title: "Brandbook/Molecules/BbExportButton",
  component: BbExportButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    data: SAMPLE_DATA,
    columns: SAMPLE_COLUMNS,
    filename: "demo-export",
  },
} satisfies Meta<typeof BbExportButton>

export default meta
type Story = StoryObj<typeof meta>

export const MultipleFormats: Story = {
  args: { formats: ["csv", "json", "xlsx"] },
}

export const SingleFormat: Story = {
  args: { formats: ["csv"] },
}

export const CsvAndJson: Story = {
  args: { formats: ["csv", "json"] },
}

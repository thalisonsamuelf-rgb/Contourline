import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbDateRangePicker } from "./bb-date-range-picker"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

const meta = {
  title: "Organisms/Brandbook/BbDateRangePicker",
  component: BbDateRangePicker,
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof BbDateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const WithPresets: Story = {
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>()
    return <BbDateRangePicker {...args} value={range} onChange={setRange} />
  },
}

export const CustomOnly: Story = {
  args: { presets: [] },
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>()
    return <BbDateRangePicker {...args} value={range} onChange={setRange} />
  },
}

export const MinMaxConstraints: Story = {
  render: function Render(args) {
    const [range, setRange] = useState<DateRange | undefined>()
    const today = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(today.getDate() - 30)
    return (
      <BbDateRangePicker
        {...args}
        value={range}
        onChange={setRange}
        minDate={thirtyDaysAgo}
        maxDate={today}
      />
    )
  },
}

export const WithSelectedRange: Story = {
  render: function Render(args) {
    const now = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(now.getDate() - 7)
    const [range, setRange] = useState<DateRange | undefined>({ from: weekAgo, to: now })
    return <BbDateRangePicker {...args} value={range} onChange={setRange} />
  },
}

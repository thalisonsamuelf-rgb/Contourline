import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbInlineEdit } from "./bb-inline-edit"
import { useState } from "react"

const meta = {
  title: "Molecules/Brandbook/BbInlineEdit",
  component: BbInlineEdit,
  args: {
    value: "Project Alpha",
    onSave: () => {},
    placeholder: "Click to edit...",
  },
} satisfies Meta<typeof BbInlineEdit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [val, setVal] = useState(args.value)
    return <BbInlineEdit {...args} value={val} onSave={setVal} />
  },
}

export const Empty: Story = {
  args: { value: "", placeholder: "Enter project name..." },
  render: function Render(args) {
    const [val, setVal] = useState(args.value)
    return <BbInlineEdit {...args} value={val} onSave={setVal} />
  },
}

export const NumberType: Story = {
  args: { value: "42", type: "number" },
  render: function Render(args) {
    const [val, setVal] = useState(args.value)
    return <BbInlineEdit {...args} value={val} onSave={setVal} />
  },
}

export const Disabled: Story = {
  args: { value: "Cannot edit this", disabled: true },
}

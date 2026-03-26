import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbArrayInput } from "./bb-array-input"
import React, { useState } from "react"

const meta = {
  title: "Molecules/Brandbook/BbArrayInput",
  component: BbArrayInput,
  args: {
    value: ["React", "TypeScript"],
    onChange: () => {},
  },
} satisfies Meta<typeof BbArrayInput>

export default meta
type Story = StoryObj<typeof meta>

function Controlled(props: React.ComponentProps<typeof BbArrayInput>) {
  const [items, setItems] = useState(props.value)
  return <BbArrayInput {...props} value={items} onChange={setItems} />
}

export const Default: Story = {
  args: { placeholder: "Add technology..." },
  render: (args) => <Controlled {...args} />,
}

export const Empty: Story = {
  args: { value: [], placeholder: "Add tag..." },
  render: (args) => <Controlled {...args} />,
}

export const MaxItems: Story = {
  args: { value: ["Alpha", "Beta", "Gamma"], maxItems: 5 },
  render: (args) => <Controlled {...args} />,
}

export const CustomLabel: Story = {
  args: { value: ["user@example.com"], addLabel: "Invite", placeholder: "Enter email..." },
  render: (args) => <Controlled {...args} />,
}

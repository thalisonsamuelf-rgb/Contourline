import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPhoneInput } from "./bb-phone-input"
import { useState } from "react"
import type { Value } from "react-phone-number-input"

const meta = {
  title: "Molecules/Brandbook/BbPhoneInput",
  component: BbPhoneInput,
  args: {
    onChange: () => {},
  },
} satisfies Meta<typeof BbPhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [val, setVal] = useState<Value | undefined>()
    return <div className="max-w-xs"><BbPhoneInput {...args} value={val} onChange={setVal} /></div>
  },
}

export const WithValue: Story = {
  args: { value: "+5511999990000" as Value },
  render: function Render(args) {
    const [val, setVal] = useState<Value | undefined>(args.value)
    return <div className="max-w-xs"><BbPhoneInput {...args} value={val} onChange={setVal} /></div>
  },
}

export const ErrorState: Story = {
  args: { error: true },
  render: function Render(args) {
    const [val, setVal] = useState<Value | undefined>()
    return <div className="max-w-xs"><BbPhoneInput {...args} value={val} onChange={setVal} /></div>
  },
}

export const Disabled: Story = {
  args: { value: "+5511999990000" as Value, disabled: true },
}

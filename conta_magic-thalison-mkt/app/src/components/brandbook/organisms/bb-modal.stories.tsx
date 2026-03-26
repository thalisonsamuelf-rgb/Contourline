import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"
import { BbButton } from "../atoms/bb-button"
import { BbModal, type BbModalProps } from "./bb-modal"

function InteractiveModal(props: BbModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <BbButton variant="primary" onClick={() => setOpen(true)}>Open modal</BbButton>
      <BbModal
        {...props}
        open={open}
        onClose={() => {
          setOpen(false)
          props.onClose?.()
        }}
        footer={(
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <BbButton variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</BbButton>
            <BbButton variant="primary" size="sm" onClick={() => setOpen(false)}>Confirm</BbButton>
          </div>
        )}
      >
        {props.children}
      </BbModal>
    </div>
  )
}

const meta = {
  title: "Organisms/Brandbook/BbModal",
  component: BbModal,
  parameters: {
    layout: "centered",
  },
  args: {
    open: true,
    onClose: fn(),
    title: "Design Guidelines",
    children: (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <p style={{ margin: 0, color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.72rem" }}>
          Confirm the migration plan before publishing the next brandbook wave.
        </p>
        <p style={{ margin: 0, color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.62rem" }}>
          This action impacts templates, pages and storybook documentation.
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof BbModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFooterActions: Story = {
  args: {
    footer: (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <BbButton variant="ghost" size="sm">Cancel</BbButton>
        <BbButton variant="primary" size="sm">Publish</BbButton>
      </div>
    ),
  },
}

export const Closed: Story = {
  args: {
    open: false,
  },
}

export const Interactive: Story = {
  render: (args) => <InteractiveModal {...args} />,
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbTabs } from "./bb-tabs"

const meta = {
  title: "Organisms/Brandbook/BbTabs",
  component: BbTabs,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbTabs>

export default meta
type Story = StoryObj<typeof meta>

const sampleTabs = [
  { label: "Overview", content: "Overview content goes here." },
  { label: "Tokens", content: "Design tokens documentation." },
  { label: "Usage", content: "Usage guidelines and examples." },
]

export const Default: Story = {
  args: {
    tabs: sampleTabs,
  },
}

export const Smooth: Story = {
  args: {
    tabs: sampleTabs,
    variant: "smooth",
  },
}

export const SmoothWithUrlSync: Story = {
  args: {
    tabs: sampleTabs,
    variant: "smooth",
    syncWithUrl: true,
    urlParamName: "tab",
  },
}

export const DefaultWithInitialTab: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: 2,
  },
}

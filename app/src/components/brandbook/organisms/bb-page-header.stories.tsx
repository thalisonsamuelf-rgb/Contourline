import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPageHeader } from "./bb-page-header"

const meta = {
  title: "Organisms/Brandbook/BbPageHeader",
  component: BbPageHeader,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Brandbook Foundations",
    subtitle: "Canonical guidance for tokens, typography and motion.",
    badge: "Wave 05",
  },
} satisfies Meta<typeof BbPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutBadge: Story = {
  args: {
    badge: undefined,
  },
}

export const TitleOnly: Story = {
  args: {
    subtitle: undefined,
    badge: undefined,
    title: "Components",
  },
}

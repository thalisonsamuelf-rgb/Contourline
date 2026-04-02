import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FundadoresSection } from "./fundadores-section"

const meta = {
  title: "Organisms/BrandbookSections/FundadoresSection",
  component: FundadoresSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FundadoresSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

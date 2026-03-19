import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DividersSection } from "./dividers-section"

const meta = {
  title: "Organisms/BrandbookSections/DividersSection",
  component: DividersSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DividersSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

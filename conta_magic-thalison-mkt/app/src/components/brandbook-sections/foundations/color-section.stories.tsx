import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ColorSection } from "./color-section"

const meta = {
  title: "Organisms/BrandbookSections/ColorSection",
  component: ColorSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ColorSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

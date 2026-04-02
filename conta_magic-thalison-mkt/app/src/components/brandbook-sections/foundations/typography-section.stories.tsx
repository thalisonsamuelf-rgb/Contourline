import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TypographySection } from "./typography-section"

const meta = {
  title: "Organisms/BrandbookSections/TypographySection",
  component: TypographySection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TypographySection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

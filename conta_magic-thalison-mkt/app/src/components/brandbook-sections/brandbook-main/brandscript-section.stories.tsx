import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandscriptSection } from "./brandscript-section"

const meta = {
  title: "Organisms/BrandbookSections/BrandscriptSection",
  component: BrandscriptSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BrandscriptSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

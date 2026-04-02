import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GridPatternsSection } from "./grid-patterns-section"

const meta = {
  title: "Organisms/BrandbookSections/GridPatternsSection",
  component: GridPatternsSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof GridPatternsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

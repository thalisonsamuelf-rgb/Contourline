import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SurfacesSection } from "./surfaces-section"

const meta = {
  title: "Organisms/BrandbookSections/SurfacesSection",
  component: SurfacesSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SurfacesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

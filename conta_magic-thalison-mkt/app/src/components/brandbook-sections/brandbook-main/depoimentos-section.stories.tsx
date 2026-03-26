import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DepoimentosSection } from "./depoimentos-section"

const meta = {
  title: "Organisms/BrandbookSections/DepoimentosSection",
  component: DepoimentosSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DepoimentosSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

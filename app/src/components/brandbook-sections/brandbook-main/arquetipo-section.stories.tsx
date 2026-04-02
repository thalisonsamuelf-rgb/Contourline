import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArquetipoSection } from "./arquetipo-section"

const meta = {
  title: "Organisms/BrandbookSections/ArquetipoSection",
  component: ArquetipoSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ArquetipoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

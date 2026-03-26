import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { JornadaSection } from "./jornada-section"

const meta = {
  title: "Organisms/BrandbookSections/JornadaSection",
  component: JornadaSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof JornadaSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

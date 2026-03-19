import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ContratoSection } from "./contrato-section"

const meta = {
  title: "Organisms/BrandbookSections/ContratoSection",
  component: ContratoSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ContratoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

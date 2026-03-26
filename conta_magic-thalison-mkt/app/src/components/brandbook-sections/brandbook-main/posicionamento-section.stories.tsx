import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PosicionamentoSection } from "./posicionamento-section"

const meta = {
  title: "Organisms/BrandbookSections/PosicionamentoSection",
  component: PosicionamentoSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PosicionamentoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ParticleOrbitCell } from "./particle-orbit-cell"

const meta = {
  title: "Organisms/BrandbookSections/ParticleOrbitCell",
  component: ParticleOrbitCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ParticleOrbitCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

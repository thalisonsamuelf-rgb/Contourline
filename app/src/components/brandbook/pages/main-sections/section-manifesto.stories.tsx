import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionManifesto } from "./section-manifesto"

const meta = {
  title: "Pages/SectionManifesto",
  component: SectionManifesto,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionManifesto>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

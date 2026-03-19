import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionArquetipo } from "./section-arquetipo"

const meta = {
  title: "Pages/SectionArquetipo",
  component: SectionArquetipo,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionArquetipo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

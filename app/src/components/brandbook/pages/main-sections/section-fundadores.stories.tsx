import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionFundadores } from "./section-fundadores"

const meta = {
  title: "Pages/SectionFundadores",
  component: SectionFundadores,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionFundadores>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

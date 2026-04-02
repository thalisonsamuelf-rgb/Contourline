import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPageFooter } from "./bb-page-footer"

const meta = {
  title: "Organisms/Brandbook/BbPageFooter",
  component: BbPageFooter,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbPageFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: "AIOX SQUAD",
    links: [
      { label: "Brandbook", href: "#" },
      { label: "Guidelines", href: "#" },
      { label: "Components", href: "#" },
    ],
  },
}

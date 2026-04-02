import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FounderPhoto } from "./founder-photo"

const meta = {
  title: "Organisms/BrandbookSections/FounderPhoto",
  component: FounderPhoto,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FounderPhoto>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: "https://placehold.co/200x200/0A0A0A/D1FF00?text=AN",
    alt: "Alan Nicolas",
  },
}

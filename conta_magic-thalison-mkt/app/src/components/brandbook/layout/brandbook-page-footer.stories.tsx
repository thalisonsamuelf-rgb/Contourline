import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandbookPageFooter } from "./brandbook-page-footer"

const meta = {
  title: "Organisms/BrandbookLayout/BrandbookPageFooter",
  component: BrandbookPageFooter,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BrandbookPageFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

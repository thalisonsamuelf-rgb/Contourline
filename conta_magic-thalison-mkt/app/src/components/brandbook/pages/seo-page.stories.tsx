import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SeoPage } from "./seo-page"

const meta = {
  title: "Pages/SeoPage",
  component: SeoPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SeoPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

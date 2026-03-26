import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TablesPage } from "./tables-page"

const meta = {
  title: "Pages/TablesPage",
  component: TablesPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TablesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FlowDiagramPage } from "./flow-diagram-page"

const meta = {
  title: "Pages/FlowDiagramPage",
  component: FlowDiagramPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FlowDiagramPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

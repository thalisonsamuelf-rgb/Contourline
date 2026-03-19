import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SurfacesPage } from "./surfaces-page"

const meta = {
  title: "Pages/SurfacesPage",
  component: SurfacesPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SurfacesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

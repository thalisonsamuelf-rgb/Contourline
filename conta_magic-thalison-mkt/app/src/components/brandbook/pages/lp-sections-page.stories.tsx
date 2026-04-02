import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LpSectionsPage } from "./lp-sections-page"

const meta = {
  title: "Pages/LpSectionsPage",
  component: LpSectionsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LpSectionsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

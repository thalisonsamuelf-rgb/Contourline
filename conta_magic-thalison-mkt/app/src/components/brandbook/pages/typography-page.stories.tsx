import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TypographyPage } from "./typography-page"

const meta = {
  title: "Pages/TypographyPage",
  component: TypographyPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TypographyPage>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: {} }

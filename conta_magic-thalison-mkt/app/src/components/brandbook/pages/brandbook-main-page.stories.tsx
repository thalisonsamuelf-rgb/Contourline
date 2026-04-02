import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandbookMainPage } from "./brandbook-main-page"

const meta = {
  title: "Pages/BrandbookMainPage",
  component: BrandbookMainPage,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
} satisfies Meta<typeof BrandbookMainPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

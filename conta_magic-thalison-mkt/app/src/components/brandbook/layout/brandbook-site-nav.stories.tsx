import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandbookSiteNav } from "./brandbook-site-nav"

const meta = {
  title: "Organisms/BrandbookLayout/BrandbookSiteNav",
  component: BrandbookSiteNav,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
} satisfies Meta<typeof BrandbookSiteNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: "50vh", background: "var(--bb-dark)" }}>
      <BrandbookSiteNav />
    </div>
  ),
}

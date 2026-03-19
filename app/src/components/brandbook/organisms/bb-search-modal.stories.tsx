import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSearchModal } from "./bb-search-modal"

const meta = {
  title: "Organisms/Brandbook/BbSearchModal",
  component: BbSearchModal,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BbSearchModal>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { label: "Dashboard", description: "Main overview", category: "Pages", href: "/dashboard" },
  { label: "Settings", description: "App configuration", category: "Pages", href: "/settings" },
  { label: "Users", description: "Manage team members", category: "Pages", href: "/users" },
  { label: "Export Data", description: "Download as CSV", category: "Actions" },
  { label: "API Keys", description: "Manage integrations", category: "Tools", href: "/api-keys" },
  { label: "Analytics", description: "View metrics", category: "Tools", href: "/analytics" },
]

export const Populated: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    items: sampleItems,
  },
}

export const Empty: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    items: [],
  },
}

export const Loading: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    items: [],
    emptyMessage: "Loading…",
  },
}

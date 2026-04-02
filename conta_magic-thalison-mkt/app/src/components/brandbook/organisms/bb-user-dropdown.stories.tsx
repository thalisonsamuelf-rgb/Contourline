"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { BbUserDropdown } from "./bb-user-dropdown"

const noop = () => {}

const meta = {
  title: "Brandbook/Organisms/BbUserDropdown",
  component: BbUserDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    user: { name: "Alan Nicolas", email: "alan@aioxsquad.ai" },
    menuItems: [
      { label: "Profile", onClick: noop },
      { label: "Settings", onClick: noop },
    ],
    onLogout: noop,
  },
} satisfies Meta<typeof BbUserDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    user: {
      name: "Alan Nicolas",
      email: "alan@aioxsquad.ai",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AN",
    },
  },
}

export const WithoutAvatar: Story = {
  args: {
    user: { name: "Pedro Valerio", email: "pedro@aioxsquad.ai" },
  },
}

export const ManyMenuItems: Story = {
  args: {
    menuItems: [
      { label: "Profile", onClick: noop },
      { label: "Settings", onClick: noop },
      { label: "Billing", onClick: noop },
      { label: "Team", onClick: noop },
      { label: "Support", href: "#" },
    ],
  },
}

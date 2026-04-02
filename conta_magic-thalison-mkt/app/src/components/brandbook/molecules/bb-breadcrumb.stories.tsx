import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBreadcrumb } from "./bb-breadcrumb"

const meta = {
  title: "Molecules/Brandbook/BbBreadcrumb",
  component: BbBreadcrumb,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings" },
    ],
  },
}

export const WithLongLabels: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Very Long Category Name That Should Be Truncated Properly", href: "/category" },
      { label: "Current Page With An Extremely Long Title That Exceeds Maximum" },
    ],
    maxLabelLength: 25,
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: "Home" }],
  },
}

export const ManyItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/cat" },
      { label: "Subcategory", href: "/products/cat/sub" },
      { label: "Item Detail" },
    ],
  },
}

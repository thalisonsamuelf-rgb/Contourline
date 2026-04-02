import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPagination } from "./bb-pagination"

const meta = {
  title: "Molecules/Brandbook/BbPagination",
  component: BbPagination,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbPagination>

export default meta
type Story = StoryObj<typeof meta>

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 5,
    onPageChange: () => {},
  },
}

export const ManyPages: Story = {
  args: {
    page: 7,
    totalPages: 20,
    onPageChange: () => {},
  },
}

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
}

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
    onPageChange: () => {},
  },
}

export const SinglePage: Story = {
  args: {
    page: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
}

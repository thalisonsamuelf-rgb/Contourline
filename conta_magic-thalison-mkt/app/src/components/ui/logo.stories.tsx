import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta = {
  title: "Atoms/Brand/Logo",
  component: Logo,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
    </div>
  ),
};

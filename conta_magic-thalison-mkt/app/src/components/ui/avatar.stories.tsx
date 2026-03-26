import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Atoms/Data Display/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    fallback: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "Foto do usuario",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Avatar pequeno",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    src: "https://i.pravatar.cc/150?img=32",
    alt: "Avatar grande",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "Ana Costa",
    alt: "Avatar com iniciais",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallback="JP" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=12" alt="Medio" />
      <Avatar size="lg" fallback="Maria Silva" />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StackedAvatars } from "./stacked-avatars";

const sampleAvatars = [
  { src: "https://i.pravatar.cc/150?img=12", alt: "Ana Costa" },
  { src: "https://i.pravatar.cc/150?img=5", alt: "Bruno Silva" },
  { src: "https://i.pravatar.cc/150?img=32", alt: "Carla Mendes" },
  { src: "https://i.pravatar.cc/150?img=44", alt: "Diego Souza" },
  { src: "https://i.pravatar.cc/150?img=28", alt: "Elena Rocha" },
];

const meta = {
  title: "Molecules/Data Display/StackedAvatars",
  component: StackedAvatars,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    max: { control: "number" },
    count: { control: "number" },
  },
} satisfies Meta<typeof StackedAvatars>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
  },
};

export const WithCount: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
    max: 3,
    count: 12,
  },
};

export const Small: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
    size: "lg",
  },
};

export const AllVariants: Story = {
  args: {
    avatars: sampleAvatars,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary w-20">Small</span>
        <StackedAvatars avatars={sampleAvatars} max={3} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary w-20">Medium</span>
        <StackedAvatars avatars={sampleAvatars} max={4} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary w-20">Large</span>
        <StackedAvatars avatars={sampleAvatars} max={4} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary w-20">Com total</span>
        <StackedAvatars avatars={sampleAvatars.slice(0, 3)} max={3} count={27} size="md" />
      </div>
    </div>
  ),
};

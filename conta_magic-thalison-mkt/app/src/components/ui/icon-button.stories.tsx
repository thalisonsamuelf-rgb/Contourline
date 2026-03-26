import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Play, ArrowRight } from "lucide-react";
import { IconButton } from "./icon-button";

const meta = {
  title: "Atoms/Actions/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "Canonical icon-only action primitive for play, media, and compact signal actions.",
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    tone: "glass",
    size: "lg",
    "aria-label": "Play demo",
    children: <Play className="ml-0.5 h-5 w-5 fill-current" />,
  },
};

export const Tones: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton tone="glass" aria-label="Play glass">
        <Play className="ml-0.5 h-4 w-4 fill-current" />
      </IconButton>
      <IconButton tone="signal" aria-label="Next signal">
        <ArrowRight className="h-4 w-4" />
      </IconButton>
    </div>
  ),
};

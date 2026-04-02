import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "Atoms/Data Display/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Novo",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Em breve",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "Arquivado",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="default">Padrao</Badge>
      <Badge variant="outline">Contorno</Badge>
      <Badge variant="muted">Sutil</Badge>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./button";

const meta = {
  title: "Atoms/Actions/Button",
  component: Button,
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showArrow: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Comece agora",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Comece agora",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Saiba mais",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancelar",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Ver documentacao",
  },
};

export const WithArrow: Story = {
  args: {
    children: "Comecar",
    showArrow: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Indisponivel",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Pequeno</Button>
      <Button size="md">Medio</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

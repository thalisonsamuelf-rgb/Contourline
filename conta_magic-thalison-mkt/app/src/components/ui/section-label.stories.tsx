import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionLabel } from "./section-label";

const meta = {
  title: "Atoms/Typography/SectionLabel",
  component: SectionLabel,
  argTypes: {
    children: { control: "text" },
  },
} satisfies Meta<typeof SectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Funcionalidades",
  },
};

export const CustomText: Story = {
  args: {
    children: "Nossos servicos",
  },
};

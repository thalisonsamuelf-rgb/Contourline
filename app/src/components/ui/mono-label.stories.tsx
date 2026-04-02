import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MonoLabel } from "./mono-label";

const meta = {
  title: "Atoms/Typography/MonoLabel",
  component: MonoLabel,
  argTypes: {
    index: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof MonoLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: "01",
    children: "Section title",
  },
};

export const WithoutIndex: Story = {
  args: {
    children: "Trusted by 50+ companies",
  },
};

export const AllSections: Story = {
  args: {
    children: "Section title",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <MonoLabel index="01">Eliminate your bottleneck</MonoLabel>
      <MonoLabel index="02">Track record</MonoLabel>
      <MonoLabel index="03">Sound familiar?</MonoLabel>
      <MonoLabel index="04">What we do</MonoLabel>
      <MonoLabel index="05">How it works</MonoLabel>
      <MonoLabel index="06">Case study</MonoLabel>
      <MonoLabel index="07">Testimonials</MonoLabel>
      <MonoLabel index="08">Pricing</MonoLabel>
    </div>
  ),
};

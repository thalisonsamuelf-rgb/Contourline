import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GridBorders } from "./grid-borders";

const meta = {
  title: "Atoms/Decorative/GridBorders",
  component: GridBorders,
  decorators: [
    (Story) => (
      <div className="relative w-[600px] h-[300px] bg-background border border-border rounded-radius-lg overflow-hidden">
        <Story />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Conteudo da secao
        </div>
      </div>
    ),
  ],
  argTypes: {
    columns: { control: { type: "range", min: 2, max: 8, step: 1 } },
  },
} satisfies Meta<typeof GridBorders>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: 4,
  },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
  },
};

export const FourColumns: Story = {
  args: {
    columns: 4,
  },
};

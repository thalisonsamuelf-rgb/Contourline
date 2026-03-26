import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinePattern } from "./line-pattern";

const meta = {
  title: "Atoms/Decorative/LinePattern",
  component: LinePattern,
  decorators: [
    (Story) => (
      <div className="relative w-[600px] h-[300px] bg-background border border-border rounded-radius-lg overflow-hidden">
        <Story />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          Conteudo com padrao de linhas
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LinePattern>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

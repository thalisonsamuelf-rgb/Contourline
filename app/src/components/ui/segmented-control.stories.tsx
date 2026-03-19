import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";
import { SegmentedControl } from "./segmented-control";

const meta = {
  title: "Atoms/Controls/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    docs: {
      description: {
        component:
          "Canonical compact single-choice pill selector for marketing forms and lightweight configuration controls.",
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledSegmentedDemo({
  tone = "surface",
}: {
  tone?: "surface" | "ghost";
}) {
  const [value, setValue] = React.useState("$10k – $25k");

  return (
    <div className="max-w-xl space-y-3">
      <SegmentedControl
        options={["Under $10k", "$10k – $25k", "$25k+" ]}
        value={value}
        onValueChange={setValue}
        tone={tone}
        className="flex flex-wrap gap-2"
      />
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Selected: {value}
      </p>
    </div>
  );
}

export const Surface: Story = {
  args: {
    options: ["Under $10k", "$10k – $25k", "$25k+"],
  },
  render: () => <ControlledSegmentedDemo tone="surface" />,
};

export const Ghost: Story = {
  args: {
    options: ["Under $10k", "$10k – $25k", "$25k+"],
  },
  render: () => (
    <div className="rounded-xl bg-bg-elevated p-4">
      <ControlledSegmentedDemo tone="ghost" />
    </div>
  ),
};

export const Uncontrolled: Story = {
  args: {
    options: ["Monthly", "Quarterly", "Yearly"],
  },
  render: () => (
    <SegmentedControl
      options={["Monthly", "Quarterly", "Yearly"]}
      defaultValue="Quarterly"
      className="flex flex-wrap gap-2"
    />
  ),
};

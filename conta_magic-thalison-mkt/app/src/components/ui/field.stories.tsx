import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field, FieldLabel, fieldControlVariants } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";

const meta = {
  title: "Molecules/Forms/Field",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "Canonical field composition wrapper for new site and product forms. Pair with `FieldLabel` and control variants.",
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Surface: Story = {
  render: () => (
    <div className="max-w-md">
      <Field>
        <FieldLabel htmlFor="field-surface">Name</FieldLabel>
        <Input
          id="field-surface"
          placeholder="Jane Smith"
          className={fieldControlVariants({ tone: "surface" })}
        />
      </Field>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div className="max-w-md rounded-xl bg-bg-elevated p-4">
      <Field spacing="cozy">
        <FieldLabel htmlFor="field-ghost" tone="ghost">
          Company
        </FieldLabel>
        <Input
          id="field-ghost"
          placeholder="AIOX"
          className={fieldControlVariants({ tone: "ghost" })}
        />
      </Field>
    </div>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <div className="max-w-md">
      <Field>
        <FieldLabel htmlFor="field-textarea">Message</FieldLabel>
        <Textarea
          id="field-textarea"
          rows={4}
          placeholder="Tell us what you need..."
          className={fieldControlVariants({ tone: "surface" })}
        />
      </Field>
    </div>
  ),
};

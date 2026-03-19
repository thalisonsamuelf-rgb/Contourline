import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CtaButton } from "./cta-button";

const meta = {
  title: "Atoms/Actions/CtaButton",
  component: CtaButton,
  parameters: {
    docs: {
      description: {
        component:
          "Legacy marketing CTA kept for compatibility in older hero/cohort sections. Prefer `SiteCtaButton` or `SiteCtaLink` for new work.",
      },
    },
  },
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "See how it works",
    href: "#howitworks",
  },
};

export const LongLabel: Story = {
  args: {
    children: "Book a free automation audit now",
    href: "#contact",
  },
};

export const AllVariants: Story = {
  args: {
    children: "See how it works",
  },
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <CtaButton href="#1">See how it works</CtaButton>
      <CtaButton href="#2">Book your free audit</CtaButton>
      <CtaButton href="#3">Get started today</CtaButton>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteCtaButton, SiteCtaLink } from "./site-cta";

const meta = {
  title: "Atoms/Actions/SiteCta",
  component: SiteCtaButton,
  parameters: {
    docs: {
      description: {
        component:
          "Canonical marketing CTA primitive for new site sections, forms, and conversion surfaces.",
      },
    },
  },
} satisfies Meta<typeof SiteCtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonSolid: Story = {
  args: {
    children: "Launch project",
    showArrow: true,
    size: "lg",
  },
};

export const ButtonStates: Story = {
  args: {
    children: "Idle",
  },
  render: () => (
    <div className="flex max-w-3xl flex-wrap gap-4">
      <SiteCtaButton>Idle</SiteCtaButton>
      <SiteCtaButton state="loading">Loading</SiteCtaButton>
      <SiteCtaButton state="success">Success</SiteCtaButton>
      <SiteCtaButton state="error">Error</SiteCtaButton>
    </div>
  ),
};

export const LinkTones: Story = {
  args: {
    children: "Solid link",
  },
  render: () => (
    <div className="flex max-w-4xl flex-wrap gap-4">
      <SiteCtaLink href="#solid" tone="solid" showArrow>
        Solid link
      </SiteCtaLink>
      <SiteCtaLink href="#surface" tone="surface">
        Surface link
      </SiteCtaLink>
      <SiteCtaLink href="#inverse" tone="inverse">
        Inverse link
      </SiteCtaLink>
    </div>
  ),
};

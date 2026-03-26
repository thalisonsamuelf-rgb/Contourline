import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrimaryLink } from "./primary-link";

const meta = {
  title: "Atoms/Navigation/PrimaryLink",
  component: PrimaryLink,
  argTypes: {
    href: { control: "text" },
    newTab: { control: "boolean" },
  },
} satisfies Meta<typeof PrimaryLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Ver mais detalhes",
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://aiox.com.br",
    newTab: true,
    children: "Visitar site externo",
  },
};

export const AllVariants: Story = {
  args: {
    href: "#",
    children: "Link padrao",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <PrimaryLink {...args}>Link interno padrao</PrimaryLink>
      <PrimaryLink href="https://aiox.com.br" newTab>
        Link externo com nova aba
      </PrimaryLink>
      <PrimaryLink href="#" className="text-foreground">
        Link com cor personalizada
      </PrimaryLink>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PricingBenefit } from "./pricing-benefit";

const meta = {
  title: "Atoms/Pricing/PricingBenefit",
  component: PricingBenefit,
  argTypes: {
    included: { control: "boolean" },
    children: { control: "text" },
  },
} satisfies Meta<typeof PricingBenefit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Até 10 agentes simultâneos",
    included: true,
  },
};

export const NotIncluded: Story = {
  args: {
    children: "Suporte prioritário 24/7",
    included: false,
  },
};

export const AllVariants: Story = {
  args: {
    children: "Até 5 projetos ativos",
  },
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <PricingBenefit included>Até 5 projetos ativos</PricingBenefit>
      <PricingBenefit included>Orquestração de agentes IA</PricingBenefit>
      <PricingBenefit included>Integração com GitHub</PricingBenefit>
      <PricingBenefit included>Dashboard de métricas</PricingBenefit>
      <PricingBenefit included={false}>Agentes customizados</PricingBenefit>
      <PricingBenefit included={false}>Suporte prioritário 24/7</PricingBenefit>
      <PricingBenefit included={false}>Deploy em nuvem privada</PricingBenefit>
    </div>
  ),
};

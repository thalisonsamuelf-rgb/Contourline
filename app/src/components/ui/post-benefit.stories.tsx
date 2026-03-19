import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Zap, Shield, BarChart3, Clock } from "lucide-react";
import { PostBenefit } from "./post-benefit";

const meta = {
  title: "Molecules/Content/PostBenefit",
  component: PostBenefit,
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostBenefit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Zap className="size-5" />,
    title: "Automação Inteligente",
    description:
      "Reduza tarefas manuais em até 80% com fluxos de trabalho automatizados por inteligência artificial.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: <Shield className="size-5" />,
    title: "Segurança de Dados",
    description:
      "Proteção de ponta a ponta com criptografia e conformidade com LGPD integrada.",
  },
};

export const AllVariants: Story = {
  args: {
    icon: <Zap className="size-5" />,
    title: "Automação Inteligente",
    description: "Reduza tarefas manuais.",
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <PostBenefit
        icon={<Zap className="size-5" />}
        title="Automação Inteligente"
        description="Reduza tarefas manuais em até 80% com fluxos automatizados por IA."
      />
      <PostBenefit
        icon={<Shield className="size-5" />}
        title="Segurança Integrada"
        description="Proteção de ponta a ponta com criptografia e conformidade regulatória."
      />
      <PostBenefit
        icon={<BarChart3 className="size-5" />}
        title="Métricas em Tempo Real"
        description="Dashboards e relatórios atualizados automaticamente para tomada de decisão."
      />
      <PostBenefit
        icon={<Clock className="size-5" />}
        title="Entrega Acelerada"
        description="Ciclos de desenvolvimento 3x mais rápidos com orquestração de agentes."
      />
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FAQItem } from "./faq-item";

const meta = {
  title: "Molecules/Content/FAQItem",
  component: FAQItem,
  argTypes: {
    question: { control: "text" },
    answer: { control: "text" },
    value: { control: "text" },
  },
  decorators: [
    (Story) => (
      <AccordionPrimitive.Root type="single" collapsible className="w-[500px]">
        <Story />
      </AccordionPrimitive.Root>
    ),
  ],
} satisfies Meta<typeof FAQItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "item-1",
    question: "O que é o AIOX?",
    answer:
      "AIOX é uma plataforma de orquestração de agentes de IA projetada para acelerar o ciclo de desenvolvimento de software, desde o planejamento até o deploy.",
  },
};

export const Open: Story = {
  args: {
    value: "item-1",
    question: "Como funciona a integração com GitHub?",
    answer:
      "O AIOX conecta diretamente ao seu repositório GitHub, sincronizando stories, pull requests e code reviews automaticamente através de agentes especializados.",
  },
  decorators: [
    (Story) => (
      <AccordionPrimitive.Root
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-[500px]"
      >
        <Story />
      </AccordionPrimitive.Root>
    ),
  ],
};

export const AllVariants: Story = {
  args: {
    value: "faq-1",
    question: "Qual o preço do plano inicial?",
    answer: "O plano Starter começa em R$99/mês.",
  },
  render: () => (
    <AccordionPrimitive.Root type="single" collapsible className="w-[500px]">
      <FAQItem
        value="faq-1"
        question="Qual o preço do plano inicial?"
        answer="O plano Starter começa em R$99/mês e inclui até 5 projetos ativos com orquestração básica de agentes."
      />
      <FAQItem
        value="faq-2"
        question="Posso integrar com ferramentas existentes?"
        answer="Sim. O AIOX oferece integrações nativas com GitHub, Figma, Supabase, Docker e muito mais. Também é possível criar integrações customizadas via API."
      />
      <FAQItem
        value="faq-3"
        question="Existe período de teste gratuito?"
        answer="Oferecemos 14 dias de teste gratuito com acesso completo a todas as funcionalidades do plano Pro. Não é necessário cartão de crédito."
      />
      <FAQItem
        value="faq-4"
        question="Como funciona o suporte técnico?"
        answer="Todos os planos incluem suporte via documentação e comunidade. Planos Pro e Enterprise contam com suporte prioritário por chat e email com SLA de resposta."
      />
    </AccordionPrimitive.Root>
  ),
};

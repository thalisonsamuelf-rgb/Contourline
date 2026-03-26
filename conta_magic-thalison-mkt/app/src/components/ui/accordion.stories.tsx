import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta = {
  title: "Molecules/Content/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é o AIOX Squad?</AccordionTrigger>
        <AccordionContent>
          AIOX Squad é um sistema de orquestração de agentes de IA para
          desenvolvimento full stack, que devolve o poder de criar para as
          pessoas.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  name: "Multiple (FAQ)",
  args: {
    type: "multiple",
  },
  render: () => (
    <Accordion type="multiple" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona a orquestração de agentes?</AccordionTrigger>
        <AccordionContent>
          Os agentes são ativados com a sintaxe @nome-do-agente. Cada agente
          possui autoridade exclusiva sobre determinadas operações e segue um
          conjunto de regras definidas na Constitution do AIOX.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Quais são os agentes disponíveis?</AccordionTrigger>
        <AccordionContent>
          Os agentes disponíveis incluem @dev, @qa, @architect, @pm, @po, @sm,
          @analyst, @data-engineer, @ux-design-expert e @devops. Cada um possui
          uma persona e escopo de responsabilidade bem definidos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Como são criadas as histórias de desenvolvimento?</AccordionTrigger>
        <AccordionContent>
          As histórias são criadas pelo agente @sm usando a tarefa
          create-next-story. O agente @po valida a história com um checklist de
          10 pontos antes de liberar para implementação pelo @dev.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleOpen: Story = {
  name: "Single (apenas um aberto)",
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-2",
  },
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-2" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Qual é a missão do AIOX?</AccordionTrigger>
        <AccordionContent>
          Devolver às pessoas o poder de criar, tornando o desenvolvimento de
          software acessível e eficiente para todos.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Quem são os fundadores?</AccordionTrigger>
        <AccordionContent>
          O AIOX Squad foi fundado por Alan Nicolas e Pedro Valerio, com o
          objetivo de transformar a maneira como as equipes desenvolvem software
          utilizando inteligência artificial.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Qual é o domínio oficial?</AccordionTrigger>
        <AccordionContent>
          O domínio oficial do AIOX Squad é aioxsquad.ai.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const AllOpen: Story = {
  name: "Todos abertos (multiple)",
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-2", "item-3"],
  },
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2", "item-3"]}
      className="w-full max-w-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Plano Starter</AccordionTrigger>
        <AccordionContent>
          Ideal para equipes pequenas que estão começando a explorar o poder da
          orquestração de agentes de IA no desenvolvimento de software.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Plano Pro</AccordionTrigger>
        <AccordionContent>
          Para equipes em crescimento que precisam de mais agentes, fluxos de
          trabalho avançados e integrações com ferramentas externas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Plano Enterprise</AccordionTrigger>
        <AccordionContent>
          Solução completa para grandes organizações com suporte dedicado,
          segurança avançada e personalização total dos agentes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

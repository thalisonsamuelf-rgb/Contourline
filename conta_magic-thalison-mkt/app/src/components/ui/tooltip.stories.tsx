import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import { Button } from "./button";

const meta = {
  title: "Molecules/Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Passe o mouse</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Dica de ferramenta padrao</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const OnButton: Story = {
  name: "Em botao de acao",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="primary" onClick={fn()}>
          Executar deploy
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Inicia o deploy via agente @devops para producao</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const TopPosition: Story = {
  name: "Posicao superior",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Topo</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>Exibido acima do elemento</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const BottomPosition: Story = {
  name: "Posicao inferior",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Base</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Exibido abaixo do elemento</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const RightPosition: Story = {
  name: "Posicao direita",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">Direita</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Exibido a direita do elemento</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const LeftPosition: Story = {
  name: "Posicao esquerda",
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">Esquerda</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Exibido a esquerda do elemento</p>
      </TooltipContent>
    </Tooltip>
  ),
};

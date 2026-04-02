import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";

const meta = {
  title: "Molecules/Layout/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Orquestração de Agentes</CardTitle>
        <CardDescription>
          Gerencie múltiplos agentes de IA em um único fluxo de trabalho
          integrado e eficiente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          O AIOX Squad permite ativar agentes especializados para cada etapa do
          desenvolvimento, do planejamento à entrega, garantindo qualidade e
          agilidade em cada sprint.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Atualizado há 2 minutos</p>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  name: "Somente cabeçalho",
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Story Development Cycle</CardTitle>
        <CardDescription>
          Fluxo principal de desenvolvimento orientado a histórias com 4 fases
          bem definidas.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const WithAction: Story = {
  name: "Com ação no cabeçalho",
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Histórias Ativas</CardTitle>
        <CardDescription>
          Acompanhe o progresso das histórias em desenvolvimento no sprint atual.
        </CardDescription>
        <CardAction>
          <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">
            Ver todas
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          3 histórias em andamento · 1 em revisão · 2 concluídas esta semana
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  name: "Com rodapé",
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Relatório de Qualidade</CardTitle>
        <CardDescription>
          Resultado do último ciclo de QA Gate executado pelo agente Quinn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>Cobertura de testes: 94%</li>
          <li>Lint: aprovado</li>
          <li>TypeCheck: aprovado</li>
          <li>CodeRabbit: 0 críticos, 2 médios</li>
        </ul>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Executado em 04/03/2026 às 14:32
        </p>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  name: "Somente conteúdo",
  render: () => (
    <Card className="w-full max-w-md">
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use o cartão de conteúdo para exibir informações sem necessidade de
          título ou rodapé, mantendo a hierarquia visual limpa e focada.
        </p>
      </CardContent>
    </Card>
  ),
};

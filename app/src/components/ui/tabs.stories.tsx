import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

const meta = {
  title: "Molecules/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Padrão (variant=default)",
  render: () => (
    <Tabs defaultValue="visao-geral" className="w-full max-w-lg">
      <TabsList variant="default">
        <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
        <TabsTrigger value="agentes">Agentes</TabsTrigger>
        <TabsTrigger value="metricas">Métricas</TabsTrigger>
      </TabsList>
      <TabsContent value="visao-geral">
        <p className="text-sm text-muted-foreground pt-4">
          Bem-vindo ao painel AIOX. Aqui você encontra uma visão geral do seu
          workspace, sprints ativos e o status de todos os agentes.
        </p>
      </TabsContent>
      <TabsContent value="agentes">
        <p className="text-sm text-muted-foreground pt-4">
          Gerencie seus agentes de IA: @dev, @qa, @architect, @pm e mais. Cada
          agente possui autoridade exclusiva sobre suas operações.
        </p>
      </TabsContent>
      <TabsContent value="metricas">
        <p className="text-sm text-muted-foreground pt-4">
          Acompanhe métricas de produtividade, cobertura de testes, tempo médio
          de ciclo e qualidade de entregas por sprint.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const LineVariant: Story = {
  name: "Variante linha (variant=line)",
  render: () => (
    <Tabs defaultValue="historias" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="historias">Histórias</TabsTrigger>
        <TabsTrigger value="epics">Epics</TabsTrigger>
        <TabsTrigger value="backlog">Backlog</TabsTrigger>
        <TabsTrigger value="arquivo">Arquivo</TabsTrigger>
      </TabsList>
      <TabsContent value="historias">
        <p className="text-sm text-muted-foreground pt-4">
          Histórias do sprint atual ordenadas por prioridade. Clique em uma
          história para ver detalhes e critérios de aceitação.
        </p>
      </TabsContent>
      <TabsContent value="epics">
        <p className="text-sm text-muted-foreground pt-4">
          Epics ativos no projeto. Cada epic agrupa histórias relacionadas com
          um objetivo de negócio em comum.
        </p>
      </TabsContent>
      <TabsContent value="backlog">
        <p className="text-sm text-muted-foreground pt-4">
          Itens no backlog aguardando priorização pelo @po. Use o drag-and-drop
          para reordenar conforme necessidade do produto.
        </p>
      </TabsContent>
      <TabsContent value="arquivo">
        <p className="text-sm text-muted-foreground pt-4">
          Histórias e epics concluídos. Consulte o histórico para referência em
          futuras estimativas.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const WithContent: Story = {
  name: "Com conteúdo rico",
  render: () => (
    <Tabs defaultValue="deploy" className="w-full max-w-lg">
      <TabsList variant="default">
        <TabsTrigger value="deploy">Deploy</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="deploy">
        <div className="pt-4 space-y-3">
          <div className="rounded-md border p-3">
            <p className="text-xs font-mono text-muted-foreground">Último deploy</p>
            <p className="text-sm font-medium mt-1">v2.4.1 — produção</p>
            <p className="text-xs text-muted-foreground mt-0.5">04/03/2026 às 14:32 por @devops</p>
          </div>
          <div className="rounded-md border p-3">
            <p className="text-xs font-mono text-muted-foreground">Status</p>
            <p className="text-sm font-medium mt-1 text-green-600">Saudável</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="logs">
        <div className="pt-4">
          <pre className="rounded-md bg-muted p-3 text-xs font-mono overflow-auto max-h-40">
            {`[INFO] Deploy iniciado — v2.4.1
[INFO] Build concluído em 43s
[INFO] Testes: 127 passou, 0 falhou
[INFO] Deploy em produção iniciado
[INFO] Health check: OK
[INFO] Deploy concluído com sucesso`}
          </pre>
        </div>
      </TabsContent>
      <TabsContent value="configuracoes">
        <div className="pt-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Configurações de ambiente, variáveis e integrações com serviços
            externos gerenciadas pelo agente @devops.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  name: "Orientacao vertical",
  render: () => (
    <Tabs defaultValue="dev" orientation="vertical" className="w-full max-w-xl">
      <TabsList variant="default" className="h-fit">
        <TabsTrigger value="dev">Desenvolvimento</TabsTrigger>
        <TabsTrigger value="qa">Qualidade</TabsTrigger>
        <TabsTrigger value="arquitetura">Arquitetura</TabsTrigger>
        <TabsTrigger value="produto">Produto</TabsTrigger>
      </TabsList>
      <TabsContent value="dev">
        <div className="pl-4">
          <h4 className="text-sm font-semibold mb-2">Agente @dev</h4>
          <p className="text-sm text-muted-foreground">
            Responsável pela implementação de código, commits locais e
            atualização das histórias com progresso e lista de arquivos.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="qa">
        <div className="pl-4">
          <h4 className="text-sm font-semibold mb-2">Agente @qa</h4>
          <p className="text-sm text-muted-foreground">
            Executa o QA Gate com 7 verificações de qualidade. Emite veredictos
            PASS, CONCERNS, FAIL ou WAIVED sobre cada história.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="arquitetura">
        <div className="pl-4">
          <h4 className="text-sm font-semibold mb-2">Agente @architect</h4>
          <p className="text-sm text-muted-foreground">
            Define decisões de arquitetura, seleção de tecnologias e avaliação
            de complexidade para novas funcionalidades.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="produto">
        <div className="pl-4">
          <h4 className="text-sm font-semibold mb-2">Agentes @pm e @po</h4>
          <p className="text-sm text-muted-foreground">
            @pm gerencia epics e requisitos. @po valida histórias com checklist
            de 10 pontos e prioriza o backlog.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

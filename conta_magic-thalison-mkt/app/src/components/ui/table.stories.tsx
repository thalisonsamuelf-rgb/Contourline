import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  TableCaption,
} from "./table";

const meta = {
  title: "Molecules/Data Display/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const agentes = [
  { nome: "Dex", papel: "@dev", status: "Ativo", historias: 12 },
  { nome: "Quinn", papel: "@qa", status: "Ativo", historias: 11 },
  { nome: "Aria", papel: "@architect", status: "Ativo", historias: 5 },
  { nome: "Morgan", papel: "@pm", status: "Ativo", historias: 8 },
  { nome: "Pax", papel: "@po", status: "Ativo", historias: 8 },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Papel</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Histórias</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agentes.map((agente) => (
          <TableRow key={agente.papel}>
            <TableCell className="font-medium">{agente.nome}</TableCell>
            <TableCell className="font-mono text-xs">{agente.papel}</TableCell>
            <TableCell>{agente.status}</TableCell>
            <TableCell className="text-right">{agente.historias}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  name: "Com legenda",
  render: () => (
    <Table>
      <TableCaption>Lista de histórias do Sprint atual — Março 2026</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono text-xs">3.1</TableCell>
          <TableCell>Implementar autenticação OAuth</TableCell>
          <TableCell>@dev</TableCell>
          <TableCell>InProgress</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">3.2</TableCell>
          <TableCell>Criar dashboard de métricas</TableCell>
          <TableCell>@dev</TableCell>
          <TableCell>Ready</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">3.3</TableCell>
          <TableCell>QA Gate — autenticação OAuth</TableCell>
          <TableCell>@qa</TableCell>
          <TableCell>InReview</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  name: "Com rodapé",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agente</TableHead>
          <TableHead>Tarefa</TableHead>
          <TableHead className="text-right">Horas</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono text-xs">@dev</TableCell>
          <TableCell>Implementação de features</TableCell>
          <TableCell className="text-right">24</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">@qa</TableCell>
          <TableCell>Revisão e QA Gate</TableCell>
          <TableCell className="text-right">8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono text-xs">@architect</TableCell>
          <TableCell>Design de arquitetura</TableCell>
          <TableCell className="text-right">6</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total do sprint</TableCell>
          <TableCell className="text-right">38</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Striped: Story = {
  name: "Com linhas alternadas",
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          { nome: "Ana Beatriz", email: "ana@aioxsquad.ai", cargo: "Engenheira", status: "Ativo" },
          { nome: "Carlos Eduardo", email: "carlos@aioxsquad.ai", cargo: "Product Manager", status: "Ativo" },
          { nome: "Daniela Ferreira", email: "daniela@aioxsquad.ai", cargo: "Designer", status: "Férias" },
          { nome: "Eduardo Lima", email: "eduardo@aioxsquad.ai", cargo: "Arquiteto", status: "Ativo" },
          { nome: "Fernanda Souza", email: "fernanda@aioxsquad.ai", cargo: "QA Engineer", status: "Ativo" },
        ].map((usuario, index) => (
          <TableRow
            key={usuario.email}
            className={index % 2 === 0 ? "bg-muted/20" : ""}
          >
            <TableCell className="font-medium">{usuario.nome}</TableCell>
            <TableCell>{usuario.email}</TableCell>
            <TableCell>{usuario.cargo}</TableCell>
            <TableCell>{usuario.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

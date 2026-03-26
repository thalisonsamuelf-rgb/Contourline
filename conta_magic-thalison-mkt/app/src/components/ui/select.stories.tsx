import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectSeparator,
} from "./select";

const meta = {
  title: "Molecules/Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Selecione um agente" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dev">@dev — Dex</SelectItem>
        <SelectItem value="qa">@qa — Quinn</SelectItem>
        <SelectItem value="architect">@architect — Aria</SelectItem>
        <SelectItem value="pm">@pm — Morgan</SelectItem>
        <SelectItem value="po">@po — Pax</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  name: "Com grupos",
  render: () => (
    <Select>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Selecione o status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Em andamento</SelectLabel>
          <SelectItem value="inprogress">InProgress</SelectItem>
          <SelectItem value="inreview">InReview</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Finalizado</SelectLabel>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Pendente</SelectLabel>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="ready">Ready</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const SmallSize: Story = {
  name: "Tamanho pequeno",
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[200px]">
        <SelectValue placeholder="Selecione o workflow" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sdc">Story Development Cycle</SelectItem>
        <SelectItem value="qa-loop">QA Loop</SelectItem>
        <SelectItem value="spec">Spec Pipeline</SelectItem>
        <SelectItem value="brownfield">Brownfield Discovery</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  name: "Desabilitado",
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Indisponivel no momento" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Opcao 1</SelectItem>
        <SelectItem value="option2">Opcao 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

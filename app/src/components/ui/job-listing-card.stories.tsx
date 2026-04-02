import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobListingCard } from "./job-listing-card";

const meta = {
  title: "Molecules/Cards/JobListingCard",
  component: JobListingCard,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["full-time", "part-time", "contract"],
    },
    open: { control: "boolean" },
  },
} satisfies Meta<typeof JobListingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Engenheiro de Software Senior",
    department: "Engenharia",
    location: "Remoto — Brasil",
    type: "full-time",
    applyHref: "#",
    open: true,
  },
};

export const PartTime: Story = {
  name: "Meio periodo",
  args: {
    title: "Designer de Produto",
    department: "Design",
    location: "Sao Paulo, SP",
    type: "part-time",
    applyHref: "#",
    open: true,
  },
};

export const Contract: Story = {
  name: "Contrato",
  args: {
    title: "Especialista em Inteligencia Artificial",
    department: "IA e Machine Learning",
    location: "Remoto — Global",
    type: "contract",
    applyHref: "#",
    open: true,
  },
};

export const Closed: Story = {
  name: "Vaga fechada",
  args: {
    title: "Arquiteto de Solucoes",
    department: "Arquitetura",
    location: "Rio de Janeiro, RJ",
    type: "full-time",
    applyHref: "#",
    open: false,
  },
};

export const AllTypes: Story = {
  name: "Todos os tipos (galeria)",
  args: {
    title: "Lider de Engenharia",
    department: "Engenharia",
    location: "Sao Paulo, SP",
    type: "full-time",
    applyHref: "#",
    open: true,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 max-w-2xl sm:grid-cols-2 lg:grid-cols-3">
      <JobListingCard
        title="Lider de Engenharia"
        department="Engenharia"
        location="Sao Paulo, SP"
        type="full-time"
        applyHref="#"
        open={true}
      />
      <JobListingCard
        title="Analista de Dados"
        department="Dados"
        location="Remoto — Brasil"
        type="part-time"
        applyHref="#"
        open={true}
      />
      <JobListingCard
        title="Consultor de Produto"
        department="Produto"
        location="Belo Horizonte, MG"
        type="contract"
        applyHref="#"
        open={true}
      />
      <JobListingCard
        title="Gerente de Comunidade"
        department="Marketing"
        location="Remoto — Brasil"
        type="full-time"
        applyHref="#"
        open={false}
      />
      <JobListingCard
        title="Engenheiro de DevOps"
        department="Infraestrutura"
        location="Remoto — Global"
        type="contract"
        applyHref="#"
        open={true}
      />
      <JobListingCard
        title="Redator Tecnico"
        department="Conteudo"
        location="Sao Paulo, SP"
        type="part-time"
        applyHref="#"
        open={false}
      />
    </div>
  ),
};

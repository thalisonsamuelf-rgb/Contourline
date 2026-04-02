import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OfficeCard } from "./office-card";

const meta = {
  title: "Molecules/Cards/OfficeCard",
  component: OfficeCard,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof OfficeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Completo",
  args: {
    city: "Sao Paulo",
    address: "Av. Paulista, 1374 — Bela Vista\nSao Paulo, SP 01310-100",
    phone: "+55 (11) 3456-7890",
    email: "contato@aioxsquad.ai",
  },
};

export const MinimalInfo: Story = {
  name: "Informacoes minimas",
  args: {
    city: "Rio de Janeiro",
    address: "Rua do Ouvidor, 60 — Centro\nRio de Janeiro, RJ 20040-030",
  },
};

export const WithMap: Story = {
  name: "Com link para mapa",
  args: {
    city: "Belo Horizonte",
    address: "Av. do Contorno, 6594 — Savassi\nBelo Horizonte, MG 30110-110",
    phone: "+55 (31) 3456-7890",
    email: "bh@aioxsquad.ai",
    mapUrl: "https://maps.google.com/?q=Savassi,Belo+Horizonte",
  },
};

export const AllOffices: Story = {
  name: "Todos os escritorios (galeria)",
  args: {
    city: "Sao Paulo",
    address: "Av. Paulista, 1374 — Bela Vista\nSao Paulo, SP 01310-100",
    phone: "+55 (11) 3456-7890",
    email: "sp@aioxsquad.ai",
  },
  render: () => (
    <div className="grid grid-cols-1 gap-6 max-w-4xl sm:grid-cols-2 lg:grid-cols-3">
      <OfficeCard
        city="Sao Paulo"
        address="Av. Paulista, 1374 — Bela Vista\nSao Paulo, SP 01310-100"
        phone="+55 (11) 3456-7890"
        email="sp@aioxsquad.ai"
      />
      <OfficeCard
        city="Rio de Janeiro"
        address="Rua do Ouvidor, 60 — Centro\nRio de Janeiro, RJ 20040-030"
        phone="+55 (21) 3456-7890"
        email="rj@aioxsquad.ai"
        mapUrl="https://maps.google.com/?q=Centro,Rio+de+Janeiro"
      />
      <OfficeCard
        city="Belo Horizonte"
        address="Av. do Contorno, 6594 — Savassi\nBelo Horizonte, MG 30110-110"
        phone="+55 (31) 3456-7890"
        email="bh@aioxsquad.ai"
      />
      <OfficeCard
        city="Porto Alegre"
        address="Av. Borges de Medeiros, 2233 — Centro\nPorto Alegre, RS 90110-150"
        email="poa@aioxsquad.ai"
      />
      <OfficeCard
        city="Curitiba"
        address="Rua XV de Novembro, 700 — Centro\nCuritiba, PR 80020-310"
        phone="+55 (41) 3456-7890"
        email="cwb@aioxsquad.ai"
        mapUrl="https://maps.google.com/?q=Centro,Curitiba"
      />
      <OfficeCard
        city="Recife"
        address="Av. Boa Viagem, 3000 — Boa Viagem\nRecife, PE 51011-000"
        email="rec@aioxsquad.ai"
      />
    </div>
  ),
};

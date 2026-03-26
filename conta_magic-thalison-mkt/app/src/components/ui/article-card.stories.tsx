import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleCard } from "./article-card";

const meta = {
  title: "Molecules/Cards/ArticleCard",
  component: ArticleCard,
  argTypes: {
    title: { control: "text" },
    category: { control: "text" },
    date: { control: "text" },
    readTime: { control: "text" },
    imageSrc: { control: "text" },
    href: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-[340px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Como agentes de IA estão transformando o ciclo de desenvolvimento",
    category: "Engenharia",
    date: "27 Fev 2026",
    readTime: "5 min de leitura",
    imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
    href: "#",
  },
};

export const WithoutImage: Story = {
  args: {
    title: "Boas práticas para orquestração de agentes em projetos complexos",
    category: "Tutoriais",
    date: "20 Fev 2026",
    readTime: "8 min de leitura",
    href: "#",
  },
};

export const AllVariants: Story = {
  args: {
    title: "Como agentes de IA estão transformando o ciclo de desenvolvimento",
    category: "Engenharia",
    date: "27 Fev 2026",
    readTime: "5 min de leitura",
    href: "#",
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <ArticleCard
        title="Como agentes de IA estão transformando o ciclo de desenvolvimento"
        category="Engenharia"
        date="27 Fev 2026"
        readTime="5 min de leitura"
        imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop"
        href="#"
      />
      <ArticleCard
        title="Guia completo: Storybook com design tokens para times distribuídos"
        category="Tutoriais"
        date="22 Fev 2026"
        readTime="12 min de leitura"
        imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop"
        href="#"
      />
      <ArticleCard
        title="O futuro do desenvolvimento full-stack com orquestração inteligente"
        category="Opinião"
        date="15 Fev 2026"
        readTime="7 min de leitura"
        href="#"
      />
    </div>
  ),
  decorators: [],
};

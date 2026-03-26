import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorCard } from "./author-card";

const meta = {
  title: "Molecules/Data Display/AuthorCard",
  component: AuthorCard,
  argTypes: {
    name: { control: "text" },
    role: { control: "text" },
    imageSrc: { control: "text" },
    imageAlt: { control: "text" },
  },
} satisfies Meta<typeof AuthorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Ana Costa",
    role: "Engenheira de Software",
    imageSrc: "https://i.pravatar.cc/150?img=12",
    imageAlt: "Foto de Ana Costa",
  },
};

export const WithLongName: Story = {
  args: {
    name: "Maria Fernanda Oliveira dos Santos",
    role: "Diretora de Engenharia e Inovação",
    imageSrc: "https://i.pravatar.cc/150?img=5",
    imageAlt: "Foto de Maria Fernanda",
  },
  decorators: [
    (Story) => (
      <div className="w-[250px]">
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  args: {
    name: "Bruno Silva",
    role: "Desenvolvedor Frontend",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <AuthorCard
        name="Bruno Silva"
        role="Desenvolvedor Frontend"
        imageSrc="https://i.pravatar.cc/150?img=32"
      />
      <AuthorCard
        name="Carla Mendes"
        role="Designer de Produto"
        imageSrc="https://i.pravatar.cc/150?img=44"
      />
      <AuthorCard
        name="Diego Souza"
        role="Tech Lead"
      />
    </div>
  ),
};

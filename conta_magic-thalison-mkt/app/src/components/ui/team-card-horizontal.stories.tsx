import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TeamCardHorizontal } from "./team-card-horizontal";

const meta = {
  title: "Molecules/Cards/TeamCardHorizontal",
  component: TeamCardHorizontal,
  argTypes: {
    name: { control: "text" },
    role: { control: "text" },
    bio: { control: "text" },
    imageSrc: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TeamCardHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Ana Costa",
    role: "Engenheira de Software",
    bio: "Especialista em arquitetura de microsserviços e sistemas distribuídos. Apaixonada por código limpo e boas práticas de desenvolvimento.",
    imageSrc: "https://i.pravatar.cc/150?img=12",
  },
};

export const WithLongBio: Story = {
  args: {
    name: "Bruno Silva",
    role: "Diretor de Tecnologia",
    bio: "Com mais de 15 anos de experiência em engenharia de software, Bruno liderou equipes em empresas de tecnologia de ponta. Sua expertise abrange desde arquitetura de sistemas em larga escala até estratégias de transformação digital, passando por inteligência artificial aplicada e automação de processos empresariais complexos.",
    imageSrc: "https://i.pravatar.cc/150?img=32",
  },
};

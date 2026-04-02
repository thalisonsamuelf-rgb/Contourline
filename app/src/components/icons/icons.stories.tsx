import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ArrowRightIcon,
  PixelArrowIcon,
  CheckIcon,
  NodeJsIcon,
  ClaudeIcon,
  FigmaIcon,
  DockerIcon,
  PythonIcon,
  MakeIcon,
  GitHubIcon,
  VercelIcon,
  StripeIcon,
  ChatGptIcon,
  AirtableIcon,
  ZapierIcon,
  GoogleCloudIcon,
  AwsIcon,
  CommandRIcon,
} from "./index";

/* ---------------------------------------------------------------------------
 * Componente wrapper para a galeria
 * --------------------------------------------------------------------------- */

const techStackIcons = [
  { name: "Node.js", Icon: NodeJsIcon },
  { name: "Claude", Icon: ClaudeIcon },
  { name: "Figma", Icon: FigmaIcon },
  { name: "Docker", Icon: DockerIcon },
  { name: "Python", Icon: PythonIcon },
  { name: "Make", Icon: MakeIcon },
  { name: "GitHub", Icon: GitHubIcon },
  { name: "Vercel", Icon: VercelIcon },
  { name: "Stripe", Icon: StripeIcon },
  { name: "ChatGPT", Icon: ChatGptIcon },
  { name: "Airtable", Icon: AirtableIcon },
  { name: "Zapier", Icon: ZapierIcon },
  { name: "Google Cloud", Icon: GoogleCloudIcon },
  { name: "AWS", Icon: AwsIcon },
  { name: "Command R", Icon: CommandRIcon },
] as const;

const utilityIcons = [
  { name: "Arrow Right", Icon: ArrowRightIcon },
  { name: "Pixel Arrow", Icon: PixelArrowIcon },
  { name: "Check", Icon: CheckIcon },
] as const;

function IconGallery({ size = 32 }: { size?: number }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>
        Icones de Tech Stack
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 24,
          marginBottom: 48,
        }}
      >
        {techStackIcons.map(({ name, Icon }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 16,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fafafa",
            }}
          >
            <Icon size={size} />
            <span style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>
        Icones Utilitarios
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: 24,
        }}
      >
        {utilityIcons.map(({ name, Icon }) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              padding: 16,
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fafafa",
            }}
          >
            <Icon size={size} />
            <span style={{ fontSize: 12, color: "#6b7280", textAlign: "center" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Meta
 * --------------------------------------------------------------------------- */

const meta = {
  title: "Atoms/Icons/TechStack",
  component: IconGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Colecao completa de icones SVG para tech stack e elementos utilitarios do site AIOX.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 96, step: 4 },
      description: "Tamanho do icone em pixels",
    },
  },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------------------------------------------------------------------------
 * Stories
 * --------------------------------------------------------------------------- */

/** Galeria com todos os icones do projeto em grade responsiva. */
export const TodosOsIcones: Story = {
  args: {
    size: 32,
  },
};

/** Icone de seta para direita, usado em botoes e links primarios. */
export const ArrowRight: Story = {
  render: (args) => <ArrowRightIcon size={args.size} />,
  args: { size: 32 },
};

/** Seta pixelada estilo brand AIOX, usada em elementos de identidade visual. */
export const PixelArrow: Story = {
  render: (args) => <PixelArrowIcon size={args.size} />,
  args: { size: 32 },
};

/** Icone de check, usado na secao de precos para indicar recursos inclusos. */
export const Check: Story = {
  render: (args) => <CheckIcon size={args.size} />,
  args: { size: 32 },
};

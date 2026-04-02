import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { ReactNode } from "react"
import { Field, FieldLabel } from "@/components/ui/field"
import { BbHint } from "../atoms/bb-hint"

interface ReplacementFieldProps {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  children: ReactNode
}

function ReplacementField({ label, hint, error, required, htmlFor, children }: ReplacementFieldProps) {
  return (
    <Field spacing="none">
      {label ? (
        <FieldLabel
          htmlFor={htmlFor}
          className="min-h-0"
          style={{
            display: "block",
            minHeight: 0,
            marginBottom: "0.375rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--dim)",
          }}
        >
          {label}
          {required ? (
            <span aria-hidden="true" style={{ color: "var(--error)", marginLeft: "0.25rem" }}>
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}
      {children}
      {error ? <BbHint variant="error">{error}</BbHint> : null}
      {!error && hint ? <BbHint>{hint}</BbHint> : null}
    </Field>
  )
}

const meta = {
  title: "Molecules/Brandbook/BbFormField",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "`BbFormField` is deprecated. This story keeps the legacy catalog entry alive while documenting the canonical replacement using `Field` and `FieldLabel`.",
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ReplacementField label="Nome do projeto" htmlFor="nome-projeto">
      <input
        id="nome-projeto"
        placeholder="Ex: aiox-stage"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.675rem",
          padding: "0.5rem 0.75rem",
          outline: "none",
          width: "100%",
        }}
      />
    </ReplacementField>
  ),
}

export const ComDica: Story = {
  render: () => (
    <ReplacementField label="Slug do agente" hint="Use apenas letras minusculas, numeros e hifens." htmlFor="slug-agente">
      <input
        id="slug-agente"
        placeholder="ex: dev, qa, architect"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.675rem",
          padding: "0.5rem 0.75rem",
          outline: "none",
          width: "100%",
        }}
      />
    </ReplacementField>
  ),
}

export const ComErro: Story = {
  render: () => (
    <ReplacementField
      label="Token de acesso"
      error="Token invalido ou expirado. Gere um novo token nas configuracoes."
      htmlFor="token-acesso"
    >
      <input
        id="token-acesso"
        type="password"
        placeholder="sk-..."
        style={{
          background: "var(--surface)",
          border: "1px solid var(--error)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.675rem",
          padding: "0.5rem 0.75rem",
          outline: "none",
          width: "100%",
        }}
      />
    </ReplacementField>
  ),
}

export const Obrigatorio: Story = {
  render: () => (
    <ReplacementField label="ID da epic" required hint="Formato: EPIC-001" htmlFor="epic-id">
      <input
        id="epic-id"
        placeholder="EPIC-001"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.675rem",
          padding: "0.5rem 0.75rem",
          outline: "none",
          width: "100%",
        }}
      />
    </ReplacementField>
  ),
}

export const SemLabel: Story = {
  render: () => (
    <ReplacementField hint="Campo sem label, apenas com dica contextual." htmlFor="sem-label">
      <input
        id="sem-label"
        placeholder="Valor do campo"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.675rem",
          padding: "0.5rem 0.75rem",
          outline: "none",
          width: "100%",
        }}
      />
    </ReplacementField>
  ),
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: 400 }}>
      <ReplacementField label="Nome" htmlFor="f-nome">
        <input id="f-nome" placeholder="Seu nome" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontSize: "0.675rem", padding: "0.5rem 0.75rem", outline: "none", width: "100%" }} />
      </ReplacementField>
      <ReplacementField label="Chave de API" required htmlFor="f-key" hint="Disponivel no painel de configuracoes.">
        <input id="f-key" type="password" placeholder="sk-..." style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontSize: "0.675rem", padding: "0.5rem 0.75rem", outline: "none", width: "100%" }} />
      </ReplacementField>
      <ReplacementField label="Email" error="Formato de email invalido." htmlFor="f-email">
        <input id="f-email" placeholder="voce@aiox.ai" style={{ background: "var(--surface)", border: "1px solid var(--error)", color: "var(--cream)", fontFamily: "var(--font-mono)", fontSize: "0.675rem", padding: "0.5rem 0.75rem", outline: "none", width: "100%" }} />
      </ReplacementField>
    </div>
  ),
}

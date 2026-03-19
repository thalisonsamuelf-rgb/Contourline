import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   BRANDSCRIPT SECTION — 6 SB7 BrandScript cards in 3x2 grid
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const sb7Cards = [
  {
    num: "01",
    role: "HERÓI",
    roleEn: "Character",
    description: "Criadores e empreendedores com visão que querem usar IA para construir, mas estão travados por ferramentas complexas ou superficiais.",
  },
  {
    num: "02",
    role: "PROBLEMA",
    roleEn: "Problem",
    description: "Externo: Ferramentas de IA são ou muito técnicas ou muito rasas. Interno: 'Será que eu consigo?' Filosófico: A IA deveria libertar, não aprisionar.",
  },
  {
    num: "03",
    role: "GUIA",
    roleEn: "Guide",
    description: "AIOX -- o Morpheus que oferece a pílula vermelha. Não faz por você: revela o caminho e te equipa para percorrê-lo.",
  },
  {
    num: "04",
    role: "PLANO",
    roleEn: "Plan",
    description: "1. Desperte (entenda o potencial). 2. Aprenda o sistema (framework AIOX). 3. Execute com IA orquestrada. 4. Chegue ao X.",
  },
  {
    num: "05",
    role: "AÇÃO",
    roleEn: "Call to Action",
    description: "Direto: 'Entre no AIOX.' Transitório: 'Assista a masterclass gratuita.' O chamado é claro: a pílula vermelha está na sua frente.",
  },
  {
    num: "06",
    role: "RESULTADO",
    roleEn: "Success vs. Failure",
    description: "Sucesso: De meses para dias. MVP rodando. Receita real. Autonomia criativa. Fracasso: Continuar na matrix. Pagar caro por ferramentas que não entregam.",
  },
]

interface BrandscriptSectionProps {
  className?: string
}

export function BrandscriptSection({ className }: BrandscriptSectionProps) {
  return (
    <section id="brandscript" className={cn(className)}>
      <PanelHeader label="BRANDSCRIPT" concept="SB7 Framework" num="05" />

      <div style={{ padding: "3rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {sb7Cards.map((card) => (
            <div
              key={card.num}
              style={{
                background: "var(--bb-dark)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Card header */}
              <div className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-accent)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {card.num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: "var(--bb-cream)",
                  }}
                >
                  {card.role}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-dim)",
                    textTransform: "uppercase",
                  }}
                >
                  {card.roleEn}
                </span>
              </div>

              {/* Card body */}
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.8rem",
                  lineHeight: 1.6,
                  color: "var(--bb-dim)",
                }}
              >
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterBar left="SB7 Framework" center="BrandScript" right="05" />
    </section>
  )
}

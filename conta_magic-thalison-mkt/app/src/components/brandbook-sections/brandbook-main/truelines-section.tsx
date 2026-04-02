import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   TRUELINES SECTION — Table with 5 truelines (first row highlighted)
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const truelines = [
  {
    line: "A IA e a seta. O X e seu.",
    type: "Provocativa",
    usage: "PRIMARIA",
    primary: true,
  },
  {
    line: "X marks the spot.",
    type: "Posicional",
    usage: "Internacional",
    primary: false,
  },
  {
    line: "Do A ao X.",
    type: "Descritiva",
    usage: "Social media",
    primary: false,
  },
  {
    line: "Comande a IA. Chegue ao X.",
    type: "Imperativa",
    usage: "Workshops",
    primary: false,
  },
  {
    line: "Seu poder. Sua seta. Seu X.",
    type: "Possessiva",
    usage: "Empoderamento",
    primary: false,
  },
]

interface TruelinesSectionProps {
  className?: string
}

export function TruelinesSection({ className }: TruelinesSectionProps) {
  return (
    <section id="truelines" className={cn(className)}>
      <PanelHeader label="TRUELINES" concept="Brand Lines" num="06" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.85rem",
            }}
          >
            <thead>
              <tr>
                {["Trueline", "Tipo", "Uso"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--bb-dim)",
                      borderBottom: "1px solid var(--bb-border)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {truelines.map((row) => (
                <tr key={row.line}>
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      borderBottom: "1px solid var(--bb-border)",
                      fontWeight: row.primary ? 700 : 400,
                      color: row.primary ? "var(--bb-accent)" : "var(--bb-cream)",
                      fontFamily: row.primary ? "var(--font-bb-display)" : "var(--font-bb-sans)",
                      fontSize: row.primary ? "1rem" : "0.85rem",
                      background: row.primary ? "var(--bb-accent-05)" : "transparent",
                    }}
                  >
                    {row.line}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      borderBottom: "1px solid var(--bb-border)",
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--bb-dim)",
                      background: row.primary ? "var(--bb-accent-05)" : "transparent",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.25rem",
                      borderBottom: "1px solid var(--bb-border)",
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: row.primary ? "var(--bb-accent)" : "var(--bb-dim)",
                      background: row.primary ? "var(--bb-accent-05)" : "transparent",
                    }}
                  >
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FooterBar left="Brand Lines" center="Truelines" right="06" />
    </section>
  )
}

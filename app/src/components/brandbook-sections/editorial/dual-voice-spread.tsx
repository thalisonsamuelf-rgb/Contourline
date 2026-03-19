import {
  STARTER_BRAND_ASSETS,
  STARTER_CORE_PALETTE_SWATCHES,
  STARTER_TYPOGRAPHY_SUMMARY,
} from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   DUAL VOICE SPREAD // brand voice vs founder voice + colophon
   Server component. Left page shows dual voices, right page shows colophon.
   Dark variant — colophon dark theme.
   ═══════════════════════════════════════════════════════════════════════════ */

interface DualVoiceSpreadProps {
  className?: string
}

export function DualVoiceSpread({ className }: DualVoiceSpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // Dual Voice */}
      <Page side="left" pageNumber={25} variant="dark" sectionName="Dual Voice">
        <SectionNumber variant="dark">25. VOZ DUAL.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--bb-dim)",
            marginBottom: "1.5rem",
          }}
        >
          VOZ DA MARCA VS VOZ DO FUNDADOR
        </div>

        <div style={{ display: "flex", gap: "1px", background: "rgba(244, 244, 232, 0.1)" }}>
          {/* Brand Voice */}
          <div
            style={{
              flex: 1,
              background: "var(--bb-surface)",
              padding: "1.25rem",
            }}
          >
            <img
              src={STARTER_BRAND_ASSETS.logoLightSrc}
              alt={STARTER_BRAND_ASSETS.logoAlt}
              style={{ height: "1rem", marginBottom: "1rem" }}
            />
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--bb-dim)",
                marginBottom: "0.75rem",
              }}
            >
              O MORPHEUS DIGITAL
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
              {["Confiante", "Claro", "Estruturado"].map((trait) => (
                <span
                  key={trait}
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.5rem",
                    background: "var(--bb-accent)",
                    color: "var(--bb-dark)",
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <ul
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.7rem",
                lineHeight: 1.8,
                color: "rgba(244, 244, 232, 0.6)",
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              <li>Nao tenta convencer, fornece o ferramental.</li>
              <li>Design utilitario, moderno, developer-centric.</li>
              <li>Tom empoderador, acessivel globalmente.</li>
            </ul>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                color: "var(--bb-dim)",
                marginTop: "1rem",
              }}
            >
              Onde: Site, docs, onboarding, README
            </div>
          </div>

          {/* Alan Voice */}
          <div
            style={{
              flex: 1,
              background: "var(--bb-accent)",
              padding: "1.25rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--bb-dark)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              ALAN
            </h3>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "rgba(5, 5, 5, 0.5)",
                marginBottom: "0.75rem",
              }}
            >
              O MORPHEUS HUMANO
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "1rem" }}>
              {["Apaixonado", "Direto", "Provocador"].map((trait) => (
                <span
                  key={trait}
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.5rem",
                    background: "var(--bb-dark)",
                    color: "var(--bb-accent)",
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <ul
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.7rem",
                lineHeight: 1.8,
                color: "var(--bb-dark)",
                paddingLeft: "1rem",
                margin: 0,
              }}
            >
              <li>Vende a visao. Destroi o mindset velho.</li>
              <li>Conversacional, BR coloquial, energia alta.</li>
              <li>Pode ser vulneravel (&ldquo;Essa porra ate me emocionou&rdquo;).</li>
            </ul>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                textTransform: "uppercase",
                color: "rgba(5, 5, 5, 0.4)",
                marginTop: "1rem",
              }}
            >
              Onde: Lives, aulas, WhatsApp, redes
            </div>
          </div>
        </div>

        {/* Creator Frame */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            background: "var(--bb-surface)",
            color: "var(--bb-cream)",
            border: "1px solid rgba(244, 244, 232, 0.08)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--bb-dim)",
              marginBottom: "0.75rem",
            }}
          >
            FRAME DO CRIADOR
          </div>
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            Eu nao preciso ser programador para criar.
            <br />
            A complexidade nao me define. <span style={{ color: "var(--bb-accent)" }}>Minha visao me define.</span>
            <br />
            O poder de criar sempre esteve em mim.
            <br />
            <strong style={{ color: "var(--bb-accent)" }}>Agora o controle e meu.</strong>
          </p>
        </div>
      </Page>

      {/* RIGHT PAGE // Colophon */}
      <Page side="right" pageNumber={26} variant="dark" sectionName="Colophon">
        <HugeNumber variant="dark">13</HugeNumber>

        <SectionNumber variant="dark">COLOPHON.</SectionNumber>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <img
              src={STARTER_BRAND_ASSETS.logoLightSrc}
              alt={STARTER_BRAND_ASSETS.logoAlt}
              style={{ height: "3rem" }}
            />
          </div>

          {/* Credits */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              borderTop: "2px solid var(--bb-accent)",
              paddingTop: "1.5rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--bb-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                FUNDADORES
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--bb-cream)",
                }}
              >
                Alan Nicolas & Pedro Valerio
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--bb-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                VERSAO
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--bb-cream)",
                }}
              >
                2.0 // 2026
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--bb-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                TIPOGRAFIA
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--bb-cream)",
                }}
              >
                {STARTER_TYPOGRAPHY_SUMMARY}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--bb-dim)",
                  marginBottom: "0.5rem",
                }}
              >
                COR PRIMARIA
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "var(--bb-accent)",
                }}
              >
                {STARTER_CORE_PALETTE_SWATCHES[0].hex} {STARTER_CORE_PALETTE_SWATCHES[0].name}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              background: "var(--bb-surface)",
              padding: "1.5rem",
              marginTop: "auto",
              border: "1px solid rgba(244, 244, 232, 0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--bb-dim)",
                textAlign: "center",
              }}
            >
              AI ORCHESTRATION EXPERIENCE // CLI FIRST
            </p>
            <p
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "var(--bb-accent)",
                textAlign: "center",
                marginTop: "0.5rem",
                textTransform: "uppercase",
              }}
            >
              AGORA O CONTROLE E SEU.
            </p>
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}

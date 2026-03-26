import type {
  DesignSystemConfig,
  ResolvedBrandbookThemeContract,
  ResolvedBrandbookThemeMeta,
  ResolvedBrandbookThemeOption,
  SiteConfig,
} from "./types"

const DEFAULT_ACCENT_HEX = "#DDD1BB"
const DEFAULT_ACCENT_TEXT = "var(--bb-dark)"
const DEFAULT_LIVE_BADGE = "var(--bb-accent)"

function titleCaseThemeId(themeId: string): string {
  return themeId
    .split(/[-_]/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

function normalizeHex(hex: string | undefined): string | undefined {
  if (!hex) {
    return undefined
  }

  const trimmed = hex.trim()
  if (!trimmed) {
    return undefined
  }

  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toUpperCase()
  }

  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const [, r, g, b] = trimmed
    return `#${r}${r}${g}${g}${b}${b}`.toUpperCase()
  }

  return undefined
}

function hexToRgba(hex: string, alpha: number): string {
  const normalized = normalizeHex(hex)
  if (!normalized) {
    return `rgba(221, 209, 187, ${alpha})`
  }

  const value = normalized.slice(1)
  const red = Number.parseInt(value.slice(0, 2), 16)
  const green = Number.parseInt(value.slice(2, 4), 16)
  const blue = Number.parseInt(value.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function resolveBrandbookMeta(
  label: string,
  rawMeta?: DesignSystemConfig["themes"][string]["brandbook"]
): ResolvedBrandbookThemeMeta {
  const accentHex = normalizeHex(rawMeta?.accent_hex) ?? DEFAULT_ACCENT_HEX

  return {
    label: rawMeta?.picker_label?.trim() || label,
    editionLabel: rawMeta?.edition_label?.trim() || `${label} Edition`,
    accentName: rawMeta?.accent_name?.trim() || label,
    accentHex,
    accentRgb: rawMeta?.accent_rgb?.trim() || `RGB ${accentHex}`,
    accentCmyk: rawMeta?.accent_cmyk?.trim() || "CMYK unavailable",
    accentTextColor: rawMeta?.accent_text_color?.trim() || DEFAULT_ACCENT_TEXT,
    liveBadgeColor: rawMeta?.live_badge_color?.trim() || DEFAULT_LIVE_BADGE,
    accentGlow: hexToRgba(accentHex, 0.18),
  }
}

export function resolveBrandbookThemeContract(params: {
  site: SiteConfig
  designSystem: DesignSystemConfig
}): ResolvedBrandbookThemeContract {
  const { site, designSystem } = params

  const themes = Object.entries(designSystem.themes).map(
    ([themeId, theme]): ResolvedBrandbookThemeOption => {
      const label = theme.label?.trim() || titleCaseThemeId(themeId)
      const meta = resolveBrandbookMeta(label, theme.brandbook)

      return {
        value: themeId,
        label: meta.label,
        meta,
        legacyIds: theme.brandbook?.legacy_ids ?? [],
      }
    }
  )

  if (!themes.some((theme) => theme.value === site.default_theme)) {
    throw new Error(
      `Site default_theme "${site.default_theme}" is not available in the resolved brandbook theme contract.`
    )
  }

  return {
    businessSlug: site.slug,
    defaultTheme: site.default_theme,
    themes,
  }
}

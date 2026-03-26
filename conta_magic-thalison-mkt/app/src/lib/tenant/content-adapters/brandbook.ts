import "server-only"

import { loadSiteConfig, loadSiteContent } from "../index"
import type {
  BrandbookNavGroup,
  BrandbookNavLink,
  SiteContent,
  TenantRuntimeOptions,
  TokenExportBlock,
} from "../types"
import { STARTER_CHROME_LABELS } from "../../../components/brandbook/data/starter-brand-data"

interface BrandbookShellSeed {
  home_href?: string
  home_aria_label?: string
}

interface BrandbookFooterSeed {
  meta_line?: string
}

interface BrandbookNotFoundSeed {
  title?: string
  message?: string
  cta_label?: string
}

interface BrandbookTokenExportSeed {
  header?: {
    nav_left?: string
    nav_center?: string
    nav_right?: string
    title_prefix?: string
    title_accent?: string
    subtitle?: string
    footer_left?: string
    footer_center?: string
    footer_right?: string
  }
  instructions?: string[]
  compatibility_note?: string
  blocks?: TokenExportBlock[]
}

interface BrandbookNavigationSeed {
  top_links?: BrandbookNavLink[]
  groups?: BrandbookNavGroup[]
}

interface BrandbookSiteContentSeed extends SiteContent {
  shell?: BrandbookShellSeed
  navigation?: BrandbookNavigationSeed
  footer?: BrandbookFooterSeed
  not_found?: BrandbookNotFoundSeed
  token_export?: BrandbookTokenExportSeed
}

export interface BrandbookContentAdapter {
  shell: {
    homeHref: string
    homeAriaLabel: string
    logoLightSrc: string
    logoLightAlt: string
  }
  navigation: {
    topNavLinks: BrandbookNavLink[]
    navGroups: BrandbookNavGroup[]
    brandbookNavLinks: BrandbookNavLink[]
  }
  footer: {
    logoLightSrc: string
    logoLightAlt: string
    metaLine: string
  }
  notFound: {
    title: string
    message: string
    ctaLabel: string
    ctaHref: string
  }
  tokenExport: {
    header: {
      navLeft: string
      navCenter: string
      navRight: string
      titlePrefix: string
      titleAccent: string
      subtitle: string
      footerLeft: string
      footerCenter: string
      footerRight: string
    }
    instructions: string[]
    compatibilityNote: string
    blocks: TokenExportBlock[]
  }
}

const loggedFallbacks = new Set<string>()

function logBrandbookFallback(field: string, source: string): void {
  if (process.env.NODE_ENV === "production") {
    return
  }

  const key = `${field}:${source}`
  if (loggedFallbacks.has(key)) {
    return
  }

  loggedFallbacks.add(key)
  console.warn(`[tenant-content][brandbook] Falling back to ${source} for ${field}`)
}

function resolveValue<T>(
  value: T | null | undefined,
  fallback: T,
  field: string,
  source: string
): T {
  if (value === null || value === undefined) {
    logBrandbookFallback(field, source)
    return fallback
  }

  return value
}

function resolveArray<T>(
  value: T[] | null | undefined,
  fallback: T[],
  field: string,
  source: string
): T[] {
  if (!Array.isArray(value) || value.length === 0) {
    logBrandbookFallback(field, source)
    return fallback
  }

  return value
}

function flattenBrandbookLinks(groups: BrandbookNavGroup[]): BrandbookNavLink[] {
  return groups.flatMap((group) => group.links)
}

export async function loadBrandbookContentAdapter(
  options: TenantRuntimeOptions = {}
): Promise<BrandbookContentAdapter> {
  const [site, rawContent] = await Promise.all([
    loadSiteConfig(options),
    loadSiteContent("brandbook", options),
  ])
  const content = rawContent as BrandbookSiteContentSeed
  const brandbookEdition = [
    site.branding.version_label,
    site.branding.edition_label,
  ]
    .filter(Boolean)
    .join(" // ")
    .toUpperCase()
  const currentYear = String(new Date().getFullYear())

  const navGroups = resolveArray(
    content.navigation?.groups,
    [],
    "navigation.groups",
    "brandbook content contract"
  )
  const topNavLinks = resolveArray(
    content.navigation?.top_links,
    [],
    "navigation.top_links",
    "brandbook content contract"
  )
  const tokenExportBlocks = resolveArray(
    content.token_export?.blocks,
    [],
    "token_export.blocks",
    "brandbook content contract"
  )

  return {
    shell: {
      homeHref: resolveValue(
        content.shell?.home_href,
        "/brandbook",
        "shell.home_href",
        "brandbook adapter default"
      ),
      homeAriaLabel: resolveValue(
        content.shell?.home_aria_label,
        `${site.name} Brandbook home`,
        "shell.home_aria_label",
        "brandbook adapter default"
      ),
      logoLightSrc: site.assets.logo_light,
      logoLightAlt: site.branding.logo_light_alt,
    },
    navigation: {
      topNavLinks,
      navGroups,
      brandbookNavLinks: flattenBrandbookLinks(navGroups),
    },
    footer: {
      logoLightSrc: site.assets.logo_light,
      logoLightAlt: site.branding.logo_light_alt,
      metaLine: resolveValue(
        content.footer?.meta_line,
        `${site.name} // ${site.branding.brandbook_tagline} // ${brandbookEdition}`,
        "footer.meta_line",
        "brandbook adapter default"
      ),
    },
    notFound: {
      title: resolveValue(
        content.not_found?.title,
        "404",
        "not_found.title",
        "brandbook adapter default"
      ),
      message: resolveValue(
        content.not_found?.message,
        "Page not found in the brandbook",
        "not_found.message",
        "brandbook adapter default"
      ),
      ctaLabel: resolveValue(
        content.not_found?.cta_label,
        "Back to Brandbook",
        "not_found.cta_label",
        "brandbook adapter default"
      ),
      ctaHref: resolveValue(
        content.shell?.home_href,
        "/brandbook",
        "not_found.cta_href",
        "brandbook adapter default"
      ),
    },
    tokenExport: {
      header: {
        navLeft: resolveValue(
          content.token_export?.header?.nav_left,
          site.name.toUpperCase(),
          "token_export.header.nav_left",
          "brandbook adapter default"
        ),
        navCenter: resolveValue(
          content.token_export?.header?.nav_center,
          "TOKEN EXPORT",
          "token_export.header.nav_center",
          "brandbook adapter default"
        ),
        navRight: resolveValue(
          content.token_export?.header?.nav_right,
          brandbookEdition,
          "token_export.header.nav_right",
          "brandbook adapter default"
        ),
        titlePrefix: resolveValue(
          content.token_export?.header?.title_prefix,
          "Token",
          "token_export.header.title_prefix",
          "brandbook adapter default"
        ),
        titleAccent: resolveValue(
          content.token_export?.header?.title_accent,
          "Export",
          "token_export.header.title_accent",
          "brandbook adapter default"
        ),
        subtitle: resolveValue(
          content.token_export?.header?.subtitle,
          `Copy ${site.name} theme tokens for Tailwind + shadcn/ui projects`,
          "token_export.header.subtitle",
          "brandbook adapter default"
        ),
        footerLeft: resolveValue(
          content.token_export?.header?.footer_left,
          STARTER_CHROME_LABELS.designSystem,
          "token_export.header.footer_left",
          "brandbook adapter default"
        ),
        footerCenter: resolveValue(
          content.token_export?.header?.footer_center,
          `${tokenExportBlocks.length} Themes`,
          "token_export.header.footer_center",
          "brandbook adapter default"
        ),
        footerRight: resolveValue(
          content.token_export?.header?.footer_right,
          currentYear,
          "token_export.header.footer_right",
          "brandbook adapter default"
        ),
      },
      instructions: resolveArray(
        content.token_export?.instructions,
        [
          "Pick a theme below and review the palette preview before copying the CSS block.",
          "Click Copy CSS to copy the full variable block.",
          "Paste into your project's index.css or globals.css.",
          "All shadcn/ui components will automatically adopt the selected visual system.",
        ],
        "token_export.instructions",
        "brandbook adapter default"
      ),
      compatibilityNote: resolveValue(
        content.token_export?.compatibility_note,
        "Compatible with Tailwind CSS v3 + v4, shadcn/ui, and Lovable. Values are plain hex/rgba — no oklch dependency.",
        "token_export.compatibility_note",
        "brandbook adapter default"
      ),
      blocks: tokenExportBlocks,
    },
  }
}

export function __resetBrandbookFallbackWarningsForTest(): void {
  loggedFallbacks.clear()
}

import type { Metadata } from "next"
import type {
  SiteConfig,
  SiteFooterContact,
  SiteFooterLink,
  SiteNavigationLink,
} from "./types"
import {
  getVisibleSiteNavigation,
  isSurfaceEnabledInRegistry,
} from "./surfaces"

export interface IndexedSiteLink extends SiteFooterLink {
  index: string
}

export interface ResolvedSiteMetadata {
  htmlLang: string
  externalStylesheets: string[]
  metadata: Metadata
}

export interface ResolvedBrandbookMetadata {
  metadata: Metadata
}

export interface ResolvedHeaderChrome {
  ctaText: string
  ctaHref: string
  navigationLinks: SiteNavigationLink[]
  brandbookVisible: boolean
  marketingWordmark: string
  homeAriaLabel: string
  logoLightSrc: string
  logoLightAlt: string
  brandbookTagline: string
  versionLabel: string
  editionLabel: string
  brandbookCtaLabel: string
  floatingBrandbookLabel: string
}

export interface ResolvedFooterChrome {
  navigationLinks: SiteNavigationLink[]
  socialLinks: IndexedSiteLink[]
  legalLinks: IndexedSiteLink[]
  contact: SiteFooterContact
  brandDisplayName: string
  brandLegalName: string
  locationLines: string[]
  logoDarkSrc: string
  logoDarkAlt: string
  brandbookTagline: string
  versionLabel: string
  editionLabel: string
  brandbookVisible: boolean
  brandbookCtaLabel: string
  footerBadges: string[]
  giantBrandText: string
  copyrightNotice: string
  bottomNote: string
}

function indexLinks(
  links: readonly SiteFooterLink[] = [],
  baseIndex: string
): IndexedSiteLink[] {
  return links.map((link, offset) => ({
    ...link,
    index: `${baseIndex}.${offset}`,
  }))
}

function resolveLocationLines(contact: SiteFooterContact): string[] {
  if (Array.isArray(contact.location_lines) && contact.location_lines.length > 0) {
    return contact.location_lines
  }

  return [
    [contact.city, contact.region].filter(Boolean).join(", "),
    contact.country,
  ].filter(Boolean)
}

function resolveMetadataBase(site: SiteConfig): URL | undefined {
  const candidate =
    site.seo.metadata_base ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    "http://localhost:3001"

  try {
    return new URL(candidate)
  } catch {
    return undefined
  }
}

export function resolveSiteMetadata(site: SiteConfig): ResolvedSiteMetadata {
  const metadataBase = resolveMetadataBase(site)

  return {
    htmlLang: site.language,
    externalStylesheets: site.fonts?.external_stylesheets ?? [],
    metadata: {
      metadataBase,
      title: site.seo.title,
      description: site.seo.description,
      openGraph: {
        title: site.seo.title,
        description: site.seo.description,
        images: [site.seo.og_image],
      },
      icons: {
        icon: site.assets.favicon,
      },
    },
  }
}

export function resolveBrandbookMetadata(
  site: SiteConfig
): ResolvedBrandbookMetadata {
  const brandbookTitle = `${site.name} Brandbook`
  const metadataBase = resolveMetadataBase(site)

  return {
    metadata: {
      metadataBase,
      title: {
        default: brandbookTitle,
        template: `%s — ${brandbookTitle}`,
      },
      description:
        `${site.name} guidelines, design system tokens, components, and brand references.`,
      openGraph: {
        title: brandbookTitle,
        description:
          `${site.name} guidelines, design system tokens, components, and brand references.`,
        images: [site.seo.og_image],
      },
    },
  }
}

export function resolveHeaderChrome(site: SiteConfig): ResolvedHeaderChrome {
  return {
    ctaText: site.navigation.cta.label,
    ctaHref: site.navigation.cta.href,
    navigationLinks: getVisibleSiteNavigation(site),
    brandbookVisible: isSurfaceEnabledInRegistry(site.surface_registry, "brandbook"),
    marketingWordmark: site.branding.marketing_wordmark,
    homeAriaLabel: site.branding.home_aria_label,
    logoLightSrc: site.assets.logo_light,
    logoLightAlt: site.branding.logo_light_alt,
    brandbookTagline: site.branding.brandbook_tagline,
    versionLabel: site.branding.version_label,
    editionLabel: site.branding.edition_label,
    brandbookCtaLabel: site.branding.brandbook_cta_label,
    floatingBrandbookLabel: site.branding.floating_brandbook_label,
  }
}

export function resolveFooterChrome(site: SiteConfig): ResolvedFooterChrome {
  return {
    navigationLinks: getVisibleSiteNavigation(site),
    socialLinks: indexLinks(site.footer.socials, "1"),
    legalLinks: indexLinks(site.footer.legal ?? [], "2"),
    contact: site.footer.contact,
    brandDisplayName: site.footer.entity.display_name,
    brandLegalName: site.footer.entity.legal_name,
    locationLines: resolveLocationLines(site.footer.contact),
    logoDarkSrc: site.assets.logo_dark,
    logoDarkAlt: site.branding.logo_dark_alt,
    brandbookTagline: site.branding.brandbook_tagline,
    versionLabel: site.branding.version_label,
    editionLabel: site.branding.edition_label,
    brandbookVisible: isSurfaceEnabledInRegistry(site.surface_registry, "brandbook"),
    brandbookCtaLabel: site.branding.brandbook_cta_label,
    footerBadges: site.branding.footer_badges,
    giantBrandText: site.footer.entity.display_name,
    copyrightNotice: site.footer.copyright_notice,
    bottomNote: site.footer.bottom_note,
  }
}

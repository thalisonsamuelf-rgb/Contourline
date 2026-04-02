export type SiteContentSection = "brandbook"

export type TenantSource = "starter" | "workspace"

export interface SiteSeo {
  title: string
  description: string
  og_image: string
  metadata_base?: string
}

export interface SiteNavigationLink {
  label: string
  href: string
  surface?: string
}

export interface SiteNavigationCta {
  label: string
  href: string
}

export interface SiteNavigation {
  main: SiteNavigationLink[]
  cta: SiteNavigationCta
}

export interface SiteBranding {
  marketing_wordmark: string
  home_aria_label: string
  logo_light_alt: string
  logo_dark_alt: string
  brandbook_tagline: string
  version_label: string
  edition_label: string
  brandbook_cta_label: string
  floating_brandbook_label: string
  footer_badges: string[]
}

export interface SiteFooterEntity {
  display_name: string
  legal_name: string
}

export interface SiteFooterContact {
  email: string
  phone: string
  city: string
  region: string
  country: string
  location_lines?: string[]
}

export interface SiteFooterLink {
  label: string
  href: string
}

export interface SiteFooter {
  entity: SiteFooterEntity
  contact: SiteFooterContact
  socials: SiteFooterLink[]
  legal?: SiteFooterLink[]
  copyright_notice: string
  bottom_note: string
}

export interface SiteAssets {
  logo_light: string
  logo_dark: string
  favicon: string
  og_image: string
}

export interface SiteFonts {
  external_stylesheets?: string[]
}

export interface SiteSurfaceConfig {
  enabled: boolean
  path: string
  layout?: string
  content?: string
}

export interface BrandbookNavLink {
  label: string
  href: string
  group?: string
  surface?: string
}

export interface BrandbookNavSubgroup {
  heading: string
  links: BrandbookNavLink[]
}

export interface BrandbookNavGroup {
  label: string
  links: BrandbookNavLink[]
  columns?: BrandbookNavSubgroup[][]
}

export interface TokenExportBlock {
  id: string
  title: string
  edition: string
  description: string
  accentHex: string
  surfaceHex: string
  textHex: string
  borderPreview: string
  css: string
}

export interface SiteConfig {
  slug: string
  name: string
  language: string
  default_theme: string
  seo: SiteSeo
  branding: SiteBranding
  navigation: SiteNavigation
  footer: SiteFooter
  assets: SiteAssets
  fonts?: SiteFonts
  surface_registry: Record<string, SiteSurfaceConfig>
  features: Record<string, boolean>
}

export interface SiteContentMetadata {
  schema: string
  version: string
  status: string
}

export interface SiteContentSourceFallback {
  entrypoint: string
  modules?: string[]
}

export interface SiteContentSectionConfig {
  enabled: boolean
}

export interface SiteContent {
  metadata: SiteContentMetadata
  surface: string
  source_fallback: SiteContentSourceFallback
  sections: Record<string, SiteContentSectionConfig>
  notes?: string[]
}

export interface DesignSystemThemeTokens {
  primary: string
  files?: string[]
  prefix?: string
}

export interface DesignSystemThemeBrandbookMeta {
  picker_label?: string
  edition_label?: string
  accent_name?: string
  accent_hex?: string
  accent_rgb?: string
  accent_cmyk?: string
  accent_text_color?: string
  live_badge_color?: string
  legacy_ids?: string[]
}

export interface DesignSystemTheme {
  label: string
  role?: string
  status?: string
  description?: string
  allowed_use_cases?: string[]
  forbidden_use_cases?: string[]
  modes?: string[]
  tokens?: DesignSystemThemeTokens
  brandbook?: DesignSystemThemeBrandbookMeta
  patterns?: string[]
  notes?: string
}

export interface DesignSystemAppBinding {
  id: string
  root: string
  theme: string
  framework?: string
  ui_primitives?: string
  components_root?: string
  data_dir?: string
  app_dir?: string
}

export interface DesignSystemConfig {
  id: string
  name: string
  status: string
  owner_bu: string
  default_theme: string
  themes: Record<string, DesignSystemTheme>
  apps: DesignSystemAppBinding[]
  governance?: Record<string, unknown>
}

export interface TenantContext {
  businessSlug: string
  workspaceRoot: string
  siteRoot: string
  source?: TenantSource
  site: SiteConfig
  designSystem: DesignSystemConfig
  content: Record<SiteContentSection, SiteContent>
}

export interface TenantRuntimeOptions {
  businessSlug?: string
  workspaceRoot?: string
  starterVariant?: string
  source?: TenantSource
}

export interface ResolvedBrandbookThemeMeta {
  label: string
  editionLabel: string
  accentName: string
  accentHex: string
  accentRgb: string
  accentCmyk: string
  accentTextColor: string
  liveBadgeColor: string
  accentGlow: string
}

export interface ResolvedBrandbookThemeOption {
  value: string
  label: string
  meta: ResolvedBrandbookThemeMeta
  legacyIds: string[]
}

export interface ResolvedBrandbookThemeContract {
  businessSlug: string
  defaultTheme: string
  themes: ResolvedBrandbookThemeOption[]
}

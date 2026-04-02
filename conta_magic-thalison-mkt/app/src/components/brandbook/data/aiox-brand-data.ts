export const STARTER_REFERENCE_YEAR_NUMBER = 2026
export const CURRENT_YEAR_NUMBER = STARTER_REFERENCE_YEAR_NUMBER
export const CURRENT_YEAR = String(CURRENT_YEAR_NUMBER)
export const STARTER_REFERENCE_TIMESTAMP = Date.UTC(2026, 2, 17, 12, 0, 0)
export const STARTER_REFERENCE_MONTH_LABEL = "March 2026"

export const STARTER_FONT_FAMILIES = {
  display: "TASA Orbiter",
  sans: "Geist",
  mono: "Geist Mono",
} as const

export const STARTER_FONT_STACKS = {
  display: `"${STARTER_FONT_FAMILIES.display}", "${STARTER_FONT_FAMILIES.sans}", system-ui, sans-serif`,
  sans: `"${STARTER_FONT_FAMILIES.sans}", system-ui, sans-serif`,
  mono: `"${STARTER_FONT_FAMILIES.mono}", "SFMono-Regular", ui-monospace, monospace`,
} as const

export const STARTER_TYPOGRAPHY = {
  display: {
    family: STARTER_FONT_FAMILIES.display,
    cssToken: "--font-bb-display",
    sampleName: `${STARTER_FONT_FAMILIES.display} Bold`,
    weights: "700-800",
    usage: "Hero, headlines, section titles",
    description:
      "Display family for compressed headlines, section markers, and signal-heavy editorial moments.",
  },
  sans: {
    family: STARTER_FONT_FAMILIES.sans,
    cssToken: "--font-bb-sans",
    sampleName: `${STARTER_FONT_FAMILIES.sans} Semibold`,
    weights: "400-800",
    usage: "Body, interface copy, navigation",
    description:
      "Primary sans for product UI and long-form explanations across the AIOX cockpit.",
  },
  mono: {
    family: STARTER_FONT_FAMILIES.mono,
    cssToken: "--font-bb-mono",
    sampleName: `${STARTER_FONT_FAMILIES.mono} Medium`,
    weights: "400-600",
    usage: "Labels, specs, code, status",
    description:
      "Technical voice for metadata, token specs, HUD labels, and terminal-flavored moments.",
  },
} as const

export const STARTER_FONT_PAIRINGS = [
  {
    primary: STARTER_TYPOGRAPHY.display.family,
    primaryKind: "display",
    secondary: `${STARTER_TYPOGRAPHY.sans.family} Regular`,
    secondaryKind: "sans",
    context: "Headlines + Body Copy",
    example: {
      headline: "THE MASTER DOCUMENT",
      body: "AIOX organiza identidade, design system e linguagem num cockpit visual único.",
    },
  },
  {
    primary: `${STARTER_TYPOGRAPHY.sans.family} Semibold`,
    primaryKind: "sans",
    secondary: STARTER_TYPOGRAPHY.mono.family,
    secondaryKind: "mono",
    context: "UI Labels + Code/Data",
    example: {
      headline: "Token Registry",
      body: "--bb-accent: #D1FF00",
    },
  },
] as const

export const STARTER_TYPOGRAPHY_SUMMARY = [
  STARTER_TYPOGRAPHY.display.family,
  STARTER_TYPOGRAPHY.sans.family,
  STARTER_TYPOGRAPHY.mono.family,
].join(", ")

export const STARTER_TYPOGRAPHY_DNA = `${STARTER_TYPOGRAPHY.mono.family} para labels. ${STARTER_TYPOGRAPHY.display.family} para headlines. ${STARTER_TYPOGRAPHY.sans.family} para corpo e interface.`

export const STARTER_PALETTE = {
  accent: {
    name: "Kinetic Limon",
    token: "--bb-accent",
    hex: "#D1FF00",
    rgb: "209, 255, 0",
    bg: "#D1FF00",
    textColor: "#050505",
    usage: "Primary AIOX accent. Signals, emphasis, active states, and terminal glow.",
  },
  dark: {
    name: "Void Dark",
    token: "--bb-dark",
    hex: "#050505",
    rgb: "5, 5, 5",
    bg: "#050505",
    textColor: "#F4F4E8",
    usage: "Canvas background and deepest black.",
  },
  surface: {
    name: "Graphite Surface",
    token: "--bb-surface",
    hex: "#0F0F11",
    rgb: "15, 15, 17",
    bg: "#0F0F11",
    textColor: "#F4F4E8",
    usage: "Elevated panels, cards, modals.",
  },
  surfaceAlt: {
    name: "Tactical Olive",
    token: "--bb-surface-alt",
    hex: "#1C1E19",
    rgb: "28, 30, 25",
    bg: "#1C1E19",
    textColor: "#F4F4E8",
    usage: "Secondary dark surface and hover layers.",
  },
  cream: {
    name: "Soft Cream",
    token: "--bb-cream",
    value: "#F4F4E8",
    bg: "#F4F4E8",
    textColor: "#050505",
    usage: "Primary text on dark surfaces.",
  },
  creamAlt: {
    name: "Fog Cream",
    token: "--bb-cream-alt",
    value: "#F5F4E7",
    bg: "#F5F4E7",
    textColor: "#050505",
    usage: "Secondary light surface and soft contrast zones.",
  },
  warmWhite: {
    name: "Warm White",
    token: "--bb-warm-white",
    value: "#FFFFED",
    bg: "#FFFFED",
    textColor: "#050505",
    usage: "Highlights, inverted marks, and clean contrast moments.",
  },
  dim: {
    name: "Dim Overlay",
    token: "--bb-dim",
    value: "rgba(245, 244, 231, 0.4)",
    bg: "rgba(245, 244, 231, 0.4)",
    textColor: "#050505",
    usage: "Muted text, metadata, and support copy.",
  },
  blue: {
    name: "Bright Blue",
    token: "--bb-blue",
    hex: "#0099FF",
    bg: "#0099FF",
    textColor: "#FFFFFF",
    usage: "Info, links, and secondary emphasis.",
  },
  flare: {
    name: "Warm Bronze",
    token: "--bb-flare",
    hex: "#C4B7A2",
    bg: "#C4B7A2",
    textColor: "#121213",
    usage: "Warm contrast, premium accents, and editorial emphasis.",
  },
  error: {
    name: "Error Red",
    token: "--bb-error",
    hex: "#EF4444",
    bg: "#EF4444",
    textColor: "#FFFFFF",
    usage: "Destructive and critical states.",
  },
  warning: {
    name: "Warning Gold",
    token: "--bb-warning",
    hex: "#F59E0B",
    bg: "#F59E0B",
    textColor: "#050505",
    usage: "Caution and attention states.",
  },
  grayCharcoal: { name: "Charcoal", token: "--bb-gray-charcoal", hex: "#313131" },
  grayDim: { name: "Dim Gray", token: "--bb-gray-dim", hex: "#484848" },
  grayMuted: { name: "Muted Gray", token: "--bb-gray-muted", hex: "#6E6E6E" },
  graySilver: { name: "Silver", token: "--bb-gray-silver", hex: "#919191" },
  border: {
    name: "Border",
    token: "--bb-border",
    value: "rgba(255, 255, 255, 0.09)",
  },
  borderHover: {
    name: "Border Hover",
    token: "--bb-border-hover",
    value: "rgba(255, 255, 255, 0.18)",
  },
} as const

export interface StarterPaletteSwatch {
  name: string
  hex: string
  bg: string
  textColor: string
  token: string
  rgb: string
  note: string
}

export const STARTER_CORE_PALETTE_SWATCHES: readonly StarterPaletteSwatch[] = [
  {
    name: STARTER_PALETTE.accent.name,
    hex: STARTER_PALETTE.accent.hex,
    bg: "var(--bb-accent)",
    textColor: "var(--bb-dark)",
    token: STARTER_PALETTE.accent.token,
    rgb: `RGB ${STARTER_PALETTE.accent.rgb}`,
    note: "Primary accent",
  },
  {
    name: STARTER_PALETTE.dark.name,
    hex: STARTER_PALETTE.dark.hex,
    bg: "var(--bb-dark)",
    textColor: "var(--bb-cream)",
    token: STARTER_PALETTE.dark.token,
    rgb: `RGB ${STARTER_PALETTE.dark.rgb}`,
    note: "Canvas base",
  },
  {
    name: STARTER_PALETTE.surface.name,
    hex: STARTER_PALETTE.surface.hex,
    bg: "var(--bb-surface)",
    textColor: "var(--bb-cream)",
    token: STARTER_PALETTE.surface.token,
    rgb: `RGB ${STARTER_PALETTE.surface.rgb}`,
    note: "Elevated surface",
  },
  {
    name: STARTER_PALETTE.cream.name,
    hex: STARTER_PALETTE.cream.value,
    bg: "var(--bb-cream)",
    textColor: "var(--bb-dark)",
    token: STARTER_PALETTE.cream.token,
    rgb: "RGB 244, 244, 244",
    note: "Primary light surface",
  },
  {
    name: STARTER_PALETTE.warmWhite.name,
    hex: STARTER_PALETTE.warmWhite.value,
    bg: "var(--bb-warm-white)",
    textColor: "var(--bb-dark)",
    token: STARTER_PALETTE.warmWhite.token,
    rgb: "RGB 255, 255, 255",
    note: "Highlight light",
  },
] as const

export const STARTER_SLIDE_PALETTE_SWATCHES: readonly StarterPaletteSwatch[] = [
  STARTER_CORE_PALETTE_SWATCHES[0],
  STARTER_CORE_PALETTE_SWATCHES[1],
  STARTER_CORE_PALETTE_SWATCHES[2],
  STARTER_CORE_PALETTE_SWATCHES[3],
  {
    name: STARTER_PALETTE.flare.name,
    hex: STARTER_PALETTE.flare.hex,
    bg: "var(--bb-flare)",
    textColor: "var(--bb-cream)",
    token: STARTER_PALETTE.flare.token,
    rgb: "RGB 196, 183, 162",
    note: "Energetic contrast",
  },
] as const

export const STARTER_PRIMARY_COLORS = [
  STARTER_PALETTE.accent,
  STARTER_PALETTE.dark,
  STARTER_PALETTE.surface,
  STARTER_PALETTE.surfaceAlt,
] as const

export const STARTER_TEXT_COLORS = [
  STARTER_PALETTE.cream,
  STARTER_PALETTE.creamAlt,
  STARTER_PALETTE.dim,
] as const

export const STARTER_SEMANTIC_COLORS = [
  STARTER_PALETTE.blue,
  STARTER_PALETTE.flare,
  STARTER_PALETTE.error,
  STARTER_PALETTE.warning,
] as const

export const STARTER_GRAY_SCALE = [
  STARTER_PALETTE.grayCharcoal,
  STARTER_PALETTE.grayDim,
  STARTER_PALETTE.grayMuted,
  STARTER_PALETTE.graySilver,
] as const

export const STARTER_BORDER_TOKENS = [
  STARTER_PALETTE.border,
  STARTER_PALETTE.borderHover,
] as const

export interface StarterColorSample {
  name: string
  hex: string
  desc: string
}

export interface StarterColorStrip {
  label: string
  colors: readonly StarterColorSample[]
  lightText: boolean
  minHeight: string
  specialText?: readonly boolean[]
  isOverlay?: boolean
}

interface StarterVisualColorSample extends StarterColorSample {
  bg: string
  light: boolean
  specialText?: boolean
}

interface StarterColorGroupDefinition {
  label: string
  lightText: boolean
  minHeight: string
  isOverlay?: boolean
  colors: readonly StarterVisualColorSample[]
}

export const STARTER_COLOR_LABELS = {
  void: "VOID",
  pureWhite: "PURE WHITE",
  accent: STARTER_PALETTE.accent.name.toUpperCase(),
  accentGlow: "ACCENT GLOW",
  shadow: "SHADOW",
} as const

const STARTER_COLOR_GROUP_DEFINITIONS: readonly StarterColorGroupDefinition[] = [
  {
    label: "Dark / Background",
    lightText: true,
    minHeight: "200px",
    colors: [
      { name: STARTER_COLOR_LABELS.void, hex: "#000000", desc: "Base absolute", bg: "#000000", light: false },
      { name: STARTER_PALETTE.dark.name.toUpperCase(), hex: STARTER_PALETTE.dark.hex, desc: "Canvas base", bg: STARTER_PALETTE.dark.hex, light: false },
      { name: STARTER_PALETTE.surface.name.toUpperCase(), hex: STARTER_PALETTE.surface.hex, desc: "Card background", bg: STARTER_PALETTE.surface.hex, light: false },
      { name: STARTER_PALETTE.surfaceAlt.name.toUpperCase(), hex: STARTER_PALETTE.surfaceAlt.hex, desc: "Warm dark", bg: STARTER_PALETTE.surfaceAlt.hex, light: false },
    ],
  },
  {
    label: "Light / Foreground",
    lightText: false,
    minHeight: "200px",
    colors: [
      { name: STARTER_PALETTE.cream.name.toUpperCase(), hex: STARTER_PALETTE.cream.value, desc: "Primary text", bg: STARTER_PALETTE.cream.value, light: true },
      { name: STARTER_PALETTE.creamAlt.name.toUpperCase(), hex: STARTER_PALETTE.creamAlt.value, desc: "Secondary text", bg: STARTER_PALETTE.creamAlt.value, light: true },
      { name: STARTER_PALETTE.warmWhite.name.toUpperCase(), hex: STARTER_PALETTE.warmWhite.value, desc: "Highlights", bg: STARTER_PALETTE.warmWhite.value, light: true },
      { name: STARTER_COLOR_LABELS.pureWhite, hex: "#FFFFFF", desc: "Pure white", bg: "#FFFFFF", light: true },
    ],
  },
  {
    label: "Neutral / Gray Scale",
    lightText: true,
    minHeight: "200px",
    colors: [
      { name: STARTER_PALETTE.grayCharcoal.name.toUpperCase(), hex: STARTER_PALETTE.grayCharcoal.hex, desc: "Dark gray", bg: STARTER_PALETTE.grayCharcoal.hex, light: false },
      { name: STARTER_PALETTE.grayDim.name.toUpperCase(), hex: STARTER_PALETTE.grayDim.hex, desc: "Muted text", bg: STARTER_PALETTE.grayDim.hex, light: false },
      { name: STARTER_PALETTE.grayMuted.name.toUpperCase(), hex: STARTER_PALETTE.grayMuted.hex, desc: "Placeholder", bg: STARTER_PALETTE.grayMuted.hex, light: false },
      { name: STARTER_PALETTE.graySilver.name.toUpperCase(), hex: STARTER_PALETTE.graySilver.hex, desc: "Light border", bg: STARTER_PALETTE.graySilver.hex, light: true },
    ],
  },
  {
    label: "Accent / Brand",
    lightText: false,
    minHeight: "200px",
    colors: [
      { name: STARTER_COLOR_LABELS.accent, hex: STARTER_PALETTE.accent.hex, desc: "Primary accent", bg: STARTER_PALETTE.accent.hex, light: true },
      { name: STARTER_COLOR_LABELS.accentGlow, hex: STARTER_PALETTE.accent.hex, desc: "Active signals", bg: STARTER_PALETTE.accent.hex, light: true },
      { name: STARTER_PALETTE.blue.name.toUpperCase(), hex: STARTER_PALETTE.blue.hex, desc: "Info / links", bg: STARTER_PALETTE.blue.hex, light: false, specialText: true },
      { name: STARTER_PALETTE.flare.name.toUpperCase(), hex: STARTER_PALETTE.flare.hex, desc: "Warning / emphasis", bg: STARTER_PALETTE.flare.hex, light: false, specialText: true },
    ],
  },
  {
    label: "Overlay / Alpha",
    lightText: true,
    minHeight: "160px",
    isOverlay: true,
    colors: [
      { name: STARTER_PALETTE.border.name.toUpperCase(), hex: STARTER_PALETTE.border.value, desc: "Default border", bg: STARTER_PALETTE.border.value, light: false },
      { name: STARTER_PALETTE.borderHover.name.toUpperCase(), hex: STARTER_PALETTE.borderHover.value, desc: "Hover border", bg: STARTER_PALETTE.borderHover.value, light: false },
      { name: STARTER_COLOR_LABELS.shadow, hex: "rgba(0,0,0,0.2)", desc: "Drop shadow", bg: "rgba(0,0,0,0.2)", light: false },
      { name: STARTER_COLOR_LABELS.accentGlow, hex: "rgba(221,209,187,0.25)", desc: "Accent glow", bg: "rgba(221,209,187,0.25)", light: true },
    ],
  },
] as const

export const STARTER_VISUAL_COLOR_GROUPS = STARTER_COLOR_GROUP_DEFINITIONS.map(
  ({ label, colors }) => ({
    label,
    colors: colors.map(({ name, hex, desc, bg, light }) => ({
      name,
      hex,
      desc,
      bg,
      light,
    })),
  })
)

export const STARTER_COLOR_STRIPS: readonly StarterColorStrip[] =
  STARTER_COLOR_GROUP_DEFINITIONS.map((group) => {
    const specialText = group.colors.some((color) => color.specialText !== undefined)
      ? group.colors.map((color) => Boolean(color.specialText))
      : undefined

    return {
      label: group.label,
      colors: group.colors.map(({ name, hex, desc }) => ({ name, hex, desc })),
      lightText: group.lightText,
      minHeight: group.minHeight,
      specialText,
      isOverlay: group.isOverlay,
    }
  }) satisfies readonly StarterColorStrip[]

export const STARTER_CONTACT_CHANNELS = {
  email: "hello@aiox.ai",
  website: "aiox.ai",
  instagramHandle: "@AIOXsquad",
  linkedinPath: "/company/AIOXsquad",
} as const

export const STARTER_SOCIAL_LINKS = {
  xHandle: "@AIOXsquad",
  xUrl: "https://x.com/AIOXsquad",
  linkedinUrl: "https://linkedin.com/company/AIOXsquad",
  instagramUrl: "https://instagram.com/AIOXsquad",
} as const

export const STARTER_BRAND_ASSETS = {
  brandName: "AIOX",
  brandShortName: "AIOX",
  brandLabel: "AIOX",
  editorialSystemName: "Brand Identity System",
  editionLabel: "V1.0 // DARK COCKPIT EDITION",
  yearLabel: CURRENT_YEAR,
  confidentialityLabel: "Confidential",
  collectionLabel: `${CURRENT_YEAR} AIOX BRAND COLLECTION`,
  logoLightSrc: "/logo/AIOX-White.svg",
  logoDarkSrc: "/logo/AIOX-Black.svg",
  ogImageSrc: "/logo/AIOX_color.svg",
  logoAlt: "AIOX",
  footerMetaLine: "Brand Identity System // v2.0 // Confidential",
  slideFooterBrandLine: `AIOX // ${CURRENT_YEAR}`,
  slideConfidentialLabel: "AIOX // Confidential",
  contactEmail: STARTER_CONTACT_CHANNELS.email,
  webDomain: STARTER_CONTACT_CHANNELS.website,
  seo: {
    title: "AIOX — Design System & Brandbook",
    description:
      "Single source of truth para identidade visual, componentes UI e a voz do movimento AIOX.",
    organizationName: "AIOX",
    url: `https://${STARTER_CONTACT_CHANNELS.website}`,
    logoUrl: "https://aiox.ai/logo/AIOX-White.svg",
    socialImage: "/logo/AIOX_color.svg",
    twitterHandle: STARTER_SOCIAL_LINKS.xHandle,
  },
} as const

export const STARTER_RUNTIME_LABELS = {
  navigationBrand: "AIOX",
  navigationFooter: `${STARTER_BRAND_ASSETS.brandShortName} // ${STARTER_BRAND_ASSETS.yearLabel} — V1.0`,
  horizontalLogoLabel: "Horizontal Wordmark",
  dashboardLabel: "AIOX Workspace",
  workspaceLabel: "AIOX Workspace",
  collaborationTitle: `${STARTER_BRAND_ASSETS.brandShortName} Collaboration`,
  presentationTag: `${STARTER_BRAND_ASSETS.brandName.toUpperCase()} // REFERENCE DECK`,
  communityLabel: "AIOX Operators",
  closingBrandLine: STARTER_BRAND_ASSETS.brandName,
  expertMethodology: "Metodologia de orquestração com IA",
  sampleUserName: "AIOX Operator",
  sampleUserEmail: `team@${STARTER_CONTACT_CHANNELS.website}`,
} as const

export const STARTER_REFERENCE_LABELS = {
  competitorLeadName: STARTER_BRAND_ASSETS.brandName,
  sampleQuarterLabel: `Q1 ${CURRENT_YEAR}`,
  sampleMonthLabel: STARTER_REFERENCE_MONTH_LABEL,
  sampleYearRange: `${CURRENT_YEAR_NUMBER - 1} - ${CURRENT_YEAR}`,
  foundationsEditionLabel: "Dark Cockpit Edition",
} as const

export const STARTER_SLIDE_IMAGERY = {
  titleHeroBackdrop: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  welcomeHero: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  sectionBreakBackdrop: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  creativeHero: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  fullBleedHero: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  asymmetricPortrait: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  asymmetricDetail: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  asymmetricBomber: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  collaborationSecondary: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  socialProofStage: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  contactPortrait: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
  closingPortrait: {
    src: "/variants/starter/media-placeholder.svg",
    alt: "Starter media placeholder",
  },
} as const

export const STARTER_VISUAL_SYMBOLS = [
  {
    title: "Bloco / Grid",
    glyph: "grid",
    description:
      "A estrutura modular. Blocos que encaixam tokens, conteúdo e variações sem perder consistência.",
  },
  {
    title: "Cursor / Input",
    glyph: "cursor",
    description:
      "A ação humana no centro. O terminal responde à intenção de quem opera a marca.",
  },
] as const

export const STARTER_SYMBOL_FLOW = [
  { char: "A", label: "Agency", color: "var(--bb-accent)" },
  { char: "I", label: "Intelligence", color: "var(--bb-cream)" },
  { char: "O", label: "Orchestration", color: "var(--bb-cream)" },
  { char: "X", label: "Destination", color: "var(--bb-accent)" },
] as const

export const STARTER_VISUAL_TYPOGRAPHY_EXAMPLES = {
  headline: "THE MASTER DOCUMENT.",
  body:
    "O AIOX transforma identidade, sistema e execução em uma só superfície operacional.",
  command: "> aiox init workspace",
} as const

export const STARTER_CHROME_LABELS = {
  designSystem: "Design System",
  uiComponents: "UI Components",
  brandIdentity: "Brand Identity",
  dataComponents: "Data Components",
  uiStates: "UI States",
  uiFeedback: "UI Feedback",
  uiNavigation: "UI Navigation",
} as const

export interface StarterPageChrome {
  navLeft?: string
  navCenter?: string
  navRight?: string
  subtitle?: string
  footerLeft?: string
  footerCenter?: string
  footerRight?: string
}

export function createStarterPageChrome(
  chrome: StarterPageChrome
): StarterPageChrome {
  return {
    navLeft: STARTER_BRAND_ASSETS.brandName,
    navRight: STARTER_BRAND_ASSETS.editionLabel,
    footerRight: STARTER_BRAND_ASSETS.yearLabel,
    ...chrome,
  }
}

function withCurrentYear(value: string): string {
  return `${value} // ${CURRENT_YEAR}`
}

export const STARTER_PAGE_CHROME = {
  foundations: createStarterPageChrome({
    navCenter: "DESIGN FOUNDATIONS",
    subtitle: withCurrentYear("Index of all foundation tokens and primitives"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "6 Sections",
  }),
  typography: createStarterPageChrome({
    navCenter: "TYPOGRAPHY",
    subtitle: withCurrentYear("Font Families, Type Scale, Weight System"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "1 Section",
  }),
  colorTokens: createStarterPageChrome({
    navCenter: "COLOR TOKENS",
    subtitle: withCurrentYear(
      "Core Palette, Surfaces, Text, Neutrals, Signals, Borders, Opacity, Contrast, Semantic Aliases // Main + Secondary Theme Palettes"
    ),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "2 Themes · 9 Sections",
  }),
  surfaces: createStarterPageChrome({
    navCenter: "SURFACES & BORDERS",
    subtitle: withCurrentYear("Elevation, Border Tokens, Radius Scale, Glass Effects"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "4 Subsections",
  }),
  motion: createStarterPageChrome({
    navCenter: "MOTION SHOWCASE",
    subtitle: withCurrentYear("Starter logo animation explorations — click any cell to replay"),
    footerLeft: "Animation System",
    footerCenter: "8 Animations",
  }),
  moodboard: createStarterPageChrome({
    navCenter: "VISUAL REFERENCES",
    subtitle: withCurrentYear("Referências visuais, inspirações e DNA estético do design system"),
    footerLeft: "9 Referências",
    footerCenter: "4 Categorias",
  }),
  slides: createStarterPageChrome({
    navCenter: "SLIDE DECK TEMPLATES",
    subtitle: "Todas as variações de slides seguindo a identidade visual do AIOX",
    footerLeft: "Showcase",
  }),
  lpSections: createStarterPageChrome({
    navCenter: "LP SECTION CATALOG",
    subtitle: withCurrentYear(
      "16 Kyma sections + 3 Atoms + 3 Molecules // Visual & Technical Reference"
    ),
    footerLeft: "Landing Page",
    footerCenter: "8 Categories",
  }),
  seo: createStarterPageChrome({
    navCenter: "SEO & DIGITAL IDENTITY",
    subtitle: withCurrentYear("Metadata, OG Tags, Social Cards & Structured Data"),
    footerLeft: "Digital Presence",
    footerCenter: "4 Sections",
  }),
  logo: createStarterPageChrome({
    navCenter: "LOGO SYSTEM",
    subtitle: withCurrentYear("Variants, Clear Space, Usage Rules & Color Contexts"),
    footerLeft: STARTER_CHROME_LABELS.brandIdentity,
    footerCenter: "5 Sections",
  }),
  buttons: createStarterPageChrome({
    navCenter: "BUTTON LIBRARY",
    subtitle: "Variants, sizes, states — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "6 Sections",
  }),
  cards: createStarterPageChrome({
    navCenter: "CARD LIBRARY",
    subtitle: "Card variants and compositions — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "6 Sections",
  }),
  forms: createStarterPageChrome({
    navCenter: "FORM LIBRARY",
    subtitle: "Form elements and compositions — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "15 Sections",
  }),
  tables: createStarterPageChrome({
    navCenter: "TABLE & DASHBOARD LIBRARY",
    subtitle:
      "Data tables, dashboard shell components, and export utilities — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.dataComponents,
    footerCenter: "8 Sections",
  }),
  spacing: createStarterPageChrome({
    navCenter: "SPACING",
    subtitle: withCurrentYear("Semantic Spacing Tokens // gap, padding, margin"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "1 Section",
  }),
  spacingScale: createStarterPageChrome({
    navCenter: "SPACING SCALE",
    subtitle: withCurrentYear("14-Step Numeric Scale // --space-0 to --space-13"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "1 Section",
  }),
  spacingLayout: createStarterPageChrome({
    navCenter: "SPACING & LAYOUT",
    subtitle: withCurrentYear("Named Tokens, Numeric Scale, Z-Index Stack, Breakpoints"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "3 Sections",
  }),
  layering: createStarterPageChrome({
    navCenter: "LAYERING & BREAKPOINTS",
    subtitle: withCurrentYear("Z-Index Stack & Responsive Breakpoint Tokens"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "2 Subsections",
  }),
  semanticTokens: createStarterPageChrome({
    navCenter: "SEMANTIC TOKENS",
    subtitle: withCurrentYear("Aliases, Glow, States, Font Weights, shadcn/ui Mapping"),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "6 Subsections",
  }),
  patterns: createStarterPageChrome({
    navCenter: "PATTERN LIBRARY",
    subtitle: "Grids · Frames · Hazard · Circuit · Textures",
    footerLeft: "Design Patterns",
    footerCenter: "6 Sections",
  }),
  flowDiagram: createStarterPageChrome({
    navCenter: "FLOW DIAGRAMS",
    subtitle: withCurrentYear(
      "Generic interactive flow diagram components — SVG connectors, data-driven nodes, pan & zoom canvas // 6 Components"
    ),
    footerLeft: STARTER_CHROME_LABELS.designSystem,
    footerCenter: "6 Components",
  }),
  brownfieldDiscovery: createStarterPageChrome({
    navCenter: "BROWNFIELD DISCOVERY",
    subtitle: withCurrentYear(
      "Multi-agent technical debt assessment workflow -- 10 phases // 6 agents // 3 decision points"
    ),
    footerLeft: "Workflow System",
    footerCenter: "4 Sections",
  }),
  showcaseGallery: createStarterPageChrome({
    navCenter: "BRAND SHOWCASE",
  }),
  components: createStarterPageChrome({
    navCenter: "COMPONENT CATALOG",
    subtitle: "Full UI component catalog — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "5 Sections",
  }),
  icons: createStarterPageChrome({
    navCenter: "ICON SYSTEM",
    subtitle: withCurrentYear("Grid Sizes, Usage Rules & Color Variants // Stroke-based"),
    footerLeft: STARTER_CHROME_LABELS.brandIdentity,
    footerCenter: "6 Sections",
  }),
  lists: createStarterPageChrome({
    navCenter: "LIST LIBRARY",
    subtitle: "List items and data lists — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "7 Sections",
  }),
  states: createStarterPageChrome({
    navCenter: "SYSTEM STATES",
    subtitle: "Loading, progress, skeleton — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiStates,
    footerCenter: "6 Sections",
  }),
  effects: createStarterPageChrome({
    navCenter: "EFFECTS LIBRARY",
    subtitle: "Visual effects and animations — Dark Cockpit Edition",
    footerLeft: "Effects System",
    footerCenter: "5 Sections",
  }),
  advanced: createStarterPageChrome({
    navCenter: "ADVANCED UI LIBRARY",
    subtitle: "Tabs, accordion, stepper — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiComponents,
    footerCenter: "8 Sections",
  }),
  feedback: createStarterPageChrome({
    navCenter: "FEEDBACK LIBRARY",
    subtitle: "Alerts, toasts, modals, overlays — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiFeedback,
    footerCenter: "7 Sections",
  }),
  navigation: createStarterPageChrome({
    navCenter: "NAVIGATION LIBRARY",
    subtitle: "Search, pagination, breadcrumbs, tabs, sidebars — Dark Cockpit Edition",
    footerLeft: STARTER_CHROME_LABELS.uiNavigation,
    footerCenter: "6 Sections",
  }),
  templatesShowcase: createStarterPageChrome({
    navCenter: "PAGE TEMPLATES",
    subtitle: withCurrentYear("Shell, Dashboard Grid & Content Grid // Structural Patterns"),
    footerLeft: "Layout Templates",
    footerCenter: "3 Sections",
  }),
  charts: createStarterPageChrome({
    navCenter: "CHART LIBRARY",
    subtitle: "Data visualization — Dark Cockpit Edition",
    footerLeft: "Data Visualization",
    footerCenter: "12 Sections",
  }),
} as const

export const STARTER_THEME_TOKENS = {
  main: {
    key: "main",
    title: "Main Theme",
    edition: "Dark Cockpit Edition",
    summary:
      "Neon-on-dark base with kinetic lime accent. Built for product, editorial, and cockpit-style brandbook surfaces.",
    tokens: {
      "--bb-accent": "#D1FF00",
      "--bb-dark": "#050505",
      "--bb-canvas": "#050505",
      "--bb-surface": "#0F0F11",
      "--bb-surface-alt": "#1C1E19",
      "--bb-surface-deep": "#060607",
      "--bb-surface-overlay": "rgba(18, 18, 19, 0.94)",
      "--bb-surface-panel": "#18181B",
      "--bb-surface-console": "#222225",
      "--bb-surface-hover-strong": "#28282C",
      "--bb-cream": "#F4F4E8",
      "--bb-cream-alt": "#F5F4E7",
      "--bb-warm-white": "#FFFFED",
      "--bb-dim": "rgba(245, 244, 231, 0.4)",
      "--bb-muted": "#DDDDDD",
      "--bb-meta": "#AFAFAF",
      "--bb-border": "rgba(255, 255, 255, 0.09)",
      "--bb-border-soft": "rgba(255, 255, 255, 0.05)",
      "--bb-border-strong": "rgba(255, 255, 255, 0.15)",
      "--bb-border-hover": "rgba(255, 255, 255, 0.18)",
      "--bb-border-input": "rgba(255, 255, 255, 0.12)",
      "--bb-blue": "#0099FF",
      "--bb-flare": "#ED4609",
      "--bb-error": "#EF4444",
      "--bb-gray-charcoal": "#313131",
      "--bb-gray-dim": "#484848",
      "--bb-gray-muted": "#6E6E6E",
      "--bb-gray-silver": "#919191",
      "--bb-accent-02": "rgba(209, 255, 0, 0.02)",
      "--bb-accent-04": "rgba(209, 255, 0, 0.04)",
      "--bb-accent-05": "rgba(209, 255, 0, 0.05)",
      "--bb-accent-06": "rgba(209, 255, 0, 0.06)",
      "--bb-accent-08": "rgba(209, 255, 0, 0.08)",
      "--bb-accent-10": "rgba(209, 255, 0, 0.10)",
      "--bb-accent-12": "rgba(209, 255, 0, 0.12)",
      "--bb-accent-15": "rgba(209, 255, 0, 0.15)",
      "--bb-accent-20": "rgba(209, 255, 0, 0.20)",
      "--bb-accent-25": "rgba(209, 255, 0, 0.25)",
      "--bb-accent-40": "rgba(209, 255, 0, 0.40)",
      "--bb-accent-50": "rgba(209, 255, 0, 0.50)",
      "--bb-accent-75": "rgba(209, 255, 0, 0.75)",
      "--bb-accent-90": "rgba(209, 255, 0, 0.90)",
    },
  },
  secondary: {
    key: "secondary",
    title: "Secondary Theme",
    edition: "Golden Guideline Edition",
    summary:
      "Same structural system with a refined gold accent for premium, event, and editorial contexts.",
    tokens: {
      "--bb-accent": "#BFA37A",
      "--bb-dark": "#121213",
      "--bb-canvas": "#121213",
      "--bb-surface": "#151517",
      "--bb-surface-alt": "#1D1D20",
      "--bb-surface-deep": "#060607",
      "--bb-surface-overlay": "rgba(18, 18, 19, 0.94)",
      "--bb-surface-panel": "#18181B",
      "--bb-surface-console": "#222225",
      "--bb-surface-hover-strong": "#28282C",
      "--bb-cream": "#F4F4F4",
      "--bb-cream-alt": "#E8E8E8",
      "--bb-warm-white": "#FFFFFF",
      "--bb-dim": "rgba(244, 244, 244, 0.52)",
      "--bb-muted": "#DDDDDD",
      "--bb-meta": "#AFAFAF",
      "--bb-border": "rgba(255, 255, 255, 0.09)",
      "--bb-border-soft": "rgba(255, 255, 255, 0.05)",
      "--bb-border-strong": "rgba(255, 255, 255, 0.15)",
      "--bb-border-hover": "rgba(255, 255, 255, 0.18)",
      "--bb-border-input": "rgba(255, 255, 255, 0.12)",
      "--bb-blue": "#0099FF",
      "--bb-flare": "#DDD1BB",
      "--bb-error": "#EF4444",
      "--bb-gray-charcoal": "#313131",
      "--bb-gray-dim": "#484848",
      "--bb-gray-muted": "#6E6E6E",
      "--bb-gray-silver": "#919191",
      "--bb-accent-02": "rgba(191, 163, 122, 0.02)",
      "--bb-accent-04": "rgba(191, 163, 122, 0.04)",
      "--bb-accent-05": "rgba(191, 163, 122, 0.05)",
      "--bb-accent-06": "rgba(191, 163, 122, 0.06)",
      "--bb-accent-08": "rgba(191, 163, 122, 0.08)",
      "--bb-accent-10": "rgba(191, 163, 122, 0.10)",
      "--bb-accent-12": "rgba(191, 163, 122, 0.12)",
      "--bb-accent-15": "rgba(191, 163, 122, 0.15)",
      "--bb-accent-20": "rgba(191, 163, 122, 0.20)",
      "--bb-accent-25": "rgba(191, 163, 122, 0.25)",
      "--bb-accent-40": "rgba(191, 163, 122, 0.40)",
      "--bb-accent-50": "rgba(191, 163, 122, 0.50)",
      "--bb-accent-75": "rgba(191, 163, 122, 0.75)",
      "--bb-accent-90": "rgba(191, 163, 122, 0.90)",
    },
  },
} as const

export const STARTER_BRAND_MANIFESTO = {
  title: "AIOX Manifesto",
  paragraphs: [
    "AIOX nasceu para transformar a relação entre intenção humana e execução técnica.",
    "Não é sobre programar mais. É sobre reduzir fricção, organizar inteligência e encurtar o caminho até o X.",
    "Tokens, chrome, tipografia, narrativa e método operam como um mesmo sistema.",
    "A proposta é clareza operacional com potência criativa: IA como seta, direção humana como destino.",
  ],
  brandLine: "A IA é a seta. O X é seu.",
} as const

export const STARTER_NAMING_SYSTEM = {
  items: [
    {
      letter: "A",
      title: "AGENCY",
      desc: "A vontade humana no centro. O operador decide o destino e a IA responde.",
      highlight: true,
    },
    {
      letter: "I",
      title: "INTELLIGENCE",
      desc: "A camada cognitiva. Modelos, contexto e raciocínio organizados para agir com clareza.",
      highlight: false,
    },
    {
      letter: "O",
      title: "ORCHESTRATION",
      desc: "O sistema que conecta agentes, método e execução num fluxo coerente.",
      highlight: false,
    },
    {
      letter: "X",
      title: "DESTINATION",
      desc: "O ponto final no mapa. O local exato onde a intenção se torna entrega real.",
      highlight: true,
    },
  ],
  scores: [
    ["Clareza", "10/10"],
    ["Memorabilidade", "8/10"],
    ["Elasticidade", "10/10"],
    ["Internacionalidade", "9/10"],
    ["Sistema", "10/10"],
    ["Escalabilidade", "9/10"],
    ["Operacionalizacao", "10/10"],
    ["Governanca", "9/10"],
    ["TOTAL", "94%"],
  ],
  architecture: [
    ["AIOX", "Sistema completo"],
    ["AIOX Studio", "Camada editorial"],
    ["AIOX Terminal", "Shell operacional"],
    ["AIOX Workspace", "Execução assistida"],
  ],
  hiddenLayers: [
    { label: "A -> X", description: "Da agência ao destino. O sistema existe para encurtar o caminho." },
    { label: "I / O", description: "Inteligência e orquestração. Clareza cognitiva com execução coordenada." },
    { label: "AIOX", description: "Um sistema para transformar intenção em entrega real, não só interface bonita." },
  ],
  tribeSegments: [
    {
      name: "Brand Operator",
      pct: 24,
      desc: "Times de marca que precisam padronizar chrome, copy e narrativa sem partir do zero.",
    },
    {
      name: "Design Engineer",
      pct: 20,
      desc: "Profissionais que precisam transformar guideline em runtime tokenizado e auditavel.",
    },
    {
      name: "Product Designer",
      pct: 18,
      desc: "Equipes de produto que querem identidade forte sem colar a skin do projeto anterior.",
    },
    {
      name: "Founder-Operator",
      pct: 16,
      desc: "Liderancas que precisam subir uma nova marca ou variante com rapidez e consistencia.",
    },
    {
      name: "Content Lead",
      pct: 12,
      desc: "Responsaveis por narrativa e posicionamento que precisam editar uma fonte de verdade so.",
    },
    {
      name: "Growth Builder",
      pct: 10,
      desc: "Times que precisam publicar landing pages, decks e campanhas com linguagem coesa.",
    },
  ],
} as const

export const STARTER_POSITIONING_SYSTEM = {
  cards: [
    {
      label: "THE ENEMY",
      title: "REPLICATED BRAND DEBT",
      desc: "Quando uma base pronta carrega a copy, as cores e os defaults da ultima marca em vez de entregar estrutura reaproveitavel.",
    },
    {
      label: "TARGET AUDIENCE",
      title: "OPERATING TEAMS",
      desc: "Times que precisam subir brandbooks, produtos e variantes sem reescrever 20 arquivos por ajuste.",
      accent: true,
    },
    {
      label: "CATEGORY",
      title: "WHITE-LABEL BRAND OPS STARTER",
      desc: "Um sistema local-first para tokens, narrativa, chrome e superficies de marca operarem a partir da mesma base.",
    },
  ],
  isTags: [
    "Token driven",
    "Variant ready",
    "Local-first",
    "Systemic",
    "Editorial",
  ],
  notTags: [
    "Template clone",
    "Source brand wrapper",
    "Visual debt",
    "One-off export",
    "Hardcoded boilerplate",
  ],
  pyramid: [
    ['1. WHY — Direcao', '"Dar estrutura sem sequestrar a identidade da proxima marca."'],
    ['2. HOW — Mecanismo', '"Centralizar copy, palette, chrome e assets em uma fonte de verdade audivel."'],
    ['3. WHAT — Entrega', '"Starter shell, brandbook, design tokens, runtime contract e validacao automatizada."'],
  ],
} as const

export const STARTER_ARCHETYPE_SYSTEM = {
  archetypes: [
    { label: "MENTOR", pct: 45, color: "var(--bb-accent)", quote: '"Clareza antes de velocidade."' },
    { label: "BUILDER", pct: 35, color: "var(--bb-cream)", quote: '"Sistema bom vira entrega consistente."' },
    { label: "EDITOR", pct: 20, color: "var(--bb-dim)", quote: '"Toda marca precisa de criterio, nao de ruido."' },
  ],
  analogy:
    "Se este starter fosse uma pessoa, seria um diretor de sistema calmo: direto, preciso, util e sem apego a uma marca especifica.",
  voices: [
    {
      title: "System Voice",
      description:
        "Calma, precisa e modular. Organiza decisao, reduz ambiguidade e fala como quem cuida de um sistema em producao.",
    },
    {
      title: "Operator Voice",
      description:
        "Quente, contextual e pragmatica. Explica tradeoffs, orienta proximos passos e traduz o sistema para o time.",
    },
  ],
  rule: '"A estrutura orienta. A marca decide."',
} as const

export const STARTER_BRANDSCRIPT_CARDS = [
  {
    title: "1. O Time",
    color: "var(--bb-accent)",
    text: "Equipes que precisam publicar com consistencia sem herdar a ultima marca do pipeline.",
  },
  {
    title: "2. O Problema",
    color: "var(--bb-accent)",
    text: "Ext: copy, palette e chrome espalhados.\nInt: medo de quebrar a base a cada ajuste.\nFil: estrutura nao deveria gerar drift.",
  },
  {
    title: "3. O Guia",
    color: "var(--bb-accent)",
    text: "O registry do starter organiza tipografia, cor, narrativa e assets em um ponto audivel.",
  },
  {
    title: "4. O Plano",
    color: "var(--bb-accent)",
    text: "1. Edite a fonte de verdade.\n2. Troque os assets.\n3. Gere a variante e publique.",
  },
  {
    title: "5. O Fracasso",
    color: "var(--bb-error)",
    text: "Continuar patchando strings, cores e logos em dezenas de arquivos a cada iteracao.",
  },
  {
    title: "6. O Sucesso",
    color: "var(--bb-flare)",
    text: "Variantes novas nascem com estrutura consistente, sem arrastar a identidade da marca anterior.",
  },
] as const

export const STARTER_CONTRACT_SYSTEM = {
  promises: [
    { bold: "Estrutura reutilizavel:", text: "tokens, chrome e narrativa conectados pelo mesmo registry." },
    { bold: "Clareza operacional:", text: "menos drift, menos retrabalho, menos manutencao espalhada." },
    { bold: "Flexibilidade real:", text: "a base pode ser renomeada, recolorida e reeditada sem cirurgia profunda." },
    { bold: "Entrega consistente:", text: "a mesma decisao afeta runtime, brandbook e showcases ao mesmo tempo." },
  ],
  demands: [
    { bold: "Criterio:", text: "definir a identidade que a estrutura deve servir." },
    { bold: "Disciplina:", text: "editar a fonte de verdade antes de sair patchando componentes." },
    { bold: "Curadoria:", text: "trocar imagery, copy sample e assets para refletir a nova marca." },
    { bold: "Validacao:", text: "tratar regressao visual e hardcode como erro de release." },
  ],
  declaration: [
    "Eu nao preciso reescrever a base para mudar a marca.",
    "Eu preciso editar a fonte de verdade.",
    "A estrutura acelera. A identidade continua minha.",
    "Tokens, copy e chrome respondem juntos.",
    "O starter existe para preparar a proxima marca, nao para repetir a anterior.",
  ],
} as const

export const STARTER_JOURNEY_STEPS = [
  {
    num: "I",
    title: "O DRIFT",
    desc: "Layout, copy e palette vivem em lugares diferentes. Cada ajuste vira uma busca manual pelo projeto inteiro.",
    quote: "Trocamos o nome, mas metade do runtime ainda parecia a marca anterior.",
    author: "Marina // Design Ops",
  },
  {
    num: "II",
    title: "O SINAL",
    desc: "O time percebe que precisa de uma base com fronteiras claras: site config, registry e theme contract.",
    quote: "A velocidade so apareceu quando decidimos parar de duplicar dado sem necessidade.",
    author: "Rafael // Brand Lead",
  },
  {
    num: "III",
    title: "A MONTAGEM",
    desc: "Tipografia, cores, chrome e narrativa passam a responder a uma unica fonte audivel.",
    quote: "Mudar fonte e palette deixou de ser tarefa para tres squads ao mesmo tempo.",
    author: "Lia // Product Design",
  },
  {
    num: "IV",
    title: "A VARIANTE",
    desc: "A primeira nova identidade sobe sem remendar 20 arquivos. O starter vira estrutura, nao skin herdada.",
    quote: "A variante nasceu em horas porque o sistema ja sabia onde cada decisao morava.",
    author: "Caio // Systems Lead",
  },
] as const

export const STARTER_LONG_JOURNEY_STEPS = [
  {
    num: "I",
    title: "O Drift Inicial",
    description:
      "A base funciona, mas os ajustes de marca ficam espalhados entre pagina, section, token e asset.",
    quote: "A marca mudava. O runtime ficava preso na versao anterior.",
    author: "Starter Audit",
  },
  {
    num: "II",
    title: "O Ponto de Verdade",
    description:
      "O time consolida tokens, chrome e narrativa em um registry claro e observavel.",
    quote: "Sem fonte de verdade, qualquer velocidade vira caos.",
    author: "Starter Audit",
  },
  {
    num: "III",
    title: "A Primeira Variacao",
    description:
      "A nova identidade entra pelo dado, nao pelo remendo. Tipografia, palette e copy comecam a andar juntas.",
    quote: "O primeiro swap completo foi o teste real da arquitetura.",
    author: "Starter Audit",
  },
  {
    num: "IV",
    title: "O Preview",
    description:
      "Paginas, slides e brandbook passam a refletir a mesma decisao sem drift visual ou semantico.",
    quote: "Parou de existir versao diferente da mesma marca dependendo da superficie.",
    author: "Starter Audit",
  },
  {
    num: "V",
    title: "O Launch",
    description:
      "A entrega deixa de carregar residuos do source brand e passa a operar como white-label real.",
    quote: "O boilerplate finalmente deixou de parecer uma copia do projeto anterior.",
    author: "Starter Audit",
  },
  {
    num: "VI",
    title: "A Escala",
    description:
      "Novas variantes nascem com menos friccao e com regressao automatizada contra hardcodes proibidos.",
    quote: "A manutencao deixou de crescer na mesma velocidade do portfolio.",
    author: "Starter Audit",
  },
] as const

export const STARTER_EVIDENCE_STATS = [
  { value: "1", label: "REGISTRY", desc: "copy, palette e chrome", source: "starter-brand-data.ts", highlight: true },
  { value: "2", label: "THEMES", desc: "main + secondary", source: "design-system.config.yaml" },
  { value: "3", label: "FONTS", desc: "display, sans, mono", source: "starter typography" },
  { value: "40+", label: "PAGES", desc: "starter runtime surfaces", source: "starter routes" },
  { value: "LOCAL", label: "FIRST", desc: "config dentro do repo", source: "tenant runtime" },
  { value: "TOKEN", label: "DRIVEN", desc: "aliases e primitives", source: "globals + tokens" },
] as const

export const STARTER_TESTIMONIALS = [
  {
    quote: "Mudamos o nome da familia tipografica uma vez e o sistema inteiro respondeu junto.",
    author: "Marina // Design Ops",
    type: "transformation",
  },
  {
    quote: "Parou de existir pagina isolada com copy antiga porque o runtime passou a ler o mesmo registry.",
    author: "Rafael // Brand Lead",
    type: "transformation",
  },
  {
    quote: "A variante nova nao pareceu um remix da anterior. Finalmente parecia um produto proprio.",
    author: "Lia // Product Designer",
    type: "empowerment",
  },
  {
    quote: "Trocar a palette deixou de ser uma caca ao tesouro por dezenas de arquivos.",
    author: "Caio // Systems Lead",
    type: "discovery",
  },
  {
    quote: "O starter virou estrutura reutilizavel, nao um snapshot do source brand.",
    author: "Jules // Product Marketing",
    type: "transformation",
  },
  {
    quote: "O validador pegou os hardcodes antes da navegacao pegar. Era exatamente o que faltava.",
    author: "Ana // QA",
    type: "empowerment",
  },
] as const

export const STARTER_PERSONALITY_SYSTEM = {
  traits: [
    { trait: "PRECISO", desc: "Decisao clara, pouco ruido e sem floreio desnecessario.", color: "var(--bb-accent)" },
    { trait: "CALMO", desc: "Seguro o suficiente para orientar sem performar superioridade.", color: "var(--bb-cream)" },
    { trait: "MODULAR", desc: "Cada parte muda sem desmontar o resto do sistema.", color: "var(--bb-cream)" },
    { trait: "PRAGMATICO", desc: "Qualidade alta com criterio operacional, nao com improviso.", color: "var(--bb-accent)" },
  ],
  vocabFilled: ["Registry", "Variant", "Token", "System", "Signal", "Structure"],
  vocabNormal: ["Intentional", "Clear", "Operational", "Reusable"],
  vocabBanned: ["Magic", "Effortless", "AI-powered", "Hack"],
  powerWords: [
    { word: "Registry", tip: "Fonte de verdade do starter." },
    { word: "Variant", tip: "Nova identidade sem refazer a base." },
    { word: "Token", tip: "Contrato entre design e runtime." },
    { word: "Signal", tip: "Feedback visual e narrativo com intencao." },
    { word: "Structure", tip: "Camada que suporta a marca final." },
    { word: "Operator", tip: "Quem usa o sistema com criterio." },
    { word: "Delivery", tip: "Resultado operacional." },
    { word: "Clarity", tip: "Reducao de ambiguidade." },
    { word: "Surface", tip: "Cada contexto visual do sistema." },
    { word: "Theme", tip: "Modo documentado e governado." },
    { word: "Asset", tip: "Marca, imagem e media com ownership claro." },
    { word: "Scale", tip: "Capacidade de crescer sem drift." },
  ],
  forbidden: [
    { word: "Magic / Magical", alt: 'Use "clear" or "systemic".' },
    { word: "Effortless", alt: 'Use "faster" or "more structured".' },
    { word: "AI-powered", alt: "Explain the actual mechanism." },
    { word: "Hack", alt: 'Use "method" or "approach".' },
    { word: "Revolutionary", alt: "Prefer concrete proof over hype." },
    { word: "Plug and play", alt: "White-label systems still require curation." },
    { word: "One-click", alt: "Describe the workflow honestly." },
  ],
  tones: [
    { left: "Formal", right: "Conversational", pos: 58 },
    { left: "Dense", right: "Clear", pos: 68 },
    { left: "Rigid", right: "Adaptive", pos: 62 },
    { left: "Distant", right: "Present", pos: 52 },
    { left: "Decorative", right: "Operational", pos: 72 },
  ],
  closing:
    "O starter fala como um sistema confiavel: direto, claro e editavel. Ele orienta sem tomar o protagonismo da marca final.",
} as const

export const STARTER_VOICE_SYSTEM = {
  system: {
    title: "System Voice",
    subtitle: "The operational layer",
    traits: ["Clear", "Structured", "Reliable"],
    bullets: [
      "Nao promete mais do que o sistema entrega.",
      "Traduz decisao em regra reaproveitavel.",
      "Funciona em docs, runtime, onboarding e UI copy.",
    ],
    where: "Docs, product UI, token specs, shell copy",
  },
  operator: {
    title: "Operator Voice",
    subtitle: "The human layer",
    traits: ["Warm", "Contextual", "Practical"],
    bullets: [
      "Explica tradeoffs em linguagem acessivel ao time.",
      "Mostra o por que da decisao antes do detalhe tecnico.",
      "Ajuda a adaptar a base para o contexto real da marca.",
    ],
    where: "Workshops, reviews, handoffs, enablement",
  },
  creatorFrame:
    "Quando o sistema fala, ele reduz ambiguidade. Quando o operador fala, ele transforma criterio em direcao acionavel.",
} as const

export const STARTER_TEAM_ROLES = [
  {
    initials: "CL",
    name: "CREATIVE LEAD",
    role: "Editorial Direction",
    bio: "Define narrativa, hierarquia visual e criterios de coerencia para a identidade final.",
    photo: "/starter/portrait-creative.svg",
  },
  {
    initials: "SL",
    name: "SYSTEMS LEAD",
    role: "Runtime Architecture",
    bio: "Transforma decisao de marca em tokens, contratos e componentes capazes de escalar sem drift.",
    photo: "/starter/portrait-systems.svg",
  },
] as const

export const STARTER_TEAM_DYNAMIC = {
  title: "EDITORIAL + SYSTEM.",
  description:
    "Uma frente garante criterio narrativo. A outra garante estrutura reaproveitavel. Juntas, elas evitam que a nova marca nasca presa a defaults antigos.",
  formula: "DIRECTION + SYSTEM = CONSISTENCY",
} as const

export const STARTER_SLIDE_TEAM_MEMBERS = [
  { name: "Creative Lead", role: "EDITORIAL DIRECTION", initials: "CL" },
  { name: "Systems Lead", role: "RUNTIME ARCHITECTURE", initials: "SL" },
  { name: "Product Ops", role: "WORKFLOW GOVERNANCE", initials: "PO" },
  { name: "Growth Lead", role: "CHANNEL EXECUTION", initials: "GL" },
] as const

export const STARTER_VISUAL_GALLERY = [
  "/starter/gallery-01.svg",
  "/starter/gallery-02.svg",
  "/starter/gallery-03.svg",
  "/starter/gallery-04.svg",
] as const

export const STARTER_PORTFOLIO_WORKS = [
  { title: "ORBIT FLOW", tag: "PRODUCT LAUNCH", img: "/starter/gallery-01.svg" },
  { title: "NORTHLIGHT", tag: "SAAS SYSTEM", img: "/starter/gallery-02.svg" },
  { title: "FIELD NOTES", tag: "EDITORIAL BRAND", img: "/starter/gallery-03.svg" },
] as const

export const STARTER_MOTION_LABELS = {
  wordmark: "STARTER",
  tagline: STARTER_BRAND_MANIFESTO.brandLine.toLowerCase(),
  loaderStatus: "Loading starter",
} as const

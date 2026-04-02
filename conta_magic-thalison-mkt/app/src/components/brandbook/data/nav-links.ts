import type {
  BrandbookNavGroup as NavGroup,
  BrandbookNavLink as NavLink,
} from "@/lib/tenant/types"

export type { NavGroup, NavLink }

/**
 * Navigation structure:
 * Top-level: Guidelines, Movimento
 * Dropdowns: Brandbook, Design System, Showcase
 */
export const navGroups: NavGroup[] = [
  {
    label: "Brandbook",
    links: [
      { label: "Foundations", href: "/brandbook/foundations", group: "Brandbook" },
      { label: "Logo", href: "/brandbook/logo", group: "Brandbook" },
      { label: "Icons", href: "/brandbook/icons", group: "Brandbook" },
      { label: "Moodboard", href: "/brandbook/moodboard", group: "Brandbook" },
      { label: "Estratégia de Marca", href: "/brandbook/movimento", group: "Brandbook" },
    ],
  },
  {
    label: "Design System",
    links: [
      { label: "Typography", href: "/brandbook/typography", group: "Design System" },
      { label: "Color Tokens", href: "/brandbook/color-tokens", group: "Design System" },
      { label: "Spacing & Layout", href: "/brandbook/spacing-layout", group: "Design System" },
      { label: "Surfaces & Borders", href: "/brandbook/surfaces", group: "Design System" },
      { label: "Semantic Tokens", href: "/brandbook/semantic-tokens", group: "Design System" },
      { label: "Token Export", href: "/brandbook/token-export", group: "Design System" },
      { label: "Components", href: "/brandbook/components", group: "Design System" },
      { label: "Buttons", href: "/brandbook/buttons", group: "Design System" },
      { label: "Cards", href: "/brandbook/cards", group: "Design System" },
      { label: "Forms", href: "/brandbook/forms", group: "Design System" },
      { label: "Feedback", href: "/brandbook/feedback", group: "Design System" },
      { label: "States", href: "/brandbook/states", group: "Design System" },
      { label: "Tables", href: "/brandbook/tables", group: "Design System" },
      { label: "Lists", href: "/brandbook/lists", group: "Design System" },
      { label: "Charts", href: "/brandbook/charts", group: "Design System" },
      { label: "Navigation", href: "/brandbook/navigation", group: "Design System" },
      { label: "LP Sections", href: "/brandbook/lp-sections", group: "Design System" },
      { label: "Flow Diagram", href: "/brandbook/flow-diagram", group: "Design System" },
      { label: "Advanced", href: "/brandbook/advanced", group: "Design System" },
      { label: "Effects", href: "/brandbook/effects", group: "Design System" },
      { label: "Patterns", href: "/brandbook/patterns", group: "Design System" },
      { label: "Templates", href: "/brandbook/templates", group: "Design System" },
      { label: "Motion", href: "/brandbook/motion", group: "Design System" },
      { label: "SEO", href: "/brandbook/seo", group: "Design System" },
    ],
    columns: [
      [
        {
          heading: "Tokens",
          links: [
            { label: "Foundations", href: "/brandbook/foundations" },
            { label: "Typography", href: "/brandbook/typography" },
            { label: "Color Tokens", href: "/brandbook/color-tokens" },
            { label: "Spacing & Layout", href: "/brandbook/spacing-layout" },
            { label: "Surfaces & Borders", href: "/brandbook/surfaces" },
            { label: "Semantic Tokens", href: "/brandbook/semantic-tokens" },
            { label: "Token Export", href: "/brandbook/token-export" },
          ],
        },
        {
          heading: "Visual",
          links: [
            { label: "Effects", href: "/brandbook/effects" },
            { label: "Patterns", href: "/brandbook/patterns" },
            { label: "Motion", href: "/brandbook/motion" },
          ],
        },
        {
          heading: "Meta",
          links: [
            { label: "Templates", href: "/brandbook/templates" },
            { label: "SEO", href: "/brandbook/seo" },
          ],
        },
      ],
      [
        {
          heading: "Input",
          links: [
            { label: "Buttons", href: "/brandbook/buttons" },
            { label: "Forms", href: "/brandbook/forms" },
            { label: "Feedback", href: "/brandbook/feedback" },
            { label: "States", href: "/brandbook/states" },
          ],
        },
        {
          heading: "Data Display",
          links: [
            { label: "Tables", href: "/brandbook/tables" },
            { label: "Lists", href: "/brandbook/lists" },
            { label: "Charts", href: "/brandbook/charts" },
            { label: "Cards", href: "/brandbook/cards" },
          ],
        },
        {
          heading: "Layout",
          links: [
            { label: "Components", href: "/brandbook/components" },
            { label: "Navigation", href: "/brandbook/navigation" },
            { label: "LP Sections", href: "/brandbook/lp-sections" },
            { label: "Flow Diagram", href: "/brandbook/flow-diagram" },
            { label: "Advanced", href: "/brandbook/advanced" },
          ],
        },
      ],
    ],
  },
  {
    label: "Showcase",
    links: [
      { label: "Editorial", href: "/brandbook/editorial", group: "Showcase" },
      { label: "Slides", href: "/brandbook/showcase/slides", group: "Showcase" },
    ],
  },
]

/** Top-level nav links shown directly in the navbar (not in a dropdown) */
export const topNavLinks: NavLink[] = [
  { label: "Guidelines", href: "/brandbook/guidelines", surface: "brandbook" },
  { label: "Movimento", href: "/brandbook/movimento", surface: "brandbook" },
  { label: "Culture Deck", href: "/brandbook/culture", surface: "brandbook" },
]

/** @deprecated Use topNavLinks instead */
export const topNavLink: NavLink = topNavLinks[0]

/** Flat list of all nav links */
export const brandbookNavLinks: NavLink[] = navGroups.flatMap((g) => g.links)

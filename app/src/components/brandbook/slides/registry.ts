import type { ReactNode } from "react"

import {
  SlideBarChartV2,
  SlideBulletListV2,
  SlideCodeV2,
  SlideComparisonV2,
  SlideCTAV2,
  SlideImageTextV2,
  SlideMetricsV2,
  SlideQuoteV2,
  SlideSectionBreakV2,
  SlideStatementBoldV2,
  SlideTimelineV2,
  SlideTitleHeroV2,
} from "@/components/brandbook/slides/templates-v2"
import {
  SlideCompanyProfile,
  SlideLogoCentered,
  SlideTableOfContents,
  SlideTitleHero,
  SlideWelcomeMessage,
} from "@/components/brandbook/slides/templates-abertura"
import {
  SlideAccentInverted,
  SlideAccentSplit,
  SlideColorPalette,
  SlideTypography,
} from "@/components/brandbook/slides/templates-brand"
import {
  SlideCTA,
  SlideClientLogos,
  SlideClosingPhoto,
  SlideContactInfo,
  SlidePricingTable,
  SlideTheEnd,
} from "@/components/brandbook/slides/templates-fechamento"
import {
  SlideBulletList,
  SlideEcosystem,
  SlideIconGrid,
  SlideMindMap,
  SlideMissionDots,
  SlideNumberedList,
  SlideSectionBreak,
  SlideStepsBento,
  SlideTextOnly,
  SlideVsComparison,
  SlideWhatWeDo,
} from "@/components/brandbook/slides/templates-conteudo"
import {
  SlideBarChart,
  SlideBigNumber,
  SlideCaseStudyBold,
  SlideComparison,
  SlideDonutChart,
  SlideFunnel,
  SlideHistoryGrid,
  SlideHorizontalBar,
  SlideMetrics,
  SlideSWOT,
  SlideStatsRow,
  SlideTimeline,
} from "@/components/brandbook/slides/templates-dados"
import {
  SlideExpert,
  SlideQuote,
  SlideStatementBold,
  SlideTeam,
} from "@/components/brandbook/slides/templates-social"
import {
  SlideCaseClient,
  SlideChatScreenshot,
  SlideClientsAvatarGrid,
  SlideCollaboration,
  SlideDeviceMobile,
  SlideDeviceMockup,
  SlideFullImage,
  SlideGalleryAsymmetric,
  SlideGalleryGrid,
  SlideImageText,
  SlidePortfolio,
  SlideProductDemo,
  SlideSocialProofCollage,
  SlideSpeakerHero,
} from "@/components/brandbook/slides/templates-visual"

export const CATEGORIES = ["TODOS", "ABERTURA", "CONTEÚDO", "DADOS", "VISUAL", "SOCIAL", "BRAND", "FECHAMENTO"] as const

export type SlideCategory = (typeof CATEGORIES)[number]
export type SlideEntryCategory = Exclude<SlideCategory, "TODOS">

export type SlideEntry = {
  id: string
  label: string
  category: SlideEntryCategory
  Component: () => ReactNode
  version: 1 | 2
}

export const allSlideTemplates: SlideEntry[] = [
  /* ── ATO 1 — ABERTURA (6) ── */
  { id: "title-hero", label: "Capa Principal", category: "ABERTURA", Component: SlideTitleHero, version: 1 },
  { id: "company-profile", label: "Perfil da Empresa", category: "ABERTURA", Component: SlideCompanyProfile, version: 1 },
  { id: "welcome-message", label: "Boas-Vindas", category: "ABERTURA", Component: SlideWelcomeMessage, version: 1 },
  { id: "logo-centered", label: "Logo Centralizado", category: "ABERTURA", Component: SlideLogoCentered, version: 1 },
  { id: "table-of-contents", label: "Índice de Conteúdo", category: "ABERTURA", Component: SlideTableOfContents, version: 1 },
  { id: "section-break", label: "Divisor de Seção", category: "ABERTURA", Component: SlideSectionBreak, version: 1 },

  /* ── ATO 2 — PROBLEMA (3) ── */
  { id: "text-only", label: "Texto Puro", category: "CONTEÚDO", Component: SlideTextOnly, version: 1 },
  { id: "vs-comparison", label: "Assistente vs Agente", category: "CONTEÚDO", Component: SlideVsComparison, version: 1 },
  { id: "statement-bold", label: "Declaração Impacto", category: "CONTEÚDO", Component: SlideStatementBold, version: 1 },

  /* ── ATO 3 — VISÃO (5) ── */
  { id: "mission-dots", label: "Missão", category: "CONTEÚDO", Component: SlideMissionDots, version: 1 },
  { id: "what-we-do", label: "O Que Fazemos", category: "CONTEÚDO", Component: SlideWhatWeDo, version: 1 },
  { id: "icon-grid", label: "Grade de Ícones", category: "CONTEÚDO", Component: SlideIconGrid, version: 1 },
  { id: "ecosystem", label: "Ecossistema Orbital", category: "CONTEÚDO", Component: SlideEcosystem, version: 1 },
  { id: "mind-map", label: "Mapa Mental", category: "CONTEÚDO", Component: SlideMindMap, version: 1 },

  /* ── ATO 4 — MÉTODO (5) ── */
  { id: "bullet-list", label: "Lista com Marcadores", category: "CONTEÚDO", Component: SlideBulletList, version: 1 },
  { id: "numbered-list", label: "Lista Numerada", category: "CONTEÚDO", Component: SlideNumberedList, version: 1 },
  { id: "steps-bento", label: "Passos Bento Grid", category: "CONTEÚDO", Component: SlideStepsBento, version: 1 },
  { id: "device-desktop", label: "Dispositivo Desktop", category: "VISUAL", Component: SlideDeviceMockup, version: 1 },
  { id: "device-mobile", label: "Dispositivo Mobile", category: "VISUAL", Component: SlideDeviceMobile, version: 1 },

  /* ── ATO 5 — PROVA (12) ── */
  { id: "metrics", label: "Métricas / KPI", category: "DADOS", Component: SlideMetrics, version: 1 },
  { id: "big-number", label: "Número Destaque", category: "DADOS", Component: SlideBigNumber, version: 1 },
  { id: "stats-row", label: "Números em Linha", category: "DADOS", Component: SlideStatsRow, version: 1 },
  { id: "bar-chart", label: "Gráfico de Barras", category: "DADOS", Component: SlideBarChart, version: 1 },
  { id: "horizontal-bar", label: "Barras Horizontais", category: "DADOS", Component: SlideHorizontalBar, version: 1 },
  { id: "donut-chart", label: "Gráfico Rosca", category: "DADOS", Component: SlideDonutChart, version: 1 },
  { id: "funnel", label: "Funil de Conversão", category: "DADOS", Component: SlideFunnel, version: 1 },
  { id: "comparison", label: "Antes / Depois", category: "DADOS", Component: SlideComparison, version: 1 },
  { id: "timeline", label: "Linha do Tempo", category: "DADOS", Component: SlideTimeline, version: 1 },
  { id: "history-grid", label: "Grade de História", category: "DADOS", Component: SlideHistoryGrid, version: 1 },
  { id: "swot", label: "Análise SWOT", category: "DADOS", Component: SlideSWOT, version: 1 },
  { id: "case-study-bold", label: "Estudo de Caso", category: "DADOS", Component: SlideCaseStudyBold, version: 1 },

  /* ── ATO 6 — CONFIANÇA (7) ── */
  { id: "team", label: "Time", category: "SOCIAL", Component: SlideTeam, version: 1 },
  { id: "expert", label: "Especialista", category: "SOCIAL", Component: SlideExpert, version: 1 },
  { id: "quote", label: "Citação", category: "SOCIAL", Component: SlideQuote, version: 1 },
  { id: "social-proof-collage", label: "Prova Social", category: "SOCIAL", Component: SlideSocialProofCollage, version: 1 },
  { id: "clients-avatar-grid", label: "Grade de Clientes", category: "SOCIAL", Component: SlideClientsAvatarGrid, version: 1 },
  { id: "speaker-hero", label: "Palestrante", category: "VISUAL", Component: SlideSpeakerHero, version: 1 },
  { id: "case-client", label: "Case de Cliente", category: "VISUAL", Component: SlideCaseClient, version: 1 },

  /* ── ATO 7 — VISUAL (6) ── */
  { id: "image-text", label: "Imagem + Texto", category: "VISUAL", Component: SlideImageText, version: 1 },
  { id: "full-image", label: "Imagem Cheia", category: "VISUAL", Component: SlideFullImage, version: 1 },
  { id: "gallery-grid", label: "Galeria Grade", category: "VISUAL", Component: SlideGalleryGrid, version: 1 },
  { id: "gallery-asymmetric", label: "Galeria Assimétrica", category: "VISUAL", Component: SlideGalleryAsymmetric, version: 1 },
  { id: "portfolio", label: "Portfólio", category: "VISUAL", Component: SlidePortfolio, version: 1 },
  { id: "collaboration", label: "Colaboração", category: "VISUAL", Component: SlideCollaboration, version: 1 },

  /* ── ATO 8 — FECHAMENTO (12) ── */
  { id: "product-demo", label: "Demo de Produto", category: "VISUAL", Component: SlideProductDemo, version: 1 },
  { id: "chat-screenshot", label: "Conversa IA", category: "VISUAL", Component: SlideChatScreenshot, version: 1 },
  { id: "accent-inverted", label: "Destaque Invertido", category: "BRAND", Component: SlideAccentInverted, version: 1 },
  { id: "accent-split", label: "Destaque Dividido", category: "BRAND", Component: SlideAccentSplit, version: 1 },
  { id: "typography", label: "Tipografia", category: "BRAND", Component: SlideTypography, version: 1 },
  { id: "color-palette", label: "Paleta de Cores", category: "BRAND", Component: SlideColorPalette, version: 1 },
  { id: "client-logos", label: "Logos de Parceiros", category: "FECHAMENTO", Component: SlideClientLogos, version: 1 },
  { id: "pricing-table", label: "Tabela de Preços", category: "FECHAMENTO", Component: SlidePricingTable, version: 1 },
  { id: "contact", label: "Contato", category: "FECHAMENTO", Component: SlideContactInfo, version: 1 },
  { id: "closing-photo", label: "Encerramento + Foto", category: "FECHAMENTO", Component: SlideClosingPhoto, version: 1 },
  { id: "cta", label: "Obrigado", category: "FECHAMENTO", Component: SlideCTA, version: 1 },
  { id: "the-end", label: "Fim", category: "FECHAMENTO", Component: SlideTheEnd, version: 1 },

  /* ── V2 — Templates Responsivos (Container Query — Slide Design Manual v2.1) ── */
  { id: "v2-title-hero", label: "Capa Principal V2", category: "ABERTURA", Component: SlideTitleHeroV2, version: 2 },
  { id: "v2-section-break", label: "Divisor de Seção V2", category: "ABERTURA", Component: SlideSectionBreakV2, version: 2 },
  { id: "v2-statement-bold", label: "Declaração Impacto V2", category: "CONTEÚDO", Component: SlideStatementBoldV2, version: 2 },
  { id: "v2-bullet-list", label: "Lista com Marcadores V2", category: "CONTEÚDO", Component: SlideBulletListV2, version: 2 },
  { id: "v2-code", label: "Código V2", category: "CONTEÚDO", Component: SlideCodeV2, version: 2 },
  { id: "v2-metrics", label: "Métricas / KPI V2", category: "DADOS", Component: SlideMetricsV2, version: 2 },
  { id: "v2-bar-chart", label: "Gráfico de Barras V2", category: "DADOS", Component: SlideBarChartV2, version: 2 },
  { id: "v2-comparison", label: "Antes / Depois V2", category: "DADOS", Component: SlideComparisonV2, version: 2 },
  { id: "v2-timeline", label: "Linha do Tempo V2", category: "DADOS", Component: SlideTimelineV2, version: 2 },
  { id: "v2-image-text", label: "Imagem + Texto V2", category: "VISUAL", Component: SlideImageTextV2, version: 2 },
  { id: "v2-quote", label: "Citação V2", category: "SOCIAL", Component: SlideQuoteV2, version: 2 },
  { id: "v2-cta", label: "Obrigado V2", category: "FECHAMENTO", Component: SlideCTAV2, version: 2 },
]

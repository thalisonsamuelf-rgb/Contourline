import "server-only"

import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { parse } from "yaml"
import { createServerCache } from "./cache"
import {
  getVisibleSiteNavigation,
  isSurfaceEnabledInRegistry,
} from "./surfaces"
import type {
  DesignSystemConfig,
  SiteConfig,
  SiteContent,
  SiteContentSection,
  SiteNavigationLink,
  SiteSurfaceConfig,
  TenantContext,
  TenantRuntimeOptions,
  TenantSource,
} from "./types"

const APP_ROOT = path.resolve(process.cwd())
const STARTER_ROOT = path.join(APP_ROOT, "starter")
const DEV_FALLBACK_SLUG = "aiox"
const DEFAULT_TENANT_SOURCE: TenantSource = "starter"
const CONTENT_FILE_MAP: Record<SiteContentSection, string> = {
  brandbook: "brandbook.yaml",
}
const CONTENT_SECTIONS = Object.keys(CONTENT_FILE_MAP) as SiteContentSection[]

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function mergeStarterValue<T>(base: T, override: unknown): T {
  if (override === undefined) {
    return base
  }

  if (Array.isArray(override)) {
    return override as T
  }

  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base }

    for (const [key, value] of Object.entries(override)) {
      result[key] = key in result
        ? mergeStarterValue(result[key], value)
        : value
    }

    return result as T
  }

  return override as T
}

function isDevelopmentRuntime(): boolean {
  const isProduction = process.env.NODE_ENV === "production"
  const isCi = process.env.CI === "true"
  return !isProduction && !isCi
}

function hasWorkspaceMarkers(candidate: string): boolean {
  return existsSync(path.join(candidate, "businesses"))
}

function hasStarterMarkers(candidate: string): boolean {
  return (
    existsSync(path.join(candidate, "site.config.yaml")) &&
    existsSync(path.join(candidate, "design-system.config.yaml")) &&
    existsSync(path.join(candidate, "content"))
  )
}

function searchWorkspaceRoot(startDir: string): string {
  let current = path.resolve(startDir)

  while (true) {
    if (hasWorkspaceMarkers(current)) {
      return current
    }

    const nestedWorkspace = path.join(current, "workspace")
    if (hasWorkspaceMarkers(nestedWorkspace)) {
      return nestedWorkspace
    }

    const parent = path.dirname(current)
    if (parent === current) {
      break
    }
    current = parent
  }

  throw new Error(
    `Unable to resolve workspace root from "${startDir}". Set WORKSPACE_ROOT explicitly.`
  )
}

function normalizeWorkspaceRoot(explicitRoot?: string): string {
  const raw = explicitRoot ?? process.env.WORKSPACE_ROOT ?? ""
  const trimmed = raw.trim()

  if (!trimmed) {
    return searchWorkspaceRoot(APP_ROOT)
  }

  const resolved = path.resolve(trimmed)
  if (hasWorkspaceMarkers(resolved)) {
    return resolved
  }

  const nestedWorkspace = path.join(resolved, "workspace")
  if (hasWorkspaceMarkers(nestedWorkspace)) {
    return nestedWorkspace
  }

  throw new Error(
    `WORKSPACE_ROOT "${trimmed}" must point to the workspace directory or repo root containing workspace/.`
  )
}

function resolveBusinessRoot(
  businessSlug: string,
  workspaceRoot: string
): string {
  return path.join(workspaceRoot, "businesses", businessSlug)
}

function getTenantSource(explicitSource?: TenantSource): TenantSource {
  const raw = explicitSource ?? process.env.STARTER_SOURCE ?? DEFAULT_TENANT_SOURCE
  return raw === "workspace" ? "workspace" : "starter"
}

function getStarterVariant(explicitVariant?: string): string | undefined {
  const raw = explicitVariant ?? process.env.STARTER_VARIANT ?? ""
  const variant = raw.trim()
  return variant || undefined
}

function resolveStarterSourceRoot(starterVariant?: string): string {
  const sourceRoot = starterVariant
    ? path.join(STARTER_ROOT, "variants", starterVariant)
    : STARTER_ROOT

  if (!hasStarterMarkers(sourceRoot)) {
    const suffix = starterVariant
      ? `starter variant "${starterVariant}"`
      : "starter default config"
    throw new Error(`Unable to resolve ${suffix} at ${sourceRoot}`)
  }

  return sourceRoot
}

async function readYamlFile<T>(filePath: string, label: string): Promise<T> {
  if (!existsSync(filePath)) {
    throw new Error(`${label} not found: ${filePath}`)
  }

  const raw = await readFile(filePath, "utf8")

  try {
    const parsed = parse(raw)
    if (parsed === null || parsed === undefined) {
      throw new Error("YAML document is empty")
    }
    return parsed as T
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Unable to parse ${label}: ${message}`)
  }
}

async function readOptionalYamlFile<T>(filePath: string): Promise<T | undefined> {
  if (!existsSync(filePath)) {
    return undefined
  }

  const raw = await readFile(filePath, "utf8")

  try {
    const parsed = parse(raw)
    if (parsed === null || parsed === undefined) {
      return undefined
    }
    return parsed as T
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    throw new Error(`Unable to parse optional YAML file "${filePath}": ${message}`)
  }
}

export function getBusinessSlug(explicitSlug?: string): string {
  const raw = explicitSlug ?? process.env.BUSINESS_SLUG ?? ""
  const slug = raw.trim()

  if (slug) {
    return slug
  }

  if (isDevelopmentRuntime()) {
    return DEV_FALLBACK_SLUG
  }

  throw new Error(
    "BUSINESS_SLUG is required outside development. Set BUSINESS_SLUG or run with NODE_ENV=development."
  )
}

function isStarterVariantRoot(source: TenantSource, sourceRoot: string): boolean {
  return source === "starter" && sourceRoot !== STARTER_ROOT
}

function getResolvedSource(
  options: TenantRuntimeOptions = {}
): { source: TenantSource; sourceRoot: string } {
  const source = getTenantSource(options.source)

  if (source === "workspace") {
    const businessSlug = getBusinessSlug(options.businessSlug)
    const workspaceRoot = normalizeWorkspaceRoot(options.workspaceRoot)
    return {
      source,
      sourceRoot: resolveBusinessRoot(businessSlug, workspaceRoot),
    }
  }

  return {
    source,
    sourceRoot: resolveStarterSourceRoot(getStarterVariant(options.starterVariant)),
  }
}

const loadSiteConfigCached = createServerCache(
  async (source: TenantSource, sourceRoot: string): Promise<SiteConfig> => {
    const siteConfig = source === "workspace"
      ? await readYamlFile<SiteConfig>(
          path.join(sourceRoot, "site", "config.yaml"),
          `site config for ${path.basename(sourceRoot)}`
        )
      : isStarterVariantRoot(source, sourceRoot)
        ? mergeStarterValue(
            await readYamlFile<SiteConfig>(
              path.join(STARTER_ROOT, "site.config.yaml"),
              "starter base site config"
            ),
            await readOptionalYamlFile<Partial<SiteConfig>>(
              path.join(sourceRoot, "site.config.yaml")
            )
          )
        : await readYamlFile<SiteConfig>(
            path.join(sourceRoot, "site.config.yaml"),
            `starter site config for ${path.basename(sourceRoot)}`
          )

    if (source === "workspace") {
      const expectedSlug = path.basename(sourceRoot)
      if (siteConfig.slug !== expectedSlug) {
        throw new Error(
          `Site config slug mismatch. Expected "${expectedSlug}", received "${siteConfig.slug}".`
        )
      }
    }

    return siteConfig
  }
)

const loadSiteContentCached = createServerCache(
  async (
    source: TenantSource,
    sourceRoot: string,
    section: SiteContentSection
  ): Promise<SiteContent> => {
    const fileName = CONTENT_FILE_MAP[section]
    if (source === "workspace") {
      return readYamlFile<SiteContent>(
        path.join(sourceRoot, "site", "content", fileName),
        `site content "${section}" for ${path.basename(sourceRoot)}`
      )
    }

    if (isStarterVariantRoot(source, sourceRoot)) {
      return mergeStarterValue(
        await readYamlFile<SiteContent>(
          path.join(STARTER_ROOT, "content", fileName),
          `starter base content "${section}"`
        ),
        await readOptionalYamlFile<Partial<SiteContent>>(
          path.join(sourceRoot, "content", fileName)
        )
      )
    }

    return readYamlFile<SiteContent>(
      path.join(sourceRoot, "content", fileName),
      `starter content "${section}" for ${path.basename(sourceRoot)}`
    )
  }
)

const loadDesignSystemConfigCached = createServerCache(
  async (
    source: TenantSource,
    sourceRoot: string
  ): Promise<DesignSystemConfig> => {
    if (source === "workspace") {
      return readYamlFile<DesignSystemConfig>(
        path.join(sourceRoot, "design-system", "config.yaml"),
        `design-system config for ${path.basename(sourceRoot)}`
      )
    }

    if (isStarterVariantRoot(source, sourceRoot)) {
      return mergeStarterValue(
        await readYamlFile<DesignSystemConfig>(
          path.join(STARTER_ROOT, "design-system.config.yaml"),
          "starter base design-system config"
        ),
        await readOptionalYamlFile<Partial<DesignSystemConfig>>(
          path.join(sourceRoot, "design-system.config.yaml")
        )
      )
    }

    return readYamlFile<DesignSystemConfig>(
      path.join(sourceRoot, "design-system.config.yaml"),
      `starter design-system config for ${path.basename(sourceRoot)}`
    )
  }
)

const resolveTenantContextCached = createServerCache(
  async (source: TenantSource, sourceRoot: string): Promise<TenantContext> => {
    const [site, designSystem, contentEntries] = await Promise.all([
      loadSiteConfigCached(source, sourceRoot),
      loadDesignSystemConfigCached(source, sourceRoot),
      Promise.all(
        CONTENT_SECTIONS.map(async (section) => {
          const content = await loadSiteContentCached(source, sourceRoot, section)
          return [section, content] as const
        })
      ),
    ])

    if (!designSystem.themes?.[site.default_theme]) {
      const configLabel =
        source === "workspace"
          ? `${sourceRoot}/design-system/config.yaml`
          : `${sourceRoot}/design-system.config.yaml`
      throw new Error(
        `Site default_theme "${site.default_theme}" is not declared in ${configLabel}`
      )
    }

    const content = Object.fromEntries(contentEntries) as Record<
      SiteContentSection,
      SiteContent
    >

    return {
      businessSlug: site.slug,
      workspaceRoot: sourceRoot,
      siteRoot: sourceRoot,
      source,
      site,
      designSystem,
      content,
    }
  }
)

export async function loadSiteConfig(
  options: TenantRuntimeOptions = {}
): Promise<SiteConfig> {
  const { source, sourceRoot } = getResolvedSource(options)
  return loadSiteConfigCached(source, sourceRoot)
}

export async function loadSiteContent(
  section: SiteContentSection,
  options: TenantRuntimeOptions = {}
): Promise<SiteContent> {
  const { source, sourceRoot } = getResolvedSource(options)
  return loadSiteContentCached(source, sourceRoot, section)
}

export async function loadDesignSystemConfig(
  options: TenantRuntimeOptions = {}
): Promise<DesignSystemConfig> {
  const { source, sourceRoot } = getResolvedSource(options)
  return loadDesignSystemConfigCached(source, sourceRoot)
}

export async function resolveTenantContext(
  options: TenantRuntimeOptions = {}
): Promise<TenantContext> {
  const { source, sourceRoot } = getResolvedSource(options)
  return resolveTenantContextCached(source, sourceRoot)
}

export async function getSurfaceConfig(
  surfaceId: string,
  options: TenantRuntimeOptions = {}
): Promise<SiteSurfaceConfig | undefined> {
  const site = await loadSiteConfig(options)
  return site.surface_registry[surfaceId]
}

export async function isSurfaceEnabled(
  surfaceId: string,
  options: TenantRuntimeOptions = {}
): Promise<boolean> {
  const site = await loadSiteConfig(options)
  return isSurfaceEnabledInRegistry(site.surface_registry, surfaceId)
}

export async function loadVisibleNavigation(
  options: TenantRuntimeOptions = {}
): Promise<SiteNavigationLink[]> {
  const site = await loadSiteConfig(options)
  return getVisibleSiteNavigation(site)
}

export { resolveBrandbookThemeContract } from "./theme"

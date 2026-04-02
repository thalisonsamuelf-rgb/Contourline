import type {
  SiteConfig,
  SiteNavigationLink,
  SiteSurfaceConfig,
} from "./types"

export function isSurfaceEnabledInRegistry(
  registry: Record<string, SiteSurfaceConfig>,
  surfaceId?: string
): boolean {
  if (!surfaceId) {
    return true
  }

  if (!(surfaceId in registry)) {
    return false
  }

  return registry[surfaceId]?.enabled !== false
}

export function filterNavigationLinksBySurface<T extends { surface?: string }>(
  links: readonly T[],
  registry: Record<string, SiteSurfaceConfig>
): T[] {
  return links.filter((link) => isSurfaceEnabledInRegistry(registry, link.surface))
}

export function getVisibleSiteNavigation(site: SiteConfig): SiteNavigationLink[] {
  return filterNavigationLinksBySurface(site.navigation.main, site.surface_registry)
}

import type { TenantRuntimeOptions, TenantSource } from "./types"

const DEFAULT_APP_BUSINESS_SLUG = "aiox"
const DEFAULT_TENANT_SOURCE: TenantSource = "starter"

export function getAppTenantRuntimeOptions(): TenantRuntimeOptions {
  const rawSource = process.env.STARTER_SOURCE?.trim().toLowerCase()
  const source: TenantSource =
    rawSource === "workspace" ? "workspace" : DEFAULT_TENANT_SOURCE
  const businessSlug =
    process.env.BUSINESS_SLUG?.trim() ||
    (source === "workspace" ? DEFAULT_APP_BUSINESS_SLUG : undefined)
  const workspaceRoot = process.env.WORKSPACE_ROOT?.trim() || undefined
  const starterVariant = process.env.STARTER_VARIANT?.trim() || undefined

  return {
    source,
    businessSlug,
    workspaceRoot,
    starterVariant,
  }
}

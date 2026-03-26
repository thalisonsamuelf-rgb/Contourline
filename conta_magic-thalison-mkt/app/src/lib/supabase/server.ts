import "server-only"

import { existsSync } from "node:fs"
import path from "node:path"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { config as loadDotenv } from "dotenv"

let hasLoadedEnvFiles = false

function loadSiteAioxEnv() {
  if (hasLoadedEnvFiles) {
    return
  }

  hasLoadedEnvFiles = true

  const cwd = process.cwd()
  const candidates = [
    path.resolve(cwd, ".env.local"),
    path.resolve(cwd, ".env"),
    path.resolve(cwd, "apps/site-aiox/.env.local"),
    path.resolve(cwd, "apps/site-aiox/.env"),
    path.resolve(cwd, "../../.env.local"),
    path.resolve(cwd, "../../.env"),
  ]

  const seen = new Set<string>()
  for (const candidate of candidates) {
    if (seen.has(candidate) || !existsSync(candidate)) {
      continue
    }

    seen.add(candidate)
    loadDotenv({ path: candidate })
  }
}

loadSiteAioxEnv()

function getSupabaseUrl() {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
}

function getSupabaseServerKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  )
}

export const isSupabaseServerConfigured = Boolean(
  getSupabaseUrl() && getSupabaseServerKey()
)

export const isSupabaseServerUsingServiceRole = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

let serverClient: SupabaseClient | null = null
let serverClientUrl = ""
let serverClientKey = ""

export function getSupabaseServer(): SupabaseClient | null {
  const url = getSupabaseUrl()
  const key = getSupabaseServerKey()

  if (!url || !key) {
    return null
  }

  if (!serverClient || serverClientUrl !== url || serverClientKey !== key) {
    serverClientUrl = url
    serverClientKey = key
    serverClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }

  return serverClient
}

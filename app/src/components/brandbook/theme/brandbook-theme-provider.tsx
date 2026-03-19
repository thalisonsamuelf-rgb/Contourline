"use client"

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import type {
  ResolvedBrandbookThemeContract,
  ResolvedBrandbookThemeMeta,
  ResolvedBrandbookThemeOption,
} from "@/lib/tenant/types"

export type BrandbookTheme = string

type BrandbookThemeContextValue = {
  theme: BrandbookTheme
  meta: ResolvedBrandbookThemeMeta
  options: ResolvedBrandbookThemeOption[]
  setTheme: (theme: BrandbookTheme) => void
}

const LEGACY_STORAGE_KEY = "aiox-brandbook-theme"
const LEGACY_THEME_ALIASES: Record<string, string> = {
  lime: "main",
  gold: "secondary",
}

const BrandbookThemeContext = createContext<BrandbookThemeContextValue | null>(null)

function isKnownTheme(
  options: ResolvedBrandbookThemeOption[],
  candidate: string
): boolean {
  return options.some((option) => option.value === candidate)
}

function resolveLegacyAliases(
  options: ResolvedBrandbookThemeOption[]
): Record<string, string> {
  const aliases = { ...LEGACY_THEME_ALIASES }

  for (const option of options) {
    for (const legacyId of option.legacyIds) {
      aliases[legacyId] = option.value
    }
  }

  return aliases
}

function normalizeThemeId(
  candidate: string | null,
  options: ResolvedBrandbookThemeOption[],
  defaultTheme: string,
  legacyAliases: Record<string, string>
): string {
  if (!candidate) {
    return defaultTheme
  }

  const trimmed = candidate.trim()
  if (!trimmed) {
    return defaultTheme
  }

  if (isKnownTheme(options, trimmed)) {
    return trimmed
  }

  const legacyAlias = legacyAliases[trimmed]
  if (legacyAlias && isKnownTheme(options, legacyAlias)) {
    return legacyAlias
  }

  return defaultTheme
}

export function BrandbookThemeRoot({
  children,
  className,
  contract,
}: {
  children: ReactNode
  className: string
  contract: ResolvedBrandbookThemeContract
}) {
  const [theme, setThemeState] = useState<BrandbookTheme>(contract.defaultTheme)
  const skipFirstPersistRef = useRef(true)
  const storageKey = `${contract.businessSlug}-brandbook-theme`
  const themeEvent = `${contract.businessSlug}-brandbook-theme-change`
  const legacyAliases = useMemo(
    () => resolveLegacyAliases(contract.themes),
    [contract.themes]
  )

  useEffect(() => {
    const syncThemeFromStorage = () => {
      const storedTheme = window.localStorage.getItem(storageKey)
      const legacyTheme =
        contract.businessSlug === "aiox"
          ? window.localStorage.getItem(LEGACY_STORAGE_KEY)
          : null
      const resolvedTheme = normalizeThemeId(
        storedTheme ?? legacyTheme,
        contract.themes,
        contract.defaultTheme,
        legacyAliases
      )

      if (!storedTheme && legacyTheme) {
        window.localStorage.setItem(storageKey, resolvedTheme)
      }

      startTransition(() => {
        setThemeState((currentTheme) =>
          currentTheme === resolvedTheme ? currentTheme : resolvedTheme
        )
      })
    }

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === storageKey ||
        (contract.businessSlug === "aiox" && event.key === LEGACY_STORAGE_KEY)
      ) {
        syncThemeFromStorage()
      }
    }

    const handleThemeChange = () => {
      syncThemeFromStorage()
    }

    syncThemeFromStorage()
    window.addEventListener("storage", handleStorage)
    window.addEventListener(themeEvent, handleThemeChange)

    if (contract.businessSlug === "aiox") {
      window.addEventListener("aiox-brandbook-theme-change", handleThemeChange)
    }

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener(themeEvent, handleThemeChange)

      if (contract.businessSlug === "aiox") {
        window.removeEventListener("aiox-brandbook-theme-change", handleThemeChange)
      }
    }
  }, [contract.businessSlug, contract.defaultTheme, contract.themes, legacyAliases, storageKey, themeEvent])

  useEffect(() => {
    if (skipFirstPersistRef.current) {
      skipFirstPersistRef.current = false
      return
    }

    window.localStorage.setItem(storageKey, theme)
    window.dispatchEvent(new Event(themeEvent))

    if (contract.businessSlug === "aiox") {
      const legacyValue =
        contract.themes.find((option) => option.value === theme)?.legacyIds[0] ?? theme
      window.localStorage.setItem(LEGACY_STORAGE_KEY, legacyValue)
      window.dispatchEvent(new Event("aiox-brandbook-theme-change"))
    }
  }, [contract.businessSlug, contract.themes, storageKey, theme, themeEvent])

  const setTheme = (nextTheme: BrandbookTheme) => {
    const resolvedTheme = normalizeThemeId(
      nextTheme,
      contract.themes,
      contract.defaultTheme,
      legacyAliases
    )

    startTransition(() => {
      setThemeState(resolvedTheme)
    })
  }

  const activeTheme =
    contract.themes.find((option) => option.value === theme) ??
    contract.themes.find((option) => option.value === contract.defaultTheme) ??
    contract.themes[0]

  if (!activeTheme) {
    throw new Error("BrandbookThemeRoot requires at least one theme option")
  }

  const value = {
    theme: activeTheme.value,
    meta: activeTheme.meta,
    options: contract.themes,
    setTheme,
  }

  return (
    <BrandbookThemeContext.Provider value={value}>
      <div
        className={className}
        data-bb-theme={activeTheme.value}
        suppressHydrationWarning
        style={{
          background: "var(--bb-canvas, var(--bb-dark))",
          color: "var(--cream)",
          fontFamily: "var(--font-bb-sans)",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </BrandbookThemeContext.Provider>
  )
}

export function useBrandbookTheme() {
  const context = useContext(BrandbookThemeContext)

  if (!context) {
    throw new Error("useBrandbookTheme must be used inside BrandbookThemeRoot")
  }

  return context
}

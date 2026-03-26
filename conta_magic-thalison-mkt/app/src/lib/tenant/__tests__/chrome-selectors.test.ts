import assert from "node:assert/strict"
import { loadSiteConfig } from "../index"
import {
  resolveFooterChrome,
  resolveHeaderChrome,
  resolveSiteMetadata,
} from "../chrome"

async function withEnv(
  overrides: Partial<
    Record<
      | "STARTER_SOURCE"
      | "STARTER_VARIANT"
      | "BUSINESS_SLUG"
      | "WORKSPACE_ROOT"
      | "NODE_ENV"
      | "CI",
      string | undefined
    >
  >,
  run: () => Promise<void> | void
): Promise<void> {
  const previous = {
    STARTER_SOURCE: process.env.STARTER_SOURCE,
    STARTER_VARIANT: process.env.STARTER_VARIANT,
    BUSINESS_SLUG: process.env.BUSINESS_SLUG,
    WORKSPACE_ROOT: process.env.WORKSPACE_ROOT,
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }

  try {
    await run()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
}

async function runTest(name: string, testFn: () => Promise<void>): Promise<void> {
  await testFn()
  console.log(`PASS: ${name}`)
}

async function main(): Promise<void> {
  await runTest("starter metadata and font stylesheets come from local site config", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: undefined,
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        const site = await loadSiteConfig()
        const metadata = resolveSiteMetadata(site)

        assert.equal(metadata.htmlLang, "pt-BR")
        assert.equal(
          metadata.metadata.title,
          "AIOX Design Starter - White-label Brandbook Framework"
        )
        assert.deepEqual(metadata.externalStylesheets, [
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap",
        ])
      }
    )
  })

  await runTest("variant2 header and footer chrome are fully driven by local config", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: "variant2",
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        const site = await loadSiteConfig()
        const header = resolveHeaderChrome(site)
        const footer = resolveFooterChrome(site)

        assert.equal(header.marketingWordmark, "orbit")
        assert.equal(header.logoLightSrc, "/variants/variant2/logo-light.svg")
        assert.equal(header.brandbookTagline, "Signal-first Operations Design System")
        assert.equal(footer.logoDarkSrc, "/variants/variant2/logo-dark.svg")
        assert.equal(footer.contact.email, "hello@orbitflow.ai")
        assert.equal(footer.socialLinks.length, site.footer.socials.length)
        assert.equal(footer.legalLinks.length, (site.footer.legal ?? []).length)
        assert.equal(
          footer.bottomNote,
          "Variant fixture generated from the starter scaffold"
        )
      }
    )
  })
}

main().catch((error) => {
  console.error("FAIL: chrome selector tests")
  console.error(error)
  process.exit(1)
})

import Link from "next/link"
import { getAppTenantRuntimeOptions } from "@/lib/tenant/app-runtime"
import { loadBrandbookContentAdapter } from "@/lib/tenant/content-adapters"

export default async function BrandbookNotFound() {
  const brandbookContent = await loadBrandbookContentAdapter(
    getAppTenantRuntimeOptions()
  )

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 40px)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 800,
          color: "var(--bb-accent)",
          lineHeight: 1,
        }}
      >
        {brandbookContent.notFound.title}
      </span>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--dim)",
          margin: "1.5rem 0 2rem",
        }}
      >
        {brandbookContent.notFound.message}
      </p>
      <Link
        href={brandbookContent.notFound.ctaHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 44,
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--bb-dark)",
          background: "var(--bb-accent)",
          padding: "0.65rem 1.5rem",
          textDecoration: "none",
        }}
      >
        {brandbookContent.notFound.ctaLabel}
      </Link>
    </main>
  )
}

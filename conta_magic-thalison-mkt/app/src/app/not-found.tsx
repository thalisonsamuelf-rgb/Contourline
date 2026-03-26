import Link from "next/link"

export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
        background: "#0a0a0a",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 800,
          color: "var(--primary, #DDD1BB)",
          lineHeight: 1,
        }}
      >
        404
      </span>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#666",
          margin: "1.5rem 0 2rem",
        }}
      >
        Pagina nao encontrada
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--primary-foreground, #121213)",
          background: "var(--primary, #DDD1BB)",
          padding: "0.65rem 1.5rem",
          textDecoration: "none",
        }}
      >
        Voltar ao Inicio
      </Link>
    </main>
  )
}

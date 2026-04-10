"use client"

export default function PartnerZoneError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-lg font-bold text-[#B91C1C]">Erro no PartnerZone</h2>
      <p className="text-sm text-muted-foreground max-w-md text-center">
        {error.message}
      </p>
      <p className="text-xs text-muted-foreground">Digest: {error.digest}</p>
      <pre className="text-xs text-muted-foreground max-w-lg overflow-auto p-4 bg-bg-surface rounded-lg">
        {error.stack}
      </pre>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
      >
        Tentar novamente
      </button>
    </div>
  )
}

import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import type { ReactNode } from "react"
import "../tenant-tokens.generated.css"

export const metadata = {
  title: "PartnerZone — Contourline",
  description: "Central de materiais institucionais, marketing e vendas da Contourline Diagnósticos",
}

export default function PartnerZoneRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${GeistSans.variable} ${GeistMono.variable} dark min-h-screen bg-background text-foreground antialiased`}>
      {children}
    </div>
  )
}

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getAppTenantRuntimeOptions } from "@/lib/tenant/app-runtime";
import { loadSiteConfig } from "@/lib/tenant";
import { resolveSiteMetadata } from "@/lib/tenant/chrome";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await loadSiteConfig(getAppTenantRuntimeOptions());
  return resolveSiteMetadata(site).metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await loadSiteConfig(getAppTenantRuntimeOptions());
  const chrome = resolveSiteMetadata(site);

  return (
    <html lang={chrome.htmlLang} className="dark" suppressHydrationWarning>
      <head>
        {chrome.externalStylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

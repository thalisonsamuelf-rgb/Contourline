"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"
import {
  navGroups as defaultNavGroups,
  topNavLinks as defaultTopNavLinks,
} from "@/components/brandbook/data/nav-links"
import type { BrandbookNavGroup as NavGroup, BrandbookNavLink as NavLink } from "@/lib/tenant/types"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { MonoLabel } from "@/components/ui/mono-label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  useBrandbookTheme,
  type BrandbookTheme,
} from "@/components/brandbook/theme/brandbook-theme-provider"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import "./brandbook-site-nav.css"

function MobileNavLink({
  href,
  label,
  index,
  isActive,
  onClick,
}: {
  href: string
  label: string
  index?: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 px-5 py-2.5 transition-all duration-300 no-underline relative overflow-hidden",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
      )}
      onClick={onClick}
    >
      {/* Accent underline on hover — matches CtaButton pattern */}
      {!isActive && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
      {index && (
        <span
          className={cn(
            "font-mono text-[10px] font-bold tabular-nums min-w-[1.5rem] tracking-[-0.04em]",
            isActive ? "text-primary-foreground/60" : "text-primary"
          )}
        >
          [{index}]
        </span>
      )}
      <span className="font-mono text-[11px] font-medium uppercase tracking-wider">
        {label}
      </span>
    </Link>
  )
}

export interface BrandbookSiteNavProps {
  navGroups?: NavGroup[]
  topNavLinks?: NavLink[]
  homeHref?: string
  homeAriaLabel?: string
  logoLightSrc?: string
  logoLightAlt?: string
}

export function BrandbookSiteNav({
  navGroups = defaultNavGroups,
  topNavLinks = defaultTopNavLinks,
  homeHref = "/brandbook",
  homeAriaLabel = "Brandbook home",
  logoLightSrc = STARTER_BRAND_ASSETS.logoLightSrc,
  logoLightAlt = STARTER_BRAND_ASSETS.logoAlt,
}: BrandbookSiteNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, meta, options, setTheme } = useBrandbookTheme()

  const close = () => setOpen(false)
  const handleThemeChange = (nextTheme: BrandbookTheme) => setTheme(nextTheme)
  const isActivePath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const getThemeClasses = (isActive: boolean) =>
    cn(
      "inline-flex items-center justify-center rounded-full border font-mono uppercase transition-all",
      isActive ? "hover:opacity-100" : "hover:text-[var(--bb-cream)]"
    )

  const getThemeButtonStyle = (isActive: boolean) =>
    isActive
      ? {
          background: "var(--bb-accent)",
          color: meta.accentTextColor,
          borderColor: "var(--bb-accent)",
          boxShadow: `0 0 0 1px var(--bb-accent), 0 0 18px ${meta.accentGlow}`,
        }
      : {
          background: "transparent",
          color: "var(--bb-dim)",
          borderColor: "var(--bb-border)",
        }

  return (
    <nav className="bb-site-nav">
      <Link href={homeHref} className="bb-nav-logo" aria-label={homeAriaLabel}>
        <img src={logoLightSrc} alt={logoLightAlt} style={{ height: "1.25rem" }} />
      </Link>

      {/* ── Desktop nav (unchanged) ── */}
      <div className="bb-nav-links">
        {topNavLinks.map((link, i) => (
          <span key={link.href} className="bb-nav-top-links-group">
            {i > 0 && <span className="bb-nav-sep" />}
            <Link
              href={link.href}
              className={`bb-nav-top-link${isActivePath(link.href) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          </span>
        ))}
        <span className="bb-nav-sep" />
        {navGroups.map((group, gi) => (
          <div key={group.label} className="bb-nav-section">
            {gi > 0 && <span className="bb-nav-sep" />}
            <div className="bb-nav-dropdown">
              <button className="bb-nav-dropdown-trigger" type="button">
                {group.label} <span className="bb-chevron">&#9662;</span>
              </button>
              <div className={`bb-nav-dropdown-menu${group.columns ? " bb-nav-dropdown-columns" : ""}`}>
                {group.columns ? (
                  group.columns.map((col, ci) => (
                    <div key={ci} className="bb-nav-dropdown-col">
                      {col.map((subgroup) => (
                        <div key={subgroup.heading} className="bb-nav-dropdown-subgroup">
                          <span className="bb-nav-dropdown-heading">{subgroup.heading}</span>
                              {subgroup.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className={isActivePath(link.href) ? "active" : ""}
                                >
                                  {link.label}
                                </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))
                ) : (
                  group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={isActivePath(link.href) ? "active" : ""}
                    >
                      {link.label}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
        <span className="bb-nav-sep" />
        <div className="hidden md:flex items-center rounded-full border border-[var(--bb-border)] bg-[var(--bb-surface-overlay)] p-1 pl-3">
          <span className="mr-2 font-mono text-[0.45rem] uppercase tracking-[0.18em] text-[var(--bb-dim)]">
            Theme
          </span>
          {options.map((option) => {
            const isActive = theme === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleThemeChange(option.value)}
                className={cn(
                  "min-h-8 min-w-[4.25rem] px-2.5 py-1 text-[0.52rem] tracking-[0.16em]",
                  getThemeClasses(isActive)
                )}
                aria-pressed={isActive}
                aria-label={`Ativar tema ${option.label}`}
                style={getThemeButtonStyle(isActive)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Mobile nav (Sheet + Accordion + Design System components) ── */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button type="button" className="bb-nav-hamburger" aria-label="Abrir menu">
            <Menu size={18} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          showCloseButton
          className={cn(
            "w-[85vw] max-w-[320px] p-0 gap-0",
            "bg-bg-elevated border-r border-border",
            "overflow-y-auto overscroll-contain",
            "[&_[data-slot=sheet-close]]:top-3 [&_[data-slot=sheet-close]]:right-3",
            "[&_[data-slot=sheet-close]]:text-muted-foreground",
          )}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <SheetTitle asChild>
              <Link
                href={homeHref}
                onClick={close}
                className="no-underline"
                aria-label={homeAriaLabel}
              >
                <img
                  src={logoLightSrc}
                  alt={logoLightAlt}
                  style={{ height: "1.1rem" }}
                />
              </Link>
            </SheetTitle>
            <Badge variant="outline" className="text-[8px] px-2 py-0.5">
              {meta.label}
            </Badge>
          </div>

          <div className="px-5 py-4 border-b border-border">
            <div className="mb-2">
              <MonoLabel index="TH">Theme</MonoLabel>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {options.map((option) => {
                const isActive = theme === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleThemeChange(option.value)}
                    className={cn(
                      "inline-flex min-h-10 items-center justify-center rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-all",
                      getThemeClasses(isActive)
                    )}
                    aria-pressed={isActive}
                    style={getThemeButtonStyle(isActive)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Top nav links ── */}
          <div className="flex flex-col pt-4 pb-2 px-5">
            <MonoLabel index="00">Navigation</MonoLabel>
          </div>
          <div className="flex flex-col">
            {topNavLinks.map((link, i) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                index={String(i).padStart(2, "0")}
                isActive={isActivePath(link.href)}
                onClick={close}
              />
            ))}
          </div>

          <div className="px-5 py-3">
            <Separator />
          </div>

          {/* ── Accordion sections ── */}
          <Accordion type="multiple" className="w-full">
            {navGroups.map((group, gi) => {
              let groupIndex = 0
              return (
                <AccordionItem
                  key={group.label}
                  value={group.label}
                  className="border-b-0"
                >
                  <AccordionTrigger
                    className={cn(
                      "px-5 py-3 hover:no-underline",
                      "text-foreground",
                      "[&>svg]:size-3.5 [&>svg]:text-muted-foreground",
                      "[&[data-state=open]>svg]:text-primary"
                    )}
                  >
                    <MonoLabel index={String(gi + 1).padStart(2, "0")}>
                      {group.label}
                    </MonoLabel>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-0">
                    <div className="flex flex-col">
                      {group.columns ? (
                        group.columns.map((col, ci) =>
                          col.map((subgroup) => (
                            <div key={`${ci}-${subgroup.heading}`}>
                              {/* Subgroup heading */}
                              <div className="flex items-center gap-2 px-5 pt-4 pb-1.5">
                                <Badge variant="default" className="text-[8px] px-2 py-0 rounded-sm">
                                  {subgroup.heading}
                                </Badge>
                                <div className="h-px flex-1 bg-border-subtle" />
                              </div>
                              {subgroup.links.map((link) => {
                                const idx = String(groupIndex++).padStart(2, "0")
                                return (
                                  <MobileNavLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    index={idx}
                                    isActive={isActivePath(link.href)}
                                    onClick={close}
                                  />
                                )
                              })}
                            </div>
                          ))
                        )
                      ) : (
                        group.links.map((link) => {
                          const idx = String(groupIndex++).padStart(2, "0")
                          return (
                            <MobileNavLink
                              key={link.href}
                              href={link.href}
                              label={link.label}
                              index={idx}
                              isActive={isActivePath(link.href)}
                              onClick={close}
                            />
                          )
                        })
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          {/* ── Footer ── */}
          <div className="mt-auto border-t border-border px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                {meta.editionLabel}
              </span>
              <Badge variant="outline" className="text-[8px] gap-1.5 px-2 py-0.5">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: meta.liveBadgeColor }}
                />
                Live
              </Badge>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

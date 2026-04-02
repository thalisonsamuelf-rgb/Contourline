"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface BbUserDropdownUser {
  name: string
  email: string
  avatar?: string
}

export interface BbUserDropdownMenuItem {
  label: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
}

export interface BbUserDropdownProps {
  user: BbUserDropdownUser
  menuItems: BbUserDropdownMenuItem[]
  onLogout: () => void
  className?: string
}

export function BbUserDropdown({ user, menuItems, onLogout, className }: BbUserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
          "hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-bb-accent/50",
          className,
        )}
      >
        <Avatar size="sm" src={user.avatar} fallback={user.name} alt={user.name} />
        <span className="hidden text-sm font-medium text-white/80 md:inline">{user.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-bb-border bg-bb-dark">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center gap-3">
            <Avatar size="md" src={user.avatar} fallback={user.name} alt={user.name} />
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-white">{user.name}</span>
              <span className="truncate text-xs text-white/50">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-bb-border" />
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            asChild={!!item.href}
            className="gap-2 text-white/70 hover:text-bb-accent focus:text-bb-accent"
          >
            {item.href ? (
              <a href={item.href}>
                {item.icon}
                {item.label}
              </a>
            ) : (
              <>
                {item.icon}
                {item.label}
              </>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-bb-border" />
        <DropdownMenuItem
          onClick={onLogout}
          className="gap-2 text-red-400 hover:text-red-300 focus:text-red-300"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

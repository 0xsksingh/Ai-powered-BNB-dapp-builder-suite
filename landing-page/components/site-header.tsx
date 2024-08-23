"use client"

import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const { isConnected } = useAccount()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ConnectButton chainStatus="icon" />
          {isConnected && (
            <Link
              href="/dashboard"
              className={
                "flex items-center text-sm font-medium text-muted-foreground"
              }
            >
              Dashboard
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

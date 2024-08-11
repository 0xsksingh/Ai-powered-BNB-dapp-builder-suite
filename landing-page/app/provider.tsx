"use client"

import React from "react"

import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { bscGreenfield } from "wagmi/chains"

import { config } from "@/config/config"
import { greenFieldChain } from "@/config/wallet"

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Provider

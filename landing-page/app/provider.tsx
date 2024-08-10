"use client"

import React from "react"

import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { bscGreenfield } from "wagmi/chains"
import { greenFieldChain } from "@/config/wallet"


const Provider = ({ children }: { children: React.ReactNode }) => {
    const config = getDefaultConfig({
        appName: "My RainbowKit App",
        projectId: "YOUR_PROJECT_ID",
        chains: [
            {
                ...greenFieldChain,
                iconUrl:
                    "https://github.com/wagmi-dev/wagmi/assets/5653652/44446c8c-5c72-4e89-b8eb-3042ef618eed",
            },
            {
                ...bscGreenfield,
                iconUrl:
                    "https://github.com/wagmi-dev/wagmi/assets/5653652/44446c8c-5c72-4e89-b8eb-3042ef618eed",
            },

        ],
        ssr: true, // If your dApp uses server side rendering (SSR)
    })
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

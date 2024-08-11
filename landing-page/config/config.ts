import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { bscGreenfield } from "viem/chains"

import { greenFieldChain } from "./wallet"

export const config = getDefaultConfig({
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

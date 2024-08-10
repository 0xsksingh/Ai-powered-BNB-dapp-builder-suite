import { Chain } from "@rainbow-me/rainbowkit"

export const GREEN_CHAIN_ID = 5600
export const GREENFIELD_RPC_URL =
  "https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org"

export const greenFieldChain: Chain = {
  id: GREEN_CHAIN_ID,
  name: "Greenfield Testnet",
  testnet: true,
  rpcUrls: {
    default: {
      http: [GREENFIELD_RPC_URL],
    },
    public: {
      http: [GREENFIELD_RPC_URL],
    },
  },
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
}

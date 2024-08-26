"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { client, selectSp } from "@/client"
import { getOffchainAuthKeys } from "@/utils/offChainAuth"
import { BucketMetaWithVGF } from "@bnb-chain/greenfield-js-sdk/dist/esm/types/sp/Common"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { List } from "@/components/dashboard/list"
import WebsiteLists from "@/components/dashboard/websiteLists"

const DashboardPage = () => {
  const { address, connector } = useAccount()

  const [websitesDetails, setWebsiteDetails] = useState<any[]>([])

  useEffect(() => {
    if (!address && !connector) return

    const listWebsites = async () => {

      if (address && connector) {
        const spInfo = await selectSp()

        try {
          const provider = await connector?.getProvider()

          const offChainData = await getOffchainAuthKeys(address, provider)
          if (!offChainData) {
            toast({
              title: "Error",
              description: "No offchain, please create offchain pairs first",
            })
            return
          }

          const websitesLists = await client.bucket.listBuckets({
            address: address,
            endpoint: spInfo.endpoint,
          })

          if (websitesLists.code === 0 && websitesLists.body) {
            const websiteDetails = websitesLists.body
            setWebsiteDetails((prev) => [...websiteDetails])
          }
        } catch (error) {
          console.log("Error >>", error)
        }
      }
    }

    listWebsites()
  }, [address, connector])

  console.log("websitesDetails", websitesDetails)

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 py-8 pt-6">
          <div className="flex items-center justify-between space-y-2 px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="mt-2 max-w-2xl text-base leading-6 text-gray-500">
                Manage your websites
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>Create website</Button>
            </div>
          </div>
          {websitesDetails && <WebsiteLists websiteLists={websitesDetails} />}
        </div>
      </div>
    </>
  )
}

export default DashboardPage

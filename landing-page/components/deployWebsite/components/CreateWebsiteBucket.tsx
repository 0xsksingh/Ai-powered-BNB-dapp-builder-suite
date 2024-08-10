"use client"

import React, { useContext, useState } from "react"
import { client, selectSp } from "@/client"
import { GreenFieldContext } from "@/context/GreenFieldContext"
import { getOffchainAuthKeys } from "@/utils/offChainAuth"
import {
  Long,
  OnProgressEvent,
  VisibilityType,
} from "@bnb-chain/greenfield-js-sdk"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const CreateWebsiteBucket = () => {
  const { websiteName, setWebsiteName, setActiveState } =
    useContext(GreenFieldContext)

  const { address, connector } = useAccount()

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateWebsiteBucket = async () => {
    console.log("Website name", websiteName)

    if (!websiteName) {
      console.log("Website name 2", websiteName)
      toast({
        variant: "destructive",
        title: "Enter website name",
      })
      return
    }

    if (!address) {
      console.log("Website name 2", address)
      toast({
        variant: "destructive",
        title: "Connect Your wallet",
      })
      return
    }

    setIsLoading(true)
    const spInfo = await selectSp()
    console.log("spInfo", spInfo)

    const provider = await connector?.getProvider()
    console.log("Provider>>>>", provider)

    try {
      const offChainData = await getOffchainAuthKeys(address, provider)
      console.log("offChainData>>>>", offChainData)
      if (!offChainData) {
        toast({
          title: "Error",
          description: "No offchain, please create offchain pairs first",
        })
        return
      }

      const createBucketTx = await client.bucket.createBucket({
        bucketName: websiteName,
        creator: address,
        primarySpAddress: spInfo.primarySpAddress,
        visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
        chargedReadQuota: Long.fromString("0"),
        paymentAddress: address,
      })
      const simulateInfo = await createBucketTx.simulate({
        denom: "BNB",
      })

      console.log("simulateInfo", simulateInfo)

      const res = await createBucketTx.broadcast({
        denom: "BNB",
        gasLimit: Number(simulateInfo?.gasLimit),
        gasPrice: simulateInfo?.gasPrice || "5000000000",
        payer: address,
        granter: "",
      })
      console.log("Res >>>", res)

      if (res.code === 0) {
        setIsLoading(false)
        setActiveState("upload_css")
        toast({
          title: "Success",
          description: "Successfully created Bucket",
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      console.log("Error >>>", error)

      if (error && typeof error === "object") {
        console.log("Error >>>", error.message)
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        })
      }
    }
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Name your website
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the name of your website (visible to all)
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Website Name</Label>
        <Input
          type="name"
          placeholder="Enter Your website Name"
          onChange={(e) => {
            setWebsiteName(e.target.value)
            // setInfo({ ...info, bucketName: e.target.value })
          }}
        />
      </div>

      <Button disabled={isLoading} onClick={handleCreateWebsiteBucket}>
        {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
        {isLoading ? "Creating ...." : "Create Website Bucket"}
      </Button>
    </div>
  )
}

export default CreateWebsiteBucket

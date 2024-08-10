"use client"

import React, { useContext, useState } from "react"
import { client, selectSp } from "@/client"
import { GreenFieldContext } from "@/context/GreenFieldContext"
import { getOffchainAuthKeys } from "@/utils/offChainAuth"
import { OnProgressEvent, VisibilityType } from "@bnb-chain/greenfield-js-sdk"
import { MdClose } from "react-icons/md"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const UploadCSSFiles = () => {
  const { address, connector } = useAccount()
  const { websiteName, CSSFile, setCSSFile, setActiveState } =
    useContext(GreenFieldContext)
  const [uploadingCSSFile, setUploadingCSSFile] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("File >>>", e.target.files)
      const file = e.target.files[0]
      setCSSFile(file)
    }
  }

  const handleCancel = () => {
    setCSSFile(null)
    const inputField = document.getElementById("picture") as HTMLInputElement
    inputField.value = ""
  }

  const handleObject = async () => {
    if (!CSSFile) {
      console.log("Website name 2", CSSFile)
      toast({
        variant: "destructive",
        title: "Please upload a file",
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

    if (!websiteName) {
      console.log("Website name 2", websiteName)
      toast({
        variant: "destructive",
        title: "Website Bucket is not uploaded",
      })
      return
    }

    const spInfo = await selectSp()
    console.log("spInfo", spInfo)
    const provider = await connector?.getProvider()

    try {
      setUploadingCSSFile(true)
      const offChainData = await getOffchainAuthKeys(address, provider)
      if (!offChainData) {
        toast({
          title: "Error",
          description: "No offchain, please create offchain pairs first",
        })
        return
      }
      const res = await client.object.delegateUploadObject(
        {
          bucketName: websiteName,
          objectName: CSSFile.name,
          body: CSSFile,
          delegatedOpts: {
            visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
          },
          onProgress: (e: OnProgressEvent) => {
            console.log("progress: ", e.percent)
          },
        },
        {
          type: "EDDSA",
          address: address,
          domain: window.location.origin,
          seed: offChainData.seedString,
        }
      )
      console.log("Res >>>", res)
      if (res.code === 0) {
        setUploadingCSSFile(false)
        setActiveState("uplade_image")
        toast({
          title: "Success",
          description: "Successfully uploaded Object",
        })
      }
    } catch (error: any) {
      setUploadingCSSFile(false)
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
    <div className="grid w-full items-center gap-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Upload CSS File
        </h1>
        <p className="text-sm text-muted-foreground">
          Upload a CSS file to use it in your project
        </p>
      </div>

      {CSSFile ? (
        <div className="flex flex-row items-center gap-4">
          Uploaded file:
          <div className="flex-1 border px-2 py-1">{CSSFile.name}</div>
          <MdClose className="cursor-pointer" onClick={handleCancel} />
        </div>
      ) : (
        <div className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-12 py-8">
          <Label
            htmlFor="picture"
            className=" cursor-pointer text-lg text-muted-foreground"
          >
            Upload Your CSS Files
          </Label>
        </div>
      )}

      <Input
        id="picture"
        type="file"
        accept=".css"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button disabled={uploadingCSSFile} onClick={handleObject}>
        {uploadingCSSFile && (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        )}
        {uploadingCSSFile ? "Uploading..." : "Upload File"}
      </Button>
    </div>
  )
}

export default UploadCSSFiles

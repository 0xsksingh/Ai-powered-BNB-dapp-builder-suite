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

const UploadImages = () => {
  const { address, connector } = useAccount()
  const { ImageFile, setImageFile, websiteName, setActiveState } =
    useContext(GreenFieldContext)
  const [uploadingImageFile, setUploadingImageFile] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("File >>>", e.target.files)
      const file = e.target.files[0]
      setImageFile(file)
    }
  }

  const handleCancel = () => {
    setImageFile(null)
    const inputField = document.getElementById("imageFile") as HTMLInputElement
    inputField.value = ""
  }

  const handleObject = async () => {
    if (!ImageFile) {
      console.log("Website name 2", ImageFile)
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
      setUploadingImageFile(true)
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
          objectName: ImageFile.name,
          body: ImageFile,
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
        setUploadingImageFile(false)
        setActiveState("upload_html")
        toast({
          title: "Success",
          description: "Successfully uploaded Object",
        })
      }
    } catch (error: any) {
      setUploadingImageFile(false)
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

      {ImageFile ? (
        <div className="flex flex-row items-center gap-4">
          Uploaded file:
          <div className="flex-1 border px-2 py-1">{ImageFile.name}</div>
          <MdClose className="cursor-pointer" onClick={handleCancel} />
        </div>
      ) : (
        <div className="flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-12 py-8">
          <Label
            htmlFor="imageFile"
            className=" cursor-pointer text-lg text-muted-foreground"
          >
            Upload Your Image File
          </Label>
        </div>
      )}

      <Input
        id="imageFile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button disabled={uploadingImageFile} onClick={handleObject}>
        {uploadingImageFile && (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        )}
        {uploadingImageFile ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  )
}

export default UploadImages

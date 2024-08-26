"use client"

import React, { useEffect, useState } from "react"
import { client, selectSp } from "@/client"
import { BASE_URL } from "@/constants"
import { getOffchainAuthKeys } from "@/utils/offChainAuth"
import { GoDownload } from "react-icons/go"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useAccount } from "wagmi"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { GoLinkExternal } from "react-icons/go";
import Link from "next/link"

const WebsiteContentPage = ({ params }: { params: { id: string } }) => {
  const bucketName = params.id
  console.log("Bucket name: ", bucketName)

  const [objectDetails, setObjectDetails] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const { address, connector } = useAccount()

  const { toast } = useToast()

  const getListOfObjects = async (bucketName: string) => {
    console.log("Bucket name: ", bucketName, address)

    if (!address) return

    setIsLoading(true)
    const spInfo = await selectSp()
    console.log("spInfo", spInfo)

    try {
      const provider = await connector?.getProvider()
      const offChainData = await getOffchainAuthKeys(address, provider)
      if (!offChainData) {
        alert("No offchain, please create offchain pairs first")
        return
      }

      const listObjectsTx = await client.object.listObjects({
        bucketName,
        endpoint: spInfo.endpoint,
      })

      console.log("List Of Objecs", listObjectsTx)

      if (listObjectsTx.code === 0) {
        const objects =
          listObjectsTx?.body?.GfSpListObjectsByBucketNameResponse.Objects!
        console.log("objects >>>>>", objects)
        setObjectDetails(objects)
        setIsLoading(false)
      }

      return listObjectsTx
    } catch (error) {
      setIsLoading(false)
      console.log("Error >>>", error)
      toast({
        variant: "destructive",
        title: "Error in finding details",
      })
    }
  }

  useEffect(() => {
    console.log("Bucket name ", bucketName)

    if (bucketName) {
      getListOfObjects(bucketName)
    }
  }, [bucketName, address])

  console.log("ObjectList>>>", objectDetails)

  function formatPayloadSize(payloadSize: number) {
    if (payloadSize < 1024) {
      return `${payloadSize} Bytes`
    } else if (payloadSize < 1024 * 1024) {
      return `${(payloadSize / 1024).toFixed(2)} KB`
    } else {
      return `${(payloadSize / (1024 * 1024)).toFixed(2)} MB`
    }
  }

  const getURL = () => {
    const headerFile = objectDetails.filter(
      (file) => file.ObjectInfo.ContentType === "text/html"
    )

    console.log("Header file", headerFile)

    const urls = headerFile.map(
      (file) =>
        `${BASE_URL}/${file.ObjectInfo.BucketName}/${file.ObjectInfo.ObjectName}`
    )

    console.log("URLS >>>>", urls)
  }


  const getDate = (timestamp: number) => {
    const updatedTime = new Date(timestamp * 1000)
    const time = updatedTime.toISOString().split("T")[0]
    return time
  }

  const handleDelete = async (objectInfo: any) => {
    if (!address) return

    if (objectInfo) {
      console.log("Object Info >>>", objectInfo)

      try {
        const tx = await client.object.deleteObject({
          bucketName: objectInfo.BucketName,
          objectName: objectInfo.ObjectName,
          operator: address,
        })
        const simulateTx = await tx.simulate({
          denom: "BNB",
        })

        const res = await tx.broadcast({
          denom: "BNB",
          gasLimit: Number(simulateTx?.gasLimit),
          gasPrice: simulateTx?.gasPrice || "5000000000",
          payer: address,
          granter: "",
        })

        console.log("Res >>", res)
      } catch (error: any) {
        console.log("Error in deleting >>", error)
        toast({
          variant: "destructive",
          title: "Error in Deleting",
          description: "Check console for more reasons",
        })
      }
    }
  }

  const handleDownloadFile = async (objectInfo: any) => {
    if (!address) return
    if (objectInfo) {
      const spInfo = await selectSp()
      console.log("spInfo", spInfo)

      const provider = await connector?.getProvider()
      try {
        const offChainData = await getOffchainAuthKeys(address, provider)
        if (!offChainData) {
          alert("No offchain, please create offchain pairs first")
          return
        }

        const downloadFileTx = await client.object.getObjectPreviewUrl(
          {
            bucketName: objectInfo.BucketName,
            objectName: objectInfo.ObjectName,
            queryMap: {
              view: "1",
              "X-Gnfd-User-Address": address,
              "X-Gnfd-App-Domain": window.location.origin,
              "X-Gnfd-Expiry-Timestamp": "2024-09-03T09%3A23%3A39Z",
            },
          },
          {
            type: "EDDSA",
            address,
            domain: window.location.origin,
            seed: offChainData.seedString,
          }
        )

        console.log("downloadFileTx >>", downloadFileTx)
      } catch (error: any) {
        console.log("Error in downloading >>", error)
        toast({
          variant: "destructive",
          title: "Error in Downloading",
          description: "Check console for more reasons",
        })
      }
    }
  }

  return (
    <div className="m-12 flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold capitalize tracking-tight">
          {bucketName}
        </h2>
      </div>

      {isLoading ? (
        <>
          <div>
            <p>Loading....</p>
          </div>
        </>
      ) : (
        <Table>
          <TableCaption>A list of your recent documents.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead className="w-4/12">File name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-center">Options</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {objectDetails.map((object, index) => (
              <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="flex items-center gap-2 capitalize">
                  {object.ObjectInfo.ObjectName}
                  {object.ObjectInfo.ContentType === "text/html" && <Link href={`${BASE_URL}/${bucketName}/${object.ObjectInfo.ObjectName}`} target="_blank">
                    <GoLinkExternal />
                  </Link>}
                </TableCell>
                <TableCell className="capitalize">
                  {object.ObjectInfo.ContentType}
                </TableCell>
                <TableCell>
                  {formatPayloadSize(object.ObjectInfo.PayloadSize)}
                </TableCell>
                <TableCell>{getDate(object.ObjectInfo.CreateAt)}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="default"
                    variant="ghost"
                    onClick={() => {
                      handleDownloadFile(object.ObjectInfo)
                    }}
                  >
                    <GoDownload size={24} />
                  </Button>

                  <Button
                    size="default"
                    variant="destructive"
                    onClick={() => {
                      handleDelete(object.ObjectInfo)
                    }}
                  >
                    <RiDeleteBin6Fill size={24} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default WebsiteContentPage

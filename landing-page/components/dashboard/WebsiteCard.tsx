import React, { useEffect, useMemo } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { toSvg } from "jdenticon";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useAccount } from "wagmi";
import { client, selectSp } from "@/client";
import { getOffchainAuthKeys } from "@/utils/offChainAuth";
import { Separator } from "../ui/separator";
import { FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { GoLinkExternal } from "react-icons/go";


const WebsiteCard = ({ websiteDetail }: { websiteDetail: any }) => {
  const { BucketInfo } = websiteDetail
  const Avatar = toSvg(BucketInfo.BucketName, 100);
  const updatedTime = new Date(websiteDetail.UpdateTime * 1000)

  const { address, connector } = useAccount()

  console.log("websiteDetail >>>", websiteDetail);

  return (
    <div className="flex cursor-pointer items-center justify-between gap-4 space-y-3 border-b px-8 pb-8 pt-4 hover:bg-gray-200 dark:hover:bg-gray-800" >
      <div className="flex gap-4 ">
        <div className="overflow-hidden rounded-md">
          <Image
            className="size-12 flex-none rounded-full bg-gray-50"
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              Avatar
            )}`}
            alt=""
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h3 className="text-xl font-medium capitalize leading-none">{BucketInfo.BucketName}</h3>
            <div className="rounded-xl border px-2 py-1">
              <p className="text-xs text-muted-foreground">{updatedTime.toISOString().split('T')[0]}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <FaUser />
            <p className="text-xs text-muted-foreground">{BucketInfo.Owner}</p>
          </div>
        </div>
      </div>

      <div>
        <Link href={`/dashboard/websites/${BucketInfo.BucketName}`}>
          <Button >
            Manage
          </Button>
        </Link>

      </div>

    </div>
  )
}

export default WebsiteCard

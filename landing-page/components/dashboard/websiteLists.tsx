import React from "react"

import WebsiteCard from "./WebsiteCard"
import { Separator } from "../ui/separator";

const WebsiteLists = ({ websiteLists }: { websiteLists: any[] }) => {

  return (
    <div className="flex flex-col">
      {websiteLists.map((website) => (
        <WebsiteCard websiteDetail={website} />
      ))}
    </div>
  )
}

export default WebsiteLists

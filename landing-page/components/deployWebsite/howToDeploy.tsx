"use client"

import React, { useContext } from "react"
import { GreenFieldContext } from "@/context/GreenFieldContext"

const BASE_URL = "https://gnfd-testnet-sp2.nodereal.io/view"
const HowToDeploy = () => {
  const { websiteName, HTMLFile } = useContext(GreenFieldContext)
  const url = `${BASE_URL}/${websiteName}/${HTMLFile?.name}`
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        How to Deploy Your website
      </h1>

      <div>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Write your website name then upload it</li>
          <li>Upload your CSS File, then deploy it </li>
          <li>Upload your Image File, then deploy it</li>
          <li>Lastly, Upload your HTML File, then deploy it</li>
        </ul>
        <p>Boom, deployed on GreenField now you got the url</p>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-md font-semibold tracking-tight">
          The URL generated will be like this:
        </h1>

        {websiteName && HTMLFile ? (
          <p>{`${url}`}</p>
        ) : (
          <p>{`${BASE_URL}/{website_name}/{html_file_name}`}</p>
        )}
      </div>
    </div>
  )
}

export default HowToDeploy

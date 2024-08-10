"use client"

import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import CreateWebsiteBucket from "./components/CreateWebsiteBucket"
import UploadCSSFiles from "./components/UploadCSSFiles"
import UploadHTMLFile from "./components/UploadHTMLFile"
import UploadImages from "./components/UploadImages"

const DeployWebsite = () => {
  return (
    <Tabs defaultValue="website_name" className="flex flex-col gap-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="website_name">Website Name</TabsTrigger>
        <TabsTrigger value="upload_css">Upload CSS</TabsTrigger>
        <TabsTrigger value="upload_image">Upload Image</TabsTrigger>
        <TabsTrigger value="upload_html">Upload HTML</TabsTrigger>
      </TabsList>
      <TabsContent value="website_name">
        <CreateWebsiteBucket />
      </TabsContent>
      <TabsContent value="upload_css">
        <UploadCSSFiles />
      </TabsContent>
      <TabsContent value="upload_image">
        <UploadImages />
      </TabsContent>
      <TabsContent value="upload_html">
        <UploadHTMLFile />
      </TabsContent>
    </Tabs>
  )
}

export default DeployWebsite

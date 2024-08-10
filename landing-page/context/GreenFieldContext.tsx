"use client"

import { createContext, useState } from "react"

import { UploadStates } from "@/types/upload"

type GreenFieldContextProps = {
  websiteName: string
  setWebsiteName: (websiteName: string) => void
  CSSFile: File | null
  setCSSFile: (CSSFile: File | null) => void
  HTMLFile: File | null
  setHTMLFile: (HTMLFile: File | null) => void
  ImageFile: File | null
  setImageFile: (ImageFile: File | null) => void
  activeState: UploadStates
  setActiveState: (activeState: UploadStates) => void
}

const initialValue: GreenFieldContextProps = {
  websiteName: "",
  setWebsiteName: () => {},
  CSSFile: null,
  setCSSFile: () => {},
  HTMLFile: null,
  setHTMLFile: () => {},
  ImageFile: null,
  setImageFile: () => {},
  activeState: "website_name",
  setActiveState: () => {},
}

export const GreenFieldContext =
  createContext<GreenFieldContextProps>(initialValue)

export const GreenFieldContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeState, setActiveState] = useState<UploadStates>("website_name")
  const [websiteName, setWebsiteName] = useState("")
  const [CSSFile, setCSSFile] = useState<File | null>(null)
  const [ImageFile, setImageFile] = useState<File | null>(null)
  const [HTMLFile, setHTMLFile] = useState<File | null>(null)

  return (
    <GreenFieldContext.Provider
      value={{
        websiteName,
        CSSFile,
        HTMLFile,
        ImageFile,
        setImageFile,
        activeState,
        setActiveState,
        setHTMLFile,
        setCSSFile,
        setWebsiteName,
      }}
    >
      {children}
    </GreenFieldContext.Provider>
  )
}

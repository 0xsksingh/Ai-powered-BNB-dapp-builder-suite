import React from "react"
import Image from "next/image"
import Link from "next/link"
import { GreenFieldContextProvider } from "@/context/GreenFieldContext"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import DeployWebsite from "@/components/deployWebsite/DeployWebsite"
import HowToDeploy from "@/components/deployWebsite/howToDeploy"
import { UserAuthForm } from "@/components/deployWebsite/userauth"

const DeployPage = () => {
  return (
    <>
      <GreenFieldContextProvider>
        <div className="md:hidden">
          <Image
            src="/examples/authentication-light.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="block dark:hidden"
          />
          <Image
            src="/examples/authentication-dark.png"
            width={1280}
            height={843}
            alt="Authentication"
            className="hidden dark:block"
          />
        </div>

        <div className="flex">
          <div className="flex flex-1 justify-center items-center h-auto bg-zinc-900">
            <HowToDeploy />
          </div>
          <div className="flex flex-1 h-full flex-col gap-12 lg:p-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight">
                Deploy Your Website
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div className="mx-auto flex w-full flex-1 flex-col justify-center space-y-6 max-w-lg">
              {/* <UserAuthForm /> */}
              <DeployWebsite />
            </div>
          </div>
        </div>
      </GreenFieldContextProvider>
    </>
  )
}

export default DeployPage

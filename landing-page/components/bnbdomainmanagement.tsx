"use client"

import React, { useEffect, useState } from "react"
import { createWeb3Name } from "@web3-name-sdk/core"
import { useAccount } from "wagmi"

import { config } from "@/config/config"
import { getEthersSigner } from "@/config/eas-wagmi-utils"

import { Button } from "./ui/button"

const ManageDomains = () => {
  const [domains, setDomains] = useState([])
  const web3name = createWeb3Name()
  const { address, connector, isConnected, chainId } = useAccount()

  console.log("connector>>", connector, chainId)

  const fetchDomains = async () => {
    const signer = await getEthersSigner(config, { chainId })
    console.log("Signer >>", signer)

    const address = await signer.getAddress()
    const registeredDomains = await web3name.getDomainName({ address })
    setDomains(registeredDomains)
  }

  // useEffect(() => {
  //   if (isConnected) {
  //     fetchDomains()
  //   }
  // }, [web3name, isConnected])

  const linkDomainToWebsite = async (domainName) => {
    // Implement logic to link the domain to your BNB Greenfield hosted website.
    alert(`Linked ${domainName} to your website.`)
  }

  return (
    <div className="space-y-4">
      <Button onClick={fetchDomains}>Fetch domain</Button>
      <h2 className="text-xl font-semibold">Your Registered Domains</h2>
      {domains?.length > 0 ? (
        domains.map((domain, index) => (
          <div key={index} className="flex items-center space-x-4">
            <p>{domain}</p>
            <button
              onClick={() => linkDomainToWebsite(domain)}
              className="btn btn-primary"
            >
              Link to Website
            </button>
          </div>
        ))
      ) : (
        <p>No domains registered</p>
      )}
    </div>
  )
}

export default ManageDomains

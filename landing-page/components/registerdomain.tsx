"use client"

import React, { useState } from "react"
import SIDRegister from "@web3-name-sdk/register"
import { ethers } from "ethers"

import { config } from "@/config/config"
import { getEthersSigner } from "@/config/eas-wagmi-utils"

const RegisterDomain = () => {
  const [domainName, setDomainName] = useState("")
  const [availability, setAvailability] = useState(null)

  const checkAvailability = async () => {
    const signer = await getEthersSigner(config)
    console.log("Signer>>>", signer)

    const register = new SIDRegister({ signer, chainId: 56 })
    const available = await register.getAvailable(domainName)
    setAvailability(available)
  }

  const registerDomain = async () => {
    if (!availability) return
    const signer = await getEthersSigner(config)

    const register = new SIDRegister({ signer, chainId: 56 })
    const price = await register.getRentPrice(domainName, 1)
    await register.register(domainName, await signer.getAddress(), 1, {
      setPrimaryName: true,
    })
    alert(`${domainName}.bnb has been registered successfully!`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Register a Web3 Domain</h2>
      <input
        type="text"
        value={domainName}
        onChange={(e) => setDomainName(e.target.value)}
        placeholder="Enter domain name"
        className="input input-bordered w-full"
      />
      <button onClick={checkAvailability} className="btn btn-primary">
        Check Availability
      </button>
      {availability !== null && (
        <div>
          {availability ? (
            <button onClick={registerDomain} className="btn btn-success">
              Register {domainName}.bnb
            </button>
          ) : (
            <p className="text-red-500">Domain is not available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default RegisterDomain

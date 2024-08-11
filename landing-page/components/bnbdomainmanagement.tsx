"use client";
import React, { useEffect, useState } from "react";
import { createWeb3Name } from "@web3-name-sdk/core";
import { useSigner } from "wagmi";

const ManageDomains = () => {
  const [domains, setDomains] = useState([]);
  const { data: signer } = useSigner();
  const web3name = createWeb3Name();

  useEffect(() => {
    const fetchDomains = async () => {
      const address = await signer.getAddress();
      const registeredDomains = await web3name.getDomainName({ address });
      setDomains(registeredDomains);
    };

    fetchDomains();
  }, [signer]);

  const linkDomainToWebsite = async (domainName) => {
    // Implement logic to link the domain to your BNB Greenfield hosted website.
    alert(`Linked ${domainName} to your website.`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Registered Domains</h2>
      {domains.length > 0 ? (
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
  );
};

export default ManageDomains;

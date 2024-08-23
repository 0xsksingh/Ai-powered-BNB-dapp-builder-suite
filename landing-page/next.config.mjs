/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@web3-name-sdk/core", "@web3-name-sdk/register"],
  images: {
    domains: ["images.unsplash.com"],
  },
}

export default nextConfig

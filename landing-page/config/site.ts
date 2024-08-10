export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title:'Deploy',
      href:'/deploy'
    },
    {
      title: 'No-Code-Builder',
      href: 'https://no-code-bnb-dapp-builder-suite.vercel.app/'
    }
  ],
  links: {
    twitter: "https://twitter.com/abhishek-01k",
    github: "https://github.com/shadcn/ui"
  },
}

import React from "react"
import Link from "next/link"
import Image from "next/image"

const HomeScreen = () => {
    return (
        <section className="w-full h-[70vh] mb-12">
            <div className="h-[600px]  relative flex flex-col">
                <div className="relative flex-1 bg-cover  bg-[url('/Banner.webp')]">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                <div className="absolute left-1/2  backdrop-blur-2xl  -translate-x-1/2 translate-y-1/2 transform  shadow-lg w-[80%]">
                    <div className="flex flex-col gap-12 px-12 py-8">
                        <div className="flex flex-col gap-8">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Build BNB-powered DApps with Ease
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Unleash the power of BNB-compatible blockchain development with
                                our AI-powered no-code BNB Dapp Builder. Empower both coders and
                                non-coders to create cutting-edge DApps.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link
                                href="https://no-code-bnb-dapp-builder-suite.vercel.app"
                                target="_blank"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Try the Builder
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                prefetch={false}
                            >
                                Explore the SDK
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeScreen

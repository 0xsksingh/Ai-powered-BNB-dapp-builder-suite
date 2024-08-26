import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
const EmpowerCoder = () => {
    return (
        <div className='flex flex-col gap-12 my-12'>
            <div className="ml-12 flex flex-col items-start justify-start space-y-4 text-center">
                <div className="inline-block rounded-lg text-start bg-muted px-3 py-1 text-sm">
                    BNB Dapp Builder
                </div>
                <h2 className="text-start text-3xl font-bold tracking-tighter sm:text-5xl">
                    Empower Both Coders and Non-Coders
                </h2>
                <p className="max-w-[900px] text-start text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our AI-powered BNB Dapp Builder provides a seamless
                    development experience for both technical and non-technical
                    users. Coders can leverage the BNB Dev SDK for a type-safe,
                    full-stack web3 development experience, while non-coders can
                    utilize the drag-and-drop UI builder to create stunning DApps.
                </p>
            </div>

            <div className='flex flex-row gap-8 px-8'>
                <Card >
                    <CardHeader>
                        <CardTitle>BNB Dev SDK</CardTitle>
                        <CardDescription>Explore the Developer Kit.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-8 '>
                        <Image className='h-[250px]' src='/Developer.jpg' alt='Developer' width={350} height={450} />
                        <p className="max-w-[450px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Leverage the power of the BNB-compatible blockchain with our type-safe, full-stack web3 development SDK.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">

                        <Button>Try it</Button>
                    </CardFooter>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>No-Code Builder</CardTitle>
                        <CardDescription>Explore the Developer Kit.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-8'>
                        <Image className='h-[250px]' src='/NoCode.jpg' alt='Hosting' width={350} height={350} />
                        <p className="max-w-[450px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Empower non-technical users to create stunning DApps with our drag-and-drop UI builder.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Try it</Button>
                    </CardFooter>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>BNB-GreenField Hosting
                        </CardTitle>
                        <CardDescription>Explore the Developer Kit.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-8'>
                        <Image className='h-[250px]' src='/Hosting.jpg' alt='Hosting' width={350} height={350} />
                        <p className="max-w-[450px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Seamlessly host your DApps on the BNB-GreenField network, ensuring fast, secure, and eco-friendly deployments.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button>Try it</Button>
                    </CardFooter>
                </Card>
            </div>

        </div>
    );
};

export default EmpowerCoder;
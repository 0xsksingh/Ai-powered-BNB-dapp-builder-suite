import { client, selectSp } from '@/client';
import { getOffchainAuthKeys } from '@/utils/offChainAuth';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


const ObjectCard = ({ objectDetails }: { objectDetails: any }) => {

    console.log("objectDetails", objectDetails);

    const { ObjectInfo } = objectDetails

    return (
        <div>

            {/* <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table> */}

        </div>
    );
};

export default ObjectCard;
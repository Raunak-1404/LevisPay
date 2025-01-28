"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onRampTransactions(provider: string, amount: number) {
    type StatusTYPE = "PROCESSING" | "COMPLETED" | "FAILED";
    const session  = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id) {
        return {
            message: "Unauthorized Request",
        }
    };

    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status: "PROCESSING",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });


    return {
        message: "DONE",
    }
}
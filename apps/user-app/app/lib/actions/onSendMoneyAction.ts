"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onSendMoneyAction(number: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthorized Request",
    };
  }

  try {
    const from = await prisma.user.findFirst({
      where: {
        id: Number(session?.user?.id),
      },
    });

    if (!from) {
      return {
        message: "Error while sending",
      };
    }

    const to = await prisma.user.findFirst({
      where: {
        number: number,
      },
    });

    if (!to) {
      return {
        message: "User not found",
      };
    }

    await prisma.$transaction(async (txn) => {
      await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const fromBalance = await txn.balance.findUnique({
        where: {
          userId: Number(from.id),
        },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await txn.balance.update({
        where: {
          userId: from.id,
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await txn.balance.update({
        where: {
          userId: to.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await txn.p2PTransfers.create({
        data:{
          amount,
          senderId: from.id,
          recieverId: to.id,
          timestamp: new Date()
        }
      });
    });
    return {
      status: 200,
      message: "Money sent",
    };
  } catch (error) {
    return {
      status: 403,
      message: "Error while sending",
      error
    };
  }
}

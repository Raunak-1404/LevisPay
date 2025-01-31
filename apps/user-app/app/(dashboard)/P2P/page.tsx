
import { getServerSession } from "next-auth";
import SendMoneyCard from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function getP2PTransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.p2PTransfers.findMany({
    where: {
      senderId: Number(session?.user?.id),
    },
  });

  return transactions.map((txn) => ({
    senderId : txn.senderId,
    receiverId : txn.recieverId,
    timeStamp : txn.timestamp,
    amount: txn.amount,
  }));

} 

export default async function () {
  return (
    <div className="w-screen px-10 py-4 ">
      <h1 className="text-5xl text-[#6a51a6] font-bold">
        Peer To Peer Transactions
      </h1>
      <SendMoneyCard />
    </div>
  );
}

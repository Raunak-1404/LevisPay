
import { getServerSession } from "next-auth";
import SendMoneyCard from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

type P2PTransaction = {
  senderId: number;
  receiverId: number;
  timeStamp: Date;
  amount: number;
  sender: {
    name: string;
    number: string;
  };
  reciever: {
    name: string;
    number: string;
  };
}

export async function getP2PTransactions() : Promise<P2PTransaction[]> {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.p2PTransfers.findMany({
    where: {
      OR:[
        {
          senderId: Number(session?.user?.id)
        },
        {
          recieverId: Number(session?.user?.id)
        }
      ]
    },
    include:{
      sender: {
        select:{
          name: true ,
          number: true 
        }
      },
      reciever: {
        select:{
          name: true ,
          number: true 
        }
      }
    }
  });

  

  return transactions.map((txn) => ({
    senderId : txn.senderId,
    receiverId : txn.recieverId,
    timeStamp : txn.timestamp,
    amount: txn.amount,
    sender: txn.sender,
    reciever: txn.reciever
  }));

} 

export default async function P2P() {
  return (
    <div className="w-screen px-10 py-4 ">
      <h1 className="text-5xl text-[#6a51a6] font-bold">
        Peer To Peer Transactions
      </h1>
      <SendMoneyCard />
    </div>
  );
}

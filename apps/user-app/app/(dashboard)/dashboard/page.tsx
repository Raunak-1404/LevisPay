import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return {
      name: session?.user?.name,
    };
  }
};

const getBalance = async () => {
  const session = await getServerSession(authOptions);
  try {
    const balance = await prisma.balance.findFirst({
      where: {
        userId: Number(session?.user?.id),
      },
    });

    return {
      amount: balance?.amount || 0,
    };
  } catch (error) {
    return {
      amount: 0,
      msg: "Error fetching balance",
      error
    };
  }
};

export default async function Dashboard() {
  const userDetails = await getUserDetails();
  const balance = await getBalance();
  return (
    <div className="w-screen mx-10 pt-10 flex flex-col">
      <div className="text-6xl text-[#6a51a6]  mb-8 font-bold">
        Good afternoon, {userDetails?.name}
      </div>

      <div className="bg-slate-100 w-full h-full pl-10 pt-5 rounded-3xl ">
        <h2 className="text-2xl text-slate-500 pb-5">Wallet Balance</h2>
        <h1 className="text-4xl pl-5">
          {" "}
          <span className="text-slate-500">&#8377;</span> {balance.amount / 100}
        </h1>
      </div>
    </div>
  );
}

import { getServerSession } from "next-auth";
import SendMoneyCard from "../../../components/SendMoneyCard";
import { authOptions } from "../../lib/auth";

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

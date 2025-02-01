import { getServerSession } from "next-auth";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getP2PTransactions } from "../P2P/page";
import { authOptions } from "../../lib/auth";

export default async function () {
  const P2p = await getP2PTransactions();
  const session = await getServerSession(authOptions);
  console.log("Got this from user : " ,session?.user?.id , " ", P2p)
  return (
    <div className="w-screen px-10 py-4">
      <h1 className="text-5xl text-[#6a51a6] font-bold">Transactions</h1>

      <div className=" w-full h-[90%] mt-5  ">
        <div className="px-20 pt-5">
          <P2PTransactions P2PTransactions={P2p} height={"70vh"} />
        </div>
      </div>
    </div>
  );
}

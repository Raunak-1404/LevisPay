import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getOnRampTxns } from "../transfer/page";

export default async function OnRampTXN() {
  const transactions = await getOnRampTxns();
  return (
    <div className="w-screen px-10 py-4">
      <h1 className="text-5xl text-[#6a51a6] font-bold">Transactions</h1>

      <div className=" w-full h-[90%] mt-5  ">
        <div className="px-20 pt-5">
          <OnRampTransactions transactions={transactions} height={"70vh"} />
        </div>
      </div>
    </div>
  );
}

import prisma from "@repo/db/client";
import { Card } from "@repo/ui/card";

type Status = "SUCCESS" | "PROCESSING" | "FAILED";

export const OnRampTransactions = async ({
  transactions,
  height
}: {
  transactions: {
    time: Date;
    amount: number;
    status: Status;
    provider: string;
  }[];
  height?: string;
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    
    <Card title="Recent Transactions">
      <div className="pt-5 overflow-y-auto px-5 thin-scrollbar" style={{ height }}>
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between pb-5">
            <div className="flex gap-5">
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="text-sm">
                <div>Status: {t.status}</div>
                <div className="text-xs text-slate-600"> BANK: {t.provider}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
export const P2PTransactions = async ({
  height,
  P2PTransactions,
}: {
  height?: string;
  P2PTransactions: {
    senderId: number;
    receiverId: number;
    timeStamp: Date;
    amount: number;
    sender: any;
    reciever: any;
  }[];
}) => {
  if (!P2PTransactions?.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  const session = await getServerSession(authOptions);

  return (
    <Card title="Recent Transactions">
      <div
        className="pt-5 overflow-y-auto px-5 thin-scrollbar"
        style={{ height }}
      >
        {P2PTransactions.map((t, i) => (
          <div key={i} className="flex justify-between pb-5">
            <div className="flex gap-10">
              <div>
                {t.senderId == session?.user?.id ? (
                  <div className="text-sm">Send INR</div>
                ) : (
                  <div className="text-sm">Recieved INR </div>
                )}
                <div className="text-slate-600 text-xs">
                  {t.timeStamp.toDateString()}
                </div>
              </div>
              <div className="text-lg flex items-center justify-center">
                {t.senderId == session?.user.id ? (
                  <div>To : {t.reciever.name}</div>
                ) : (
                  <div>From : {t.sender.name}</div>
                )}
                {/* <div className="text-xs text-slate-600">
                  {" "}
                  BANK: {t.receiverId}
                </div> */}
              </div>
            </div>
            {t.senderId == session?.user.id ? (
              <div className="flex flex-col justify-center">
                - Rs {t.amount / 100}
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

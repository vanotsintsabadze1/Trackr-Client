import { getLatestTransactions } from "@/lib/actions/transactions/transactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default async function RecentActivities() {
  const res = await getLatestTransactions(5);

  return (
    <Card className="max-h-96 overflow-y-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest financial transactions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!("code" in res.data) ? (
          res.data.map((transaction: TransactionResponse) => (
            <Card key={transaction.id} className="py-4 flex flex-col gap-2">
              <CardHeader className="py-0">
                <CardTitle>{transaction.title}</CardTitle>
                <CardDescription className="line-clamp-1 text-xs">{transaction.description}</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <p className="text-xs">
                  <b className="text-green-600">Amount:</b> {transaction.amount}
                </p>
                <p className="text-xs">
                  <b className="text-green-600">Date:</b> {new Date(transaction.tranDate).toDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <span className="text-xs font-medium uppercase tracking-wider">Loading...</span>
        )}
      </CardContent>
    </Card>
  );
}

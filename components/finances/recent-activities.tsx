import { getLatestTransactions } from "@/lib/actions/transactions/transactions";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default async function RecentActivities() {
  let res = await getLatestTransactions(5);

  return (
    <Card className="h-72 overflow-y-auto border-none shadow-none">
      {!res.data && <CardContent>Loading...</CardContent>}

      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest financial transactions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {res.data.map((transaction: TransactionResponse) => (
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
                <b className="text-green-600">Date:</b> {transaction.tranDate.toString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
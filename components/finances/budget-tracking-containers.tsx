import { getBalance, getPreviousAndCurrentMonthExpenses } from "@/lib/actions/transactions/transactions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import LoadingSpinner from "../ui/loading-spinner";
import { TrendingDown, TrendingUp, WalletCards } from "lucide-react";
import BudgetEditButton from "./budget-setter-button";

export default async function BudgetTrackingContainers() {
  const previousAndCurrentMonthExpenses = await getPreviousAndCurrentMonthExpenses();
  const paceData = previousAndCurrentMonthExpenses.data;
  const balance = await getBalance();

  return (
    <>
      <Card className="flex flex-col justify-center gap-2 p-4 min-h-[7.9rem]">
        {!("code" in balance.data) ? (
          <>
            <CardHeader className="space-y-0 p-0 flex flex-col gap-1">
              <CardTitle className="flex gap-1.5">
                Budget <WalletCards size={14} className="text-gray-500" />
              </CardTitle>
              <CardDescription className="text-xs">Your monthly budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 p-0 flex flex-col gap-1">
              <span className="text-xl font-bold flex gap-1">
                {!("code" in paceData) && balance.data.balance - paceData.currentMonth}

                <BudgetEditButton />
              </span>
              <span className="text-[.7rem] text-gray-400">Left out of {balance.data.balance.toFixed(2)}$</span>
            </CardContent>
          </>
        ) : (
          <LoadingSpinner size={20} />
        )}
      </Card>
      <Card className="flex flex-col justify-center gap-2 p-4 min-h-[7.9rem]">
        {!("code" in paceData) ? (
          <>
            <CardHeader className="space-y-0 p-0 flex flex-col gap-1">
              <CardTitle className="flex gap-1">
                Saved {paceData.currentMonth > paceData.previousMonth ? <TrendingDown size={14} className="text-red-500" /> : <TrendingUp size={14} className="text-green-400" />}
              </CardTitle>
              <CardDescription className="text-xs">Compared to the last month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 p-0 flex flex-col gap-1">
              <>
                <span>
                  {paceData.currentMonth > paceData.previousMonth ? (
                    <span className="text-red-500 font-bold text-xl">-{paceData.currentMonth - paceData.previousMonth}$</span>
                  ) : (
                    <span className="text-green-500">+{paceData.currentMonth - paceData.previousMonth}$</span>
                  )}
                </span>
                <span className="text-[.7rem] text-gray-400">
                  {paceData.currentMonth === 0 && paceData.previousMonth === 0
                    ? "0% more than last month"
                    : paceData.currentMonth === 0 || paceData.previousMonth === 0
                    ? "Not applicable"
                    : `${(((paceData.currentMonth - paceData.previousMonth) / paceData.previousMonth) * 100).toFixed(2)}% more than last month`}
                </span>
              </>
            </CardContent>
          </>
        ) : (
          <LoadingSpinner size={20} />
        )}
      </Card>
    </>
  );
}

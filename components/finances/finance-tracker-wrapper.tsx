import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import BudgetTrackingContainers from "./budget-tracking-containers";
import RecentActivities from "./recent-activities";
import TransactionDialogMenu from "./transaction-dialog-menu";

export default function FinanceTrackerWrapper() {
  return (
    <Card className="px-4 pt-2 max-h-fit flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Your Finances</CardTitle>
        <CardDescription className="text-xs">Manage your finances here</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-x-6 gap-y-2 pb-0 flex-wrap">
        <BudgetTrackingContainers />
      </CardContent>
      <CardContent className="py-0">
        <RecentActivities />
      </CardContent>
      <CardFooter className="">
        <TransactionDialogMenu />
      </CardFooter>
    </Card>
  );
}

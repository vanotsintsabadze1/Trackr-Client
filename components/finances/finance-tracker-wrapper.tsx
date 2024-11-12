import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import BudgetTrackingContainers from "./budget-tracking-containers";
import RecentActivities from "./recent-activities";
import TransactionDialogMenu from "./transaction-dialog-menu";

export default function FinanceTrackerWrapper() {
  return (
    <Card className="p-4 h-[40rem] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Your Finances</CardTitle>
        <CardDescription className="text-xs">Manage your finances here</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-x-6 gap-y-2 flex-wrap">
        <BudgetTrackingContainers />
      </CardContent>
      <CardContent>
        <RecentActivities />
      </CardContent>
      <CardFooter>
        <TransactionDialogMenu />
      </CardFooter>
    </Card>
  );
}

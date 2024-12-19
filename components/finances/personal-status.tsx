import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import BudgetTrackingContainers from "./budget-tracking-containers";
import TransactionDialogMenu from "./transaction-dialog-menu";

export default function PersonalStatus() {
  return (
    <Card className="w-full gap-x-6">
      <CardHeader>
        <CardTitle className="text-2xl">Your Finances</CardTitle>
        <CardDescription className="text-xs">Manage your finances here</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-x-6">
        <BudgetTrackingContainers />
      </CardContent>
      <CardFooter>
        <TransactionDialogMenu />
      </CardFooter>
    </Card>
  );
}

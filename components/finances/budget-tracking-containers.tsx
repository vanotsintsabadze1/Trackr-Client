import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function BudgetTrackingContainers() {
  return (
    <>
      <Card className="flex flex-col justify-center gap-2 p-4">
        <CardHeader className="space-y-0 p-0">
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0 flex flex-col gap-1">
          <span className="font-bold text-black text-[1.4rem] tracking-wide">
            $2300
          </span>
          <span className="font-light text-gray-600 text-[.8rem]">
            +2.5% from last month
          </span>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-center gap-2 p-4">
        <CardHeader className="space-y-0 p-0">
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0 flex flex-col gap-1">
          <span className="font-bold text-black text-[1.4rem] tracking-wide">
            $12,346
          </span>
          <span className="font-light text-gray-600 text-[.8rem]">
            Across all accounts
          </span>
        </CardContent>
      </Card>
      <Card className="flex flex-col justify-center gap-2 p-4">
        <CardHeader className="space-y-0 p-0">
          <CardTitle>Budget Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 p-0 flex flex-col gap-1">
          <span className="font-bold text-black text-[1.4rem] tracking-wide">
            75%
          </span>
          <span className="font-light text-gray-600 text-[.8rem]">
            Of monthly budget used
          </span>
        </CardContent>
      </Card>
    </>
  );
}

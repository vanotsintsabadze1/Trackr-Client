import BudgetLimitTracker from "@/components/finances/budget-limit-tracker";
import FinancesTable from "@/components/finances/finances-table";
import PageSwitchers from "@/components/finances/page-switchers";
import PersonalStatus from "@/components/finances/personal-status";
import RecentActivitiesWrapper from "@/components/finances/recent-activities-wrapper";
import { YearlyExpensesTrackingChart } from "@/components/finances/yearly-expenses-chart-tracker";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getMoneySpent, getTransaction, getYearlyExpenses } from "@/lib/actions/transactions/transactions";

interface Props {
  searchParams: {
    page: string;
    [key: string]: string;
  };
}

export default async function financesPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const transactions = await getTransaction(10, page);
  const moneySpent = await getMoneySpent();
  const yearlyExpenses = await getYearlyExpenses();

  return (
    <div className="flex-grow min-h-dvh flex justify-center items-center pt-10 pb-5 flex-col gap-y-6">
      <div className="w-full flex justify-center gap-6 flex-wrap">
        <section className="flex-col flex items-center gap-y-6">
          <PersonalStatus />
          <RecentActivitiesWrapper />
        </section>
        <section className="flex flex-col gap-y-6 items-center">
          {!("code" in moneySpent.data) && <BudgetLimitTracker spent={moneySpent.data.moneySpent} limit={moneySpent.data.costLimit} />}
          {!("code" in yearlyExpenses.data) && <YearlyExpensesTrackingChart expenses={yearlyExpenses.data} />}
        </section>
      </div>
      <Card className="px-7 flex flex-col gap-y-4 pt-2 py-4">
        <CardHeader className="py-0 flex justify-between items-center flex-row">
          <div className="flex flex-col gap-y-1">
            <CardTitle className="text-xl">Your Transactions</CardTitle>
            <CardDescription className="text-xs">Manage your transactions here</CardDescription>
          </div>
          <div className="flex justify-center items-center gap-4">
            <PageSwitchers currentPage={page} pageCount={10} />
          </div>
        </CardHeader>
        <div>
          <FinancesTable transactions={transactions.data} />
        </div>
      </Card>
    </div>
  );
}

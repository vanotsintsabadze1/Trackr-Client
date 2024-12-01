import BudgetLimitTracker from "@/components/finances/budget-limit-tracker";
import FinanceTrackerWrapper from "@/components/finances/finance-tracker-wrapper";
import FinancesTable from "@/components/finances/finances-table";
import { getMoneySpent, getTransaction } from "@/lib/actions/transactions/transactions";

export default async function page() {
  const transactions = await getTransaction(10, 1);
  const moneySpent = await getMoneySpent();

  return (
    <div className="flex-grow min-h-dvh flex justify-center items-center py-10 flex-col gap-y-6">
      <section className="w-full flex justify-center gap-6 flex-wrap">
        <FinanceTrackerWrapper />
        {!("code" in moneySpent.data) && <BudgetLimitTracker spent={moneySpent.data.moneySpent} limit={moneySpent.data.costLimit} />}
      </section>
      <FinancesTable transactions={transactions.data} />
    </div>
  );
}

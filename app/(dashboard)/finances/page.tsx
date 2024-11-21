import FinanceTrackerWrapper from "@/components/finances/finance-tracker-wrapper";
import FinancesTable from "@/components/finances/finances-table";
import { getTransaction } from "@/lib/actions/transactions/transactions";

export default async function page() {
  const transactions = await getTransaction(10, 1);

  return (
    <div className="flex-grow min-h-dvh flex justify-center py-10 flex-wrap gap-y-6">
      <FinanceTrackerWrapper />
      <FinancesTable transactions={transactions.data} />
    </div>
  );
}

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TransactionTypeSelector from "./transaction-type-selector";

interface Props {
  setTransaction: React.Dispatch<React.SetStateAction<Transaction | TransactionResponse>>;
  transaction: Transaction | TransactionResponse;
}

export default function TransactionForm({ setTransaction, transaction }: Props) {
  console.log(transaction.type);

  return (
    <>
      <TransactionTypeSelector setTransaction={setTransaction} transaction={transaction} />
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Title</Label>
        <Input value={transaction.title} placeholder="Enter title" className="text-xs placeholder:text-xs" onChange={(e) => setTransaction((prev) => ({ ...prev, title: e.target.value }))} />
      </div>
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Description</Label>
        <Textarea
          value={transaction.description}
          className="resize-none text-xs placeholder:text-xs"
          placeholder="Enter description"
          onChange={(e) => setTransaction((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Amount</Label>
        <Input
          value={transaction.amount}
          className="text-xs placeholder:text-xs"
          placeholder="Enter amount"
          type="number"
          step="0.01"
          min={0}
          onChange={(e) => setTransaction((prev) => ({ ...prev, amount: parseFloat(e.target.value) }))}
        />
      </div>
    </>
  );
}

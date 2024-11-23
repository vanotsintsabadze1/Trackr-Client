import { useState } from "react";
import { Button } from "../ui/button";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { useRouter } from "next/navigation";
import { addTransaction } from "@/lib/actions/transactions/transactions";
import { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import TransactionForm from "./transaction-form";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransactionCreationCard({ setOpen }: Props) {
  const [transaction, setTransaction] = useState<Transaction>({
    type: -1, // this will be a number when submitted.
    title: "",
    description: "",
    amount: 0,
  });
  const router = useRouter();

  async function handleTransactionCreation() {
    if (transaction.type === -1) {
      toast.error("Type is required");
      return;
    }

    if (transaction.title === "" || transaction.description === "" || transaction.amount === 0) {
      toast.error("Title, Description and Amount are required");
      return;
    }

    const res = await addTransaction(transaction);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Transaction created successfully");
      setOpen(false);
      router.refresh();
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("You are not authorized to create a transaction");
        return;
      }

      if (res.status === HttpStatusCode.BadRequest) {
        toast.error("Invalid transaction data");
        return;
      }

      toast.error("An error occured while creating transaction");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error occured, contact support");
      return;
    }
  }

  return (
    <>
      <TransactionForm transaction={transaction} setTransaction={setTransaction} />
      <div className="w-full">
        <Button className="w-full" onClick={async () => await handleTransactionCreation()}>
          Create
        </Button>
      </div>
    </>
  );
}

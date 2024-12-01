import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TransactionForm from "./transaction-form";
import { editTransaction } from "@/lib/actions/transactions/transactions";
import toast from "react-hot-toast";
import { HttpStatusTypes } from "@/lib/misc/constants";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";

interface Props {
  transaction: TransactionResponse;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function TransactionEditModal({ transaction: initTransaction, setOpen, open }: Props) {
  const [transaction, setTransaction] = useState(initTransaction);
  const router = useRouter();

  useEffect(() => {
    console.log(transaction.type);
  }, [transaction]);

  async function handleEdit() {
    const res = await editTransaction(transaction);

    if (res.type === HttpStatusTypes.Success) {
      router.refresh();
      toast.success("Transaction updated successfully");
      setOpen(false);
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("You are not authorized to edit this transaction");
        return;
      }

      if (res.status === HttpStatusCode.BadRequest) {
        toast.error("Invalid transaction data");
        return;
      }

      toast.error("An error occured while editing transaction");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error occured, contact support");
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogDescription>Edit the transaction details</DialogDescription>
      </VisuallyHidden>
      <DialogContent className="w-dvw h-dvh bg-transparent border-none flex items-center justify-center">
        <Card className="text-xs md:w-[36rem] w-96">
          <CardHeader className="py-5">
            <CardTitle className="text-[.8rem]">Edit Transaction</CardTitle>
            <CardDescription className="text-xs">Edit the transaction details</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <TransactionForm transaction={transaction} setTransaction={setTransaction as React.Dispatch<React.SetStateAction<Transaction>>} />
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-4">
            <Button onClick={handleEdit} className="w-full">
              Submit
            </Button>
            <Button onClick={() => setOpen(false)} className="bg-white border w-full border-black text-black hover:bg-black hover:text-white duration-100 ease-in-out">
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

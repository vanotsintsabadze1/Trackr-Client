import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  transaction: TransactionResponse;
  setTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  transactionModal: boolean;
}

export default function TransactionInformationModal({ transaction, transactionModal, setTransactionModal }: Props) {
  return (
    <Dialog open={transactionModal} onOpenChange={setTransactionModal}>
      <VisuallyHidden>
        <DialogTitle>Transaction</DialogTitle>
        <DialogDescription>Information about the transaction</DialogDescription>
      </VisuallyHidden>
      <DialogContent className="w-dvw h-dvh fixed flex items-center justify-center left-0 top-0 bg-black/50">
        <Card className="container max-w-96">
          <CardHeader>
            <CardTitle>Transaction Information</CardTitle>
            <CardDescription>Details about the transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 pb-4">
              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span>{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount</span>
                <span className="rounded-full px-2 text-xs bg-green-200 text-green-600 flex items-center justify-center">
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span>
                  {transaction.type === 0
                    ? "Appliances"
                    : transaction.type === 1
                    ? "Tax"
                    : transaction.type === 2
                    ? "Outside"
                    : transaction.type === 3
                    ? "Rent"
                    : transaction.type === 4
                    ? "Health"
                    : transaction.type === 5
                    ? "Food"
                    : transaction.type === 6
                    ? "Other"
                    : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Title</span>
                <span>{transaction.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{new Date(transaction.tranDate).toDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <DialogClose className="w-full">
              <Button className="w-full bg-white text-black border-black border hover:text-white hover:bg-black">
                Close
              </Button>
            </DialogClose>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

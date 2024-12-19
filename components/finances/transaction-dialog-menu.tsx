"use client";

import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import TransactionCreationCard from "./transaction-card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";

export default function TransactionDialogMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">+ Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="bg-transparent w-dvw h-dvh border-none bg-none flex items-center justify-center">
        <VisuallyHidden>
          <DialogTitle>Some Title</DialogTitle>
          <DialogDescription>Some Description</DialogDescription>
        </VisuallyHidden>
        <Card className="p-2 md:w-[36rem] w-96 h-fit">
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
            <CardDescription>Fill in the details of your transaction</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pb-4">
            <TransactionCreationCard setOpen={setOpen} />
          </CardContent>
          <CardFooter>
            <DialogClose asChild>
              <Button className="w-full bg-white text-black border-black border hover:text-white hover:bg-black">Close</Button>
            </DialogClose>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

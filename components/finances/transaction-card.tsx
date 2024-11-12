import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/misc/constants";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

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

  const textValues = {
    0: "Appliances",
    1: "Tax",
    2: "Outside",
    3: "Rent",
    4: "Health",
    5: "Food",
    6: "Other",
  };

  async function handleTransactionCreation() {
    if (transaction.type === -1) {
      toast.error("Type is required");
      return;
    }

    if (transaction.title === "" || transaction.description === "" || transaction.amount === 0) {
      toast.error("Title, Description and Amount are required");
      return;
    }

    const res = await fetch(`${API_URL}/v1/Transaction/AddTransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(transaction),
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Transaction created successfully");
      router.refresh();
      setOpen(false);
    }
  }

  return (
    <>
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Type</Label>
        <Select onValueChange={(v) => setTransaction((prev) => ({ ...prev, type: parseInt(v) }))}>
          <SelectTrigger className="w-full text-left px-2 h-10 border border-gray-200 rounded-lg text-xs">
            <SelectValue placeholder="Select a Type">
              {transaction.type !== -1 ? textValues[transaction.type as keyof typeof textValues] : "Select a Type"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white rounded-lg p-2 border-gray-300 border text-xs">
            <SelectGroup className="flex flex-col gap-2.5 overflow-y-auto">
              <SelectItem
                value="0"
                textValue="Appliances"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Appliances
              </SelectItem>
              <SelectItem
                value="1"
                textValue="Tax"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Tax
              </SelectItem>
              <SelectItem
                value="2"
                textValue="Outside"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Outside
              </SelectItem>
              <SelectItem
                value="3"
                textValue="Rent"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Rent
              </SelectItem>
              <SelectItem
                value="4"
                textValue="Health"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Health
              </SelectItem>
              <SelectItem
                value="5"
                textValue="Food"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Food
              </SelectItem>
              <SelectItem
                value="6"
                textValue="Other"
                className="hover:bg-black hover:text-white p-1 cursor-pointer font-medium rounded-md duration-150 ease-in-out"
              >
                Other
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2 flex-col">
          <Label className="text-xs">Title</Label>
          <Input
            placeholder="Enter title"
            onChange={(e) => setTransaction((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Description</Label>
        <Textarea
          className="resize-none"
          placeholder="Enter description"
          onChange={(e) => setTransaction((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <Label className="text-xs">Amount</Label>
        <Input
          placeholder="Enter amount"
          type="number"
          step="0.01"
          min={0}
          onChange={(e) => {
            console.log(e.target.value);
            setTransaction((prev) => ({ ...prev, amount: parseFloat(e.target.value) }));
          }}
        />
      </div>
      <div className="w-full">
        <Button className="w-full" onClick={async () => await handleTransactionCreation()}>
          Create
        </Button>
      </div>
    </>
  );
}

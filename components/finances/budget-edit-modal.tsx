"use client";

import { Label } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import CustomDialog from "../ui/CustomDialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import { updateBalance } from "@/lib/actions/transactions/transactions";
import { HttpStatusTypes } from "@/lib/misc/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

export default function BudgetEditModal({ setOpen, open }: Props) {
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEdit() {
    setLoading(true);

    const res = await updateBalance(budget);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Budget updated successfully");
      router.refresh();
      setOpen(false);
    }

    if (res.type === HttpStatusTypes.ClientError) {
      toast.error("Invalid data");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error, contact support");
    }

    setLoading(false);
  }

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <Card>
        <CardHeader className="text-xs">
          <CardTitle>Change Budget Limit</CardTitle>
          <CardDescription className="text-xs">Change the budget limit</CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Limit</Label>
          <Input placeholder="Budget Limit" type="number" step="0.01" min={0} value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} />
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={() => handleEdit()} className="w-full scale-90">
              {loading ? <LoadingSpinner size={12} /> : "Submit"}
            </Button>
            <Button onClick={() => setOpen(false)} className="w-full scale-90 bg-white border border-black hover:bg-black hover:text-white text-black duration-100 ease-in-out">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </CustomDialog>
  );
}

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { updateCostLimit } from "@/lib/actions/transactions/transactions";
import { HttpStatusTypes } from "@/lib/misc/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  initLimit: number;
}

export default function BudgetLimitChangingModal({ initLimit, setOpen, open }: Props) {
  const [limit, setLimit] = useState(initLimit);
  const router = useRouter();

  async function handleEdit() {
    const res = await updateCostLimit(limit);

    if (res.type === HttpStatusTypes.Success) {
      router.refresh();
      toast.success("Budget limit updated successfully");
      setOpen(false);
    }

    if (res.type === HttpStatusTypes.ClientError) {
      toast.error("Invalid input");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("An error occurred while updating the budget limit");
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Change Budget Limit</DialogTitle>
          <DialogDescription>Change the budget limit for the current month</DialogDescription>
        </DialogHeader>
      </VisuallyHidden>
      <DialogContent className="flex items-center justify-center w-dvw shadow-none h-fit">
        <Card>
          <CardHeader className="text-xs">
            <CardTitle>Change Budget Limit</CardTitle>
            <CardDescription className="text-xs">Change the budget limit</CardDescription>
          </CardHeader>
          <CardContent>
            <Label>Limit</Label>
            <Input placeholder="Budget Limit" type="number" step="0.01" min={0} value={limit} onChange={(e) => setLimit(parseFloat(e.target.value))} />
            <div className="flex flex-col gap-2 mt-4">
              <Button onClick={() => handleEdit()} className="w-full scale-90">
                Submit
              </Button>
              <Button onClick={() => setOpen(false)} className="w-full scale-90 bg-white border border-black hover:bg-black hover:text-white text-black duration-100 ease-in-out">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

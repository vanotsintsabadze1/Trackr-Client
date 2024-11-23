"use client";

import { Edit, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteTransaction } from "@/lib/actions/transactions/transactions";
import ConfirmationModal from "../ui/confirmation-modal";
import { HttpStatusTypes } from "@/lib/misc/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";
import TransactionEditModal from "./transaction-edit-modal";

interface Props {
  transaction: TransactionResponse;
}

export default function TransactionActions({ transaction }: Props) {
  const [confirmationModal, setConfirmationModalOpen] = useState(false);
  const [editModal, setEditModalOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const res = await deleteTransaction(transaction.id);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Transaction deleted successfully");
      router.refresh();
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("You are not authorized to delete this transaction");
        return;
      }

      if (res.status === HttpStatusCode.NotFound) {
        toast.error("Transaction not found");
        return;
      }

      toast.error("An error occured while deleting transaction");
    }

    if (res.type === HttpStatusTypes.Internal) {
      toast.error("Unexpected error occured, contact support");
      return;
    }
  }

  return (
    <>
      <ConfirmationModal callback={handleDelete} open={confirmationModal} setOpen={setConfirmationModalOpen} />
      <TransactionEditModal transaction={transaction} open={editModal} setOpen={setEditModalOpen} />
      <button className="hover:scale-105 duration-150 ease-in-out" onClick={() => setEditModalOpen(true)}>
        <Edit size={17} />
      </button>
      <button
        className="hover:scale-105 duration-150 ease-in-out text-red-600"
        onClick={() => {
          setConfirmationModalOpen(true);
        }}
      >
        <Trash2Icon size={17} color="red" />
      </button>
    </>
  );
}

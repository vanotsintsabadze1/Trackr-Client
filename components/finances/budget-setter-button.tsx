"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";
import BudgetEditModal from "./budget-edit-modal";

export default function BudgetEditButton() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <button onClick={() => setIsEditing(true)} className="h-fit hover:scale-105 duration-100 ease-in-out hover:text-black text-gray-400">
        <Pencil size={12} />
      </button>

      {isEditing && <BudgetEditModal setOpen={setIsEditing} open={isEditing} />}
    </>
  );
}

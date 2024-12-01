import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props {
  setTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
  transaction: Transaction;
}

export default function TransactionTypeSelector({ setTransaction, transaction }: Props) {
  const textValues = {
    0: "Appliances",
    1: "Tax",
    2: "Outside",
    3: "Rent",
    4: "Health",
    5: "Food",
    6: "Other",
  };

  return (
    <div className="flex gap-2 flex-col relative w-full">
      <Label className="text-xs">Type</Label>
      <Select
        onValueChange={(v) => {
          if (!isNaN(parseInt(v))) {
            setTransaction((prev) => ({ ...prev, type: parseInt(v) }));
          }
        }}
      >
        <SelectTrigger className="w-full text-left px-2 h-10 border border-gray-200 rounded-lg text-xs">
          <SelectValue placeholder="Select a Type">{transaction.type !== -1 ? textValues[transaction.type as keyof typeof textValues] : "Select a Type"}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg border-gray-300 border text-xs py-2 w-full">
          <SelectGroup className="flex flex-col gap-2.5 overflow-y-auto z-40">
            <SelectItem value="0" textValue="Appliances" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Appliances
            </SelectItem>
            <SelectItem value="1" textValue="Tax" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Tax
            </SelectItem>
            <SelectItem value="2" textValue="Outside" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Outside
            </SelectItem>
            <SelectItem value="3" textValue="Rent" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Rent
            </SelectItem>
            <SelectItem value="4" textValue="Health" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Health
            </SelectItem>
            <SelectItem value="5" textValue="Food" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Food
            </SelectItem>
            <SelectItem value="6" textValue="Other" className="hover:!bg-black text-xs hover:!text-white p-2 cursor-pointer font-medium rounded-md duration-150 ease-in-out">
              Other
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

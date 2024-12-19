"use client";

import { useState } from "react";
import TransactionInformationModal from "./transaction-information-modal";
import TransactionActions from "./transaction-actions";

interface Props {
  transactions: TransactionResponse[] | RequestError;
}

export default function FinancesTable({ transactions }: Props) {
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl px-6">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-medium">
                {Array.isArray(transactions) && transactions.length === 0 && !("code" in transactions) && (
                  <tr className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 bg-white`}>
                    <td colSpan={6} className="py-3 px-6 text-center">
                      <span>Nothing to show</span>
                    </td>
                  </tr>
                )}
                {"code" in transactions ? (
                  <tr className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 bg-white`}>
                    <td colSpan={5} className="py-3 px-6 text-center">
                      <span>Loading</span>
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      onClick={() => {
                        setSelectedTransaction(index);
                        setTransactionModal(true);
                      }}
                      className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                    >
                      <td className="py-3 px-6 text-left">
                        <span>{transaction.title}</span>
                      </td>
                      <td className="py-3 px-6 text-left truncate max-w-[5rem]">
                        <span>{transaction.description}</span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="py-1 px-3 rounded-full text-xs text-green-600 bg-green-200">
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
                      </td>
                      <td className="py-3 px-6 text-right whitespace-nowrap">
                        <span className="text-green-600">${transaction.amount.toFixed(2)}</span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span>{new Date(transaction.tranDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div onClick={(e) => e.stopPropagation()} className="flex gap-x-2.5 items-center justify-center w-full">
                          <TransactionActions transaction={transaction} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {!("code" in transactions) && transactionModal && (
        <TransactionInformationModal setTransactionModal={setTransactionModal} transactionModal={transactionModal} transaction={transactions[selectedTransaction]} />
      )}
    </>
  );
}

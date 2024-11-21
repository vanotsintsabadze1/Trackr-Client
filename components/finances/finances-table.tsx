"use client";

import { useState } from "react";
import TransactionInformationModal from "./transaction-information-modal";

interface Props {
  transactions: TransactionResponse[];
}

export default function FinancesTable({ transactions }: Props) {
  const [transactionModal, setTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(0);

  return (
    <>
      <div className="flex justify-center items-centers">
        <div className="w-full max-w-4xl px-6">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-right">Amount</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Title</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-medium">
                {transactions ? (
                  transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      onClick={() => {
                        setSelectedTransaction(index);
                        setTransactionModal(true);
                      }}
                      className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium truncate w-10">{transaction.id}</span>
                      </td>
                      <td className="py-3 px-6 text-right whitespace-nowrap">
                        <span className="text-green-600">${transaction.amount.toFixed(2)}</span>
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
                      <td className="py-3 px-6 text-left">
                        <span>{transaction.title}</span>
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span>{new Date(transaction.tranDate).toLocaleDateString()}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={`border-b border-gray-200 cursor-pointer hover:bg-gray-100 bg-white`}>
                    <td colSpan={5} className="py-3 px-6 text-center">
                      <span>Loading</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {transactionModal && (
        <TransactionInformationModal
          setTransactionModal={setTransactionModal}
          transactionModal={transactionModal}
          transaction={transactions[selectedTransaction]}
        />
      )}
    </>
  );
}

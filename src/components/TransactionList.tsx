import { useState } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: TransactionListProps) {
  const [, setEditing] = useState<Transaction | null>(null); // Track editing state with correct type

  const handleEdit = (transaction: Transaction) => {
    // Set the transaction to be edited
    setEditing(transaction);
    onEdit(transaction);
  };

  // Check if transactions is an array and has content before attempting to map
  if (!Array.isArray(transactions)) {
    console.error("Transactions is not an array:", transactions);
    return <div>Error: Transactions data is not available.</div>;
  }

  return (
    <div className="mt-4">
      {transactions.length === 0 ? (
        <div>No transactions available</div> // Display a message if no transactions exist
      ) : (
        transactions.map((tx) => (
          <div
            key={tx._id}
            className="border p-3 mt-2 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{tx.description}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-green-600 font-bold">
                Rs{" " + tx.amount}
              </span>
              <button
                onClick={() => {
                  if (tx._id) onDelete(tx._id);
                }}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(tx)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

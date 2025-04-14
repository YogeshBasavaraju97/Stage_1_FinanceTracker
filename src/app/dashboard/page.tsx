"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseBarChart from "@/components/ExpenseBarChart";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    console.log(data);

    // Check if data contains the transactions array
    if (Array.isArray(data.transactions)) {
      setTransactions(data.transactions); // Correctly access the array
    } else {
      console.error("No valid transactions array in response:", data);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddOrEdit = async (transaction: Transaction) => {
    if (editingTransaction) {
      // setTransactions((prev) =>
      //   prev.map((tx) => (tx._id === transaction._id ? transaction : tx))
      // );

      console.log(transaction);
      try {
        const { _id } = transaction;
        const res = await fetch(`/api/transactions/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(transaction),
        });
        console.log(res);
        if (res.ok) {
          // Handle editing
          const newTransactions = res?.transactions;
          setTransactions((prev) => [...prev, newTransactions]);
          setEditingTransaction(null); // Close the form after editing
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await fetch(`/api/transactions/`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(transaction),
        });

        if (res.ok) {
          setTransactions((prev) => [...prev, transaction]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Deleting transaction with ID:", id);
    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
    console.log(res);

    if (res.ok) {
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
      console.log("Transaction deleted successfully");
      setEditingTransaction(null);
    } else {
      console.log("Failed to delete transaction");
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    console.log("Editing transaction:", transaction);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-3xl font-semibold">Personal Finance Tracker</h1>
        <p className="text-lg">
          Keep track of your expenses and manage your finances
        </p>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Transaction Form */}
        <TransactionForm
          onSubmit={handleAddOrEdit} // Use a unified submit handler for add/edit
          transaction={editingTransaction} // Pass transaction for edit
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Bar Chart */}
          <div className="col-span-1">
            {/* <ExpenseBarChart transactions={transactions} /> */}
          </div>

          {/* Transaction List */}
          <div className="col-span-1">
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              onEdit={handleEdit} // Pass the handleEdit function here
            />
          </div>
        </div>
      </div>
    </div>
  );
}

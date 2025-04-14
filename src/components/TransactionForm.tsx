import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionFormProps {
  onSubmit: (transaction: Transaction) => void;
  transaction?: Transaction | null; // Optional, for editing
}

const TransactionForm = ({ onSubmit, transaction }: TransactionFormProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | string>("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
      setDate(new Date(transaction.date).toISOString().split("T")[0]);
    }
  }, [transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction = {
      _id: transaction?._id || "",
      description,
      amount: Number(amount),
      date,
    };
    onSubmit(newTransaction);
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {transaction ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;

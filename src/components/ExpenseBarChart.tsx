"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define types for the transaction and chart data
interface Transaction {
  date: string; // Assuming date is a string, change if it's a Date object
  amount: number;
}

interface ChartData {
  month: string;
  amount: number;
}

export default function ExpenseBarChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  // If transactions is not an array, show an error message
  if (!Array.isArray(transactions)) {
    return <div>Error: Transactions data is not available</div>;
  }

  const monthlyData: Record<string, number> = transactions.reduce(
    (acc: Record<string, number>, tx: Transaction) => {
      const month = new Date(tx.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + tx.amount;
      return acc;
    },
    {}
  );

  const chartData: ChartData[] = Object.entries(monthlyData).map(
    ([month, amount]) => ({
      month,
      amount,
    })
  );

  // If there's no data to show, return an empty chart
  if (chartData.length === 0) {
    return (
      <div className="h-64 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[]}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64 mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3b82f6" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

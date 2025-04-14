"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpenseBarChart({
  transactions,
}: {
  transactions: any[];
}) {
  if (!Array.isArray(transactions)) {
    return <div>Error: Transactions data is not available</div>;
  }

  const monthlyData = transactions.reduce((acc: any, tx: any) => {
    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + Number(tx.amount);
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Check if chartData is empty, if so, return a message
  if (chartData.length === 0) {
    return;
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

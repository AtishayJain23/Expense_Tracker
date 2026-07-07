import { useEffect, useState } from "react";

import { getSummary } from "../api/dashboard.api";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const response = await getSummary();

      setSummary(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500">Total Income</h2>

          <p className="text-3xl font-bold mt-2">₹{summary.totalIncome}</p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500">Total Expense</h2>

          <p className="text-3xl font-bold mt-2">₹{summary.totalExpense}</p>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-gray-500">Balance</h2>

          <p className="text-3xl font-bold mt-2">₹{summary.balance}</p>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
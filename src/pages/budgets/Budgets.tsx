import axios from "axios";
import Budget from "../../models/Budget";
import { useEffect, useState } from "react";

const Budgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/budgets");
      setBudgets(response.data);
      console.log(budgets);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold my-1">Budgets</h1>
        <button className="bg-indigo-500 w-36 hover:bg-indigo-600 text-white font-bold rounded sm:w-40 lg:w-40">
          Create Budget
        </button>
      </div>
      <div className="w-full h-full text-center">
        <table className="w-full h-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Amount Left</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget: Budget) => (
              <tr className="border-b" key={budget.id}>
                <td className="py-2 px-4">{budget.name}</td>
                <td className="py-2 px-4">{budget.amount}</td>
                <td className="py-2 px-4">0</td>
                <td className="py-2 px-4">edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budgets;

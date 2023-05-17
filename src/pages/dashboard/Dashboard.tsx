import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Account */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
          <h3 className="text-lg">$ 200 . 00</h3>
        </div>

        {/* Budget */}
        <Link to={"/budgets"}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Budgets</h2>
          </div>
        </Link>

        {/* Cards */}
        <Link to={"/cards"}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Cards</h2>
          </div>
        </Link>

        {/* Transactions */}
        <Link to={"/transactions"}>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

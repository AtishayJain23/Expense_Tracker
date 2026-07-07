import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="
      w-64
      h-screen
      border-r
      p-4"
    >
      <h1
        className="
        text-2xl
        mb-6"
      >
        Expense Tracker
      </h1>

      <nav
        className="
        flex
        flex-col
        gap-3"
      >
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/categories">Categories</Link>

        <Link to="/transactions">Transactions</Link>
      </nav>
    </div>
  );
}

export default Sidebar;

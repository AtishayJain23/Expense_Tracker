import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div
      className="
      flex"
    >
      <Sidebar />

      <div
        className="
        flex-1
        p-6"
      >
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;

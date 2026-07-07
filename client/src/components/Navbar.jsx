import { useNavigate } from "react-router-dom";

import { logout } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="
      flex
      justify-between
      items-center
      border-b
      pb-4
      mb-6"
    >
      <h2
        className="
        text-xl"
      >
        Welcome, {user?.name}
      </h2>

      <button
        onClick={handleLogout}
        className="
        border
        px-4
        py-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;

import { Navigate, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { BarLoader } from "react-spinners";
import { AuthContext } from "../auth";
import Fallback from "./fallback";

export default function Root() {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await auth.signout();
    setLoading(false);
  };

  if (auth.userLoading) return <Fallback />;
  if (!auth.user) return <Navigate to="/login" />;

  return (
    <div className="root">
      <BarLoader
        color="#1f2937"
        height={1}
        style={{ position: "absolute", top: 0, width: "100%" }}
        loading={loading}
      />
      <nav className="navbar">
        <span>Todos</span>
        <span onClick={loading ? undefined : handleLogout}>
          Logout
          <img width={16} height={16} alt="logout" src="logout.png" />
        </span>
      </nav>
      <Outlet />
    </div>
  );
}

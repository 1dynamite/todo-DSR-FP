import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { BarLoader } from "react-spinners";
import { AuthContext } from "../auth";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signout();
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
    setLoading(false);
  };

  if (auth.userLoading) return <div></div>;
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
        {auth.user.role === "admin" && (
          <>
            <NavLink
              to="/users"
              className="router-link"
              style={({ isActive }) =>
                isActive ? { textDecoration: "underline" } : undefined
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/todos"
              className="router-link"
              style={({ isActive }) =>
                isActive ? { textDecoration: "underline" } : undefined
              }
            >
              Todos
            </NavLink>
          </>
        )}
        <span onClick={loading ? undefined : handleLogout}>
          Logout
          <img width={16} height={16} alt="logout" src="logout.png" />
        </span>
      </nav>
      <Outlet />
    </div>
  );
}

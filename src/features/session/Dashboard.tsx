import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutAsync, selectSession } from "./sessionSlice";
import Barloader from "../../components/barloader";
import { useState } from "react";

export default function Dashboard() {
  const session = useAppSelector(selectSession);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useAppDispatch();

  if (!session) return <Navigate to="/login" />;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(logoutAsync());
    setIsLoggingOut(false);
  };

  return (
    <div className="root">
      <Barloader loading={isLoggingOut} />
      <nav className="navbar">
        <span>Todos</span>
        {session.role === "admin" && (
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
        <span onClick={isLoggingOut ? undefined : handleLogout}>
          Logout
          <img width={16} height={16} alt="logout" src="logout.png" />
        </span>
      </nav>
      <Outlet />
    </div>
  );
}

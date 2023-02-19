import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { logout, useSession } from "../api";
import { mutate } from "swr";
import { HttpError, User } from "../types";

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: User };

  const { user, error } = useSession(state, (error: HttpError) => {
    if (error && error.status === 401) return navigate("/login");
    if (error) toast.error(error.message);
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (error) return <div></div>;

  // this will avoid waterfalls
  if (!user) return <Outlet />;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // clear all cache
      mutate(() => true, undefined, { revalidate: false });
      navigate("/login");
    } catch (err) {
      if (err instanceof HttpError && err.status === 401)
        return navigate("/login");
      if (err instanceof Error) toast.error(err.message);
    }
    setIsLoggingOut(false);
  };

  return (
    <div className="root">
      <BarLoader
        color="#1f2937"
        height={1}
        style={{ position: "absolute", top: 0, width: "100%" }}
        loading={isLoggingOut}
      />
      <nav className="navbar">
        <span>Todos</span>
        {user?.role === "admin" && (
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
      <Outlet context={user} />
    </div>
  );
}

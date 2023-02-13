import {
  LoaderFunctionArgs,
  Navigate,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getCurrentSession, logout } from "../api";

export interface User {
  name: string;
  role: "admin" | "user";
}

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    return await getCurrentSession(request.signal);
  } catch (err) {
    if (err instanceof Error && err.cause === 401) throw redirect("/login");
    throw err;
  }
}

export default function Dashboard() {
  const user = useLoaderData() as User;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
    setLoading(false);
  };

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
        {user.role === "admin" && (
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
      <Outlet context={user} />
    </div>
  );
}

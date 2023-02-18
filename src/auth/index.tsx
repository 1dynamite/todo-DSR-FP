import { Navigate, useOutletContext } from "react-router-dom";
import { User } from "../types";

export function AdminRoute({ children }: { children: JSX.Element }) {
  const user = useOutletContext() as User | undefined;

  if (!user) return children;

  if (user.role !== "admin") return <Navigate to="/todos" replace={true} />;

  return children;
}

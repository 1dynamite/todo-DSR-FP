import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { getCurrentSession, login, logout } from "../api";

interface User {
  name: string;
  role: "admin" | "user";
}
interface Auth {
  user: User | null;
  signin: (f: FormData) => Promise<void>;
  signout: () => Promise<void>;
  userLoading: boolean;
}

export const AuthContext = createContext<Auth>(null!);

export function ProvideAuth(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const user = await getCurrentSession(signal);
        setUserLoading(false);

        setUser(user);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return; // Development mode only
        setUserLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const signin = async (f: FormData) => {
    try {
      const body = JSON.stringify({
        login: f.get("login"),
        password: f.get("password"),
      });

      const user = await login(body);
      setUser(user);

      redirect("/todos");
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  const signout = async () => {
    try {
      await logout();
      setUser(null);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout, userLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function AdminRoute(props: { children: JSX.Element }) {
  const auth = useContext(AuthContext);

  return auth.user?.role === "admin" ? (
    props.children
  ) : (
    <Navigate to="/login" />
  );
}

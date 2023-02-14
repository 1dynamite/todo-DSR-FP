import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { getCurrentSession, login, logout } from "../api";
import ErrorComponent from "../components/error";

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
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const user = await getCurrentSession(signal);
        setUserLoading(false);

        setUser(user);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof Error && err.cause !== 401) setServerError(true);
        else setServerError(false);
        setUserLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  const signin = async (f: FormData) => {
    try {
      const body = {
        login: f.get("login") as string,
        password: f.get("password") as string,
      };

      const user = await login(body);
      setUser(user);
    } catch (err) {
      throw err;
    }
  };

  const signout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      throw err;
    }
  };

  return serverError ? (
    <ErrorComponent />
  ) : (
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
    <Navigate to="/todos" />
  );
}

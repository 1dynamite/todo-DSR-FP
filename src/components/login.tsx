import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../auth";
import Fallback from "./fallback";

export default function Login() {
  const auth = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget) return;

    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await auth.signin(formData);
    setLoading(false);
  };

  if (auth.userLoading) return <Fallback />;
  if (auth.user) return <Navigate to="/todos" />;

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <ul>
        <li>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="login" required />
        </li>
        <li>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </li>
      </ul>
      <button type="submit" disabled={loading}>
        Submit
        <ClipLoader
          size={15}
          color="white"
          className="clip-loader"
          loading={loading}
        />
      </button>
    </form>
  );
}

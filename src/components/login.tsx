import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { login } from "../api";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget) return;

    const formData = new FormData(e.currentTarget);
    const body = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);

    try {
      await login(body);

      navigate("/todos");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="login">
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
    </div>
  );
}

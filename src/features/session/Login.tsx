import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Form from "../../components/Form";
import { SerializedFormData } from "../../types";
import { loginAsync, selectSession } from "./sessionSlice";

export default function Login() {
  const session = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (session) return <Navigate to="/todos" />;

  const handleSubmit = async (data: SerializedFormData) => {
    const loginData = data as { login: string; password: string };

    setIsLoggingIn(true);
    await dispatch(loginAsync(loginData));
    setIsLoggingIn(false);
  };

  return (
    <div className="login">
      <Form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoggingIn}>
          Submit
          <ClipLoader
            size={15}
            color="white"
            className="clip-loader"
            loading={isLoggingIn}
          />
        </button>
      </Form>
    </div>
  );
}

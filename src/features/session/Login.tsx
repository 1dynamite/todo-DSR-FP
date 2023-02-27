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

  /*  
    I really don't see why handleSubmit needs to be wrapped in useCallback. I am not sure, but 
    here are my thoughts.
    1. This login component rarely re-renders, only once or twice, so optimizing re-renders
       would be very premature.
    2. To prevent re-renders of Form element, and for useCallback to work, i would have to
       wrap the Form element in memo, which is a lot of work for so small improvement in performance.
 */
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

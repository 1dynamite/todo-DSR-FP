import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Login from "./features/session/Login";
import {
  fetchSessionUserAsync,
  selectSessionStatus,
} from "./features/session/sessionSlice";
import Dashboard from "./features/session/Dashboard";
import Error from "./components/error";
import Todos from "./features/todos/Todos";
import Users from "./features/users/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "todos",
        element: <Todos />,
      },
      {
        index: true,
        element: <Todos />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectSessionStatus);

  useEffect(() => {
    const promise = dispatch(fetchSessionUserAsync());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  );
}

export default App;

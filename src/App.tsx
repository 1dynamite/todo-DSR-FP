import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/users";
import Todos from "./components/todos";
import Login from "./components/login";
import Error from "./components/error";
import Dashboard from "./components/dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AdminRoute } from "./auth";
import { SWRConfig } from "swr";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: "users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "todos",
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
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" hideProgressBar />
    </SWRConfig>
  );
}

export default App;

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/users";
import Todos from "./components/todos";
import Login from "./components/login";
import Error from "./components/error";
import { AdminRoute } from "./auth";
import Dashboard, { loader as DashboardLoader } from "./components/dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
    loader: DashboardLoader,
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
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  );
}

export default App;

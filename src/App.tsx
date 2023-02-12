import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/users";
import Todos from "./components/todos";
import Login from "./components/login";
import Error from "./components/error";
import { AdminRoute } from "./auth";
import UserDashboard from "./components/dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Root from "./components/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <UserDashboard />,
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
    ],
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

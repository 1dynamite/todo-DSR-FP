import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./components/users";
import Todos from "./components/todos";
import Login from "./components/login";
import Error from "./components/error";
import { AdminRoute, ProvideAuth } from "./auth";
import Root from "./components/root";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    <>
      <div className="app">
        <ProvideAuth>
          <RouterProvider router={router} />
        </ProvideAuth>
      </div>
      <ToastContainer position="bottom-center" hideProgressBar />
    </>
  );
}

export default App;

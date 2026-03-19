import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { OrderDetail } from "./pages/OrderDetail";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "order/:id", element: <OrderDetail /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);

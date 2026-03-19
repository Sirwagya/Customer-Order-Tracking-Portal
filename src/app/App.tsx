import { RouterProvider } from "react-router";
import { router } from "./routes";

// Force reload 3
export default function App() {
  return <RouterProvider router={router} />;
}

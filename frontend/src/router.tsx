import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ element: "", path: "/" }],
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import AuthRequiredProvider from "./utils/AuthRequiredProvider";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { element: "", path: "/" },
      {
        path: "test",
        element: <AuthRequiredProvider>Test</AuthRequiredProvider>,
      },
    ],
  },
]);

export default router;

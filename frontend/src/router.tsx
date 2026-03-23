import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import AuthRequiredProvider from "./utils/AuthRequiredProvider";
import { Profile } from "./components/Profile/Profile";
import { Settings } from "./components/Settings/Settings";
import { MainPage } from "./components/pages/MainPage/MainPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      { element: <MainPage />, index: true },
      {
        path: "test",
        element: <AuthRequiredProvider>Test</AuthRequiredProvider>,
      },
      { path: "profile", element: <Profile></Profile> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;

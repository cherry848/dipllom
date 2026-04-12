import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import AuthRequiredProvider from "./utils/AuthRequiredProvider";
import { Profile } from "./components/Profile/Profile";
import { Settings } from "./components/Settings/Settings";
import { MainPage } from "./components/pages/MainPage/MainPage";
import { CourseInfoPage } from "./components/pages/CourseInfoPage/CourseInfoPage";
import { Progress } from "./components/pages/Progress/Progress";
import { Catalog } from "./components/pages/Catalog/Catalog";

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
      { path: "settings", element: <MainPage /> },
      {
        path: "course/:id",
        children: [{ path: "info", element: <CourseInfoPage /> }],
      },
      {
        path: "progress",
        element: <Progress />,
      },
      { path: "catalog", element: <Catalog /> },
    ],
  },
]);

export default router;

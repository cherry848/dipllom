import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import { MainPage } from "./components/pages/MainPage/MainPage";
import { CourseInfoPage } from "./components/pages/CourseInfoPage/CourseInfoPage";
import { Progress } from "./components/pages/Progress/Progress";
import { Catalog } from "./components/pages/Catalog/Catalog";
import { ProfilePage } from "./components/pages/ProfilePage/ProfilePage";
import AuthRequired from "./utils/AuthRequired";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      { element: <MainPage />, index: true },
      {
        path: "profile",
        element: (
          <AuthRequired>
            <ProfilePage />
          </AuthRequired>
        ),
      },
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

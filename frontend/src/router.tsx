import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import { MainPage } from "./components/pages/MainPage/MainPage";
import { CourseInfoPage } from "./components/pages/CourseInfoPage/CourseInfoPage";
import { Catalog } from "./components/pages/Catalog/Catalog";
import { ProfilePage } from "./components/pages/ProfilePage/ProfilePage";
import AuthRequired from "./utils/AuthRequired";
import { CourseWalkthrough } from "./components/pages/CourseWalkthrough/CourseWalkthrough";

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
        children: [
          { path: "info", element: <CourseInfoPage /> },
          { path: "walkthrough", element: <CourseWalkthrough /> },
        ],
      },
      { path: "catalog", element: <Catalog /> },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import { MainPage } from "./components/pages/MainPage/MainPage";
import { CourseInfoPage } from "./components/pages/CourseInfoPage/CourseInfoPage";
import { Catalog } from "./components/pages/Catalog/Catalog";
import { ProfilePage } from "./components/pages/ProfilePage/ProfilePage";
import AuthRequired from "./utils/AuthRequired";
import { CourseWalkthrough } from "./components/pages/CourseWalkthrough/CourseWalkthrough";
import { CourseModules } from "./components/pages/CourseModules/CourseModules";
import { CourseAction } from "./components/pages/CourseCreate/CourseAction";
import { CourseStepEditPage } from "./components/pages/CourseStepEditPage/CourseStepEditPage";

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
      {
        path: "course/:id",
        children: [
          { path: "info", element: <CourseInfoPage /> },
          { path: "walkthrough", element: <CourseWalkthrough /> },
        ],
      },
      {
        path: "course",
        children: [
          { path: ":id/info", element: <CourseInfoPage /> },
          { path: ":id/modules", element: <CourseModules /> },
          {
            path: ":id/update",
            element: (
              <AuthRequired>
                <CourseAction />
              </AuthRequired>
            ),
          },
          {
            path: "create",
            element: (
              <AuthRequired>
                <CourseAction />
              </AuthRequired>
            ),
          },
          {
            path: ":courseId/modules/:moduleId/steps/:stepId/edit",
            element: (
              <AuthRequired>
                <CourseStepEditPage />
              </AuthRequired>
            ),
          },
        ],
      },
      { path: "catalog", element: <Catalog /> },
    ],
  },
]);

export default router;

import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

import Home from "@/pages/Home";
import DashBoard from "@/layouts/Dashboard";
import Projects from "@/pages/Projects";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <DashBoard />,
    children: [
      {
        path: "/:projectId",
        element: <Projects />,
      },
    ]
  },
]);

const Router = () => <RouterProvider router={router} />

export default Router;
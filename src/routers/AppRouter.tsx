import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";

import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Endpoints from "@/pages/Endpoints";
import TestCases from "@/pages/TestCases";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
    children: [
      {
        path: ":projectId/endpoints",
        element: <Endpoints />,
        children: [
          {
            path: ":endpointId/test-cases",
            element: <TestCases />,
          },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />

export default Router;
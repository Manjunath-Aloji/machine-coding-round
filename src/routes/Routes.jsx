import { Home, Courses, Batches } from "../pages";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/otp-form" />,
      },
      {
        path: "/otp-form",
        index : true,
        element: <Home />,
      },
      {
        path: "/course-list",
        element: <Courses />,
      },
      {
        path: "/batches",
        element: <Batches />,
      },
    ],
  },
]);

export default routes;

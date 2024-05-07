import { createBrowserRouter } from "react-router-dom";
import HomePage from "./assets/pages/HomePage";
import Layout from "./assets/pages/Layout";
import MediaPage from "./assets/pages/MediaPage";
import ErrorPage from "./assets/pages/ErrorPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "media/:id", element: <MediaPage /> },
    ],
  },
]);

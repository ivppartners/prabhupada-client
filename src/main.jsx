import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import ErrorPage from "./errorPage";
import Bhajans from "./routes/bhajans";
import Groti from "./routes/groti";
import Kirtans from "./routes/kirtans";
import Lectures from "./routes/lectures";
import { StateProvider } from "./StateContext";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <Lectures />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/play/:id",
    element: <Groti />,
  },
  {
    path: "/lectures",
    element: <Lectures />,
  },
  {
    path: "/bhajans",
    element: <Bhajans />,
  },
  {
    path: "/kirtans",
    element: <Kirtans />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider>
      <RouterProvider router={router} />
    </StateProvider>
  </React.StrictMode>
);

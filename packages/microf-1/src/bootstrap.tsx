import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello from App</h1>
      </div>
    ),
  },
  {
    path: "/test1",
    element: <Test1 />,
  },
  {
    path: "/test2",
    element: <Test2 />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { createBrowserRouter } from "react-router-dom";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";

const appRoutes = createBrowserRouter([
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

export default appRoutes;

import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import App from "../App";
import MainCon from "../components/MainCon";
import Signup from "../components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "markdown",
    element: <MainCon />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

export default router;

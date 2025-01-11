import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import MainCon from "../components/MainCon";
import Signup from "../components/Signup";
import ForgotPass from "../components/ForgotPass";
import SuccessMessage from "../components/SuccessMessage";
import ResetPassword from "../components/ResetPassword";

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
  {
    path: "forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "success-message",
    element: <SuccessMessage />,
  },
  {
    path: "reset-password/:token",
    element: <ResetPassword />,
  },
]);

export default router;

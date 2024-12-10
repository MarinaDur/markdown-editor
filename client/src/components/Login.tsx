import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Paragraph from "../ui/Paragraph";
import LabelInput from "../ui/LabelInput";
import Container from "../ui/Container";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import EyeIcon from "../ui/EyeIcon";
import { useMarkdown } from "../context/MarkdownContext";
import ErrorPopUp from "../ui/ErrorPopUp";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/apiCalls";
import axios from "axios";

const StyledParForgotPassword = styled(Paragraph)`
  color: var(--cl-text-main);
`;

const StyledPasswordCon = styled(Container)`
  gap: 0.5rem;
  align-items: flex-end;
  position: relative;
`;

function Login() {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
    // handleLogin,
    handleError,
    // setIsLoggedIn,
    // handleLogout,
  } = useMarkdown();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      navigate("/markdown");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message);
        console.log(error.response);
      } else {
        // setIsLoggedIn(false);

        handleError("An unexpected error occurred");
        console.error("An unexpected error occurred:", error);
      }
    },
  });
  return (
    <LoginSignupTemp
      welcomeText="Welcome back"
      descText="Please login to your account"
      buttonText="Login"
      footerText="Don't have an account? Sign Up"
      handleClick={(e) =>
        handleLogin(e as React.FormEvent<HTMLFormElement>, navigate)
      }
    >
      <LabelInput name="Email:" htmlFor="email" />
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        value={email || ""}
        handleChange={handleEmail}
      />
      <StyledPasswordCon>
        <LabelInput name="Password:" htmlFor="password" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password || ""}
          handleChange={handlePassword}
        />
        <EyeIcon bottom="51%" />
        <StyledParForgotPassword $type="all">
          Forgot password?
        </StyledParForgotPassword>
      </StyledPasswordCon>
      <ErrorPopUp />
    </LoginSignupTemp>
  );
}

export default Login;

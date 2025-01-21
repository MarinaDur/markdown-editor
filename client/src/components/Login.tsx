import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Paragraph from "../ui/Paragraph";
import LabelInput from "../ui/LabelInput";
import Container from "../ui/Container";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import EyeIcon from "../ui/EyeIcon";
import { useMarkdown } from "../context/MarkdownContext";
import ErrorPopUp from "../ui/ErrorPopUp";
import { useMutation } from "@tanstack/react-query";
import { login } from "../utils/apiCalls";
import axios from "axios";

const StyledParForgotPassword = styled(Paragraph)`
  color: var(--cl-orange);
  text-decoration: underline;
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
    handleError,
    setEmail,
    setPassword,
    showPassword,
    togglePasswordVisibility,
  } = useMarkdown();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/markdown");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message);
      } else {
        handleError("An unexpected error occurred");
      }
    },
    onSettled: () => {
      setEmail("");
      setPassword("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  }
  return (
    <LoginSignupTemp
      welcomeText="Welcome Back"
      descText="Please login to your account"
      buttonText="Login"
      footerText="Don't have an account?"
      link="Sign up"
      href="/signup"
      handleClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
      isLoading={loginMutation.isPending}
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
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Password"
          value={password || ""}
          handleChange={handlePassword}
        />
        <EyeIcon
          bottom="51%"
          showPassword={showPassword}
          handlePasswordVisibility={togglePasswordVisibility}
        />
        <StyledParForgotPassword as="a" $type="all" href="/forgot-password">
          Forgot password?
        </StyledParForgotPassword>
      </StyledPasswordCon>
      <ErrorPopUp />
    </LoginSignupTemp>
  );
}

export default Login;

import { styled } from "styled-components";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import LabelInput from "../ui/LabelInput";
import Input from "../ui/Input";
import Container from "../ui/Container";
import EyeIcon from "../ui/EyeIcon";
import { useMarkdown } from "../context/MarkdownContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../utils/apiCalls";
import axios from "axios";
import ErrorPopUp from "../ui/ErrorPopUp";

const StyledPasswordCon = styled(Container)`
  align-items: flex-end;
  position: relative;
`;

function Signup() {
  const {
    email,
    password,
    handleEmail,
    handlePassword,
    userName,
    handleUserName,
    handlePasswordConfirm,
    passwordConfirm,
    handleError,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setUserName,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = useMarkdown();

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signup,
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
      setPasswordConfirm("");
      setUserName("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signupMutation.mutate({ userName, email, password, passwordConfirm });
  }
  return (
    <LoginSignupTemp
      welcomeText="Welcome!"
      descText="Create your account"
      buttonText="Sign up"
      footerText="Already have an account?"
      link="Login"
      href="/"
      handleClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
    >
      <LabelInput name="Name:" htmlFor="name" />
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={userName || ""}
        handleChange={handleUserName}
      />
      <LabelInput name="Email:" htmlFor="email" />
      <Input
        type="text"
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
          bottom="25%"
          showPassword={showPassword}
          handlePasswordVisibility={togglePasswordVisibility}
        />
      </StyledPasswordCon>
      <StyledPasswordCon>
        <LabelInput name="Confirm password:" htmlFor="confirmPassword" />
        <Input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={passwordConfirm || ""}
          handleChange={handlePasswordConfirm}
        />
        <EyeIcon
          bottom="25%"
          showPassword={showConfirmPassword}
          handlePasswordVisibility={toggleConfirmPasswordVisibility}
        />
      </StyledPasswordCon>
      <ErrorPopUp />
    </LoginSignupTemp>
  );
}

export default Signup;

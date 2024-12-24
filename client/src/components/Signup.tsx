import { styled } from "styled-components";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import LabelInput from "../ui/LabelInput";
import Input from "../ui/Input";
import Container from "../ui/Container";
import EyeIcon from "../ui/EyeIcon";
import { useMarkdown } from "../context/MarkdownContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createDefaultDocs, signup } from "../utils/apiCalls";
import axios from "axios";

const StyledPasswordCon = styled(Container)`
  align-items: flex-end;
  position: relative;
`;

const StyledEyeIcon = styled.div`
  position: absolute;
  bottom: 50%;
  right: 1rem;
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
    // handleLogin,
    handleError,
    setEmail,
    setPassword,
    // setIsLoggedIn,
    // handleLogout,
    setPasswordConfirm,
    setUserName,
  } = useMarkdown();

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      // console.log("SignUp successful:", data);
      await createDefaultDocs();
      navigate("/markdown");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data?.message);
        console.log(error.response);
      } else {
        handleError("An unexpected error occurred");
        console.error("An unexpected error occurred:", error);
      }
    },
    onSettled: () => {
      // Reset email and password fields
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
      footerText="Already have an account? Login"
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
      <LabelInput name="Password:" htmlFor="password" />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password || ""}
        handleChange={handlePassword}
      />
      <StyledPasswordCon>
        <LabelInput name="Confirm password:" htmlFor="confirmPassword" />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          value={passwordConfirm || ""}
          handleChange={handlePasswordConfirm}
        />
        <EyeIcon bottom="25%" />
      </StyledPasswordCon>
    </LoginSignupTemp>
  );
}

export default Signup;

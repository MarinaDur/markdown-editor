import { styled } from "styled-components";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import LabelInput from "../ui/LabelInput";
import Input from "../ui/Input";
import { useMarkdown } from "../context/MarkdownContext";
import EyeIcon from "../ui/EyeIcon";
import Container from "../ui/Container";
import { resetPassword } from "../utils/apiCalls";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPopUp from "../ui/ErrorPopUp";

const StyledPasswordCon = styled(Container)`
  align-items: flex-end;
  position: relative;
`;

function ResetPassword() {
  const {
    password,
    handlePassword,
    handlePasswordConfirm,
    passwordConfirm,
    handleError,
    setPassword,
    setPasswordConfirm,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = useMarkdown();

  const navigate = useNavigate();
  const { token } = useParams();

  const resetPassMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/success-message", {
        state: {
          message: "You have successfully reset your password",
        },
      });
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
      setPassword("");
      setPasswordConfirm("");
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetPassMutation.mutate({ token, password, passwordConfirm });
  }

  return (
    <LoginSignupTemp
      welcomeText="Reset Password"
      descText="Please enter your new password"
      buttonText="Change Password"
      handleClick={(e) => handleSubmit(e as React.FormEvent<HTMLFormElement>)}
    >
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

export default ResetPassword;

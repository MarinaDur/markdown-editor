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

const StyledParForgotPassword = styled(Paragraph)`
  color: var(--cl-text-main);
`;

const StyledPasswordCon = styled(Container)`
  gap: 0.5rem;
  align-items: flex-end;
  position: relative;
`;

function Login() {
  const navigate = useNavigate();
  const { email, password, handleEmail, handlePassword, handleLogin } =
    useMarkdown();
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

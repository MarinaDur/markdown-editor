import { styled } from "styled-components";
import LoginSignupTemp from "../ui/LoginSignupTemp";
import LabelInput from "../ui/LabelInput";
import Input from "../ui/Input";
import Container from "../ui/Container";
import EyeIcon from "../ui/EyeIcon";

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
  return (
    <LoginSignupTemp
      welcomeText="Welcome!"
      descText="Create your account"
      buttonText="Sign up"
      footerText="Already have an account? Login"
    >
      <LabelInput name="Email:" htmlFor="email" />
      <Input type="email" id="email" name="email" placeholder="Email address" />
      <LabelInput name="Password:" htmlFor="password" />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <StyledPasswordCon>
        <LabelInput name="Confirm password:" htmlFor="confirmPassword" />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
        />
        <EyeIcon bottom="25%" />
      </StyledPasswordCon>
    </LoginSignupTemp>
  );
}

export default Signup;

import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import LoginSignupTemp from "../ui/LoginSignupTemp";

const StyledSuccessMessage = styled.div``;

function SuccessMessage() {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <StyledSuccessMessage>
      <LoginSignupTemp
        welcomeText="Success!"
        descText={message && message}
        buttonText="Go back to login"
        navigateTo="/"
      ></LoginSignupTemp>
    </StyledSuccessMessage>
  );
}

export default SuccessMessage;

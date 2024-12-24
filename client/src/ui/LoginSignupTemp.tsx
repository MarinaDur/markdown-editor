import { styled } from "styled-components";
import flex from "../ui/Flex";
import Input from "../ui/Input";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Button from "../ui/Button";
import LabelInput from "../ui/LabelInput";
import padding from "../ui/Padding";
import Container from "../ui/Container";
import Svg from "../ui/Svg";

interface LoginSignupTempProps {
  children: React.ReactNode;
  welcomeText: string;
  descText: string;
  buttonText: string;
  footerText: string;
  handleClick?: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const StyledCon = styled.div`
  ${flex}
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 3rem;
  ${padding}
`;

const StyledTitle = styled(Heading)`
  font-size: 2rem;
`;

const StyledTextCon = styled(Container)`
  gap: 1rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 4rem;
  color: var(--cl-bg-header);
`;
const StyledSubParagraph = styled(Paragraph)`
  font-size: 1.5rem;
  letter-spacing: normal;
`;

const StyledInputCon = styled.form`
  ${flex}
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 2rem;
`;

const StyledFooterText = styled(Paragraph)`
  color: var(--cl-text-main);
`;

function LoginSignupTemp({
  children,
  welcomeText,
  descText,
  buttonText,
  handleClick,
  footerText,
  isLoading,
}: LoginSignupTempProps) {
  return (
    <StyledCon>
      <StyledTitle>MARKDOWN</StyledTitle>
      <StyledTextCon>
        <StyledParagraph $type="markdown">{welcomeText}</StyledParagraph>
        <StyledSubParagraph $type="markdown">{descText}</StyledSubParagraph>
      </StyledTextCon>
      <StyledInputCon onSubmit={handleClick}>
        {children}
        <Button
          text={buttonText}
          handleClick={handleClick}
          isLoading={isLoading}
        />
      </StyledInputCon>
      <StyledFooterText $type="all">{footerText}</StyledFooterText>
    </StyledCon>
  );
}

export default LoginSignupTemp;

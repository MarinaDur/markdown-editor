import { styled } from "styled-components";
import flex from "../ui/Flex";
import Heading from "../ui/Heading";
import Paragraph from "../ui/Paragraph";
import Button from "../ui/Button";
import padding from "../ui/Padding";
import Container from "../ui/Container";

interface LoginSignupTempProps {
  children?: React.ReactNode;
  welcomeText?: string;
  descText?: string;
  buttonText?: string;
  footerText?: string;
  handleClick?: (e?: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  link?: string;
  href?: string;
  navigateTo?: string | undefined;
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
  text-align: center;
  line-height: 1.2;
`;
const StyledSubParagraph = styled(Paragraph)`
  font-size: 1.5rem;
  letter-spacing: normal;
  text-align: center;
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
  ${flex}
  gap: 3px;

  a {
    color: var(--cl-orange);
    text-decoration: underline;
  }
`;

function LoginSignupTemp({
  children,
  welcomeText,
  descText,
  buttonText,
  handleClick,
  footerText,
  link,
  href,
  isLoading,
  navigateTo,
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
          // handleClick={handleClick}
          isLoading={isLoading}
          navigateTo={navigateTo}
        />
      </StyledInputCon>
      <StyledFooterText $type="all">
        {footerText}
        <a href={href}>{link}</a>
      </StyledFooterText>
    </StyledCon>
  );
}

export default LoginSignupTemp;

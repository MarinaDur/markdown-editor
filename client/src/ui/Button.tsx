import { styled } from "styled-components";
import width from "./Width";
import flex from "./Flex";
import Paragraph from "./Paragraph";
import { useMarkdown } from "../context/MarkdownContext";
import Loader from "./Loader";

interface ButtonProps {
  handleClick?: () => void;
  text: string;
}

const StyledButton = styled.button`
  background: var(--cl-orange);
  ${width}
  padding: 1rem 0 1.2rem;
  ${flex}
  border-radius: 4px;
  border: none;
  gap: 1rem;
`;

function Button({ handleClick, text }: ButtonProps) {
  const { isLoading } = useMarkdown();
  return (
    <StyledButton onClick={handleClick} disabled={isLoading}>
      {isLoading ? <Loader /> : <Paragraph $type="all">{text}</Paragraph>}
    </StyledButton>
  );
}

export default Button;

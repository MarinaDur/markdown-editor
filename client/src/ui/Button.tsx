import { styled } from "styled-components";
import width from "./Width";
import flex from "./Flex";
import Paragraph from "./Paragraph";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  handleClick?: () => void;
  text?: string;
  isLoading?: boolean;
  navigateTo?: string;
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

function Button({ handleClick, text, isLoading, navigateTo }: ButtonProps) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (handleClick) handleClick();
    else if (navigateTo) navigate(navigateTo);
  };
  return (
    <StyledButton onClick={onClickHandler} disabled={isLoading}>
      {isLoading ? <Loader /> : <Paragraph $type="all">{text}</Paragraph>}
    </StyledButton>
  );
}

export default Button;

import { css, keyframes, styled } from "styled-components";
import { useMarkdown } from "../context/MarkdownContext";
import Paragraph from "./Paragraph";

interface StyledErrorPopUp {
  $isError?: string | null;
}

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
`;

const StyledErrorPopUp1 = styled.div<StyledErrorPopUp>`
  position: fixed;
  top: ${(props) => (props.$isError ? "0px" : "-1000px")};
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 1s ease-in-out;
  z-index: 1000;
  max-width: 300px;
  animation: ${(props) =>
    props.$isError
      ? css`
          ${slideIn} 0.8s ease-in-out forwards, ${slideOut} 0.8s ease-in-out 3s forwards;
        `
      : "none"};
`;

function ErrorPopUp() {
  const { error, handleErrorReset } = useMarkdown();

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === "fOuniJ" && error) {
      setTimeout(() => {
        handleErrorReset();
      }, 5000);
    }
  };

  if (!error) return null;

  return (
    <StyledErrorPopUp1 $isError={error} onAnimationEnd={handleAnimationEnd}>
      <Paragraph $type="all">{error}</Paragraph>
    </StyledErrorPopUp1>
  );
}

export default ErrorPopUp;

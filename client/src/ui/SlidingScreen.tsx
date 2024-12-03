import { keyframes, styled } from "styled-components";
import { useMarkdown } from "../context/MarkdownContext";
import flex from "./Flex";

interface StyledSlidingScreenProps {
  $isOpen: boolean;
}

interface SlidingScreenProps {
  isOpen: boolean;
  handleClosePopUp?: () => void;
  children: React.ReactNode;
}

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledSlidingScreen = styled.div<StyledSlidingScreenProps>`
  background: var(--cl-overlay-delete);
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: absolute;
  top: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
  ${flex}
  align-items: center;
  justify-content: center;
  left: 0;
  z-index: 10000;

  transition: top 2s ease;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : "none")} 2s forwards;
`;

function SlidingScreen({
  isOpen,
  handleClosePopUp,
  children,
}: SlidingScreenProps) {
  return (
    <StyledSlidingScreen $isOpen={isOpen} onClick={handleClosePopUp}>
      {children}
    </StyledSlidingScreen>
  );
}

export default SlidingScreen;

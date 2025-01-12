import { styled } from "styled-components";
import flex from "../ui/Flex";

interface StyledToggleThemeProps {
  $isDarkMode?: boolean;
  handleClick?: () => void;
}

const StyledToggleTheme = styled.div<StyledToggleThemeProps>`
  ${flex}
  width: 48px;
  height: 24px;
  padding: 3px;
  background: var(--cl-bg-theme);
  border-radius: 50px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

const StyledToggleCircle = styled.div<StyledToggleThemeProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--cl-white-global);
  transform: translateX(
    ${({ $isDarkMode }) => ($isDarkMode ? "-10px" : "10px")}
  );
  transition: transform 0.2s ease-in-out; /* Smooth transition for transform */
`;

function ToggleTheme({ $isDarkMode, handleClick }: StyledToggleThemeProps) {
  //   const { isDarkMode, handleDarkMode } = useMarkdown();

  return (
    <StyledToggleTheme onClick={handleClick}>
      <StyledToggleCircle $isDarkMode={$isDarkMode} />
    </StyledToggleTheme>
  );
}

export default ToggleTheme;

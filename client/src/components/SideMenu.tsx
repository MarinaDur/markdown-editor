import { styled } from "styled-components";
import flex from "../ui/Flex";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import width from "../ui/Width";
import Docs from "./Docs";
import { useMarkdown } from "../context/MarkdownContext";
import transition from "../ui/Transition";
import ColorTheme from "./ColorTheme";

interface StyledSideMenuConProps {
  $isMenuOpen: boolean;
}

const StyledSideMenuCon = styled.div<StyledSideMenuConProps>`
  width: ${(props) => (props.$isMenuOpen ? "250px" : "0")};
  height: 100%;
  background: var(--cl-bg-slider);
  ${flex}
  align-items: flex-start;
  overflow: hidden;
  ${transition}
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledSideMenu = styled.div`
  padding: 2.7rem 0;
  ${width}
  ${flex}
  flex-direction: column;
  gap: 2.7rem;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  justify-content: flex-start;
`;

const StyledTile = styled(Heading)`
  @media (min-width: 1024px) {
    display: none;
  }
`;

function SideMenu() {
  const { isMenuOpen, handleAddNewDoc } = useMarkdown();

  return (
    <StyledSideMenuCon $isMenuOpen={isMenuOpen}>
      <StyledSideMenu>
        <StyledTile as="h2">MARKDOWN</StyledTile>
        <Heading as="h3">MY DOCUMENT</Heading>
        <Button handleClick={handleAddNewDoc} text="+ New Document" />
        <Docs />
        <ColorTheme />
      </StyledSideMenu>
    </StyledSideMenuCon>
  );
}

export default SideMenu;

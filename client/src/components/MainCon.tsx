import { styled } from "styled-components";
import Main from "./Main";
import SideMenu from "./SideMenu";
import flex from "../ui/Flex";
import DeletePopup from "../ui/DeletePopup";
import { useMarkdown } from "../context/MarkdownContext";

const StyledMainCon = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  overflow-x: hidden;
  position: relative;
`;

function MainCon() {
  const { deleteDocPopup } = useMarkdown();
  return (
    <StyledMainCon>
      <SideMenu />
      <Main />
      <DeletePopup />
    </StyledMainCon>
  );
}

export default MainCon;

import { styled } from "styled-components";
import Main from "./Main";
import SideMenu from "./SideMenu";
import flex from "../ui/Flex";
import DeletePopup from "../ui/DeletePopup";
import { useMarkdown } from "../context/MarkdownContext";
import { useQuery } from "@tanstack/react-query";
import { authMe } from "../utils/apiCalls";
import ProtectedRoute from "./ProtectedRoute";

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
    <ProtectedRoute>
      <StyledMainCon>
        <SideMenu />
        <Main />
        <DeletePopup />
      </StyledMainCon>
    </ProtectedRoute>
  );
}

export default MainCon;

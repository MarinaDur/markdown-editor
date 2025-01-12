import { styled } from "styled-components";
import Main from "./Main";
import SideMenu from "./SideMenu";
import DeletePopup from "../ui/DeletePopup";
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

import { styled } from "styled-components";
import { useEffect } from "react";
import Header from "./Header";
import width from "../ui/Width";
import MarkdownCon from "./MarkdownCon";
import { useMarkdown } from "../context/MarkdownContext";
import transition from "../ui/Transition";
import DeletePopup from "../ui/DeletePopup";
import { fetchDocuments } from "../utils/apiCalls";
import { useQuery } from "@tanstack/react-query";
import { MarkDownDocs } from "../interfaces/documets";

interface StyledMainProps {
  $isMenuOpen: boolean;
}

const StyledMain = styled.div<StyledMainProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  flex-wrap: nowrap;
  width: 100%;
  /* transform: translateX(${(props) =>
    props.$isMenuOpen ? "250px" : "0"}); */
  /* margin-left: ${(props) => (props.$isMenuOpen ? "250px" : "0")};
  position: relative;
  */
  position: relative;

  left: ${(props) => (props.$isMenuOpen ? "250px" : "0")};
  ${transition}
  /* height: 100vh; */
  min-height: 100vh;
`;

function Main() {
  const { isMenuOpen } = useMarkdown();
  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery<MarkDownDocs[]>({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  return (
    <StyledMain $isMenuOpen={isMenuOpen}>
      <Header documents={documents} />
      <MarkdownCon />
    </StyledMain>
  );
}
export default Main;

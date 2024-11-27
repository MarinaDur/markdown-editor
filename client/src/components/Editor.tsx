import { styled } from "styled-components";
import MarkdownHeader from "../ui/MarkdownHeader";
import Paragraph from "../ui/Paragraph";
import width from "../ui/Width";
import flex from "../ui/Flex";
import textGeneral from "../ui/TextGeneral";
import { useMarkdown } from "../context/MarkdownContext";
import padding from "../ui/Padding";
import paddingPM from "../ui/PaddingPM";
import TextareaAutosize from "react-textarea-autosize";
import { MarkDownDocs } from "../interfaces/documets";
import { useQuery } from "@tanstack/react-query";
import { fetchOneDocuments } from "../utils/apiCalls";

interface StyledEditorProps {
  $isPreview: boolean;
}

const StyledEditor = styled.div<StyledEditorProps>`
  ${width}
  /* ${flex} */
  flex-direction: column;
  height: 100%;
  min-height: calc(100vh - 72px);

  /* @media (max-width: 768px) {
    display: ${(props) => (props.$isPreview ? "none" : `${flex}`)};
  } */

  @media (min-width: 768px) {
    border-right: 1px solid var(--cl-main-border);
  }
`;

const StyledMarkdownCon = styled.div`
  ${width}
  background: var(--cl-bg-main);
  height: 100%;
  background: var(--cl-bg-main);
`;

const StyledTextArea = styled(TextareaAutosize)`
  ${width}
  border: none;
  font-family: "Roboto Mono", sans-serif;
  color: var(--cl-text-main);
  overflow-wrap: break-word;
  word-break: break-word;
  resize: none;
  ${textGeneral}
  ${paddingPM}
  /* &:not([rows]) {
    /* min-height: calc(100vh - 56px - 48px);
    min-height: 100vh;
  } */

  min-height: 100vh;
  padding-bottom: 5rem;
  background: var(--cl-bg-main);
  &:focus {
    border: none;
    outline: none;
  }
`;

const StyledDiv = styled.div`
  /* height: 100vh; */
`;

function Editor({ document }: { document: MarkDownDocs }) {
  const {
    markdownValue,
    handleEditor,
    isPreview,
    handleSaveMarkdown,
    currentDocId,
  } = useMarkdown();
  // const {
  //   data: document,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["document"],
  //   queryFn: () => fetchOneDocuments(currentDocId ?? ""),
  // });

  // console.log(document);

  return (
    <StyledEditor $isPreview={isPreview} className="editor">
      <MarkdownHeader title="MARKDOWN" type="markdown" />
      <StyledMarkdownCon>
        <StyledTextArea
          placeholder="Type your markdown here..."
          value={markdownValue}
          onChange={handleEditor}
          // onBlur={handleSaveMarkdown}
        />
        {/* <StyledDiv></StyledDiv> */}
      </StyledMarkdownCon>
    </StyledEditor>
  );
}

export default Editor;

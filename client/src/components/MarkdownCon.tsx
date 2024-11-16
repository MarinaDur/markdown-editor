import { styled, css } from "styled-components";
import Preview from "./Preview";
import flex from "../ui/Flex";
import width from "../ui/Width";
import Editor from "./Editor";
import { useMarkdown } from "../context/MarkdownContext";
import Paragraph from "../ui/Paragraph";
import Heading from "../ui/Heading";

interface StyledMarkdownConProps {
  $isPreview: boolean;
}

const StyledMarkdownCon = styled.div<StyledMarkdownConProps>`
  ${flex}
  ${width}
  align-items: flex-start;
  height: 100%;
  flex-grow: 1;
  background: var(--cl-bg-main);

  @media (max-width: 767px) {
    .editor {
      ${(props) =>
        props.$isPreview &&
        css`
          display: none;
        `}
    }
    .preview {
      ${(props) =>
        !props.$isPreview &&
        css`
          display: none;
        `}
    }
  }

  @media (min-width: 768px) {
    .editor {
      ${(props) =>
        props.$isPreview &&
        css`
          display: none;
        `}
    }
  }
`;

const StyledPlaceHNoDoc = styled.div`
  max-width: 27rem;
  ${flex}
  text-align: center;
  padding-top: 5rem;
`;

function MarkdownCon() {
  const { isPreview, documents } = useMarkdown();

  return (
    <StyledMarkdownCon $isPreview={isPreview}>
      {documents.length > 0 ? (
        <>
          <Editor />
          <Preview />
        </>
      ) : (
        <StyledPlaceHNoDoc>
          <Heading as="h4" $type="preview">
            Click on the side menu to create a new document
          </Heading>
        </StyledPlaceHNoDoc>
      )}
    </StyledMarkdownCon>
  );
}

export default MarkdownCon;

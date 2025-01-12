import { styled, css } from "styled-components";
import { MarkDownDocs } from "../interfaces/documets";
import Preview from "./Preview";
import flex from "../ui/Flex";
import width from "../ui/Width";
import Editor from "./Editor";
import { useMarkdown } from "../context/MarkdownContext";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";
import SlidingScreen from "../ui/SlidingScreen";

interface StyledMarkdownConProps {
  $isPreview: boolean;
}

interface MarkDownConProps {
  documents: MarkDownDocs[];
  isLoading: boolean;
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

function MarkdownCon({ documents, isLoading }: MarkDownConProps) {
  const { isPreview } = useMarkdown();

  return (
    <StyledMarkdownCon $isPreview={isPreview}>
      {isLoading && (
        <SlidingScreen isOpen={isLoading} isSliding={false}>
          <Loader />
        </SlidingScreen>
      )}
      {documents && documents.length > 0 ? (
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

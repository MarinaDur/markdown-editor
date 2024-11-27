import { styled, css } from "styled-components";
import { Document, MarkDownDocs } from "../interfaces/documets";

import { useLocation } from "react-router-dom";
import Preview from "./Preview";
import flex from "../ui/Flex";
import width from "../ui/Width";
import Editor from "./Editor";
import { useMarkdown } from "../context/MarkdownContext";
import Paragraph from "../ui/Paragraph";
import Heading from "../ui/Heading";
import { useEffect } from "react";
import axios from "axios";

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

function MarkdownCon({ documents }: Document) {
  const { isPreview, currentDoc } = useMarkdown();

  return (
    <StyledMarkdownCon $isPreview={isPreview}>
      {documents && documents.length > 0 ? (
        <>
          <Editor document={documents[currentDoc || 0]} />
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
